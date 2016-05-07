var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#login';
		$('#BtnLogin').tap(fn.Loguear);
	},
	Loguear: function(){
		// FUNCION PARA LOGUEARSE
		var nom = $('#user').val();
		var passw = $('#pass').val();
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
                    method: 'POST', 
                    url: 'http://servidoriis.laitaliana.com.mx/OV/webServices/reparto.asmx/hola',
                    data: {nombre: nom}, 
                    success: function (msg) {
						$.mobile.loading("hide");						
                       alert(msg);
						navigator.notification.alert(msg,null,"Felicidades","Aceptar");
                    },
                    error: function (jqXHR) {                        
						navigator.notification.alert(jqXHR.responseText + jqXHR.readyState,null,"Error","Aceptar");
						alert("Error" + jqXHR.responseText);
                    }
                });		
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			alert("todos los campos son requeridos");
		}
	}
};
$(fn.init);