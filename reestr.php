<?php
/**
 * Plugin Name: Реестр СРО
 * Plugin URI: http://github.com/Dispetcher/registry
 * Description: Вывод информации о членах СРО
 * Version: 1.0
 * Author: Dmitry Skoblikov
 * Author URI: http://github.com/Dispetcher
 */

/*  Copyright 2018 Dmitry Skoblikov

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

try {
    $plugin = new ReestrSRO_Plugin();
    $plugin->init();
} catch (Exception $e) {
    echo $e->getMessage();
}

class ReestrSRO_Plugin{

	public function init(){
		add_shortcode('reestrSroMain', array($this, 'reestrMain'));
		add_shortcode('reestrSroPrint', array($this, 'reestrPrint'));
	}

	public function reestrMain(){
		require_once(plugins_url('reestr/php/main.php'));
		wp_enqueue_script('polyfills_ang4', plugins_url('reestr/js/polyfills.ang4.js') );
		wp_enqueue_script('main_ang4', plugins_url('reestr/js/main/main.ang4.js') );
		wp_enqueue_script('runtime_ang4', plugins_url('reestr/js/runtime.ang4.js') );
	}

	public function reestrPrint(){
		require_once(plugins_url('reestr/php/print.php'));
		wp_enqueue_script('polyfills_ang4', plugins_url('reestr/js/polyfills.ang4.js') );
		wp_enqueue_script('main_ang4_print', plugins_url('reestr/js/print/main.ang4.print.js') );
		wp_enqueue_script('runtime_ang4', plugins_url('reestr/js/runtime.ang4.js') );
	}


}

?>