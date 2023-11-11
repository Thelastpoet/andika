import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    // Construct style object conditionally
    const blockStyles = {
        fontSize: attributes.fontSize,
        color: attributes.textColor,
        backgroundColor: attributes.backgroundColor,
    };

    if (attributes.alignment) {
        blockStyles.textAlign = attributes.alignment;
    }

    return (
        <RichText.Content
            tagName="p"
            value={attributes.content}
            style={blockStyles}
        />
    );
}
