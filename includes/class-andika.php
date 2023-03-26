<?php

class Andika {
    public function __construct() {
        $this->load_dependencies();
        $this->define_hooks();
    }

    private function load_dependencies() {
        require_once ANDIKA_PLUGIN_DIR . 'includes/class-andika-settings.php';
        require_once ANDIKA_PLUGIN_DIR . 'includes/class-andika-block.php';
        require_once ANDIKA_PLUGIN_DIR . 'includes/class-openai-api.php';
    }

    private function define_hooks() {
        // Admin settings page.
        $settings = new Andika_Settings();
        add_action('admin_menu', array($settings, 'register_settings_page'));
        add_action('admin_init', array($settings, 'register_settings'));
        add_action('admin_enqueue_scripts', array($settings, 'enqueue_admin_assets'));

        // Block editor custom block.
        $block = new Andika_Block();
        add_action('enqueue_block_editor_assets', array($block, 'enqueue_block_editor_assets'));

        // AJAX handler for text generation.
        add_action('wp_ajax_andika_generate_text', array($block, 'andika_generate_text_ajax_handler'));
    }

    public function run() {
        // Any additional setup or actions that need to run when the plugin is initialized.
    }
}
