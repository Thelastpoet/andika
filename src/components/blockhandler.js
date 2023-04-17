import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

export const AndikaBlockHandler = (attributes, content, setAttributes, setContent) => {
  const { removeBlock, replaceBlocks, insertBlocks } = useDispatch(blockEditorStore);

  const { getBlockAttributes, getPreviousBlockClientId, getNextBlockClientId, getBlockName } = useSelect((select) =>
    select(blockEditorStore)
  );

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
      (index === 0 && block.name === name)
        ? {
            ...block,
            ...attributes,
            ...block.attributes,
          }
        : block
    ));
  };

  const onMerge = (forward, clientId) => {
    const previousBlock = getPreviousBlockClientId(clientId);
    const nextBlock = getNextBlockClientId(clientId);
    const destinationBlock = forward ? nextBlock : previousBlock;

    if (destinationBlock && getBlockName(destinationBlock) === 'andika-block/andika') {
      const currentContent = getBlockAttributes(clientId).content;
      const destinationContent = getBlockAttributes(destinationBlock).content;

      const updatedContent = forward
        ? currentContent + destinationContent
        : destinationContent + currentContent;

      replaceBlocks(
        destinationBlock,
        createBlock('andika-block/andika', {
          content: updatedContent,
        })
      );

      removeBlock(clientId);
    }
  };

  return { onSplit, onReplace, onMerge };
};
export default AndikaBlockHandler;