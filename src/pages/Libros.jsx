import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"


export const Libros = () => {

    const { VITE_URL_API } = import.meta.env
    const [libros , setLibros] = useState([])

    const formAddRef = useRef()
    const formEditRef = useRef()

    useEffect( ()=> {
        
        let controller = new AbortController()

        let options = {
            method  : 'get',
            signal  : controller.signal
        }

        fetch(`${VITE_URL_API}/libros` , options)
            .then( res => res.json() )
            .then( data => setLibros(data)) //libros es el nombre de la colección, nada que ver con el useState
            .catch( error => console.log(error))
            .finally(()=> controller.abort())

    } , [])


    const addHandler = (e) => {
        e.preventDefault()

        const { nombreAdd , autorAdd , fechaAdd } = formAddRef.current

        const nuevo = {
            nombre: nombreAdd.value,
            autor: autorAdd.value,
            fecha: fechaAdd.value
        }

        let options = {
            method  : 'post',
            body    : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }
        }

        fetch(`${VITE_URL_API}/libros` , options)
            .then( res => res.json() )
            .then( data => setLibros(data))
    }

    const deleteHandler = async (id) => {
        
        let options = {
            method : 'delete',
            headers : { "Content-type" : "application/json" }
        }

        await fetch(`${VITE_URL_API}/libros/${id}` , options )
        
        const res = await fetch(`${VITE_URL_API}/libros`)

        const data = await res.json()

        setLibros(data)
    }
    
const [editOpen, setEditOpen] = useState(false)
  const editToggleOpen = () => setEditOpen(!editOpen)

  const editHandler = (id) => {

    const buscar = libros.find((libro) => libro._id === id)

    const { editId , editNombre , editAutor , editFecha } = formEditRef.current

    editId.value     = buscar._id
    editNombre.value = buscar.nombre
    editAutor.value  = buscar.autor
    editFecha.value  = buscar.fecha

    editToggleOpen()
  }

  const formEditHandler = async (e) => {
    e.preventDefault()

    const { editId , editNombre , editAutor , editFecha } = formEditRef.current

    const editarLibro = {
      
        nombre : editNombre.value,
        autor  : editAutor.value,
        fecha  : editFecha.value
    }

    let options = {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(editarLibro)
    }

    try {
        const response = await fetch(`${VITE_URL_API}/libros/${editId.value}`, options )
        const listaEditada = await response.json()

        setLibros(listaEditada)

    } catch (error) {
        console.error("Error updating film:", error)
    }

    formEditRef.current.reset()
    editToggleOpen()
  }


    return(
        <>
        <NavLink to={`/inicio`} className="HeaderNav-a">Inicio</NavLink> 


        <h2>Lista de libros</h2>
        {libros.length > 0 ? (
            libros.map((item, index) => (
                <div key={index}>
                    <p>{item.nombre}</p>
                    <p>{item.autor}</p>
                    <p>{item.fecha}</p>
                    <button onClick={()=> deleteHandler(item._id)} >Eliminar</button>
                    <button onClick={()=> editHandler(item._id)} >Editar</button>
                </div>
            ))
        ) : (
            <h3>No hay datos disponibles</h3>
        )}

        <h2>Añadir libro</h2>
        <form  ref={formAddRef} onSubmit={ addHandler }>
            <input type="text"   id="nombreAdd" placeholder="Título"/>
            <input type="text"   id="autorAdd"  placeholder="Autor"/>
            <input type="number" id="fechaAdd"  placeholder="Año"/>
            <input type="submit" value="Añadir"/>
        </form>

        <h2>Editar libro</h2>
        <form onSubmit={formEditHandler} ref={formEditRef}>
            <input type="hidden" id="editId" />
            <input type="text"   id="editNombre" placeholder="Título" />
            <input type="text"   id="editAutor"  placeholder="Autor" />
            <input type="number"   id="editFecha"  placeholder="Año" />
            <input className="Edit-submit" type="submit" value="Editar" />
        </form>
        </>
    )
}