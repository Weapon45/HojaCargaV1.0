var HC = {
	db: null,
	partcodehc: null,
	descriptionhc: null,
	lpnhc: null,
	lotehc: null,
	cantidadhc: null,
	leerLpn: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {
			  $.mobile.loading("show",{theme: 'b'});
			  var lpns = result.text; 
			  $.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/Datos',
				data: {lpn: lpns},
				dataType: "json",
				success: function (msg){						
					//alert(JSON.stringify(msg));
					$.each(msg, function(i, item){					
						HC.guardarLineas(msg[i].PART_CODE,msg[i].DESCRIPCION,msg[i].DC_LICENSE_PLATE_ID,msg[i].IC_LOT_NUMBER,msg[i].CANTIDAD + " " + msg[i].UOM_1);
					});
					$.mobile.loading("hide");
					navigator.notification.alert("LPN capturada Correctamente",null,"Correcto","Aceptar");
				},
				error: function(jq, txt){
					//alert(jq + txt);
					navigator.notification.alert("Error al Conectar con Web Services",null,"Error","Aceptar");
				}
			});
		  }, 
		  function (error) {
			  //alert("Scanning failed: " + error);
			  navigator.notification.alert("Fallo al Scanear: " + error,null,"Error","Aceptar");
		  }
	   );
	},
	guardarLineas: function(d1,d2,d3,d4,d5){
		HC.partcodehc = d1;
		HC.descriptionhc = d2;
		HC.lpnhc = d3;
		HC.lotehc = d4;
		HC.cantidadhc = d5;
		//navigator.notification.alert(HC.partcodehc + " " + HC.descriptionhc + " " + HC.lpnhc + " " + HC.lotehc + " " + HC.cantidadhc);
		
		HC.db = window.openDatabase("hcApp","1.0","HCApp Storage",20000);
		HC.db.transaction(HC.insertLineas,HC.error,HC.lineasGuardada);
	},
	insertLineas: function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS lineas (d1,d2,d3,d4,d5)");
		tx.executeSql("INSERT INTO lineas (d1,d2,d3,d4,d5) VALUES ('" + HC.partcodehc + "','" + HC.descriptionhc + "','" + HC.lpnhc + "','" + HC.lotehc + "','" + HC.cantidadhc + "')");
		navigator.notification.alert(HC.partcodehc + " " + HC.descriptionhc + " " + HC.lpnhc + " " + HC.lotehc + " " + HC.cantidadhc);
		HC.partcodehc = null;
		HC.descriptionhc = null;
		HC.lpnhc = null;
		HC.lotehc = null;
		HC.cantidadhc = null;
	},
	error: function(){
		navigator.notification.alert("Error al acceder a la Base de Datos",null,"Error BD","Aceptar");
	},
	lineasGuardada : function(){
		navigator.notification.alert("Registro Guardado",null,"Correcto","Aceptar");
	},
	consultaLineas: function(){
		HC.db = window.openDatabase("hcApp","1.0","HCApp Storage",20000);
		HC.db.transaction(HC.mostrarLineas,HC.error,null);
	},
	mostrarLineas: function(tx3){
		tx3.executeSql("SELECT * FROM lineas", [], function(tx3, t){
			for(i = 0; i < t.rows.lenght; i++){
				navigator.notification.alert(t.rows.item(i).partcode);
			}
		});
	}
}