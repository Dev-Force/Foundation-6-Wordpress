<?php

/**
 * Enqueue scripts.
 * 
 * @package _s
 */
function _s_scripts() {
    wp_enqueue_script( '_s-navigation', getThemeScriptURI() . '/navigation.js', array(), '20151215', true );

    wp_enqueue_script( '_s-skip-link-focus-fix', getThemeScriptURI() . '/skip-link-focus-fix.js', array(), '20151215', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', '_s_scripts' );