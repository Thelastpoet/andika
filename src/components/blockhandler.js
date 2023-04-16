import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

export const AndikaBlockHandler = () => {
  const { removeBlock, replaceBlocks } = useDispatch(blockEditorStore);

  const { getBlockAttributes, getPreviousBlockClientId, getNextBlockClientId, getBlockName } = useSelect((select) =>
    select(blockEditorStore)
  );

  const onSplit = (attributes, clientId) => (value, isOriginal) => {
    let block;

    if (isOriginal || value) {
      block = createBlock('andika-block/andika', {
        ...attributes,
        content: value,
      });
    } else {
      block = createBlock('core/paragraph');
    }

    if (isOriginal) {
      block.clientId = clientId;
    }

    return block;
  };

  const onMerge = (forward, clientId) => {
    // Get the previous and next blocks based on the direction
    const previousBlock = getPreviousBlockClientId(clientId);
    const nextBlock = getNextBlockClientId(clientId);
    const destinationBlock = forward ? nextBlock : previousBlock;

    if (destinationBlock && getBlockName(destinationBlock) === 'andika-block/andika') {
      const currentContent = getBlockAttributes(clientId).content;
      const destinationContent = getBlockAttributes(destinationBlock).content;

      // Concatenate the contents based on the direction
      const updatedContent = forward
        ? currentContent + destinationContent
        : destinationContent + currentContent;

      // Replace the destination block with a new block with the updated content
      replaceBlocks(
        destinationBlock,
        createBlock('andika-block/andika', {
          content: updatedContent,
        })
      );

      // Remove the current block
      removeBlock(clientId);
    }
  };

  return { onSplit, onMerge };
};
export default AndikaBlockHandler;