import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
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
	edit: Edit,
	save: Save,
});
