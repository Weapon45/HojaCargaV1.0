var HC = {
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
						alert(msg[i].PART_CODE + " " + msg[i].DESCRIPCION + " " + msg[i].DC_LICENSE_PLATE_ID + " " + msg[i].IC_LOT_NUMBER + " " + msg[i].CANTIDAD + " " + msg[i].UOM_1);
						
						HC.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
						HC.db.transaction(function(tx){
							tx.executeSql("CREATE TABLE IF NOT EXISTS datos (d1,d2,d3,d4,d5)");
							tx.executeSql("INSERT INTO datos (d1,d2,d3,d4,d5) VALUES ('" + msg[i].PART_CODE + "','" + msg[i].DESCRIPCION + "','" + msg[i].DC_LICENSE_PLATE_ID + "','" + msg[i].IC_LOT_NUMBER + "','" + msg[i].CANTIDAD + "')");
							alert(msg[i].PART_CODE + " " + msg[i].DESCRIPCION + " " + msg[i].DC_LICENSE_PLATE_ID + " " + msg[i].IC_LOT_NUMBER + " " + msg[i].CANTIDAD + " " + msg[i].UOM_1);
						},function(){
							alert("Error insertando datos");
						},null);
					});
					$.mobile.loading("hide");
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
	consultaDatos: function(){
		HC.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
		HC.db.transaction(HC.mostrarDatos,HC.error,null);
	},
	mostrarDatos: function(tx2){
		tx2.executeSql("SELECT * FROM datos", [], function(tx2, t){
			var x = 0;	
			var tabla = '<li data-role="list-divider">';			
			for(i = 0; i < t.rows.length; i++){
					x = x + 1;	
				tabla += '<li><h2>LINEA ' + x + '</h2><ul><li>' + t.rows.item(i).d1 + '</li><li>' + t.rows.item(i).d2 + '</li><li>' + t.rows.item(i).d3 + '</li><li>' + t.rows.item(i).d4 + '</li><li>' + t.rows.item(i).d5 + '</li></ul></li>';
			}
			tabla += '</div>';
			$("#lin").html(tabla);
		});
	},
	error: function(){
		alert("error base de datos");
	}
}