import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { withColors, withFontSizes } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	title: __(metadata.title),
	icon: metadata.icon,
	category: metadata.category,
	description: __(metadata.description),
	supports: {
		html: false,
	},
	attributes: metadata.attributes,
	edit: compose(
		withColors('backgroundColor', { textColor: 'color' }),
		withFontSizes('fontSize'),
	)((props) => <Edit {...props} apiSettings={window.andikaApiSettings} />),
	save: Save,
});
