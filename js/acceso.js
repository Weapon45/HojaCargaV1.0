var acc = {
	Loguear: function(){
		// FUNCION PARA LOGUEARSE
		var nom = $('#user').val();
		var passw = $('#pass').val();
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/login',
				data: {usuario: nom, pass: passw},
				dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
					$.each(msg,function(i, item){
						if (msg[i].valor1 == "correcto"){
							navigator.vibrate(1000);
							window.location.href = "#menu";							
						}
						else{
							//alert("Usuario y/o Contraseña Incorrecto");
							navigator.notification.alert("Usuario y/o Contraseña Incorrecto",null,"Error","Aceptar");
						}
					})
				},
				error: function(jq, txt){
					//alert(jq + txt.responseText);
					navigator.notification.alert("Error al Conectar con Web Services",null,"Error","Aceptar");
				}
			});
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}
	}
}