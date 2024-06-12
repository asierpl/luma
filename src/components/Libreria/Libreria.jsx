import './Libreria.css'

import { createContext } from "react"
import { useContext } from "react"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

const LibrosContext = createContext()

export const Libreria = () => {

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
        
        <LibrosContext.Provider value={{ formAddRef , addHandler , formEditHandler , formEditRef }}>
        <>
        <div className="Libreria-div">
            <h2>Lista de libros</h2>
                {libros.length > 0 ? (
                    libros.map((item, index) => (
                        <ul className="Libros-ul" key={index}>
                            <div className="Libro-cada">
                                <div className="Texto-div">
                                    <li className="Libros-li" >{item.nombre}</li>
                                    <li className="Libros-li" >{item.autor}</li>
                                    <li className="Libros-li" >{item.fecha}</li>
                                </div>
                                <div className="Botones-div">
                                    <button className="Delete-boton" onClick={()=> deleteHandler(item._id)} >Delete</button>
                                    <button className="Edit-boton"   onClick={()=> editHandler(item._id)} >Editar</button>
                                </div>
                            </div>
                        </ul>
                    ))
                ) : (
                    <h3>No hay datos disponibles</h3>
                )}

                <div className="Formularios">
                    <AddLibro/>
                    <EditLibro/>
                </div>
        </div>
           
        </>
        </LibrosContext.Provider>
    )
}

const AddLibro = () => {

    const { formAddRef , addHandler } = useContext(LibrosContext)

    return(
        <>
        
        <form  className="Add-form" ref={formAddRef} onSubmit={ addHandler }>
            <h2>Añadir libro</h2>
            <input className="Add-input" type="text"   id="nombreAdd" placeholder="Título"/>
            <input className="Add-input" type="text"   id="autorAdd"  placeholder="Autor"/>
            <input className="Add-input" type="number" id="fechaAdd"  placeholder="Año"/>
            <input className="Add-submit" type="submit" value="Añadir"/>
        </form>
        </>
    )
}

const EditLibro = () => {

    const { formEditHandler , formEditRef } = useContext(LibrosContext)

    return(
        <>
        
        <form className="Edit-form" onSubmit={formEditHandler} ref={formEditRef}>
            <h2>Editar libro</h2>
            <input className="Edit-input" type="hidden" id="editId" />
            <input className="Edit-input" type="text"   id="editNombre" placeholder="Título" />
            <input className="Edit-input" type="text"   id="editAutor"  placeholder="Autor" />
            <input className="Edit-input" type="number"   id="editFecha"  placeholder="Año" />
            <input className="Edit-submit" type="submit" value="Editar" />
        </form>
        </>
    )
}