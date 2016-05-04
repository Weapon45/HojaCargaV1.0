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
				method: "POST",
				url: "http://servidoriis.laitaliana.com.mx/OV/HojaCargaWeb/HojaCargaWeb.asmx/HelloWord",
				data: {},
				error: function(jq,txt){
					$.mobile.loading("hide");
					alert(jq+txt);
				}
			}).done(function( data ) {
				alert("entro");
				alert(data.d);
			});
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}
	}
};
$(fn.ready);