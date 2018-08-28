<?php
// create Registry plugin settings menu
add_action('admin_menu', 'sro_registry_create_menu');


function sro_registry_create_menu() {

	//create new top-level menu
	add_menu_page('SRO Registry Plugin Settings', 'Registry Settings', 'administrator', __FILE__, 'registry_opt_page', plugins_url('/img/pl_icon.png', __FILE__));

	//call register settings function
	add_action( 'admin_init', 'register_pl_settings' );
}


function register_pl_settings() {
	//register our settings
	register_setting( 'sro-registry-group', 'cToPage' );
	register_setting( 'sro-registry-group', 'dbName' );
    register_setting( 'sro-registry-group', 'tableGenName' );
    register_setting( 'sro-registry-group', 'tableDetName' );
}

function registry_opt_page() {
?>
<div class="wrap">
<h2>Реестр СРО</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'sro-registry-group' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">Наименование БД</th>
        <td><input type="text" name="dbName" value="<?php echo get_option('dbName'); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row">Наименование таблицы для общей информации по всем компаниям</th>
        <td><input type="text" name="tableGenName" value="<?php echo get_option('tableGenName'); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row">Наименование таблицы для детальной информации по каждой компании</th>
        <td><input type="text" name="tableDetName" value="<?php echo get_option('tableDetName'); ?>" /></td>
        </tr>
         
        <tr valign="top">
        <th scope="row">Количество компаний на странице</th>
        <td><input type="text" name="cToPage" value="<?php echo get_option('cToPage'); ?>" /></td>
        </tr>        
        
    </table>
    
    <p class="submit">
    <input type="submit" class="button-primary" value="<?php _e('Сохранить изменения') ?>" />
    </p>

</form>
</div>
<?php } ?>