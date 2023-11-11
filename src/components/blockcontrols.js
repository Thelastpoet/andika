import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function AndikaBlockControls({ attributes, setAttributes, isLoading, onGenerateClick }) {
    // Enhance user feedback and interaction
    const generateButtonLabel = isLoading ? __('Generating...', 'andika') : __('Generate Text', 'andika');

    return (
        <BlockControls>
            <ToolbarGroup>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment })}
                />
                <ToolbarButton
                    icon={isLoading ? <Spinner /> : 'lightbulb'}
                    label={generateButtonLabel}
                    onClick={onGenerateClick}
                    isPressed={isLoading}
                    disabled={isLoading}
                />
            </ToolbarGroup>
        </BlockControls>
    );
};

export default AndikaBlockControls;
