$(document).ready(function(){
    $('.lib_edit_tbl_field_firms_passport_series').find('input').attr(EngineJS.HtmlSanitizer.sanitizeAttribute('type', 'password'));
    $('.lib_edit_tbl_field_firms_passport_number').find('input').attr(EngineJS.HtmlSanitizer.sanitizeAttribute('type', 'password'));

    const fieldsToMark = [
        '.lib_edit_tbl_field_firms_name',
        '.lib_edit_tbl_field_firms_family_name',
        '.lib_edit_tbl_field_firms_fiz_name',
        '.lib_edit_tbl_field_firms_passport_series',
        '.lib_edit_tbl_field_firms_passport_number',
        '.lib_edit_tbl_field_firms_birthday',
        '.lib_edit_tbl_field_firms_passport_date'
    ];
    fieldsToMark.forEach(selector => {
        let container = $(selector + ' > .lib_edit_tbl_field_name');
        if (container.length && container.find('.lib_edit_tbl_field_mandatory').length === 0) {
            container.append('<span class="lib_edit_tbl_field_mandatory">*</span>');
        }
    });


    let firm_type = $('.lib_edit_tbl_field_firms_type > .lib_edit_tbl_field_value > select');
    hide_fields(firm_type.val());
    firm_type.on("change",function() {
        hide_fields(firm_type.val());
    });
});

function hide_fields(type_val){
    switch (type_val) {
        case "1": {
            $('.lib_edit_tbl_field_firms_inn > a').show();
            $('.lib_edit_tbl_field_firms_name').show();
            $('.lib_edit_tbl_field_firms_full_name').show();
            $('.lib_edit_tbl_field_firms_gendir_name').show();
            $('.lib_edit_tbl_field_firms_gendir_title').show();
            $('.lib_edit_tbl_field_firms_buh_name').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs').show();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').show();
            $('.lib_edit_tbl_field_firms_kpp').show();
            $('.lib_edit_tbl_field_firms_ogrn').show();
            $('.lib_edit_tbl_field_firms_okpo').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_name').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_inn').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_ogrn').show();
            $('.lib_edit_tbl_field_firms_post_address').show();
            $('.lib_edit_tbl_field_firms_firm_info').show();
            $('.lib_edit_tbl_field_firms_family_name').hide();
            $('.lib_edit_tbl_field_firms_fiz_name').hide();
            $('.lib_edit_tbl_field_firms_surname').hide();
            $('.lib_edit_tbl_field_firms_passport_series').hide();
            $('.lib_edit_tbl_field_firms_passport_number').hide();
            $('.lib_edit_tbl_field_firms_passport_date').hide();
            $('.lib_edit_tbl_field_firms_birthday').hide();

            $('.lib_edit_tbl_field_firms_gendir_title').closest('.lib_edit_tbl_field_block').show();
            $('.lib_edit_tbl_field_firms_responsible_docs').closest('.lib_edit_tbl_field_block').show();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').closest('.lib_edit_tbl_field_block').show();

            break;
        }
        case "2": {
            $('.lib_edit_tbl_field_firms_inn > a').show();
            $('.lib_edit_tbl_field_firms_name').show();
            $('.lib_edit_tbl_field_firms_full_name').show();
            $('.lib_edit_tbl_field_firms_gendir_name').hide();
            $('.lib_edit_tbl_field_firms_gendir_title').hide();
            $('.lib_edit_tbl_field_firms_buh_name').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').hide();
            $('.lib_edit_tbl_field_firms_kpp').hide();
            $('.lib_edit_tbl_field_firms_ogrn').show();
            $('.lib_edit_tbl_field_firms_okpo').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_name').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_inn').show();
            $('.lib_edit_tbl_field_firms_self_regular_firm_ogrn').show();
            $('.lib_edit_tbl_field_firms_post_address').show();
            $('.lib_edit_tbl_field_firms_firm_info').show();
            $('.lib_edit_tbl_field_firms_family_name').show();
            $('.lib_edit_tbl_field_firms_fiz_name').show();
            $('.lib_edit_tbl_field_firms_surname').show();
            $('.lib_edit_tbl_field_firms_passport_series').hide();
            $('.lib_edit_tbl_field_firms_passport_number').hide();
            $('.lib_edit_tbl_field_firms_passport_date').hide();
            $('.lib_edit_tbl_field_firms_birthday').hide();

            $('.lib_edit_tbl_field_firms_gendir_title').closest('.lib_edit_tbl_field_block').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs').closest('.lib_edit_tbl_field_block').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').closest('.lib_edit_tbl_field_block').hide();

            break;
        }
        case "3": {
            $('.lib_edit_tbl_field_firms_inn > a').hide();
            $('.lib_edit_tbl_field_firms_name').hide();
            $('.lib_edit_tbl_field_firms_full_name').hide();
            $('.lib_edit_tbl_field_firms_gendir_name').hide();
            $('.lib_edit_tbl_field_firms_gendir_title').hide();
            $('.lib_edit_tbl_field_firms_buh_name').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').hide();
            $('.lib_edit_tbl_field_firms_self_regular_firm_kpp').hide();
            $('.lib_edit_tbl_field_firms_kpp').hide();
            $('.lib_edit_tbl_field_firms_ogrn').hide();
            $('.lib_edit_tbl_field_firms_okpo').hide();
            $('.lib_edit_tbl_field_firms_self_regular_firm_name').hide();
            $('.lib_edit_tbl_field_firms_self_regular_firm_inn').hide();
            $('.lib_edit_tbl_field_firms_self_regular_firm_ogrn').hide();
            $('.lib_edit_tbl_field_firms_post_address').hide();
            $('.lib_edit_tbl_field_firms_firm_info').hide();
            $('.lib_edit_tbl_field_firms_family_name').show();
            $('.lib_edit_tbl_field_firms_fiz_name').show();
            $('.lib_edit_tbl_field_firms_surname').show();
            $('.lib_edit_tbl_field_firms_passport_series').show();
            $('.lib_edit_tbl_field_firms_passport_number').show();
            $('.lib_edit_tbl_field_firms_passport_date').show();
            $('.lib_edit_tbl_field_firms_birthday').show();

            $('.lib_edit_tbl_field_firms_gendir_title').closest('.lib_edit_tbl_field_block').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs').closest('.lib_edit_tbl_field_block').hide();
            $('.lib_edit_tbl_field_firms_responsible_docs_title').closest('.lib_edit_tbl_field_block').hide();

            break;
        }
    }
}