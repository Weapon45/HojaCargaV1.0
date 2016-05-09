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
		//alert(passw);
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			/*$.ajax({
                    method: 'POST', 
                    url: 'http://servidoriis.laitaliana.com.mx/OV/WebServicesHC/HojaCarga.asmx/login',
                    data: {usuario: nom, contra: passw}, 
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    //crossDomain: true, 
                    success: function (msg) {
						$.mobile.loading("hide");	
						alert(msg.valor1 + " " + msg.valor2);
						//navigator.notification.alert(msg.respuesta,null,"Felicidades","Aceptar");
                    },
                    error: function (jqXHR) {                        
						navigator.notification.alert(jqXHR.responseText + jqXHR.readyState,null,"Error","Aceptar");
						alert("Error" + jqXHR.responseText);
                    }
                });*/
			$.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/login',
				data: {usuario: nom, pass: passw},
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				success: function (msg){
					$.mobile.loading("hide");
					if (msg.valor1 == "correcto"){
						navigator.notification.alert(msg.valor1,null,"Felicidades","Aceptar");
					}
					else{
						navigator.notification.alert("Usuario y/o Contraseña Incorrecto",null,"Error","Aceptar");
					}					
				},
				error: function(jq, txt){
					alert(jq + txt.responseText);
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