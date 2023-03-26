import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes, isSelected }) {
	const [isLoading, setIsLoading] = useState(false);

	const generateText = async () => {
		setIsLoading(true);

		const response = await fetch(andika.api_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': andika.api_nonce,
			},
			body: JSON.stringify({
				prompt: attributes.content,
			}),
		});

		const responseData = await response.json();

		setAttributes({ content: attributes.content + responseData.generated_text });
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
			<RichText
				tagName="p"
				value={attributes.content}
				onChange={(content) => setAttributes({ content })}
				placeholder={__(
					'Start typing and click the lightbulb icon to generate text...',
					'andika',
				)}
				isSelected={isSelected}
				style={{ textAlign: attributes.alignment }}
			/>
		</div>
	);
}
