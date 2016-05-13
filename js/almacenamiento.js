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
						alert(msg[i].PART_CODE + " " + msg[i].DESCRIPCION + " " + msg[i].DC_LICENSE_PLATE_ID + " " + msg[i].IC_LOT_NUMBER + " " + msg[i].CANTIDAD + " " + msg[i].UOM_1);
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
	}
}