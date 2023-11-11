import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import AndikaOpenAI from './andika-api';

// Component for generating and inserting text
export function AndikaTextGenerator({ clientId, andikaTextLength }) {
  const [buffer, setBuffer] = useState('');
  const { replaceBlock } = useDispatch('core/block-editor');
  const blockContent = useSelect((select) =>
    select('core/block-editor').getBlockAttributes(clientId)?.content
  );

  const handleStreamEvent = (event) => {
    if (event.type === 'text' && event.data) {
      setBuffer((prevBuffer) => prevBuffer + event.data);
    }
  };

  useEffect(() => {
    if (buffer.includes('\n')) {
      const paragraphs = buffer.split(/\n+/).filter(p => p.trim());
      const blocks = paragraphs.map(p => createBlock('core/paragraph', { content: p }));

      if (blocks.length > 0) {
        replaceBlock(clientId, blocks[0]);
        if (blocks.length > 1) {
          blocks.slice(1).forEach(block => replaceBlock(clientId, block, clientId));
        }
      }

      setBuffer('');
    }
  }, [buffer, replaceBlock, clientId]);

  const generateText = async () => {
    const andikaAPI = new AndikaOpenAI();
    const maxTokens = { short: 24, medium: 48, long: 96 }[andikaTextLength] || 48;

    try {
      await andikaAPI.generateText(handleStreamEvent, { max_tokens: maxTokens });
    } catch (error) {
      console.error('Error in generateText:', error);
    }
  };

  useEffect(() => {
    generateText();
  }, [andikaTextLength]);

  return null;
}
