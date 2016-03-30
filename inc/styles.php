<?php 

/**
 * Enqueue styles.
 * 
 * @package _s
 */
function _s_styles() {
    wp_enqueue_style('_s-style', get_stylesheet_uri() );
    wp_enqueue_style('_s-app', getThemeStyleURI() . '/app.min.css');
}

// Higher Priority to override all other styles
add_action( 'wp_enqueue_scripts', '_s_styles', 30);