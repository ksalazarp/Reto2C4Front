function traerUsuarios(){
    console.log("test");
        $.ajax({
        url:"http://193.122.146.107:8080/api/user/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){
    let myTable="<table>";
    myTable+="<table>";
    myTable+="<tr><th>Id</th><th>Identificacion</th><th>Nombre</th><th>Direccion</th><th>celular</th><th>Correo</th><th>contraseña</th><th>Zona</th><th>Tipo</th></tr>";
    for(i=0;i<respuesta.length;i++){
       myTable+="<tr>";
       myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].identification+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].cellPhone+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].zone+"</td>";
        myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+="<td> <button class='btn btn-info' onclick=' actualizarUsuario("+respuesta[i].id+")'>Actualizar!</button>";
        myTable+="<td> <button  class= 'btn btn-dark' onclick=' editarUsuario("+respuesta[i].id+")'>Editar!</button>";
        myTable+="<td> <button class='btn btn-danger' onclick='borrarUsuario("+respuesta[i].id+")'>Borrar!</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

/* GUARDAR UN USUARIO*/
function guardarUsuario(){
    /*VALIDA QUE TODOS LOS CAMPOS NO ENTEN VACIO*/
   
if (document.getElementById('id').value.length==0 || document.getElementById('identificacion').value.length==0 || document.getElementById('usuario').value.length==0
    || document.getElementById('direccion').value.length==0 || document.getElementById('celular').value.length==0
    || document.getElementById('email').value.length==0 || document.getElementById('clave').value.length==0 || document.getElementById('clave2').value.length==0
    || document.getElementById('zona').value.length==0 || document.getElementById('tipousuario').value.length==0 ){



  //  if (document.getElementById('id').val().length==0 ||$("#identificacion").val().length==0 || $("#usuario").val().length==0
    //        || $("#direccion").val().length==0 || $("#celular").val().length==0
      //      || $("#email").val().length==0 || $("#clave").val().length==0 || $("#clave2").val().length==0
       //     || $("#zona").val().length==0 || $("#tipousuario").val().length==0 ){

 //   if ($("#id").val().length==0 ||$("#identificacion").val().length==0 || $("#usuario").val().length==0
//         || $("#direccion").val().length==0 || $("#celular").val().length==0
//          || $("#email").val().length==0 || $("#clave").val().length==0 || $("#clave2").val().length==0
//          || $("#zona").val().length==0 || $("#tipousuario").val().length==0 ))
    //{

     alert("⚠️Todos los campos son obligatorios⚠️");

     /*VALIDA QUE LAS CONTRASEÑAS COINCIDAN*/

    }else if (clave.value!=clave2.value) {
        alert("❌Las contraseñas NO coinciden❌")
        clave.focus();
        return 0;

    }else{
   
    let var2 = {
        id:$("#id").val(),
        identification:$("#identificacion").val(),
        name:$("#usuario").val(),
        address:$("#direccion").val(),
        cellPhone:$("#celular").val(),
        email:$("#email").val(),
        password:$("#clave").val(),
        password:$("#clave2").val(),
        zone:$("#zona").val(),
        type:$("#tipousuario").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://193.122.146.107:8080/api/user/new",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("¡Se guardo correctamente!");
            window.location.reload()

        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("¡No se guardo correctamente!");
    
    
        }
        });}

}

/*ACTUALIZA UN USUARIO*/
function actualizarUsuario(idElemento){
       /*VALIDA QUE TODOS LOS CAMPOS NO ENTEN VACIOS*/
    
    if ($("#id").val().length==0 ||$("#identificacion").val().length==0 || $("#usuario").val().length==0
          || $("#direccion").val().length==0 || $("#celular").val().length==0
          || $("#email").val().length==0 || $("#clave").val().length==0 || $("#clave2").val().length==0 
          || $("#zona").val().length==0 || $("#tipousuario").val().length==0 ){

        alert("⚠️Todos los campos son obligatorios⚠️");

          /*VALIDA QUE LAS CONTRASEÑAS COINCIDAN*/
    }else if (clave.value!=clave2.value) {
        alert("❌Las contraseñas NO coinciden❌")
        clave.focus();
        return 0;
        
    }
    
    else{
    
    
    let myData={
        id:idElemento,
        id:$("#id").val(),
        identification:$("#identificacion").val(),
        name:$("#usuario").val(),
        address:$("#direccion").val(),
        cellPhone:$("#celular").val(),
        email:$("#email").val(),
        password:$("#clave").val(),
        password:$("#clave2").val(),
        zone:$("#zona").val(),
        type:$("#tipousuario").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://193.122.146.107:8080/api/user/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            $("#resultado1").empty();
            traerUsuarios();
            alert("¡Actualizado correctamente!")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });}

}

/* BORRAR UN USUARIO*/
function borrarUsuario(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://193.122.146.107:8080/api/user/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerUsuarios();
            alert("¡Se ha borrado correctamente!")
        }
    });

}

// EDITA LOS URUARIOS Y  CARGA LOS DATOS A LOS IMPUT (AUN NO FUNCIONA)//
function editarUsuario(id) {
    
    $.ajax({
        dataType: 'json',
        url:"http://193.122.146.107:8080/api/user/"+id,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;
            $("#id").val(item.id);
            $("#identificacion").val(item.identification);
            $("#usuario").val(item.name);
            $("#direccion").val(item.address);
            $("#celular").val(item.cellPhone);
            $("#email").val(item.email);
            $("#clave").val(item.password);
            $("#zona").val(item.zone);
            $("#tipousuario").val(item.type);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

