<?php
/**
 * Plugin Name: Andika - Your AI Witing Companion
 * Plugin URI: https:nabaleka.com
 * Description: Andika brings the power of AI to the WordPress block editor for seamless writing.
 * Version: 1.4.9
 * Author: Ammanulah Emmanuel
 * Author URI: https://nabaleka.com
 * Requires at least: 5.9
 * Requires PHP: 5.6
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: andika
 *
 * @package Andika
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ANDIKA_VERSION', '1.4.9' );
define( 'ANDIKA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ANDIKA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load andika textdomain.
function andika_load_textdomain() {
    load_plugin_textdomain(
        'andika',
        false,
        ANDIKA_PLUGIN_DIR . 'languages'
    );
}
add_action('plugins_loaded', 'andika_load_textdomain');

// Andika main class.
require_once ANDIKA_PLUGIN_DIR . 'inc/class-andika.php';

// Initialize andika.
function andika_initialize() {
	$andika = new Andika();
	$andika->run();
}
add_action( 'plugins_loaded', 'andika_initialize' );