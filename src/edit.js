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
import { ToolbarButton, PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import generateText from './utils/jeneration';

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

		const handleGenerateText = () => generateText(attributes, postTitle, previousContent, setAttributes, setIsLoading);
		
    return (
        <div {...useBlockProps()}>
            <BlockControls>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
                <ToolbarButton
                    icon="lightbulb"
                    label={__('Generate Text', 'andika')}
                    onClick={handleGenerateText}
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
                value={attributes.content}
                onChange={(content) => setAttributes({ content })}
                placeholder={__(
                    'Start typing and click the lightbulb icon to generate text...',
                    'andika',
                )}
                isSelected={isSelected}
                style={{
                    textAlign: attributes.alignment,
                    color: attributes.textColor,
                    backgroundColor: attributes.backgroundColor,
                    fontSize: attributes.fontSize ? `${attributes.fontSize}px` : undefined,
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