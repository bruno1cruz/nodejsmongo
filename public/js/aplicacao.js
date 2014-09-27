window._callback = function(){};


var campanha ={
    
    salvar : function(e){
        
        e.preventDefault();
        
        var form = $('#campanha_form');
        
        $.ajax({
            url : form.attr('action'),
            type : 'POST',
            data : form.serialize(),
            success : function(data){
                
                $("#mensagem-callback").html(data.mensagem);
                
                setTimeout(function() {
                    window.location= data.redireciona;
                }, 5000);
                
            }
        });
        
    },
    carregar_imagem : function(e){
        e.preventDefault();
        
        $("#modal_carregar_imagem").modal();
        
        _callback = function(status){
            if ( status.ok ){
                $("#modal_carregar_imagem").modal("hide");
            } else {
                $("#modal_carregar_imagem").find(".alert").show().text("Ocorreu um erro ao carregar a imagem.");
            }
        }
    }
    
    
} 