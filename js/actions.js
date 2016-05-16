var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
		document.addEventListener("backbutton",fn.botonregresar,false);
	},
	init: function(){
		// FUNCION PARA INICIO
		window.location.href = '#login';
		$('#BtnLogin').tap(acc.Loguear);
		$('#BtnNueva').tap(fn.nuevaHC);
		$('#btnNewLPN').tap(HC.leerLpn);
		$('#HistorialCapturado').tap(HC.consultaDatos);
		$('#BtnReimpresion').tap(fn.reimprimir);
		$('#generaReimpresion').tap(ri.generarReimpresion);
	},	
	reimprimir: function(){
		window.location.href="#Reimpresion";
	},
	nuevaHC: function(){
		window.location.href="#nuevaHoja";
	},
	consultaLHC: function(){
		window.location.href="#consultaLineas";
	},
	botonregresar: function(){		
	}
};
$(fn.ready);