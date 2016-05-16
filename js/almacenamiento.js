var HC = {
	lpns: null,
	lpnstotal: null,
	leerLpn: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {
			  $.mobile.loading("show",{theme: 'b'});
			  HC.lpns = result.text; 
			  if (HC.lpnstotal != null){
				  if(HC.lpnstotal.indexOf(HC.lpns) != -1){
					 navigator.notification.alert("LPN: " + HC.lpns + ", ya se encuentra capturada");
					  return false;
				  }
				  else{
					  HC.lpnstotal = HC.lpnstotal + "," + HC.lpns;
				  	  alert("LPNS TOTAL 2: " + HC.lpnstotal);
				  }
			  }
			  else{
				  HC.lpnstotal = HC.lpns;
			  }
			  $.ajax({
				method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/OV/ServicesHC/HC.asmx/Datos',
				data: {lpn: HC.lpns},
				dataType: "json",
				success: function (msg){						
					//alert(JSON.stringify(msg));
					$.each(msg, function(i, item){											
						HC.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
						HC.db.transaction(function(tx){
							tx.executeSql("CREATE TABLE IF NOT EXISTS datos (d1,d2,d3,d4,d5,d6)");
							tx.executeSql("INSERT INTO datos (d1,d2,d3,d4,d5,d6) VALUES ('" + msg[i].PART_CODE + "','" + msg[i].DESCRIPCION + "','" + msg[i].DC_LICENSE_PLATE_ID + "','" + msg[i].IC_LOT_NUMBER + "','" + msg[i].CANTIDAD + "','" + msg[i].UOM_1 + "')");
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
			  //alert("Fallo al Scanear: " + error);
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
			var tabla = '<li data-role="list-divider"><center><h1>CONTENIDO HOJA CARGA<h1></center></li>';			
			for(i = 0; i < t.rows.length; i++){
					x = x + 1;	
				tabla += '<li ><h5>LINEA ' + x + '</h5><ul><li>' + t.rows.item(i).d1 + '</li><li>' + t.rows.item(i).d2 + '</li><li>' + t.rows.item(i).d3 + '</li><li>' + t.rows.item(i).d4 + '</li><li>' + t.rows.item(i).d5 + " " + t.rows.item(i).d6 + '</li></ul></li>';
			}
			$("#lin").html(tabla);
		});
	},
	error: function(){
		navigator.notification.alert("Error Base de Datos",null,"Error BD","Aceptar");	
	},
	eliminarLineas: function(){
		HC.db = window.openDatabase("hcApp","1.0","HojaCargaApp Storage",20000);
		HC.db.transaction(function(tx){
			tx.executeSql("DELETE FROM datos");
			navigator.notification.alert("Se Elimino Informacion LPN's Almacenadas",null,"Informacion","Aceptar");
		},function(){
			alert("Error Accesar Base de Datos Eliminar Lineas");
		},null);
	}
}