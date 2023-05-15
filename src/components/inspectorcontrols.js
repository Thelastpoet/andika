import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    PanelColorSettings,
    FontSizePicker,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

const AndikaInspectorControls = ({
    attributes,
    setAttributes,
}) => {
    const { lineHeight } = attributes;     

    const onChangeLineHeight = (value) => {
        setAttributes({ lineHeight: value });
    };

    return (
        <InspectorControls>
            <PanelBody title={__('Andika Controls', 'andika')}>
                <SelectControl
                    label={__('Text Length', 'andika')}
                    value={attributes.andikaTextLength}
                    options={[
                        { label: 'Short', value: 'short' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Long', value: 'long' },
                    ]}
                    onChange={(value) => setAttributes({ andikaTextLength: value })}
                />
            </PanelBody>
            <PanelBody title={__('Typography', 'andika')}>           
                <FontSizePicker
                    value={attributes.fontSize}
                    onChange={(value) => setAttributes({ fontSize: value })}
                    __nextHasNoMarginBottom={true}
                />
                <RangeControl
                    label={__('Line height', 'andika')}
                    value={lineHeight}
                    onChange={onChangeLineHeight}
                    min={1}
                    max={3}
                    step={0.1}
                />
            </PanelBody>
            <PanelColorSettings
                title={__('Color settings', 'andika')}
                initialOpen={false}
                colorSettings={[
                    {
                        value: attributes.textColor,
                        onChange: (value) => setAttributes({ textColor: value }),
                        label: __('Text color', 'andika'),
                    },
                    {
                        value: attributes.backgroundColor,
                        onChange: (value) => setAttributes({ backgroundColor: value }),
                        label: __('Background color', 'andika'),
                    }
                ]}
            >
                <ContrastChecker
                    { ...{
                        textColor: attributes.textColor,
                        backgroundColor: attributes.backgroundColor,
                        fallbackTextColor,
                        fallbackBackgroundColor,
                    }}
                    fontSize={attributes.fontSize}
                />
            </PanelColorSettings>

        </InspectorControls>
    );
};

export default AndikaInspectorControls;