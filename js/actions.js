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
			  contentType: "application/json; charset=utf-8",
			  dataType: "json",
			  url: "http://servidoriis.laitaliana.com.mx/OV/HojaCargaWeb/HojaCargaWeb.asmx/HelloWorld",
			  data: "{}",
			  success: function(msg){
				  alert(msg.d);
				  //$("body").append(msg.d); //will append "Hello world" to body tag
			  },
			  error: function () {

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