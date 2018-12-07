<?php

/**
 * Plugin Name:       		Shopkeeper Extender
 * Plugin URI:        		https://github.com/getbowtied/shopkeeper-extender
 * Description:       		Extends the functionality of Shopkeeper with Gutenberg elements.
 * Version:           		1.2
 * Author:            		GetBowtied
 * Author URI:        		https://getbowtied.com
 * Requires at least: 		4.9
 * Tested up to: 			4.9.8
 *
 * @package  Shopkeeper Extender
 * @author   GetBowtied
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly

if ( ! function_exists( 'is_plugin_active' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}

add_action( 'init', 'github_sk_plugin_updater' );
if(!function_exists('github_sk_plugin_updater')) {
	function github_sk_plugin_updater() {

		include_once 'updater.php';

		define( 'WP_GITHUB_FORCE_UPDATE', true );

		if ( is_admin() ) {

			$config = array(
				'slug' 				 => plugin_basename(__FILE__),
				'proper_folder_name' => 'shopkeeper-extender',
				'api_url' 			 => 'https://api.github.com/repos/getbowtied/shopkeeper-extender',
				'raw_url' 			 => 'https://raw.github.com/getbowtied/shopkeeper-extender/master',
				'github_url' 		 => 'https://github.com/getbowtied/shopkeeper-extender',
				'zip_url' 			 => 'https://github.com/getbowtied/shopkeeper-extender/zipball/master',
				'sslverify'			 => true,
				'requires'			 => '4.9',
				'tested'			 => '4.9.8',
				'readme'			 => 'README.txt',
				'access_token'		 => '',
			);

			new WP_GitHub_Updater( $config );
		}
	}
}

add_action( 'init', 'gbt_sk_gutenberg_blocks' );
if(!function_exists('gbt_sk_gutenberg_blocks')) {
	function gbt_sk_gutenberg_blocks() {

		$theme = wp_get_theme();
		if ( $theme->template != 'shopkeeper') {
			return;
		}

		if( is_plugin_active( 'gutenberg/gutenberg.php' ) || is_wp_version('>=', '5.0') ) {
			include_once 'includes/gbt-blocks/index.php';
		} else {
			add_action( 'admin_notices', 'theme_warning' );
		}
	}
}

if( !function_exists('theme_warning') ) {
	function theme_warning() {

		?>

		<div class="message error woocommerce-admin-notice woocommerce-st-inactive woocommerce-not-configured">
			<p>Shopkeeper Extender plugin couldn't find the Block Editor (Gutenberg) on this site. It requires WordPress 5+ or Gutenberg installed as a plugin.</p>
		</div>

		<?php
	}
}

if( !function_exists('is_wp_version') ) {
	function is_wp_version( $operator, $version ) {

		global $wp_version;

		return version_compare( $wp_version, $version, $operator );
	}
}
