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
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: "http://servidoriis.laitaliana.com.mx/OV/HojaCargaWeb/HojaCargaWeb.asmx/HelloWord",
				data: {},
				success: function(data){
					navigator.notification.alert("Entro al web service",null,"Felicidades","Aceptar");
					alert(data.d);
				}
				}
			}).done(function( msg ){
				alert("entro");
				alert(msg);
			})
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}
	}
};
$(fn.ready);