function traerProductos(){
    console.log("test");
        $.ajax({
        url:"http://193.122.146.107:8080/api/chocolate/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
  // LISTA LOS PRODUCTOS REGISTRADOS //
function pintarRespuesta(respuesta){
    let myTable="<table>";
    myTable+="<table>";
    myTable+="<tr><th>Referencia</th><th>Categoria</th><th>Descripción</th><th>Disponibilidad</th><th>Precio</th><th>Cantidad</th><th>Fotografia</th></tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>"; 
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button class='btn btn-info' onclick=' actualizarProducto("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button class='btn btn-dark' onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button class='btn btn-danger' onclick='borrarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
       
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

//REGISTRAR UN NUEVO PRODUCTO//
function guardarProducto(){
   
    if ($("#reference").val().length==0 ||$("#category").val().length==0 || $("#description").val().length==0
          || $("#availability").val().length==0 || $("#price").val().length==0
          || $("#quantity").val().length==0 || $("#photography").val().length==0 )
    
    {

     alert("⚠️Todos los campos son obligatorios⚠️");
    }else{
   
    let var2 = {
        reference:$("#reference").val(),
        category:$("#category").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://193.122.146.107:8080/api/chocolate/new",

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
 // ACTUALIZAR PRODUCTO//
function actualizarProducto(idElemento){
    
    if ($("#reference").val().length==0 ||$("#category").val().length==0 || $("#description").val().length==0
          || $("#availability").val().length==0 || $("#price").val().length==0
          || $("#quantity").val().length==0 || $("#photography").val().length==0 )
    {
     alert("⚠️Todos los campos son obligatorios⚠️");
    }else{
    
    let myData={
        reference:idElemento,
        reference:$("#reference").val(),
        category:$("#category").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://193.122.146.107:8080/api/chocolate/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            $("#resultado2").empty();
            traerProductos();
            alert("¡Actualizado correctamente!")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Actualizo Correctamente!")
        }
    });}

}

// EDITAR PRODUCTO CARGA LOS DATOS A LOS IMPUT//
function editarProducto(reference) {
    
    $.ajax({
        dataType: 'json',
        url:"http://193.122.146.107:8080/api/chocolate/"+reference,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;

            $("#reference").val(item.reference);
            $("#category").val(item.category);
            $("#description").val(item.description);
            $("#availability").val(item.availability);
            $("#price").val(item.price);
            $("#quantity").val(item.quantity);
            $("#photography").val(item.photography);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

// BORRAR PRODUCTO //

function borrarProducto(reference){
    console.log(reference);
    let myData={
        id:reference
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://193.122.146.107:8080/api/chocolate/"+reference,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerProductos();
        }
    });

}
