// variables
const carrito = document.querySelector('#carrito');
const contendedorCarrito = document.querySelector('#lista-carrito tbody')
const listarCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners(){
  //Cuando agregas un curso presionandi "Agregar carrito"
  listarCursos.addEventListener('click',agregarCurso);
  //Elimina cursos del carrito
  carrito.addEventListener('click',eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click',()=>{
   articulosCarrito = []; //reseteamos todo el HTML
   limpiarHtml() //Eliminamos todo el HTML
  })
}

//Funciones
function agregarCurso(e){
  e.preventDefault()
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado= e.target.parentElement.parentElement
    leerCurso(cursoSeleccionado)
  }
}

//Eliminar un curso del carrito
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    //eliminar del arreglo
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
    carritoHTML(); //iterar sobre el carito y mostar HTML
  }
}

//Lee el contenido del HTML al que dimos click y extrae la info
function leerCurso(curso){
console.log(curso)
//crear objeto con el contenido del curso
const infoCurso={
  imagen:curso.querySelector('img').src,
  titulo:curso.querySelector('h4').textContent,
  precio:curso.querySelector('.precio span').textContent,
  id:curso.querySelector('a').getAttribute('data-id'),
  cantidad:1
}

//revisa si un elemento ya existe en el carrito

const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
if(existe){
  //actualizar cantidad
  const cursos = articulosCarrito.map(curso =>{
    if(curso.id === infoCurso.id){
      curso.cantidad++
      return curso//retorna el onjeto actualizado
    }
    else{
      return curso //retorna los onjetos que son duplicados 
    }
  })
  articulosCarrito =[...cursos]
}else{
  articulosCarrito =[...articulosCarrito,infoCurso];
}
//agrega elementos al arreglo de carrito

console.log(articulosCarrito)
carritoHTML()
}


//muestra el carrito de compra en el HTML

function carritoHTML(){

  //limpiar el HTML
  limpiarHtml()

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso)=>{
    const {imagen,titulo,precio,cantidad,id} = curso
    console.log(curso)
    const row = document.createElement('tr')
    row.innerHTML = `
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
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `
    //Agregar el HTML  del carrito e el tbody
    contendedorCarrito.appendChild(row)
  })

 
}

 //Elimina los cursos del tbody
 function limpiarHtml(){
  while(contendedorCarrito.firstChild){
    contendedorCarrito.removeChild(contendedorCarrito.firstChild)
  }
}