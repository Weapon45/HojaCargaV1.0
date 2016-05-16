var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
		document.addEventListener("backbutton",function(){},false);		
	},
	init: function(){
		window.location.href = '#login';
		$('#BtnLogin').tap(acc.Loguear);
		$('#BtnNueva').tap(fn.nuevaHC);
		$('#btnNewLPN').tap(HC.leerLpn);
		$('#HistorialCapturado').tap(HC.consultaDatos);
		$('#BtnReimpresion').tap(fn.reimprimir);
		$('#generaReimpresion').tap(ri.generarReimpresion);
		$('#BtnCerrar').tap(fn.cerrarAplicacion);
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
						if (btn == 2){
							HC.eliminarLineas();
						}
					},"Confirmacion","Si,No");
				}				
			});
		},function(){
			alert("Error al accesar base de datos al iniciar nueva hoja");
		},null);
		window.location.href="#nuevaHoja";
	},
	consultaLHC: function(){
		window.location.href="#consultaLineas";
	},
	cerrarAplicacion: function(){
		fn.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
		fn.db.transaction(function(tx){
			tx.executeSql("SELECT * FROM datos",[], function(tx, t){
				if (t.rows.length > 1) {
					navigator.notification.confirm("Desea Salir de la Aplicacion, se Borrara la Informacion Capturada al Momento...",function(btn){
						if (btn == 1){
							HC.eliminarLineas();
							navigator.app.exitApp();
						}
					},"Confirmacion","Si,No");
				}
				else{
					navigator.notification.confirm("Desea Salir de la Aplicacion",function(btn){
						if (btn == 1){
							navigator.app.exitApp();
						}
					},"Confirmacion","Si,No");
				}
			});
		},function(){
			alert("Error accesar Base de Datos salir");
		},null);
	}
};
$(fn.ready);