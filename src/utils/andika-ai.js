import { createBlock } from '@wordpress/blocks';

import AndikaOpenAI from './andika-api';

export async function generateText(prompt, content, setContent, insertBlocks, clientId) {
  const andikaAPI = new AndikaOpenAI(andika);

  let accumulatedText = '';

  const andikaStreamEvents = async (event) => {
    if (event.type === 'event') {
      if (event.data !== "[DONE]") {
        try {
          const parsedData = JSON.parse(event.data);

          const text =
            parsedData.choices[0]?.text ??
            parsedData.choices[0]?.message?.content ??
            parsedData.choices[0]?.delta?.content ??
            ''
          ;

          const cleanedText = text.replace(/^\n{1,2}/, '');

          if (cleanedText) {
            accumulatedText += cleanedText;

            if (accumulatedText.includes('\n')) {

              const paragraphs = accumulatedText.split(/\n+/);

              // Filter out empty paragraphs
              const nEP = paragraphs.filter((paragraph) => paragraph.trim() !== '');

              const blocksToInsert = nEP.map((paragraph) =>
                createBlock('andika-block/andika', { content: paragraph })
              );

              const currentIndex = wp.data.select('core/block-editor').getBlockIndex(clientId);

              insertBlocks(blocksToInsert, currentIndex);

              accumulatedText = '';

            } else {
              setContent(accumulatedText);
            }
          }
        } catch (e) {
          console.error('Error parsing JSON', e);
        }
      }
    }
  };

  try {
    await andikaAPI.andikaText(prompt, andikaStreamEvents);
  } catch (error) {
    console.error('Error in generateText', error);
  }
}