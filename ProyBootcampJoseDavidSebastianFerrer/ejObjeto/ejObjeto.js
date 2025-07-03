document.getElementById("Actualizar").style.display = "none"; //Oculta el boton de actualizar al inicio
var myArrayEst=[];
var objEst={
    cedula:null, 
    nombre:null,
    apellidos:null,
    nota1:null,
    nota2:null,
    nota3:null
};
var posAct;
comprovarLocalStorage(); // Comprueba si hay datos en localStorage al cargar la página 
function GuardarDatos() {
    objEst.cedula = document.getElementById("Cedula").value;
    objEst.nombre = document.getElementById("Nombre").value;
    objEst.apellidos = document.getElementById("Apellidos").value;
    objEst.nota1 = parseFloat(document.getElementById("Nota1").value);
    objEst.nota2 = parseFloat(document.getElementById("Nota2").value);
    objEst.nota3 = parseFloat(document.getElementById("Nota3").value);
    let resultado=JSON.parse(JSON.stringify(objEst));
    myArrayEst.push(resultado); //se almacena el objeto resultado en myArrayEst
    console.log(myArrayEst);
    guardarLocalStorage(); // Guarda los datos en localStorage
    limpiarCajas(); //Limpia las cajas de texto
    mostrarDatos(); //Muestra los datos en la tabla 
}
function limpiarCajas () {
    document.getElementById("Cedula").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("Apellidos").value = "";
    document.getElementById("Nota1").value = "";
    document.getElementById("Nota2").value = "";
    document.getElementById("Nota3").value = "";
    document.getElementById("Cedula").focus();
}
function mostrarDatos() {
    var salida="";
    for(i in myArrayEst){
        salida += "<tr><td>" + myArrayEst[i].cedula+'</td>'+
        '<td>' + myArrayEst[i].nombre+'</td>'+
        '<td>' + myArrayEst[i].apellidos+'</td>'+
        '<td>' + myArrayEst[i].nota1+'</td>'+
        '<td>' + myArrayEst[i].nota2+'</td>'+
        '<td>' + myArrayEst[i].nota3+'</td>'+
        '<td>'+notaFinal(myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3)+"</td>"+
        '<td>'+estado(notaFinal(myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3))+'</td>'+
        '<td>'+cualitativa(notaFinal(myArrayEst[i].nota1,myArrayEst[i].nota2,myArrayEst[i].nota3))+'</td>'+
        '<td>'+ '<button onclick="editarDatos('+i+')">Editar</button> <button onclick="eliminarDatos('+i+')">Eliminar</button></td>'+
        '</tr>';
    }
    document.getElementById("ListadoEstudiantes").innerHTML = salida;
}
function notaFinal(n1,n2,n3) {
    return((n1+n2+n3)/3).toFixed(2); // Calcula la nota final y la redondea a dos decimales
}
function estado(notaFinal) {
    return(notaFinal >= 3.0 ? "Aprobado" : "Reprobado"); // Devuelve "Aprobado" si la nota final es mayor o igual a 3.0, de lo contrario "Reprobado"
}
function cualitativa(notaFinal) {
    return "pendiente";
}
function editarDatos(index) {
    posAct = index; // Guarda la posición del objeto a editar
    document.getElementById("Cedula").value = myArrayEst[index].cedula;
    document.getElementById("Nombre").value = myArrayEst[index].nombre;
    document.getElementById("Apellidos").value = myArrayEst[index].apellidos;
    document.getElementById("Nota1").value = myArrayEst[index].nota1;
    document.getElementById("Nota2").value = myArrayEst[index].nota2;
    document.getElementById("Nota3").value = myArrayEst[index].nota3;
    document.getElementById("Guardar").style.display = "none"; // Oculta el botón de guardar
    document.getElementById("Actualizar").style.display = "inline"; // Muestra el botón de actualizar
}
function ActualizarDatos() {
    myArrayEst[posAct].cedula = document.getElementById("Cedula").value;
    myArrayEst[posAct].nombre = document.getElementById("Nombre").value;
    myArrayEst[posAct].apellidos = document.getElementById("Apellidos").value;
    myArrayEst[posAct].nota1 = parseFloat(document.getElementById("Nota1").value);
    myArrayEst[posAct].nota2 = parseFloat(document.getElementById("Nota2").value);
    myArrayEst[posAct].nota3 = parseFloat(document.getElementById("Nota3").value);
    document.getElementById("Guardar").style.display = "inline"; // Muestra el botón de guardar
    document.getElementById("Actualizar").style.display = "none"; // Oculta el botón de actualizar
    guardarLocalStorage(); // Guarda los datos actualizados en localStorage
    limpiarCajas();
    mostrarDatos();
    document.getElementById("Actualizar").style.display = "none"; // Enfoca el campo de cédula
    document.getElementById("Guardar").style.display = "inline"; // Muestra el botón de guardar
}
function eliminarDatos(index) {
    if (confirm("¿Estás seguro de que deseas eliminar a este estudinte?")) {
        // Si el usuario confirma, se procede a eliminar el registro
        eliminarRegistro(index);
    }
    myArrayEst.splice(index, 1); // Elimina el objeto en la posición index
    guardarLocalStorage(); // Guarda los cambios en localStorage
    mostrarDatos(); // Actualiza la tabla para reflejar los cambios
}
function comprovarLocalStorage() {
    if (localStorage.getItem("Estudiantes")) {
        myArrayEst = JSON.parse(localStorage.getItem("Estudiantes"));
        mostrarDatos();
    }
}
function guardarLocalStorage() {
    localStorage.setItem("Estudiantes", JSON.stringify(myArrayEst));
}