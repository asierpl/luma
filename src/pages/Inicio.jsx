import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HeaderNav } from "../components/headerNav"


export const Inicio = () => {

    const navigate = useNavigate()

    const { VITE_URL_API } = import.meta.env

    const [datos , setDatos] = useState([])

    useEffect( () => {

        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

    useEffect( ()=> {

        let controller = new AbortController()

        let options = {
            method  : 'get',
            signal  : controller.signal
        }

        fetch(`${VITE_URL_API}/inicio` , options)
            .then( res => res.json() )
            .then( data => setDatos(data))
            .catch( error => console.log(error))
            .finally(()=> controller.abort())

    } , [])

    const cerrarHandler = () => {
        localStorage.removeItem('usuarios')
        navigate('/')
    }

    const {texto} = datos

    return(
        <>
        <h2>Inicio</h2>

        <HeaderNav/>

        <button onClick={cerrarHandler}>Cerrar sesión</button>
        <p>{texto}</p>
        </>
    )
}