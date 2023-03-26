const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, BlockControls } = wp.blockEditor;
const { ToolbarButton } = wp.components;
const { useState, createElement } = wp.element;
const { apiFetch } = wp;

registerBlockType('andika/interactive-block', {
    title: __('Andika Interactive Block', 'andika'),
    icon: 'lightbulb',
    category: 'text',
    supports: {
        html: false,
    },
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
    },
    edit: ({ attributes, setAttributes, isSelected }) => {
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

        return createElement(
            'div',
            null,
            createElement(BlockControls, null,
                createElement(ToolbarButton, {
                    icon: 'lightbulb',
                    label: __('Generate Text', 'andika'),
                    onClick: generateText,
                    disabled: isLoading,
                })
            ),
            createElement(RichText, {
                tagName: 'p',
                value: attributes.content,
                onChange: (content) => setAttributes({ content }),
                placeholder: __('Start typing and click the lightbulb icon to generate text...', 'andika'),
                isSelected,
            })
        );
    },
    save: ({ attributes }) => {
        return createElement(RichText.Content, { tagName: 'p', value: attributes.content });
    },
});