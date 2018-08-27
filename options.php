<?php
// create Registry plugin settings menu
add_action('admin_menu', 'sro_registry_create_menu');


function sro_registry_create_menu() {

	//create new top-level menu
	add_menu_page('SRO Registry Plugin Settings', 'Registry Settings', 'administrator', __FILE__, 'registry_opt_page',none);

	//call register settings function
	add_action( 'admin_init', 'register_mysettings' );
}


function register_mysettings() {
	//register our settings
	register_setting( 'sro-registry-group', 'cToPage' );
	register_setting( 'sro-registry-group', 'dbName' );
}

function registry_opt_page() {
?>
<div class="wrap">
<h2>SRO Registry</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'sro-registry-group' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">Database name with information</th>
        <td><input type="text" name="dbName" value="<?php echo get_option('dbName'); ?>" /></td>
        </tr>
         
        <tr valign="top">
        <th scope="row">Companies number to page</th>
        <td><input type="text" name="cToPage" value="<?php echo get_option('cToPage'); ?>" /></td>
        </tr>        
        
    </table>
    
    <p class="submit">
    <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
    </p>

</form>
</div>
<?php } ?>