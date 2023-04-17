import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    PanelColorSettings,
    FontSizePicker,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

const AndikaInspectorControls = ({
    attributes,
    setAttributes,
}) => {
    const { lineHeight } = attributes;

    const onChangeLineHeight = (value) => {
        setAttributes({ lineHeight: value });
    };

    return (
        <InspectorControls group="typography">
            <PanelBody title={__('Typography', 'andika')}>
                <FontSizePicker
                    value={attributes.fontSize}
                    onChange={(value) => setAttributes({ fontSize: value })}
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
            />

        </InspectorControls>
    );
};

export default AndikaInspectorControls;