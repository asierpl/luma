import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"


export const Libros = () => {

    const { VITE_URL_API } = import.meta.env
    const [libros , setLibros] = useState([])

    const formAddRef = useRef()

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
        </>
    )
}