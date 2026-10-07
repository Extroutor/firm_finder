console.log("FIRMS_FINDER ready");
window.FIRMS_FINDER = function () {

}
window.FIRMS_FINDER.prototype = {
    initialize: function (options) {
        this.options=options;
        console.log("FIRMS_FINDER initialize",options);
        this.field=options["field_element"];
        this.prefix = (options['prefix']) ? options['prefix'] : '';
        this.createDOM();
    },
    createDOM: function()
    {
        var instance=this;
        let p=this.field.parent();
        let a=$("<a href='#' class='btn btn-primary'>Заполнить по ИНН</a>").click(function(){
            instance.findFirm(instance.options['field'],instance.options['field_element'].val());
        });
        p.append(a);
    },
    findFirm:function(field,value)
    {
        var instance=this;
        var url="/api/firms_finder/";
        $.ajax({
            url: url,
            data:{'field':field,'value':value},
            method:'post',
            dataType: "json",
            success: function(data){
                if (data.data && data.data[0])
                {
                    let form=instance.options.field_element.parents("form");
                    for (let f in data.data[0]) {
                        let el=form.find("[name='formData[" + instance.prefix + f + "]']");
                        if (el.parents('.input-append').length && data.data[0]["__"+f])
                        {
                            el.val(data.data[0]["__"+f]);
                            el.parents('.input-append').find(".input-append-text").text(data.data[0][f]);
                        }else {
                            el.val(data.data[0][f]);
                        }
                    }

                }
            }
        });
    }
};

