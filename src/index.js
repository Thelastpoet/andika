import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import transforms from './transforms';

registerBlockType(metadata.name, {
	title: __(metadata.title),
	icon: metadata.icon,
	category: metadata.category,
	description: __(metadata.description),
	transforms,
	supports: {
		html: true,
		className: false,
	},
	attributes: metadata.attributes,	
	edit: Edit,
	save: Save,
	
});
