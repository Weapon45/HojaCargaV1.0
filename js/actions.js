var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#login';
		$('#BtnLogin').tap(fn.Loguear);
		$('#BtnNueva').tap(fn.nuevaHC);
		$('#btnNewLPN').tap(HC.leerLpn);
		$('#HistorialCapturado').tap(HC.consultaDatos);
		$('#BtnReimpresion').tap(fn.reimprimir);
		$('#generaReimpresion').tap(fn.generarReimpresion);
	},
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
				dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
					$.each(msg,function(i, item){
						if (msg[i].valor1 == "correcto"){
							alert("Se envio Hoja de Carga Correctamente");
							navigator.notification.alert("Se envio Hoja de Carga Correctamente",null,"Correcto","Aceptar");						
						}
						if (msg[i].valor1 == "noexiste"){
							alert("Hoja de Carga no Existe");
							navigator.notification.alert("Hoja de Carga no Existe",null,"Error","Aceptar");
						}
						if (msg[i].valor1 == "errorcorreo"){
							alert("Ocurrio Error al Enviar Correo Electronico");
							navigator.notification.alert("Ocurrio Error al Enviar Correo Electronico",null,"Error","Aceptar");
						}
						if (msg[i].valor1 == "errorpdf"){
							alert("Ocurrio Error al Generar PDF");
							navigator.notification.alert("Ocurrio Error al Generar PDF",null,"Error","Aceptar");
						}
					})
				},
				error: function(jq, txt){
					alert(jq + txt);
					navigator.notification.alert("Error al Conectar con Web Services",null,"Error","Aceptar");
				}
			});
			
		}
		else{
			navigator.notification.alert("Todos los campos son requeridos",null,"Error Reimpresion","Aceptar");
		}
	},
	nuevaHC: function(){
		window.location.href="#nuevaHoja";
	},
	consultaLHC: function(){
		window.location.href="#consultaLineas";
	}
};
$(fn.init);