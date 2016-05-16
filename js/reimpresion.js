var ri = {
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
	}
}