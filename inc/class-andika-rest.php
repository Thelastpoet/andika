<?php

require_once ANDIKA_PLUGIN_DIR . 'inc/class-openai-api.php';

class Andika_REST {
    public function __construct() {
        $this->namespace = 'andika/v1';
        $this->rest_base = 'andika-ai';
    }

    public function register_routes() {
        register_rest_route($this->namespace, '/' . $this->rest_base, array(
            'methods' => 'POST',
            'callback' => array($this, 'andika_text_request'),
            'permission_callback' => array($this, 'permissions_check'),
            'args' => array(
                'prompt' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'stream' => array(
                    'default' => false,
                    'type' => 'boolean',
                ),
            ),
        ));
    }  

    public function andika_text_request(WP_REST_Request $request) {
        if (!current_user_can('edit_posts')) {
            return new WP_Error('rest_forbidden', 'Access denied.', array('status' => 403));
        }
    
        $api_key = get_option('andika_openai_api_key');
        $prompt = $request->get_param('prompt');
        $stream = $request->get_param('stream');
    
        $openai_api = new Andika_OpenAI_API($api_key);
    
        try {
            $generated_text = $openai_api->generate_text($prompt, $stream, array());
            return new WP_REST_Response(array('generated_text' => $generated_text));
        } catch (Exception $e) {
            return new WP_REST_Response(array('error' => $e->getMessage()), 500);
        }
    }
    
    public function permissions_check(WP_REST_Request $request) {
        return true;
    }
    
}