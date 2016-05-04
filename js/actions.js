var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#login';
		$('#BtnLogin').click(fn.Loguear);
	},
	Loguear: function(){
		// FUNCION PARA LOGUEARSE
		var nom = $('#user').val();
		var passw = $('#pass').val();
		if(nom != '' && passw != ''){
			//$.mobile.loading("show",{theme: 'b'});
			/* $.ajax({
				method: "POST",
				url: "http://servidoriis.laitaliana.com.mx/OV/WebServices/Service1.asmx/HelloWord",
				data: {},
				error: function(jq,txt){
					navigator.notification.alert(jq+txt,null,"Error","Aceptar");
				}
			}).done(function(msg){				navigator.notification.alert(msg.d,null,"Error","Aceptar");	
			}); */
			$.ajax({
                       type: "POST",
                       contentType: "application/json; charset=utf-8",
                       dataType: "json",
                       url:    "http://servidoriis.laitaliana.com.mx/OV/WebServices/Service1.asmx/HelloWorld",
                       data: {},
                       success: function(msg) {
                       alert(msg.d);
                       },
                       error: function(msg) {
                       alert(msg.d);
                       }
                       });
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}
	}
};
$(fn.ready);