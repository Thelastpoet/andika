<?php

class Andika_OpenAI_API {
    private $api_key;

    public function __construct($api_key) {
        $this->api_key = $api_key;
    }

    public function generate_text($prompt, $options = array()) {
		$url = 'https://api.openai.com/v1/completions';
	
		$default_options = array(
			'model' => get_option('andika_model', 'text-davinci-003'),
			'n' => (int) get_option('andika_n', 1),
			'stop' => get_option('andika_stop', null),
			'temperature' => (float) get_option('andika_temperature', 0.5),
		);
	
		$options = wp_parse_args($options, $default_options);
		$options['prompt'] = $prompt;
	
		$args = array(
			'headers' => array(
				'Content-Type' => 'application/json',
				'Authorization' => 'Bearer ' . $this->api_key
			),
			'body' => json_encode($options),
			'method' => 'POST',
			'timeout' => 15,
		);
	
		$response = wp_remote_request($url, $args);
	
		if (is_wp_error($response)) {
			return $response->get_error_message();
		}
	
		$body = json_decode(wp_remote_retrieve_body($response), true);
	
		if (isset($body['choices'][0]['text'])) {
			return $body['choices'][0]['text'];
		}
	
		return __('Error generating text. Did you set a valid OpenAI API Key?', 'andika');
	}	
}