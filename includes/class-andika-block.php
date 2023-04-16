<?php

class Andika_Block {
    public function enqueue_block_editor_assets() {
        wp_register_script(
			'andika-block-editor',
			ANDIKA_PLUGIN_URL . 'build/index.js',
			array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-api-fetch'),
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
                'api_nonce' => wp_create_nonce('wp_rest'),
                'api_url' => admin_url('admin-ajax.php?action=andika_generate_text'),
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

    public function andika_ajax_handler() {
		if (!is_user_logged_in() || !current_user_can('edit_posts')) {
			http_response_code(403);
			echo json_encode(['error' => 'Forbidden']);
			exit;
		}
	
		// Get the request data
		$data = json_decode(file_get_contents('php://input'), true);
	
		// Perform your text generation logic here
		$api_key = get_option('andika_openai_api_key');
		$prompt = $data['prompt'];
	
		$data['stream'] = filter_var($data['stream'], FILTER_VALIDATE_BOOLEAN);
		
		$openai_api = new Andika_OpenAI_API($api_key);
		$generated_text = $openai_api->generate_text($prompt, $stream, array());
		
		// Clear any output buffer before sending the JSON response
		ob_clean();
	
		// Return the generated text as JSON
		http_response_code(200);
		header('Content-Type: application/json');
		echo json_encode(['generated_text' => $generated_text]);
	
		wp_die();
	}	
}