window.FIN_TABLES_VIEW = function () {


}
window.FIN_TABLES_VIEW.prototype = {
    initialize: function (options) {
        this.container=options["container"];
        this.object_id=options["object_id"];
        this.createDOM();
        if (options.fin_table_id)
            this.show_table_by_ids([options.fin_table_id]);
    },
    open_tab(cont, tab) {
        const instance = this;
        if (tab == "") tab="tables";

        if (tab=="tables") {

            this.container.find(".fin_tables_view_wrapper").addClass('hidden');
            const $button = $(EngineJS.TemplateEngine.fillByKeys(`<a href='#' data-id='0' data-query="/?lib=fin_tables&ajax_check=1&edit=1&formData[object_id]={{val1}}&in_iframe=1" class="btn btn-primary iframeEditor" ><i class="fas fa-plus"></i> Добавить</a>`, {val1:instance.object_id}))
            $button.data('callback', () => instance.fin_tables_list.reload())
            let $cont=this.container.find(".fin_tables_list_wrapper");
            const $button_cmp = $(`<a href='#' class="btn btn-primary" >Сравнить</a>`).click(()=>{
                var ids=[];
                $cont.find("tr.item input:checked").each(function(){
                    ids.push($(this).closest("tr").data('id'));
                });
                if (ids.length<2)
                    alert("Выберите минимум 2 таблицы");
                else
                    instance.compare_tables(ids);

            });


            if (this.fin_tables_list) {
                this.fin_tables_list.reset();
                delete this.fin_tables_list;
            }
            this.container.find(".fin_tables_list_wrapper").removeClass('hidden').empty();
            let pp = {
                'lib': 'fin_tables',
                'filters': {'object_id': this.object_id},
                'view_type': 'table',
                'title': 'Аналитические таблицы',
                'file_attachments': 0,
                'enable_file_column': 0,
                'enable_checkbox': true,
                'container': $cont,
                header_actions: [$button,$button_cmp],
                disabled_columns: ['object_id'],
                'start': 0,
                'ipp': 3000,
                'enable_actions': true,
                'full_list_fields': 1,
                'enable_id': false,
                'order': '',
                'global_filter': 1,
                'disable_mobile': false,
                'disable_saved_filters': true,
                /*'header_actions': header_btn,*/
                'fill_line_callback': function ($tr, data) {
                    var $td=$tr.find(".rt_field_title");
                    var aa=$(EngineJS.TemplateEngine.fillByKeys("<a href='#'>{{val1}}</a>", {val1:$td.html()})).click(function(){instance.show_table(data);});
                    $td.empty().append(aa);
                },
            };
            this.fin_tables_list = new ITEMS_LIST(pp);
        }
    },
    show_table:function(data)
    {
        let $cont=this.container.find(".fin_table_container");
        let ids=[];
        ids.push(data['id']);
        this.fill_table($cont,ids,data);
    },
    show_table_by_ids:function(ids)
    {
        var instance=this;
        var url="/api/fin_tables/";
        $.ajax({
            url: url,
            data:{'filter':{'id':ids.join(",")}},
            method:'post',
            dataType: "json",
            success: function(data){
                if (data.data && data.data[0])
                    instance.show_table(data.data[0]);
            }
        });
    },
    createDOM:function()
    {
        this.container.append("<div class='fin_tables_list_wrapper wo-container'></div>");
        this.container.append("<div class='fin_tables_view_wrapper'><div class='wo-container fin_table_container'></div></div>");

        //this.fill_table(d);
    },
    compare_tables:function(ids)
    {
        let $cont=this.container.find(".fin_table_container");


        this.fill_table($cont,ids, {'title':'Результат сравнения'});
    },
    fill_table:function($cont,ids,data)
    {
        var instance=this;
        if (this.fin_table)
        {
            this.fin_table.reset();
            delete this.fin_table;
        }
        $cont.empty();
        this.container.find(".fin_tables_view_wrapper").removeClass('hidden');
        this.container.find(".fin_tables_list_wrapper").addClass('hidden');
        let $btns=[];
        if (ids.length == 1) {
            let id = EngineJS.HtmlSanitizer.sanitizeInt(ids[0]);
            let objID = EngineJS.HtmlSanitizer.sanitizeInt(instance.object_id);
            const $button = $(`<a href='#' data-id='0' class="btn btn-primary iframeEditor" ><i class="fas fa-plus"></i> Добавить колонку</a>`);
            let q = "/?lib=fin_tables_columns&ajax_check=1&edit=1&formData[object_id]="+objID+"&formData[fin_table_id]="+id+"&in_iframe=1";
            $button.attr('data-query', q);
            $button.data('callback', function() {
                instance.fin_table.reset_table();
                instance.fin_table.reload();

            });
            $btns.push($button);
			const $button2 = $(`<a href='#' data-id='0' class="btn btn-primary iframeEditor" ><i class="fas fa-edit"></i> Редактировать</a>`);
			q = "/?lib=fin_tables&ajax_check=1&edit=1&id=" + id + "&in_iframe=1";
			$button2.attr('data-query', q)
			$button2.data('callback', () => instance.fin_table.reload());
			$btns.push($button2);
			if (data['can_refill'])
            {

                const $button3 = $(`<span class="dropdown"><a href='#' class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fas fa-plus"></i> Перезаполнить</a><ul class="dropdown-menu">`+
                    `<li><a href="#" data-fill-type="payments">В соответствии с платежами</a></li>`+
                    `<li><a href="#" data-fill-type="gpr_proportional">Пропорционально ГПР</a></li>`+
                    `<li><a href="#" data-fill-type="gpr">Суммы из ГПР</a></li>`+
                    `</ul></span>`)
                $button3.find("a[data-fill-type]").click(function(){
                    var tp=$(this).data('fill-type');
                    if (tp === "gpr_proportional" || tp === "gpr")
                    {
                        var new_settings = {'filters':{'object_id':instance.object_id}};
                        var url = "/api/gpr_versions";
                        EngineJS.openModalWindow({
                            'new_settings':new_settings,
                            "url":url,
                            "callback": function (rws) {
                                var gids=[];
                                for (var i in rws)
                                {
                                    if (rws[i]["id"]>0)
                                        gids.push(rws[i]["id"]);
                                }
                                if (gids.length>0) {
                                    instance.refill_table(tp, ids[0],gids);
                                }
                            }
                        })
                    }else
                        instance.refill_table(tp, ids[0],[]);

                });
                $btns.push($button3);
            }
        }

        let pp={
            'lib': 'fin_tables_data',
            'filters': {'fin_table_id':ids.join(",")},
            'view_type': 'table',
            'title': data['title'],
            'permissions': {'view':1},
            'file_attachments': 0,
            'enable_file_column': 0,
            'container': $cont,
            'start': 0,
            'ipp': 3000,
            'enable_print':1,
            'enable_actions': false,
            'full_list_fields': 1,
            'enable_id': false,
            header_actions: $btns,
            'order': '',
            'global_filter': 0,
            'disable_mobile': true,
            'disable_saved_filters': true,
            /*'header_actions': header_btn,*/
            'fill_line_callback': function ($tr, data) {
                if (data["level"])
                    $tr.find(".rt_field_period").addClass("rt_field_level_" + data["level"]);
                //добавляет скрытие раскрытие поддерева
                if (data["childs"] && data["childs"].length > 0) {
                    var h = $tr.find(".rt_field_period").html();
                    $tr.find(".rt_field_period")
                        .empty()
                        .append(EngineJS.TemplateEngine.fillByKeys("<a href='#'><i class='tree-{{val1}}'></i></a> {{val2}}", {val1:((data["level"] >= 2) ? "plus" : "minus"), val2:h}));

                    $tr.find(".rt_field_period a").click(function () {
                        if ($(this).find("i").hasClass("tree-minus")) {
                            $(this).find("i").removeClass("tree-minus").addClass("tree-plus");
                            $.each(data["childs"], function (k, v) {
                                $tr.closest("table")
                                    .find("tr[data-id='" + v + "']")
                                    .addClass('hidden');
                            });
                        } else {
                            $(this).find("i").addClass("tree-minus").removeClass("tree-plus");
                            $.each(data["childs"], function (k, v) {
                                $tr.closest("table").find("tr[data-id='" + v + "']").removeClass('hidden');
                            });
                        }
                    });

                }else
                if (data["cells"]) {
                    for (let col_id in data["cells"]) {
                        let $td = $tr.find("td.rt_field_column_" + col_id);
                        if (data["cells"][col_id].length == 1) {
                            var car = {
                                'container': $td,
                                'text': $td.html(),
                                'lib': 'fin_tables_cells',
                                'id': data["cells"][col_id][0]['id'],
                                'field': 'value',
                                'val': data["cells"][col_id][0]['value'],
                                'type': 'value',
                                'change_callback': function (id, val, txt) {
                                    instance.fin_table.reload();
                                }
                            };
                            CELL_EDITOR.getInstance().attach_cell(car);
                        }
                    }
                }
            },
            'load_callback': function (data,data_cnt,tbl) {
                instance.fin_table_data=data;
                instance.fill_table_header(data,tbl);
            }
        };
        this.fin_table = new ITEMS_LIST(pp);
    },
    fill_table_header:function(data,tbl)
    {
        var instance=this;
        $.each(this.fin_table.headers,function(k,v){
            if (v["data-id"]) {
                let td = tbl.find(".wo_header td.rt_hdr_" + v["name"] + " .wo_header_flex");
                dd = $("<span class='dropdown-global'><a class='dropdown-toggle' href='#' ><i class='fas fa-chevron-down'/></a><ul class='dropdown-menu'></ul></span>");
                let aa = $(EngineJS.TemplateEngine.fillByKeys("<a href='#' data-title='Редактировать колонку' data-id='0' data-query='/?lib=fin_tables_columns&ajax_check=1&edit=1&id={{val1}}&in_iframe=1' class='iframeEditor'>Редактировать</a>", {val1:v["data-id"]})).data('callback',function () {
                    instance.fin_table.reset_table();
                    instance.fin_table.reload();
                });
                dd.find("ul").append($("<li></li>").append(aa));
                td.append(dd);
            }
        });
        $(".dropdown-global").dropdown_global();
    },
    refill_table:function(type,tbl_id,ids)
    {
        var instance=this;
        var url="/action/fin_tables_actions/refill?fin_table_id="+tbl_id+"&fill_type="+type+"&ids="+ids.join(",");
        $.ajax({
            url: url,
            dataType: "json",
            success: function(data){
                if (data.header) {
                    alert(data.header);
                }
                instance.fin_table.reload();
            }
        });

    }

};
