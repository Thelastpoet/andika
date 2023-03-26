<?php
/*
Plugin Name: Andika
Plugin URI: https:nabaleka.com
Description: Andika integrates OpenAI with the WordPress block editor for real-time text generation.
Version: 1.0.0
Author: Ammanulah Emmanuel
Author URI: https://nabaleka.com
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: andika
Domain Path: /languages
*/

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die;
}

// Define the plugin's constants.
define('ANDIKA_VERSION', '1.0.1');
define('ANDIKA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ANDIKA_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load the plugin's text domain for translations.
function andika_load_textdomain() {
    load_plugin_textdomain('andika', false, basename(dirname(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'andika_load_textdomain');

function create_block_andika_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_andika_block_init' );

// Include the main plugin class file.
require_once ANDIKA_PLUGIN_DIR . 'includes/class-andika.php';

// Initialize the plugin and set up the necessary hooks.
function andika_initialize() {
    $andika = new Andika();
    $andika->run();
}
andika_initialize();