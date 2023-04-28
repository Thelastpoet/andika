import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export const AndikaBlockHandler = (attributes, content, setAttributes, setContent) => {
  const { replaceBlocks, removeBlock } = useDispatch(blockEditorStore);
  const {
    getBlock,   
    getBlockOrder,
    getBlockIndex,
  } = useSelect((select) => select(blockEditorStore), []);
 
  const onSplit = (value, isOriginal) => {
    if (isOriginal) {
      const updatedContent = content.slice(0, content.indexOf(value));
      setAttributes({ content: updatedContent });
      setContent(updatedContent);
    }

    const newAttributes = {
      ...attributes,
      content: value,
    };

    const block = createBlock("andika-block/andika", newAttributes);
    return block;
  };

  const onReplace = (blocks, clientId) => {
    replaceBlocks(clientId, blocks.map((block, index) =>
      (index === 0 && block.name === "andika-block/andika")
        ? {
            ...block,
            ...attributes,
            ...block.attributes,
          }
        : block
    ));
  };

  const onMerge = (clientId) => {
    const blockIndex = getBlockIndex(clientId);
    const blockOrder = getBlockOrder();
  
    // Merge with the previous block
    const prevBlockIndex = blockIndex - 1;
    const prevBlockClientId = blockOrder[prevBlockIndex];
  
    if (prevBlockClientId) {
      const prevBlock = getBlock(prevBlockClientId);
  
      if (prevBlock.name === "andika-block/andika") {
        const mergedContent = prevBlock.attributes.content + content;
  
        setAttributes({ content: mergedContent });
        setContent(mergedContent);
  
        removeBlock(prevBlockClientId);
        return;
      }
    }
  
    // Merge with the next block
    const nextBlockIndex = blockIndex + 1;
    const nextBlockClientId = blockOrder[nextBlockIndex];
  
    if (nextBlockClientId) {
      const nextBlock = getBlock(nextBlockClientId);
  
      if (nextBlock.name === "andika-block/andika") {
        const mergedContent = content + nextBlock.attributes.content;
  
        setAttributes({ content: mergedContent });
        setContent(mergedContent);
  
        removeBlock(nextBlockClientId);
      }
    }
  };  
 
  return { onSplit, onReplace, onMerge };
};
export default AndikaBlockHandler;