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
                    url: "http://servidoriis.laitaliana.com.mx/OV/webServices/reparto.asmx/hola",
                    data: {nombre: nom}, 
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    crossDomain: true, 
                    success: function (msg,jqXHR) {
						$.mobile.loading("hide");						
                       // alert(msg.respuesta);
						navigator.notification.alert(msg.respuesta,null,"Felicidades","Aceptar");
                    },
                    error: function (msg,jqXHR) {                        
						navigator.notification.alert(msg.d + jqXHR.responseText + jqXHR.readyState,null,"Error","Aceptar");
						//alert("Error");
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