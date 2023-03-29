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

import generateText from './utils/jeneration';

export default function Edit({ attributes, setAttributes, isSelected }) {
    const [isLoading] = useState(false);

    const handleGenerateText = async () => {
        const newContent = await generateText(attributes, attributes.content, setAttributes);
        setAttributes({ content: newContent });
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