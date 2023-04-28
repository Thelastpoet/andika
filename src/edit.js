import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { Fragment, useState, useCallback, useEffect, useRef} from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

import { generateText } from './utils/andika-ai';

import AndikaBlockHandler from './components/blockhandler';
import AndikaBlockControls from './components/blockcontrols';
import AndikaInspectorControls from './components/inspectorcontrols';

export default function Edit({ attributes, setAttributes, isSelected, clientId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(attributes.content || '');
    const { onSplit, onMerge, onReplace } = AndikaBlockHandler(attributes, content, setAttributes, setContent);
    const RichTextRef = useRef();
  
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
      : 
    '';

    const setCaretPosition = (editableRef) => {
      if (!editableRef.current) return;

      const range = document.createRange();
      const sel = window.getSelection();
      const lastChild = editableRef.current.lastChild;
      
      if (lastChild) {
        range.setStartAfter(lastChild);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      editableRef.current.focus();
    };   
    
    useEffect(() => {
      setCaretPosition(RichTextRef);
    }, [content]);

    const onGenerateClick = useCallback(async () => {
      setIsLoading(true);
    
      const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${content}`;
    
      try {
        await generateText(prompt, content, setContent, onSplit);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    
    }, [content, postTitle, previousContent, setAttributes, onSplit]);      
  
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
          tagName="p"
          value={content}
          onChange={(newContent) => {
            setAttributes({ content: newContent });
          }}
          className="andika-placeholder"
          placeholder={__(
            'Type and click the lightbulb icon to generate text...',
            'andika',
          )}
          isSelected={isSelected}
          style={{
            textAlign: attributes.alignment,
            fontSize: attributes.fontSize,
            color: attributes.textColor,
            backgroundColor: attributes.backgroundColor,
          }}
          onSplit={onSplit}
          onReplace={(blocks) => onReplace(blocks, clientId)}
          onRemove={() => onReplace([])}
          onMerge={() => onMerge(clientId)}
        />
      </Fragment>
    );
  }
