<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Andika_Block
 *
 * This class handles the enqueueing of scripts and styles for the Andika block editor.
 */
class Andika_Block {
	
	/**
	 * Enqueue block editor assets.
	 */
	public function enqueue_block_editor_assets() {

		// Register the JavaScript for the block editor.
		wp_register_script(
			'andika-block-editor', 
			ANDIKA_PLUGIN_URL . 'build/index.js', 
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data',  'wp-components', 'wp-api-fetch', 'wp-edit-post', 'wp-block-editor' ),
			ANDIKA_VERSION,
			true 
		);

		// Register the CSS for the block editor.
		wp_register_style(
			'andika-block-editor-style',
			ANDIKA_PLUGIN_URL . 'assets/css/andika-style.css', 
			array(), 
			ANDIKA_VERSION 
		);

		// Make some OpenAI values available to JavaScript.
		wp_localize_script(
			'andika-block-editor', 
			'andika', 
			array(
				'api_key' => sanitize_text_field( get_option('andika_openai_api_key') ),
				'model' => sanitize_text_field( get_option('andika_model', 'text-davinci-003') ),
				'temperature' => (float) sanitize_text_field( get_option('andika_temperature', 0.7) ),
				'topP' => (float) sanitize_text_field( get_option('andika_top_p', 1) ),
				'frequencyPenalty' => (float) sanitize_text_field( get_option('andika_frequency_penalty', 0) ),
				'presencePenalty' => (float) sanitize_text_field( get_option('andika_presence_penalty', 0) ),
				'stream' => true,
			)
		);

		// Enqueue the scripts and styles.
		wp_enqueue_script('andika-block-editor');
		wp_enqueue_style('andika-block-editor-style');
	}
}