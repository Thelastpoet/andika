<?php

require_once ANDIKA_PLUGIN_DIR . 'inc/class-andika-api.php';

class Andika_REST extends WP_REST_Controller {
    public function __construct() {
        $this->namespace = 'andika/v1';
        $this->rest_base = 'andika-ai';
    }

    /**
     * Register the custom endpoint with WordPress
     */
    public function register_routes() {
        register_rest_route($this->namespace, '/' . $this->rest_base, array(
            'methods' => 'GET',
            'callback' => array($this, 'andika_text_request'),
            'permission_callback' => array($this, 'andika_permissions_check'),
            'args' => array(
                'prompt' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                '_wpnonce' => array(
                    'required' => true,
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    /**
     * Callback function to handle the request to the custom endpoint
     *
     * @param WP_REST_Request $request The REST API request object
     *
     * @return WP_REST_Response The REST API response object
     */
    public function andika_text_request(WP_REST_Request $request) {
        $prompt = $request->get_param('prompt');
        $stream = $request->get_param('stream');
        $api_key = get_option('andika_openai_api_key');
    
        if (empty($api_key)) {
            return new WP_REST_Response(array('error' => 'Andika OpenAI API key is missing. Please configure it in the plugin settings.'), 500);
        }
    
        // Create an instance of the Andika_OpenAI_API class
        $openai_api = new Andika_OpenAI_API($api_key);
    
        // Create a callback function to handle streaming responses
        try {            
            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Connection: keep-alive');

            if (ob_get_length()) {
                ob_end_clean();
            }            
    
            // Generate text using the OpenAI API
            $openai_api->generate_text($prompt, array('callback' => function($data) use ($stream) {
                if (isset($data['char'])) {
                    echo "data: " . json_encode(['char' => $data['char']]) . "\n\n";
                    flush();
                    usleep(50000); // Adjust the delay here (50000 microseconds = 50 milliseconds)
                }
            }, 'stream' => $stream));         
    
            // Send a final message to close the connection
            echo "event: close\n";
            flush();
            exit();
        } catch (Exception $e) {
            // Log the error
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Error: ' . $e->getMessage());
            }
    
            return new WP_REST_Response(array('error' => $e->getMessage()), 500);
        }
    }   
    
    /**
     * Permission callback function to check if the current user can access the custom endpoint
     *
     * @param WP_REST_Request $request The REST API request object
     *
     * @return boolean Whether the current user can access the custom endpoint
     */
    public function andika_permissions_check(WP_REST_Request $request) {
        // Get the current user
        $current_user = wp_get_current_user();
        
        // Check if the current user has the appropriate permissions
        if (current_user_can('edit_others_posts')) {
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * Get the namespace for the custom endpoint
     *
     * @return string The namespace for the custom endpoint
     */
    public function get_namespace() {
        return $this->namespace;
    }

    /**
     * Get the route for the custom endpoint
     *
     * @return string The route for the custom endpoint
     */
    public function get_rest_route() {
        return $this->rest_base;
    }
}