import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { RichText, BlockControls, AlignmentToolbar, InspectorControls, PanelColorSettings, FontSizePicker, withColors, ContrastChecker } from '@wordpress/block-editor';
import { Fragment, useState, useEffect, useRef } from '@wordpress/element';

import { AndikaTextGenerator } from './utils/andika-ai';
import AndikaBlockControls from './components/blockcontrols';
import AndikaInspectorControls from './components/inspectorcontrols';

const AndikaEdit = withColors('backgroundColor', { textColor: 'color' })(function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
  backgroundColor,
  textColor,
  setBackgroundColor,
  setTextColor
}) {
  const { content, fontSize, alignment, andikaTextLength } = attributes;

  const [isLoading, setIsLoading] = useState(false);
  const blockRef = useRef();

  // Update content attribute when changed
  const onChangeContent = (newContent) => {
    setAttributes({ content: newContent });
  };

  // Update alignment
  const onChangeAlignment = (newAlignment) => {
    setAttributes({ alignment: newAlignment });
  };

  // Update font size
  const onChangeFontSize = (newFontSize) => {
    setAttributes({ fontSize: newFontSize });
  };

  // AI text generation handlers
  const onGenerateClick = () => {
    setIsLoading(true);
    // Trigger text generation with the Andika API
    // This should be a function in your AndikaTextGenerator component
    // that starts the AI text generation process.
  };

  const onTextGenerationComplete = (newContent) => {
    setIsLoading(false);
    onChangeContent(newContent);
  };

  return (
    <Fragment>
      <BlockControls>
        <AlignmentToolbar
          value={alignment}
          onChange={onChangeAlignment}
        />
      </BlockControls>
      <InspectorControls>
        <PanelColorSettings
          title={__('Color settings', 'andika')}
          initialOpen={true}
          colorSettings={[
            {
              value: backgroundColor.color,
              onChange: setBackgroundColor,
              label: __('Background color', 'andika'),
            },
            {
              value: textColor.color,
              onChange: setTextColor,
              label: __('Text color', 'andika'),
            },
          ]}
        >
          <ContrastChecker
            backgroundColor={backgroundColor.color}
            textColor={textColor.color}
          />
        </PanelColorSettings>
        <FontSizePicker
          value={fontSize}
          onChange={onChangeFontSize}
        />
        <AndikaInspectorControls
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </InspectorControls>
      <AndikaBlockControls
        attributes={attributes}
        setAttributes={setAttributes}
        isLoading={isLoading}
        onGenerateClick={onGenerateClick}
      />
      <AndikaTextGenerator
        clientId={clientId}
        andikaTextLength={andikaTextLength}
        onTextGenerationComplete={onTextGenerationComplete}
      />
      <RichText
        ref={blockRef}
        tagName="p"
        value={content}
        onChange={onChangeContent}
        placeholder={__(
          'Type and click the lightbulb icon to generate text...',
          'andika',
        )}
        isSelected={isSelected}
        style={{ textAlign: alignment, fontSize, color: textColor.color, backgroundColor: backgroundColor.color }}
      />
    </Fragment>
  );
});

export default AndikaEdit;
