<?php
/**
 * GetBowtied Social Media Profiles
 *
 * @package   getbowtied
 * @author    GetBowtied
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
add_action( 'enqueue_block_editor_assets', 'getbowtied_socials_editor_assets' );
function getbowtied_socials_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'getbowtied-socials',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'jquery' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	// Styles.
	wp_enqueue_style(
		'getbowtied-socials-css',
		plugins_url( 'css/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'css/editor.css' )
	);
}

register_block_type( 'getbowtied/socials', array(
	'attributes'     			=> array(
		'items_align'			=> array(
			'type'				=> 'string',
			'default'			=> 'left',
		),
	),

	'render_callback' => 'getbowtied_render_socials',
) );

/**
 * Renders the `getbowtied/socials` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns social media profiles.
 */
function getbowtied_render_socials($attributes) {

	global $shopkeeper_theme_options;

	extract(shortcode_atts(
		array(
			"items_align" => 'left'
		), $attributes));
    ob_start();

    $socials = array(
    	array( 
    		'link' => 'facebook_link',
    		'icon' => 'spk-icon-facebook-f',
    		'name' => 'Facebook'
    	),
    	array( 
    		'link' => 'pinterest_link',
    		'icon' => 'spk-icon-pinterest',
    		'name' => 'Pinterest'
    	),
    	array( 
    		'link' => 'linkedin_link',
    		'icon' => 'spk-icon-linkedin',
    		'name' => 'Linkedin'
    	),
       	array( 
    		'link' => 'twitter_link',
    		'icon' => 'spk-icon-twitter',
    		'name' => 'Twitter'
    	),
    	array( 
    		'link' => 'googleplus_link',
    		'icon' => 'spk-icon-google-plus',
    		'name' => 'Google+'
    	),
    	array( 
    		'link' => 'rss_link',
    		'icon' => 'spk-icon-rss',
    		'name' => 'RSS'
    	),
    	array( 
    		'link' => 'tumblr_link',
    		'icon' => 'spk-icon-tumblr',
    		'name' => 'Tumblr'
    	),
    	array( 
    		'link' => 'instagram_link',
    		'icon' => 'spk-icon-instagram',
    		'name' => 'Instagram'
    	),
    	array( 
    		'link' => 'youtube_link',
    		'icon' => 'spk-icon-youtube',
    		'name' => 'Youtube'
    	),
    	array( 
    		'link' => 'vimeo_link',
    		'icon' => 'spk-icon-vimeo',
    		'name' => 'Vimeo'
    	),
    	array( 
    		'link' => 'behance_link',
    		'icon' => 'spk-icon-behance',
    		'name' => 'Behance'
    	),
    	array( 
    		'link' => 'dribbble_link',
    		'icon' => 'spk-icon-dribbble',
    		'name' => 'Dribbble'
    	),
    	array( 
    		'link' => 'flickr_link',
    		'icon' => 'spk-icon-flickr',
    		'name' => 'Flickr'
    	),
    	array( 
    		'link' => 'git_link',
    		'icon' => 'spk-icon-github',
    		'name' => 'Git'
    	),
    	array( 
    		'link' => 'skype_link',
    		'icon' => 'spk-icon-skype',
    		'name' => 'Skype'
    	),
    	array( 
    		'link' => 'weibo_link',
    		'icon' => 'spk-icon-sina-weibo',
    		'name' => 'Weibo'
    	),
    	array( 
    		'link' => 'foursquare_link',
    		'icon' => 'spk-icon-foursquare',
    		'name' => 'Foursquare'
    	),
    	array( 
    		'link' => 'soundcloud_link',
    		'icon' => 'spk-icon-soundcloud',
    		'name' => 'Soundcloud'
    	),
    	array( 
    		'link' => 'vk_link',
    		'icon' => 'spk-icon-vk',
    		'name' => 'VK'
    	),
    	array( 
    		'link' => 'houzz_link',
    		'icon' => 'spk-icon-houzz',
    		'name' => 'Houzz'
    	),
    	array( 
    		'link' => 'naver_line_link',
    		'icon' => 'spk-icon spk-icon-naver-line-logo',
    		'name' => 'Naver Line'
    	),
    	array( 
    		'link' => 'tripadvisor_link',
    		'icon' => 'spk-icon-tripadvisor',
    		'name' => 'TripAdvisor'
    	),
    	array( 
    		'link' => 'wechat_link',
    		'icon' => 'spk-icon-wechat',
    		'name' => 'WeChat'
    	),
    );

    $output = '<div class="site-social-icons-shortcode">';
    $output .= '<ul class="' . esc_html($items_align) . '">';

    foreach($socials as $social) {

    	if ( (isset($shopkeeper_theme_options[$social['link']])) && (trim($shopkeeper_theme_options[$social['link']]) != "" ) ) {
    		$output .= '<li>';
    		$output .= '<a class="social_media" target="_blank" href="' . esc_url($shopkeeper_theme_options[$social['link']]) . '">';
    		$output .= '<span class="' . $social['icon'] . '"></span>';
    		$output .= '</a></li>';
    	}
    }

    $output .= '</ul>';
    $output .= '</div>';

	ob_end_clean();

	return $output;
}