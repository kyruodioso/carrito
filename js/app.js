//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito= [];

cargarEvenListeners()
function cargarEvenListeners(){
    //agregando curso
    listaCursos.addEventListener('click',agregarCurso)

    //eliminando cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito= [] //se resetea el arreglo

        limpiarHTML(); // se elimina todo el HTML
    })
};





//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado)

    }
}

//elimina el curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');
        //eliminar de articulosCarrito
        articulosCarrito=articulosCarrito.filter(curso=>curso.id !== cursoId)

        carritoHTML();
    }

}

//leer el contenido del html extrayendo informacion
function leerDatosCurso(curso){

    //creando un objeto con el contenido
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //verificando si el elemento se repite
const existe= articulosCarrito.some(curso=>curso.id===infoCurso.id);
if(existe){
//se actualiza la cantidad de
const cursos = articulosCarrito.map(curso=>{
    if(curso.id===infoCurso.id){
        curso.cantidad++;
        return curso // retorna el obj actualizado
    }else{
        return curso // retorna obj que no se duplican
    }
})
articulosCarrito=[...cursos]
}else{
//se agrega el curso al carrito
    //agregando elementos al carrito 
    articulosCarrito= [...articulosCarrito, infoCurso]
    console.log(articulosCarrito)
}



    carritoHTML();

}



//mostrando carrito de compras
function carritoHTML(){

    //limpiar el html
     limpiarHTML()

    //recorriendo el carrito
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad, id}= curso;
        const row= document.createElement('tr')
        row.innerHTML=`
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
        ${precio}
    </td>
    <td>
    ${cantidad}
</td>
<td>
<a href="#" class="borrar-curso" data-id="${id}">X</a>
</td>
        `

        //agregando carrito en tbody
        contenedorCarrito.appendChild(row);
    })
}

//eliminando los cursos del tbody
function limpiarHTML(){
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}