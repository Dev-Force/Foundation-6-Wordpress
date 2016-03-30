<?php 
/**
 * Adds WooCommerce support to the theme
 * 
 * @package _s
 */

add_theme_support( 'woocommerce' );

function _s_woocommerce_custom_styles() {
    wp_enqueue_style('_s-woocommerce', getThemeStyleURI() . '/woocommerce.min.css');
}

add_action( 'wp_enqueue_scripts', '_s_woocommerce_custom_styles' );
