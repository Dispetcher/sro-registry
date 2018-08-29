<?php
// create SRO-Registry plugin settings menu
add_action('admin_menu', 'sro_registry_create_menu');


function sro_registry_create_menu() {

    //create menu
    add_menu_page('SRO Registry Plugin Settings', 'Настройки плагина "Реестр СРО"', 'administrator', __FILE__, 'registry_opt_page', plugins_url('/img/pl_icon.png', __FILE__));

    //register settings function
    add_action( 'admin_init', 'register_pl_settings' );
}


function register_pl_settings() {
    register_setting( 'sro-registry-group', 'c_to_page' );
    register_setting( 'sro-registry-group', 'db_name' );
    register_setting( 'sro-registry-group', 'table_gen_name' );
    register_setting( 'sro-registry-group', 'table_det_name' );
}

function registry_opt_page() {
?>
<div class="wrap">
<h2>Реестр СРО</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'sro-registry-group' ); ?>
    <p><input type="checkbox" id="hideset" onclick="hidesettings()" checked="checked"><label for="hideset" onclick="hidesettings()">Скрыть системные настройки</label></p>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">Наименование БД</th>
        <td><input type="text" name="db_name" value="<?php echo get_option('db_name'); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row">Наименование таблицы для общей информации по всем компаниям</th>
        <td><input type="text" name="table_gen_name" value="<?php echo get_option('table_gen_name'); ?>" /></td>
        </tr>

        <tr valign="top">
        <th scope="row">Наименование таблицы для детальной информации по каждой компании</th>
        <td><input type="text" name="table_det_name" value="<?php echo get_option('table_det_name'); ?>" /></td>
        </tr>
         
        <tr valign="top">
        <th scope="row">Количество компаний на странице</th>
        <td><input type="text" name="c_to_page" value="<?php echo get_option('c_to_page'); ?>" /></td>
        </tr>        
        
    </table>
    
    <p class="submit">
    <input type="submit" class="button-primary" value="<?php _e('Сохранить изменения') ?>" />
    </p>

</form>
</div>
<script>
var el = document.querySelectorAll(".form-table tbody tr");
 /***** Hide core settings *****/
function hidesettings(){

    if(document.querySelector("#hideset").checked){
        for(let i=0; i<el.length-1; i++){
        el[i].style.display = "none";
        }
    }else{
        for(let i=0; i<el.length-1; i++){
        el[i].style.display = "table-row";
        }
    }
}

if(document.querySelector("#hideset").checked){
    for(let i=0; i<el.length-1; i++){
        el[i].style.display = "none";
    }
}
</script>
<?php } ?>