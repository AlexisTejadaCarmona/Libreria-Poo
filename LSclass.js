class LocalStorageOperation {

    static almacenarLibro(infoLibro) {
        let arrayLibros = this.ObtenerLS()
        arrayLibros.push(infoLibro)

        localStorage.setItem("Libros", JSON.stringify(arrayLibros))
    }
    static ObtenerLS() {
        if (localStorage.getItem("Libros") === null) {
            return []
        } else {
            return JSON.parse(localStorage.getItem("Libros"))
        }
    }

    static BorrarStorage() {
        localStorage.clear()
    }

    static BorrarLibro(idLibro) {
        let arrayLibros = this.ObtenerLS()
        let arregloNuevo = []

        for (let i = 0; i < arrayLibros.length; i++) {
            if (idLibro != arrayLibros[i].id) arregloNuevo.push(arrayLibros[i])
        }
        localStorage.setItem("Libros", JSON.stringify(arregloNuevo))
    }

    static ultimoId() {
        let arrayLibros = this.ObtenerLS()

        if (arrayLibros == 0) {
            return 0
        } else {
            return (arrayLibros[arrayLibros.length - 1].id)
        }
    }

    static BuscarTitulo(titulo) {
        let arrayLibros = this.ObtenerLS()

        let resultado = ""

        for (let i = 0; i < arrayLibros.length; i++) {
            if (arrayLibros[i].titulo.toLowerCase().trim() == titulo) {
                resultado = arrayLibros[i]
            }
        }
        return resultado
    }

    static ComprobarTituloAutor(titulo, autor) {
        let comprobar = 0
        let arrayLibros = this.ObtenerLS()
        for (let i = 0; i < arrayLibros.length; i++) {
            if (arrayLibros[i].titulo.toLowerCase() == titulo && arrayLibros[i].autor.toLowerCase() == autor) {
                comprobar = 1
            }
        }
        return comprobar
    }

} 