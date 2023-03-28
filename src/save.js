import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { content, alignment, textColor, fontSize } = attributes;

	return (
		<RichText.Content
			tagName="p"
			value={content}
			style={{
				textAlign: alignment,
				color: textColor,
				fontSize: fontSize ? fontSize + 'px' : undefined,
			}}
			{...useBlockProps.save()}
		/>
	);
}