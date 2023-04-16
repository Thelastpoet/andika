import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, alignment, backgroundColor, textColor, fontSize, lineHeight } = attributes;

    const fontSizeInRem = fontSize ? fontSize / 16 + 'rem' : undefined;

    return (
        <RichText.Content
            tagName="p"
            value={content}
            style={{
                textAlign: alignment,
                fontSize: fontSizeInRem,
                color: textColor,
                backgroundColor: backgroundColor,
                lineHeight: lineHeight ? lineHeight : undefined,
            }}
        />
    );
}
