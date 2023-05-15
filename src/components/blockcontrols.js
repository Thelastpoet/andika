import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function AndikaBlockControls( props ) {
    const {
        attributes,
        setAttributes,
        isLoading,
        onGenerateClick,
    } = props;

    return (
        <BlockControls>
            <ToolbarGroup>
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
                <ToolbarButton
                    icon={isLoading ? <Spinner /> : 'lightbulb'}
                    label={__('Generate Text', 'andika')}
                    onClick={onGenerateClick}
                    isPressed={isLoading}
                    disabled={isLoading}
                />
            </ToolbarGroup>
        
        </BlockControls>
    );
};

export default AndikaBlockControls;