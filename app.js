

const autor = document.getElementById("inputAutor")
const titulo = document.getElementById("inputTitulo")
const tabla = document.getElementById("tbody")
const inputBuscar = document.getElementById("inputBuscar")

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/

const libro = new Libro()

EventListener()


PrepararDom()

function EventListener() {
    document.getElementById("btnAdd").addEventListener("click", PrepararLibro);
    tabla.addEventListener("click", Acciones);
    document.getElementById("btnVaciar").addEventListener("click", vaciarLibreria);
    document.getElementById("btnBuscar").addEventListener("click", BuscarLibro);

}

function PrepararLibro() {

    let ultimoId = Number(LocalStorageOperation.ultimoId())
    ultimoId++

    if ((autor.value != "" || titulo.value != "") && (patern.test(autor.value) || patern.test(titulo.value))) {
        if (!LocalStorageOperation.ComprobarTituloAutor(titulo.value.trim().toLowerCase(), autor.value.trim().toLowerCase())) {

            const infoLibro = {
                id: ultimoId,
                titulo: titulo.value.trim(),
                autor: autor.value.trim()

            }

            let tr = libro.agregar(infoLibro)
            tabla.appendChild(tr)
            LocalStorageOperation.almacenarLibro(infoLibro)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agregó libro',
                showConfirmButton: false,
                timer: 1000
            })
            autor.value = ""
            titulo.value = ""
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Libro duplicado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        autor.value = ""
        titulo.value = ""

    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            timer: 1000
        })
    }

}

function Acciones(event) {
    if (event.target.tagName === "I" || event.target.tagName === "BUTTON") {
        if (event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")) {
            libro.eliminar(event.target)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}

function PrepararDom() {
    const librosLS = LocalStorageOperation.ObtenerLS()
    for (let i = 0; i < librosLS.length; i++) {
        let tr = libro.agregar(librosLS[i])
        tabla.appendChild(tr)
    }
}


function vaciarLibreria() {
    while (tabla.firstChild) {
        tabla.firstChild.remove()
    }
    LocalStorageOperation.BorrarStorage()
}

function BuscarLibro(event) {
    event.preventDefault();

    if (inputBuscar.value != "") {
        let resultadoBusqueda = LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase());

        if (resultadoBusqueda != "") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Busqueda exitosa',
                text: `El libro ${resultadoBusqueda.titulo} tiene el id ${resultadoBusqueda.id} y fue escrito por ${resultadoBusqueda.autor}`,
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: `No esta registrado el libro ${inputBuscar.value}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
    }

    inputBuscar.value = ""
} 