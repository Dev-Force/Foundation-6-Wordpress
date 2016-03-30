<?php
/**
 * _s functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package _s
 */

// Requires all files from the specified directory. Default directory is functions
function requireAllFiles($directory = 'inc') {
    $directory = __DIR__ . '/' . $directory;
    $rdi    = new RecursiveDirectoryIterator($directory);
    $rii    = new RecursiveIteratorIterator($rdi);

    foreach ($rii as $file) {
        if (preg_match('%\.php$%', $file->getFilename())) {
            require $file->getPathname();
        }
    }
}

requireAllFiles();
