import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { content, alignment, textColor, fontSize, direction } = attributes;

    return (
        <RichText.Content
            tagName="p"
            value={content}
            style={{
                textAlign: alignment,
                color: textColor,
                fontSize: fontSize,
                direction: direction,
            }}
            {...useBlockProps.save()}
        />
    );
}