import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Sesion } from "../components/Sesion/Sesion"
import { Footer } from "../components/Footer/Footer"


export const Login = () => {

   
    const navigate = useNavigate()

   

    useEffect( () => {
        if( localStorage.getItem('usuarios')){
            navigate('/inicio')
        }
    } , [])

    
    return(
        <>
        <Sesion/>
        
        </>
    )
}