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
        
    }
    
    
} 