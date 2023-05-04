<?php

class Andika_Block {
    public function enqueue_block_editor_assets() {
        wp_register_script(
			'andika-block-editor',
			ANDIKA_PLUGIN_URL . 'build/index.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data',  'wp-components', 'wp-api-fetch', 'wp-edit-post', 'wp-block-editor' ),
			ANDIKA_VERSION,
			true
		);
	
		wp_register_style(
			'andika-block-editor-style',
			ANDIKA_PLUGIN_URL . 'assets/css/andika-style.css',
			array(),
			ANDIKA_VERSION
		);

        wp_localize_script(
            'andika-block-editor',
            'andika',
            array(
				'api_key' => get_option('andika_openai_api_key'),
				'model' => get_option('andika_model', 'text-davinci-003'),
				'temperature' => (float) get_option('andika_temperature', 0.7),
				'maxTokens' => (int) get_option('andika_max_tokens', 100),
				'topP' => (float) get_option('andika_top_p', 1),
				'frequencyPenalty' => (float) get_option('andika_frequency_penalty', 0),
				'presencePenalty' => (float) get_option('andika_presence_penalty', 0),
				'stream' => true,
            )
        );

		// Enqueue the script and style.
		wp_enqueue_script('andika-block-editor');
		wp_enqueue_style('andika-block-editor-style');
    }
}