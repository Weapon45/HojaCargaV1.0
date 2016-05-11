var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#login';
		$('#BtnLogin').tap(fn.Loguear);
		$('#BtnNueva').tap(fn.leerLpn);
		$('#BtnReimpresion').tap(fn.reimprimir);
		$('#generaReimpresion').tap(fn.generarReimpresion);
	},
	Loguear: function(){
		// FUNCION PARA LOGUEARSE
		var nom = $('#user').val();
		var passw = $('#pass').val();
		//alert(passw);
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/login',
				data: {usuario: nom, pass: passw},
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				success: function (msg){
					$.mobile.loading("hide");
					if (msg.valor1 == "correcto"){
						window.location.href="#menu";
						//navigator.notification.alert(msg.valor1,null,"Felicidades","Aceptar");
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
	},
	reimprimir: function(){
		window.location.href="#Reimpresion";
	},
	generarReimpresion: function(){
		var diviReimpresion = $('#reDivision').val();
		var hojaReimpresion = $('#reHoja').val();
		var emailReimpresion = $('#reEmail').val();
		
		if(diviReimpresion != '' && hojaReimpresion != '' && emailReimpresion != ''){
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/reimpresion',
				data: {division: diviReimpresion, hojacarga: hojaReimpresion, email: emailReimpresion},
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				success: function (msg){
					$.mobile.loading("hide");
					if (msg.valor1 == "correcto"){
						navigator.notification.alert("Se envio hoja de carga correctamente",null,"Correcto","Aceptar");
					}
					if (msg.valor1 == "noexiste") {
						navigator.notification.alert("Hoja de Carga no Existe",null,"Error","Aceptar");
					}					
					if (msg.valor1 == "errorcorreo") {
						navigator.notification.alert("Ocurrio un Error al Enviar Correo Electronico",null,"Error","Aceptar");
					}
					if (msg.valor1 == "errorpdf") {
						navigator.notification.alert("Ocurrio un Error al Generar PDF",null,"Error","Aceptar");
					}
				},
				error: function(jq, txt){
					alert(jq + txt.responseText);
				}
			});
		}
		else{
			navigator.notification.alert("Todos los campos son requeridos",null,"Error Reimpresion","Aceptar");
		}
	},
	leerLpn: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {
			  //alert("Result: " + result.text);
			  navigator.notification.alert("Resultado: " + result.text,null,"Felicidades","Aceptar");
		  }, 
		  function (error) {
			  alert("Scanning failed: " + error);
		  }
	   );
	}
};
$(fn.ready);