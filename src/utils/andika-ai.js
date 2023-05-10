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
  
              // Filter out empty paragraphs
              const validParagraphs = paragraphs.filter((paragraph) => paragraph.trim() !== '');
  
              // Create blocks from paragraphs
              const blocks = validParagraphs.map((paragraph) =>
                createBlock('andika-block/andika', { content: paragraph })
              );
              
              // Save the index of the current block
              const index = wp.data.select('core/block-editor').getBlockIndex(clientId);
  
              // Insert new blocks after the current block
              insertBlocks(blocks, index);  
              
              // Clear the buffer
              buffer = '';
                
            } else {
              // Update the content of the current block
              setContent(content + buffer);
            }
          }
        } catch (e) {
          throw new Error('Error parsing JSON: ' + e.message);
        }
      }
    }
  };  

  // Set the maximum number of tokens to generate based on the specified text length
  let maxTokens;

  switch (andikaTextLength) {
    case 'short':
      maxTokens = 32;
      break;
    case 'medium':
      maxTokens = 64;
      break;
    case 'long':
      maxTokens = 128;
      break;
    default:
      maxTokens = 64;
  }

  // Call the Andika API to generate text and handle the streaming events
  try {
    await andikaAPI.andikaText(prompt, andikaStreamEvents, { max_tokens: maxTokens });
  } catch (error) {
    throw new Error('Error in generateText: ' + error.message);
  }
}