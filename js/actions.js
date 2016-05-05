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
			var num1 = 10;
			var num2 = 2;
			$.ajax({
                    //Tipo de llamada
                    type: "POST",

                    //Dirección del WebMethod, o sea, Página.aspx/Método
                    url: "http://servidoriis.laitaliana.com.mx/OV/Web/Default.aspx/Sumar",

                    //Parámetros para pasarle al método 
                    data: {Valor1: num1, Valor2: num2},

                    //Tipo de contenido
                    contentType: "application/json; charset=utf-8",

                    //Tipo de datos
                    dataType: "json",

                    //Función a la cual llamar cuando se pudo llamar satisfactoriamente al método
                    success: function(msg){
						alert(msg.d);
					},

                    //Función a la cual llamar cuando se producen errores
                    error: function(msg){
						alert("Error " + msg.d);
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