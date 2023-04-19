import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { Fragment, useState, useCallback } from '@wordpress/element';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import { generateText } from './utils/andika-ai';

import AndikaBlockHandler from './components/blockhandler';
import AndikaBlockControls from './components/blockcontrols';
import AndikaInspectorControls from './components/inspectorcontrols';

export default function Edit({ attributes, setAttributes, isSelected, clientId }) {
    const [content, setContent] = useState(attributes.content || '');    
    const [isLoading, setIsLoading] = useState(false);

    // Get the post title and previous block content
    const postTitle = useSelect((select) =>
        select('core/editor').getEditedPostAttribute('title')
    );

    const previousBlocks = useSelect((select) =>
        select(blockEditorStore).getBlocks()
    );

    const previousContent = previousBlocks
        .slice(0, -1)
        .map((block) => block.attributes.content)
        .join('\n');
        
        const onGenerateClick = useCallback(async () => {
            setIsLoading(true);
            
            const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${content}`;
            
            try {
                const newText = await generateText(prompt);
                setContent((prevContent) => prevContent + newText);
                setAttributes({ content: content + newText }); // Update the content attribute with the new generated text
            } catch (error) {
                console.error(error);
            }
            
            setIsLoading(false);
        
        }, [postTitle, previousContent, content]);        

    const blockProps = useBlockProps();

    const { onSplit, onMerge, onReplace } = AndikaBlockHandler(attributes, content, setAttributes, setContent);
    
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
                identifier='content'
                { ...blockProps }
                tagName="p"
                value={content}
                onChange={(newContent) => {
                    setAttributes({ content: newContent });
                    setContent(newContent);
                }}
                className="andika-placeholder"
                
                placeholder={__(
                    'Start typing and click the lightbulb icon to generate text...',
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
                onRemove={ () => onReplace( []) }                
                onMerge={() => onMerge(clientId)}
            />
        </Fragment>
    );
}