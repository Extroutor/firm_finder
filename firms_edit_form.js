$(document).ready(function(){
    var ffinder=new FIRMS_FINDER();
    ffinder.initialize({'field_element':$('.lib_edit_tbl_field_firms_inn').find("input"),'field':'inn'});
    var ffinder_sro = new FIRMS_FINDER();
    ffinder_sro.initialize({'field_element':$('.lib_edit_tbl_field_firms_self_regular_firm_inn').find("input"),'field':'inn', 'prefix': 'self_regular_firm_'});
});