<?php
/**
 * Plugin Name: SRO Registry
 * Plugin URI: http://github.com/Dispetcher/sro-registry
 * Description: Вывод информации о членах СРО
 * Version: 1.0
 * Author: Dmitry Skoblikov
 * Author URI: http://github.com/Dispetcher
 */

/*  Copyright 2018 Dmitry Skoblikov (email: dmitryskoblikov@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
require_once( dirname( __FILE__ ) . '/options.php' );

try {
    $plugin = new RegistrySRO_Plugin();
    $plugin->init();
} catch (Exception $e) {
    echo $e->getMessage();
}

class RegistrySRO_Plugin{

	public function init(){
		add_shortcode('registrySroMain', array($this, 'registryMain'));
		add_shortcode('registrySroPrint', array($this, 'registryPrint'));
	}

	public function registryMain(){
		require_once(plugins_url('sro-registry/php/main.php'));
		wp_enqueue_script('polyfillsScript', plugins_url('sro-registry/js/polyfills.ang4.js') );
		wp_enqueue_script('mainScript', plugins_url('sro-registry/js/main/main.ang4.js') );
		wp_enqueue_script('runtimeScript', plugins_url('sro-registry/js/runtime.ang4.js') );
	}

	public function registryPrint(){
		require_once(plugins_url('sro-registry/php/print.php'));
		wp_enqueue_script('polyfillsScript', plugins_url('sro-registry/js/polyfills.ang4.js') );
		wp_enqueue_script('mainScriptPrint', plugins_url('sro-registry/js/print/main.ang4.print.js') );
		wp_enqueue_script('runtimeScript', plugins_url('sro-registry/js/runtime.ang4.js') );
	}

}

?>