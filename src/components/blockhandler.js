import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export const AndikaBlockHandler = (attributes, setAttributes, clientId) => {
  const { replaceBlocks, removeBlocks } = useDispatch(blockEditorStore);
  const { getBlock, getBlockOrder, getBlockIndex } = useSelect((select) => select(blockEditorStore), []);

  const onSplit = (value, startOffset, endOffset) => {
    const originalBlock = getBlock(clientId);
    if (!originalBlock) return;

    const newBlock = createBlock('andika-block/andika', { content: value.slice(endOffset) });

    setAttributes({ content: value.slice(0, startOffset) });

    const currentBlockIndex = getBlockIndex(clientId);
    const blockOrder = getBlockOrder();
    replaceBlocks(
      blockOrder.slice(currentBlockIndex, currentBlockIndex + 1),
      [originalBlock, newBlock]
    );
  };

  const onMerge = (forwardBlockClientId) => {
    const currentBlock = getBlock(clientId);
    const forwardBlock = getBlock(forwardBlockClientId);

    if (!currentBlock || !forwardBlock) return;

    if (forwardBlock.name === 'andika-block/andika') {
      // Merge contents
      const mergedContent = currentBlock.attributes.content + '\n' + forwardBlock.attributes.content;
      setAttributes({ content: mergedContent });

      // Remove the block that was merged
      removeBlocks(forwardBlockClientId);
    }
  };

  return { onSplit, onMerge };
};

export default AndikaBlockHandler;
