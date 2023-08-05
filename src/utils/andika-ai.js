import { createBlock } from '@wordpress/blocks';
import AndikaOpenAI from './andika-api';
import { marked } from 'marked';

// Generates text using the Andika API and inserts it as blocks in the WordPress editor
export async function generateText(prompt, content, setContent, insertBlocks, clientId, andikaTextLength) {
  const andikaAPI = new AndikaOpenAI(andika);

  let buffer = '';

  // Handles the streaming events returned by the OpenAI API
  const andikaStreamEvents = async (event) => {
    if (event.type === 'event') {
      if (event.data !== "[DONE]") {
        try {
          const parsedData = JSON.parse(event.data);
          const text =
            parsedData.choices[0]?.text ??
            parsedData.choices[0]?.message?.content ??
            parsedData.choices[0]?.delta?.content ??
            '';

          const sanitizedText = text.replace(/^\n{1,2}/, '');          

          if (sanitizedText) {
            buffer += sanitizedText;
  
            if (buffer.includes('\n')) {  
              const paragraphs = buffer.split(/\n+/);  
              const validParagraphs = paragraphs.filter((paragraph) => paragraph.trim() !== '');                
              const htmlParagraphs = validParagraphs.map((paragraph) => marked(paragraph));             
              
              const index = wp.data.select('core/block-editor').getBlockIndex(clientId);
              if (content && content !== htmlParagraphs[0]) { 
                const updatedBlock = createBlock('andika-block/andika', { content: content + htmlParagraphs[0] });
                wp.data.dispatch('core/block-editor').replaceBlock(clientId, updatedBlock);
                const remainingBlocks = blocks.slice(1);
                insertBlocks(remainingBlocks, index + 1);
              } else {
                insertBlocks(blocks, index);
              }
              buffer = '';
            } else {
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