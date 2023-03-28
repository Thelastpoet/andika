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
import { ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
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

		const generateText = async () => {
			setIsLoading(true);
		
			let prompt = '';
		
			if (!attributes.content && postTitle) {
				// If there is no content yet and the post has a title, generate text based on the title
				prompt = `Title: ${postTitle}\n\nContinue the article based on the title:`;
			} else {
				// If there is content, use the last two or three sentences to generate the next sentences
				const lastSentences = attributes.content.match(/[^\.!\?]+[\.!\?]+/g).slice(-3).join(' ');
				prompt = `Title: ${postTitle}\n\n${previousContent}\n\n${lastSentences}\n\nContinue the article based on the title and the last sentences:`;
			}
		
			const response = await fetch(andika.api_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': andika.api_nonce,
				},
				body: JSON.stringify({
					prompt: prompt,
					max_tokens: 300,
				}),
			});
		
			const responseData = await response.json();
		
			const newContent = attributes.content + responseData.generated_text;
			setAttributes({ content: newContent });
		
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
                    icon="lightbulb"
                    label={__('Generate Text', 'andika')}
                    onClick={generateText}
                    disabled={isLoading}
                />
            </BlockControls>
			<InspectorControls>
				<PanelColorSettings
					title={__('Color settings', 'andika')}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.textColor,
							onChange: (textColor) => setAttributes({ textColor }),
							label: __('Text color', 'andika'),
						},
					]}
				/>
				<FontSizePicker
					value={attributes.fontSize}
					onChange={(fontSize) => setAttributes({ fontSize })}
				/>
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
                style={{ textAlign: attributes.alignment, color: attributes.textColor, fontSize: attributes.fontSize ? `${attributes.fontSize}px` : undefined, }}
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