
function login() {
  /*VALIDA QUE TODOS LOS DATOS SEAN INGRESADOS*/
  if ($("#email").val().length == 0 || $("#clave").val().length == 0) {
    alert("Todos los campos son obligatorios");
  } else {
    $.ajax({
      url:
        "http://193.122.146.107:8080/api/user/" + $("#email").val() + "/" + $("#clave").val(),
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        console.log(response);
        relocate(response)
      },
      error: function (xhr, status) {
        alert("Ha sucedido un problema");
      },
    })

  }
}

/*VALIDACION SI ES ADMINISTRADOR INGRESA Y SI NO LO ES MUESTRA UN MENSAJE DE BIENVENIDA*/
function relocate(respuesta) {
  let id = respuesta.id
  let tipo = respuesta.type

  if (id != null && tipo == "ADM") {
    window.location.replace("admin.html");
    alert("Bienvenido");

  } else if (id != null) {
    alert("Bienvenido");
  }
  else
    alert("No registrado")
}






