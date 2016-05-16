var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
		document.addEventListener("backbutton",function(){},false);		
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
		fn.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
		fn.db.transaction(function(tx){
			tx.executeSql("SELECT * FROM datos", [], function(tx, t){
				if (t.rows.length > 1) {
					navigator.notification.confirm("Desea Continuar con Hoja de Carga no Terminada....",function(btn){
						if (btn == 1){
							alert("Click en Si");
						}
						if (btn == 2){
							alert("Click en No");
						}
					},"Confirmacion","Si,No");
					//navigator.notification.alert("Desea Continuar con Hoja de Carga no Terminada...",null,"Confirmacion","Aceptar");
				}
			});
		},function(){
			alert("Error al accesar base de datos al iniciar nueva hoja");
		},null);
		window.location.href="#nuevaHoja";
	},
	consultaLHC: function(){
		window.location.href="#consultaLineas";
	}
};
$(fn.ready);