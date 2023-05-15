import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { Fragment, useState, useCallback, useEffect, useRef } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

import { generateText } from './utils/andika-ai';

// Local imports
import AndikaBlockHandler from './components/blockhandler';
import AndikaBlockControls from './components/blockcontrols';
import AndikaInspectorControls from './components/inspectorcontrols';

export default function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) {
  const { content: contentAttr, alignment, fontSize, textColor, backgroundColor } = attributes;

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(contentAttr || '');

  const {
    onSplit,
    onMerge,
    onReplace,
  } = AndikaBlockHandler(attributes, content, setAttributes, setContent, clientId);
  const RichTextRef = useRef();
  const blockProps = useBlockProps();
  const { insertBlocks } = useDispatch(blockEditorStore);
  const { createNotice } = useDispatch('core/notices');

  const postTitle = useSelect((select) =>
    select('core/editor').getEditedPostAttribute('title')
  );

  const previousBlocks = useSelect((select) =>
    select(blockEditorStore).getBlocks()
  );

  const previousContent = previousBlocks.length > 0
    ? previousBlocks
        .slice(0, -1)
        .map((block) => block.attributes.content)
        .join('\n')
    : '';

    // Function to set the caret position in the RichText component.
    const setCaretPosition = (editableRef) => {
      if (!editableRef.current) return;
  
      const range = document.createRange();
      const sel = window.getSelection();
  
      if (content === '') {
        // Set the caret to the start of the placeholder when the content is empty
        range.setStart(editableRef.current, 0);
      } else {
        const lastChild = editableRef.current.lastChild;
        if (lastChild) {
          // Set the caret to the end of the content when content is not empty
          range.setStartAfter(lastChild);
        }
      }
  
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      editableRef.current.focus();
    };
    

  useEffect(() => {
    setCaretPosition(RichTextRef);
    setAttributes({ content });
  }, [content, setAttributes]);

  const onGenerateClick = useCallback(async () => {
    setIsLoading(true);
  
    const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${content}`;

    // Get the 'andikaTextLength' attribute
    const andikaTextLength = attributes.andikaTextLength;
  
    try {
      await generateText(prompt, content, setContent, insertBlocks, clientId, andikaTextLength);
    } catch (error) {
      createNotice('error', `Text generation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [content, postTitle, previousContent, setContent, insertBlocks, clientId, attributes.andikaTextLength]);

  return (
    <Fragment>
      <AndikaBlockControls
        attributes={attributes}
        setAttributes={setAttributes}
        isLoading={isLoading}
        onGenerateClick={onGenerateClick}
      />
      <AndikaInspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
      />
      <RichText
        ref={RichTextRef}
        tagName="div"
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
          setAttributes({ content: newContent });
        }}
        className="andika-placeholder"
        placeholder={__(
          'Type and click the lightbulb icon to generate text...',
          'andika',
        )}
        isSelected={isSelected}
        style={{
          textAlign: alignment,
          fontSize: fontSize,
          color: textColor,
          backgroundColor: backgroundColor,
        }}
        onSplit={onSplit}
        onReplace={(blocks) => onReplace(blocks, clientId)}
        onRemove={() => onReplace([])}
        onMerge={() => onMerge(clientId)}
      />
    </Fragment>
  );
}