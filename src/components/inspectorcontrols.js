import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    PanelColorSettings,
    FontSizePicker,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

const AndikaInspectorControls = ({ attributes, setAttributes }) => {
    const { fontSize, lineHeight, textColor, backgroundColor, andikaTextLength } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Text Options', 'andika')}>
                <SelectControl
                    label={__('Text Length', 'andika')}
                    value={andikaTextLength}
                    options={[
                        { label: __('Short', 'andika'), value: 'short' },
                        { label: __('Medium', 'andika'), value: 'medium' },
                        { label: __('Long', 'andika'), value: 'long' },
                    ]}
                    onChange={(value) => setAttributes({ andikaTextLength: value })}
                />
            </PanelBody>
            <PanelBody title={__('Typography', 'andika')}>
                <FontSizePicker
                    value={fontSize}
                    onChange={(value) => setAttributes({ fontSize: value })}
                />
                <RangeControl
                    label={__('Line Height', 'andika')}
                    value={lineHeight || 1}
                    onChange={(value) => setAttributes({ lineHeight: value })}
                    min={1}
                    max={3}
                    step={0.1}
                />
            </PanelBody>
            <PanelColorSettings
                title={__('Color Settings', 'andika')}
                colorSettings={[
                    {
                        value: textColor,
                        onChange: (colorValue) => setAttributes({ textColor: colorValue }),
                        label: __('Text Color', 'andika'),
                    },
                    {
                        value: backgroundColor,
                        onChange: (colorValue) => setAttributes({ backgroundColor: colorValue }),
                        label: __('Background Color', 'andika'),
                    },
                ]}
            />
        </InspectorControls>
    );
};

export default AndikaInspectorControls;
