var HC = {
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
						//alert(msg[i].NUM);
						$.mobile.loading("hide");
						HC.guardarLineas(msg[i].PART_CODE,msg[i].DESCRIPCION,msg[i].DC_LICENSE_PLATE_ID,msg[i].IC_LOT_NUMBER,msg[i].CANTIDAD + " " + msg[i].UOM_1);
						//navigator.notification.alert("compañia: " + msg[i].COMPANY_CODE + "division: " + msg[i].DIVISION + "lpn: " + msg[i].DC_LICENSE_PLATE_ID + "almacen: " + msg[i].WAREHOUSE + "codigo: " + msg[i].PART_CODE + "descripcion: " + msg[i].DESCRIPCION + "cantidad: " + msg[i].CANTIDAD + "unidad: " + msg[i].UOM_1 + "lote: " + msg[i].IC_LOT_NUMBER + "nota: " + msg[i].DESPATCH_NOTE,null,"Felicidades","Aceptar");
					});
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
	guardarLineas: function(partcodehc,descriptionhc,lpnhc,lotehc,cantidadhc){
		HC.partcodehc = partcodehc;
		HC.descriptionhc = descriptionhc;
		HC.lpnhc = lpnhc;
		HC.lotehc = lotehc;
		HC.cantidadhc = cantidadhc;
		navigator.notification.alert(HC.partcodehc + " " + HC.descriptionhc + " " + HC.lpnhc + " " + HC.lotehc + " " + HC.cantidadhc);
	}
}