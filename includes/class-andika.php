<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Andika main class.
 */
class Andika {
    public function __construct() {
        $this->andika_dependencies();
        $this->andika_hooks();
    }

    private function andika_dependencies() {
        require_once ANDIKA_PLUGIN_DIR . 'includes/admin/andika-settings.php';
        require_once ANDIKA_PLUGIN_DIR . 'includes/class-andika-block.php';
        require_once ANDIKA_PLUGIN_DIR . 'includes/class-openai-api.php';
    }

    /**
	 * Load required dependencies.
	 */
    private function andika_hooks() {
        // Admin settings page.
        $settings = new Andika_Settings();
        add_action('admin_menu', array($settings, 'register_settings_page'));
        add_action('admin_init', array($settings, 'register_settings'));

        
        add_action('admin_enqueue_scripts', array($settings, 'enqueue_admin_assets'));

        // Block editor custom block.
        $block = new Andika_Block();
        add_action('enqueue_block_editor_assets', array($block, 'enqueue_block_editor_assets'));

        // AJAX handler for text generation.
        add_action('wp_ajax_andika_ai', array($block, 'andika_ajax_handler'));        
    }

    public function run() {
        // Let's do this later when we come back to this file
    }
}
