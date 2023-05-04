import { __ } from '@wordpress/i18n';

import Andika_OpenAI_API from './andika-api';

export async function generateText(prompt, content, setContent) {
  const andikaAPI = new Andika_OpenAI_API(andika);

  // Callback function for the streaming events
  const andikaStreamEvents = (event) => {
    if (event.type === 'event') {
      if (event.data !== "[DONE]") {        
      try {
        const parsedData = JSON.parse(event.data);
        const choices = parsedData.choices || [];
        const json = choices[0]?.text ?? choices[0]?.message?.content ?? choices[0]?.delta?.content ?? '';
        setContent((prevContent) => prevContent + json);
      } catch (e) {
        console.error('Error parsing JSON', e);
      }
    }
    }
  };

  try {
    await andikaAPI.andika_text(prompt, andikaStreamEvents);
  } catch (error) {
    console.error('Error in generateText', error);
  }
}



