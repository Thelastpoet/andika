import { createBlock } from '@wordpress/blocks';

import AndikaOpenAI from './andika-api';

// Generates text using the Andika API and inserts it as blocks in the WordPress editor
export async function generateText(prompt, content, setContent, insertBlocks, clientId, andikaTextLength) {
  const andikaAPI = new AndikaOpenAI(andika);

  // Buffer to accumulate the generated text
  let buffer = '';

  // Handles the streaming events returned by the OpenAI API
  const andikaStreamEvents = async (event) => {
    if (event.type === 'event') {
      if (event.data !== "[DONE]") {
        try {
          const parsedData = JSON.parse(event.data);
  
          // Extract the text from the parsed data
          const text =
            parsedData.choices[0]?.text ??
            parsedData.choices[0]?.message?.content ??
            parsedData.choices[0]?.delta?.content ??
            '';
  
          // Remove leading newline characters
          const sanitizedText = text.replace(/^\n{1,2}/, '');          

          if (sanitizedText) {
            buffer += sanitizedText;
  
            // If the buffer contains newline characters, split and insert the paragraphs as blocks
            if (buffer.includes('\n')) {  
              const paragraphs = buffer.split(/\n+/);  
              const validParagraphs = paragraphs.filter((paragraph) => paragraph.trim() !== '');  

              const blocks = validParagraphs.map((paragraph) =>
                createBlock('andika-block/andika', { content: paragraph })
              );

              // Save index of current block
              const index = wp.data.select('core/block-editor').getBlockIndex(clientId);

              // If we are appending content
              if (content && content !== validParagraphs[0]) { 
                const updatedBlock = createBlock('andika-block/andika', { content: content + validParagraphs[0] });
                wp.data.dispatch('core/block-editor').replaceBlock(clientId, updatedBlock);

                // Insert the remaining blocks after the current block
                insertBlocks(blocks, index + 1);
              } else {
                // Insert the blocks
                insertBlocks(blocks, index);
              }
              // Clear the buffer
              buffer = '';
            } else {
              // Append the buffer content
              setContent(content + buffer);
              
            }
            }
          }       
       catch (e) {
          throw new Error('Error parsing JSON: ' + e.message);
        }
      }
    }
  };  

  // Set the maximum number of tokens to generate based on the specified text length
  let maxTokens;

  switch (andikaTextLength) {
    case 'short':
      maxTokens = 24;
      break;
    case 'medium':
      maxTokens = 48;
      break;
    case 'long':
      maxTokens = 96;
      break;
    default:
      maxTokens = 48;
  }

  // Call the Andika API to generate text and handle the streaming events
  try {
    await andikaAPI.andikaText(prompt, andikaStreamEvents, { max_tokens: maxTokens });
  } catch (error) {
    throw new Error('Error in generateText: ' + error.message);
  }
}