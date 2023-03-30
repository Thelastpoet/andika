<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Andika_OpenAI_API {
    private $api_key;
    private $model;
    private $temperature;
    private $max_tokens;
    private $top_p;
    private $frequency_penalty;
    private $presence_penalty;

    public function __construct($api_key) {
        $this->api_key = $api_key;
        $this->model = get_option('andika_model', 'text-davinci-003');
        $this->temperature = (float) get_option('andika_temperature', 0.7);
        $this->max_tokens = (int) get_option('andika_max_tokens', 100);
        $this->top_p = (float) get_option('andika_top_p', 1);
        $this->frequency_penalty = (float) get_option('andika_frequency_penalty', 0);
        $this->presence_penalty = (float) get_option('andika_presence_penalty', 0);
    }

    private function get_api_url() {
        if ($this->model === 'gpt-3.5-turbo') {
            return 'https://api.openai.com/v1/chat/completions';
        } else {
            return 'https://api.openai.com/v1/completions';
        }
    }

    public function generate_text($prompt, $options = array()) {
        $url = $this->get_api_url();

        if ($this->model === 'gpt-3.5-turbo') {
            $options['messages'] = array(
                array("role" => "user", "content" => $prompt)
            );
        } else {
            $options['prompt'] = $prompt;
        }

        $default_options = array(
            'model' => $this->model,
            'temperature' => $this->temperature,
            'max_tokens' => $this->max_tokens,
            'top_p' => $this->top_p,
            'frequency_penalty' => $this->frequency_penalty,
            'presence_penalty' => $this->presence_penalty,
        );

        $options = wp_parse_args($options, $default_options);

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
        } elseif (isset($body['choices'][0]['message']['content'])) {
            return $body['choices'][0]['message']['content'];
        }

        return __('Error generating text. Did you set a valid OpenAI API Key?', 'andika');
    }
}