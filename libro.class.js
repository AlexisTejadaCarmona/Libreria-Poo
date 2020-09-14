class Libro {
    id = 0
    autor = ""
    titulo = ""

    agregar(infoLibro) {
        this.autor = infoLibro.autor
        this.titulo = infoLibro.titulo
        this.id = infoLibro.id
        let tr = document.createElement("tr")
        tr.setAttribute("id", `${this.id}`)
        tr.innerHTML = `<td scope="row">${this.id}</td>
        <td>${this.titulo}</td>
        <td>${this.autor}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button id="editar${this.id}" type="button" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
              <button id="eliminar${this.id}" type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i></button>
            </div> 
        </td>`

        return tr
    }

    eliminar(element) {
        if (element.tagName === "I") {
            element.parentElement.parentElement.parentElement.parentElement.remove()
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.parentElement.id)

        } else {
            element.parentElement.parentElement.parentElement.remove()
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.id)
        }
    }
} 