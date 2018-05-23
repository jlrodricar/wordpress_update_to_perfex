jQuery(document).ready(function () {
var statusLogin = userSettings.uid;
  if(statusLogin<1){
     localStorage.setItem('displayDialog', 0);
    }
  
var checkView = localStorage.getItem('displayDialog');
if (checkView < 1 || checkView == null) {


  
  //SET SELECT 
  var user = userSettings.uid;
  var operation = 'extract_data_wordpress';
  var elems = {
    id_people: user,
    OPERATION_TYPE: operation
  }
  var URLsocket = 'www.example.com/socket/exec.php';
  $.ajax({
    type: 'POST',
    url: URLsocket,
    data: elems,
    success: function (response) {
      var data = jQuery.parseJSON(response);
      var rut = data[0].id_perfex;
      var rutProcessing = rut.split('-');
      var rutProcessed = rutProcessing.join('');
      //SET CHECK IN PERFEX
      var operation2 = 'check_if_perfex';
      var elems2 = {
        id_people: rutProcessed,
        OPERATION_TYPE: operation2
      }
      $.ajax({
        type: 'POST',
        url: URLsocket,
        data: elems2,
        success: function (response) {
          //DATA FROM PERFEX
          var dataIdPerfex = jQuery.parseJSON(response);
          if (dataIdPerfex) {
            var idDbPerfex = dataIdPerfex[0].userid;
            var operation3 = 'get_data_perfex';
            var elems3 = {
              id_people: idDbPerfex,
              OPERATION_TYPE: operation3
            } //START GET DATA TO EDIT

            $.ajax({
              type: 'POST',
              url: URLsocket,
              data: elems3,
              success: function (response) {
                console.log(response);
                var dataToEdit = jQuery.parseJSON(response);
                //START DIALOG SERVICES
                var myFormAchac = '<div id="dialog-form-achac" title="Para utilizar el sistema debes tener el tus datos al día">';
                myFormAchac += '<p class="validateTips">Revisa todos tus datos para acceder, puedes editar los datos que ya no esten vigentes.</p>';
                myFormAchac += '<div id="heightOfContentAchac">';
                myFormAchac += '<form id="form-achac-update" role="form">';
                myFormAchac += '<fieldset>';
                //START SECTION FORM
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-12 achac-border-green-section">';
                myFormAchac += '<h3 class="achac-form-section-title">Datos Básicos</h3>';
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="name">Teléfono (Celular)</label>';
                myFormAchac += '<input type="text" name="achac_tel_celular" id="achac_tel_celular" value="'+dataToEdit[0].phonenumber+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Télefono (Emergencia)</label>';
                myFormAchac += '<input type="text" name="achac_tel_emergencia" id="achac_tel_emergencia" value="'+dataToEdit[0].emergencia+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';                
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="email">Emisión Cédula</label>';
                myFormAchac += '<input type="text" name="achac_emision_cedula" id="achac_emision_cedula" value="'+dataToEdit[0].achac_emision_cedula+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Caducidad Cédula</label>';
                myFormAchac += '<input type="text" name="achac_caducidad_cedula" id="achac_caducidad_cedula" value="'+dataToEdit[0].achac_caducidad_cedula+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                //END SECTION FORM
                //====================================================
                //START SECTION FORM
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-12 achac-border-green-section">';
                myFormAchac += '<h3 class="achac-form-section-title">Dirección</h3>';
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="name">Dirección</label>';
                myFormAchac += '<textarea class="form-control" id="achac_direccion" name="achac_direccion" rows="5" required>';
                myFormAchac += dataToEdit[0].address;
                myFormAchac += '</textarea>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Ciudad</label>';
                myFormAchac += '<input type="text" name="achac_ciudad" id="achac_ciudad" value="'+dataToEdit[0].city+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';                
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="email">Comuna</label>';
                myFormAchac += '<input type="text" name="achac_comuna" id="achac_comuna" value="'+dataToEdit[0].state+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                //END SECTION FORM
                //====================================================
                //START SECTION FORM
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-12 achac-border-green-section">';
                myFormAchac += '<h3 class="achac-form-section-title">Datos Pasaporte</h3>';
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="name">Número Pasaporte</label>';
                myFormAchac += '<input type="text" name="achac_numero_pasaporte" id="achac_numero_pasaporte" value="'+dataToEdit[0].achac_numero_pasaporte+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">País Emisor</label>';
                myFormAchac += '<input type="text" name="achac_pais_emisor" id="achac_pais_emisor" value="'+dataToEdit[0].achac_pais_emisor+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';                
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="email">Fecha Emisión</label>';
                myFormAchac += '<input type="text" name="achac_emision_pasaporte" id="achac_emision_pasaporte" value="'+dataToEdit[0].achac_emision_pasaporte+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Caducidad Pasaporte</label>';
                myFormAchac += '<input type="text" name="achac_caducidad_pasaporte" id="achac_caducidad_pasaporte" value="'+dataToEdit[0].achac_caducidad_pasaporte+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                //END SECTION FORM
                //====================================================
                //START SECTION FORM
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-12 achac-border-green-section">';
                myFormAchac += '<h3 class="achac-form-section-title">Licencia</h3>';
                myFormAchac += '<div class="row">';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="name">Número de Licencia</label>';
                myFormAchac += '<input type="text" name="achac_numero_licencia" id="achac_numero_licencia" value="'+dataToEdit[0].achac_numero_licencia+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Fecha Vencimiento Licencia</label>';
                myFormAchac += '<input type="text" name="achac_vencimiento_licencia" id="achac_vencimiento_licencia" value="'+dataToEdit[0].achac_vencimiento_licencia+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';                
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="email">Tipo de Licencia</label>';
                myFormAchac += '<input type="text" name="achac_tipo_licencia" id="achac_tipo_licencia" value="'+dataToEdit[0].achac_tipo_licencia+'" class="form-control required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Última Revalidación</label>';
                myFormAchac += '<input type="text" name="achac_ultima_revalidacion" id="achac_ultima_revalidacion" value="'+dataToEdit[0].achac_caducidad_cedula+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '<div class="col-md-6">';
                myFormAchac += '<div class="form-group">';
                myFormAchac += '<label for="password">Próxima Revalidación</label>';
                myFormAchac += '<input type="text" name="achac_proxima_revalidacion" id="achac_proxima_revalidacion" value="'+dataToEdit[0].achac_caducidad_cedula+'" class="form-control datepicker date-form-achac required" required>';
                myFormAchac += '<input type="hidden" name="achac_id_perfex" id="achac_id_perfex" value="'+dataToEdit[0].userid+'">';
                myFormAchac += '</div>';
                myFormAchac += '</div>';                
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                //END SECTION FORM
                myFormAchac += '</fieldset>';
                myFormAchac += '</form>';
                //END OF INTERNAL DIV
                myFormAchac += '<div id="achac_alert_elems" class="row align-right">';
                myFormAchac += '<button class="btn btn-main estan-actualizados">Estan Actualizados</button>';
                myFormAchac += '<button class="btn btn-default actualizar-datos">Actualizar</button>';
                myFormAchac += '</div>';
                myFormAchac += '</div>';
                //END ON DIALOG
                myFormAchac += '</div>';
                $('#extrafooter').append(myFormAchac);
                $(".ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix").hide();
                if ($('#dialog-form-achac').length == 0) {
                  alert('no se encontro');
                } else {

                                
                  $('#dialog-form-achac').dialog({
                    autoOpen: true,
                    height: "500",
                    width: "90%",
                    modal: true
                  });
                  
                }                
                //END DIALOG SERVICES
                //END OF OK RESPONSE [DATA TO EDIT PERFEX]
              },
              error: function (xhr) { // if error occured
                alert('Ha sucedido un error [get data to edit perfex]: ' + URLsocket);
              }
            });
            //END GET DATA TO EDIT
          } else {
            alert('No estas registrad@ en el sistema General de RRHH');
          } //END OF OK RESPONSE [CHECK IF PERFEX]

        },
        error: function (xhr) { // if error occured
          alert('Ha sucedido un error [check if perfex]: ' + URLsocket);
        }
      });
      //END OF OK RESPONSE [GET DATA WORDPRESS]
    },
    error: function (xhr) { // if error occured
      alert('Ha sucedido un error [get data wordpress]: ' + URLsocket);
    }
  });
$('body').on('focus',".datepicker", function(){
    $(this).datepicker({
      dateFormat: 'dd-mm-yy',
      changeMonth: true,
      changeYear: true  
    });
});
$('body').on('click',".estan-actualizados", function(){
     localStorage.setItem('displayDialog', 1);
     $("#dialog-form-achac").dialog( "close" );
  
});  
$('body').on('click',".actualizar-datos", function(){
  
var get_achac_tel_celular = $("#achac_tel_celular").val();
var get_achac_tel_emergencia = $("#achac_tel_emergencia").val();
var get_achac_emision_cedula = $("#achac_emision_cedula").val();
var get_achac_caducidad_cedula = $("#achac_caducidad_cedula").val();
var get_achac_direccion = $("#achac_direccion").val();
var get_achac_comuna = $("#achac_comuna").val();
var get_achac_ciudad = $("#achac_ciudad").val();
var get_achac_numero_pasaporte = $("#achac_numero_pasaporte").val();
var get_achac_pais_emisor = $("#achac_pais_emisor").val();
var get_achac_emision_pasaporte = $("#achac_emision_pasaporte").val();
var get_achac_caducidad_pasaporte = $("#achac_caducidad_pasaporte").val();
var get_achac_numero_licencia = $("#achac_numero_licencia").val();
var get_achac_vencimiento_licencia = $("#achac_vencimiento_licencia").val();
var get_achac_tipo_licencia = $("#achac_tipo_licencia").val();
var get_achac_ultima_revalidacion = $("#achac_ultima_revalidacion").val();   
var get_achac_proxima_revalidacion = $("#achac_proxima_revalidacion").val();
var idDbPerfex2 = $("#achac_id_perfex").val();
var operation4 = 'update_data_perfex';
  
  
  var messages = [];
  //check if validate of elements
  if(get_achac_tel_celular == ""){
    var continueSwitch = 0;
    var myMSG9 = "El n&uacute;mero de celular es obligatorio";
    messages.push(myMSG9);
    $("#achac_tel_celular").parent().addClass("on-error");
  }
  if(get_achac_tel_emergencia == ""){
    var continueSwitch = 0;
    var myMSG8 = "El n&uacute;mero de emergencia es obligatorio";
    messages.push(myMSG8);
    $("#achac_tel_emergencia").parent().addClass("on-error");
  }
  if(get_achac_direccion == ""){
    var continueSwitch = 0;
    var myMSG7 = "Direcc&oacute;n es obligatorio";
    messages.push(myMSG7);
    $("#achac_direccion").parent().addClass("on-error");
  }
  if(get_achac_comuna == ""){
    var continueSwitch = 0;
    var myMSG6 = "Comuna es obligatorio";
    messages.push(myMSG6);
    $("#achac_comuna").parent().addClass("on-error");
    
  }
  if(get_achac_ciudad == ""){
    var continueSwitch = 0;
    var myMSG5 = "Ciudad es obligatorio";
    messages.push(myMSG5);
    $("#achac_ciudad").parent().addClass("on-error");
    
  }
    
  
 console.log(messages);

  var counter = parseInt(messages.length);
if(counter<1){
  var continueSwitch = 1;
}
  if(continueSwitch<1){
    var myMSG = "POR FAVOR COMPLETE LOS CAMPOS OBLIGATORIOS PARA CONTINUAR";
    messages.push(myMSG);
  }  
  var infoMSG = '<div class="row error-inputs-achac"> <h5>Campos sin completar:</h5> <br>';
  for(var ijf = 0; ijf <counter; ijf++){
    infoMSG += messages[ijf];
    infoMSG += '<br>';
  }
  infoMSG += '</div>';
  
  $("#achac_alert_elems").append(infoMSG);
  
  
  if(continueSwitch===1){
var packData ={achac_tel_celular : get_achac_tel_celular,
achac_tel_emergencia : get_achac_tel_emergencia,
achac_emision_cedula : get_achac_emision_cedula,
achac_caducidad_cedula : get_achac_caducidad_cedula,
achac_direccion : get_achac_direccion,
achac_comuna : get_achac_comuna,
achac_ciudad : get_achac_ciudad,
achac_numero_pasaporte : get_achac_numero_pasaporte,
achac_pais_emisor : get_achac_pais_emisor,
achac_emision_pasaporte : get_achac_emision_pasaporte,
achac_caducidad_pasaporte : get_achac_caducidad_pasaporte,
achac_numero_licencia : get_achac_numero_licencia,
achac_vencimiento_licencia : get_achac_vencimiento_licencia,
achac_tipo_licencia : get_achac_tipo_licencia,
achac_ultima_revalidacion : get_achac_ultima_revalidacion,
achac_proxima_revalidacion : get_achac_proxima_revalidacion,
id_people : idDbPerfex2,
OPERATION_TYPE: operation4
}   


            $.ajax({
              type: 'POST',
              url: URLsocket,
              data: packData,
              success: function (response) {
                console.log(response);
                var dataUpdateResponse = jQuery.parseJSON(response);
                alert("Datos Actualizados");
                //END DIALOG SERVICES
                //END OF OK RESPONSE [UPDATE DATE PERFEX]
              },
              error: function (xhr) { // if error occured
                alert('Ha sucedido un error [get data to edit perfex]: ' + URLsocket);
              }
            });
  
     //_____________________
     //BASIC BEHAVIOR DIALOG 
     localStorage.setItem('displayDialog', 1);
     $("#dialog-form-achac").dialog( "close" );
  
  }//END OF CHECK SWITCH
}); 
  
}
  
  
  //END OF DR
});

