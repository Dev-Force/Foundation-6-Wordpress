<?php 

// Decodes Configuration file (config.json)
function getConfig() {
    global $configJSON;

    if(empty($configJSON)) {
        $configJSON = file_get_contents(get_template_directory() . "/config.json"); 
        $configJSON = utf8_encode($configJSON);
        $configJSON = json_decode($configJSON, true);
    }

    return $configJSON;
}

// Gets stylesheets URI
function getThemeStyleURI() {
    return get_template_directory_uri() . '/' . getConfig()['paths']['output'] . "/css";
}
// Gets stylesheets Directory
function getThemeStyleDirectory() {
    return get_template_directory() . '/' . getConfig()['paths']['output'] . "/css";
}

// Gets scripts URI
function getThemeScriptURI() {
    return get_template_directory_uri() . '/' . getConfig()['paths']['output'] . "/js";
}

// Gets scripts Directory
function getThemeScriptDirectory() {
    return get_template_directory() . '/' . getConfig()['paths']['output'] . "/js";
}
