import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const Inicio = () => {

    const navigate = useNavigate()

    useEffect( () => {

        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])


    const cerrarHandler = () => {
        localStorage.removeItem('usuarios')
        navigate('/')
    }

    return(
        <>
        <h2>Inicio</h2>
        <button onClick={cerrarHandler}>Cerrar sesion</button>
        </>
    )
}