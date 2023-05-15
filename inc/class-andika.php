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
        require_once ANDIKA_PLUGIN_DIR . 'inc/admin/andika-settings.php';
        require_once ANDIKA_PLUGIN_DIR . 'inc/class-andika-block.php';
    }

    /**
	 * Load required dependencies.
	 */
    private function andika_hooks() {
        $settings = new Andika_Settings();
        add_action('admin_menu', array($settings, 'register_settings_page'));
        add_action('admin_init', array($settings, 'register_fields'));
        
        add_action('admin_enqueue_scripts', array($settings, 'enqueue_admin_assets'));

        // Block editor custom block.
        $block = new Andika_Block();
        add_action('enqueue_block_editor_assets', array($block, 'enqueue_block_editor_assets'));
    }

    public function run() {
        // Let's do this later when we come back to this file (*everything works though)
    }
}