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
                    type: 'POST',
 
                    url: "http://servidoriis.laitaliana.com.mx/OV/webServices/reparto.asmx/hola",
                    data: {nombre: nom}, 
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    crossDomain: true,
 
                    success: function (msg) {
						$.mobile.loading("hide");
                        //alert(JSON.stringify(msg));
						navigator.notification.alert(JSON.stringify(msg),null,"Felicidades","Aceptar");
                    },
                    error: function (msg) {
                        navigator.notification.alert(JSON.stringify(msg),null,"Error","Aceptar");
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