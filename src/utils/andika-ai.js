import { __ } from '@wordpress/i18n';
import { createParser } from 'eventsource-parser';

export async function generateText(prompt, content, setContent) {
  const streamParam = 'stream=true';
  const promptParam = `prompt=${encodeURIComponent(prompt)}`;
  const nonceParam = `_wpnonce=${andika.api_nonce}`;
  const url = `${andika.rest_url}andika/v1/andika-ai?${promptParam}&${streamParam}&${nonceParam}`;

  let generatedText = '';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching text from WordPress REST API: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(async (event) => {
      if (event.type === 'event') {
        const data = event.data;
        try {
          const json = JSON.parse(data);
          const char = json.char;
          setContent((prevContent) => prevContent + char);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
    });
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      parser.feed(decodedChunk);
    }
  } catch (error) {
    console.error('Error in generateText:', error);
  }

  return generatedText;
}