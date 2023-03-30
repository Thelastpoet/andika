import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    FontSizePicker,
} from '@wordpress/block-editor';
import { ToolbarButton, PanelBody, Spinner } from '@wordpress/components';
import { useEffect, useRef, useState  } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, isSelected }) {
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

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const [currentText, setCurrentText] = useState(attributes.content);
        const currentTextRef = useRef(currentText);
        currentTextRef.current = currentText;

        useEffect(() => {
            setAttributes({ content: currentText });
        }, [currentText]);

        const setEndOfContentEditable = (contentEditableElement) => {
            if (contentEditableElement) {
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(contentEditableElement);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };

        const insertParagraphs = (text) => {
            const sentences = text.split('.');
            let paragraphs = '';
            let currentParagraph = '';
        
            sentences.forEach((sentence, index) => {
                currentParagraph += sentence + '.';
        
                const randomParagraphBreak = Math.floor(Math.random() * 5);
                if (randomParagraphBreak <= 1 || index === sentences.length - 1) {
                    paragraphs += '<p>' + currentParagraph + '</p>';
                    currentParagraph = '';
                }
            });
        
            return paragraphs;
        };        

        const generateText = async () => {
            setIsLoading(true);
        
            // Create the prompt using the post title and previous content
            const prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${attributes.content}`;
        
            const response = await fetch(andika.api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': andika.api_nonce,
                },
                body: JSON.stringify({
                    prompt: prompt,
                }),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                const words = responseData.generated_text.split(' ');        
                
                for (const word of words) {
                    setCurrentText(currentTextRef.current + ' ' + word);
                    await sleep(100); 
                } 
                            
                // Set the caret position to the end after generating text
                if (isSelected) {
                    const element = document.querySelector('.andika-placeholder');
                    setEndOfContentEditable(element);
                }
            } else {
                const errorData = await response.json();
                console.error(`Error: ${errorData.error}`);
            }
            setIsLoading(false);
        };        

    return (
        <div {...useBlockProps()}>
            <BlockControls>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
                <ToolbarButton
                    icon={isLoading ? <Spinner /> : "lightbulb"}
                    label={__('Generate Text', 'andika')}
                    onClick={generateText}
                    disabled={isLoading}
                />
            </BlockControls>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Color', 'andika')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: attributes.textColor,
                            onChange: (textColor) => setAttributes({ textColor }),
                            label: __('Text color', 'andika'),
                        },
                        {
                            value: attributes.backgroundColor,
                            onChange: (backgroundColor) => setAttributes({ backgroundColor }),
                            label: __('Background color', 'andika'),
                        },
                    ]}
                />
                <PanelBody title={__('Typography', 'andika')} initialOpen={false}>
                    <FontSizePicker
                        value={attributes.fontSize}
                        onChange={(fontSize) => setAttributes({ fontSize })}
                    />
                </PanelBody>
            </InspectorControls>
            <RichText
                tagName="p"
                value={currentText}
                onChange={(content) => {
                    setAttributes({ content });
                    setCurrentText(content);
                }}
                className="andika-placeholder"
                placeholder={__(
                    'Start typing and click the lightbulb icon to generate text...',
                    'andika',
                )}
                isSelected={isSelected}
                style={{
                    textAlign: attributes.alignment,
                    color: attributes.textColor,
                    backgroundColor: attributes.backgroundColor,
                    fontSize: attributes.fontSize,
                }}
                onSplit={(content, end) => {
                    if (end === null) {
                        setAttributes({ content });
                    } else {
                        setAttributes({ content: content + end });
                    }
                }}
            />
        </div>
    );
}