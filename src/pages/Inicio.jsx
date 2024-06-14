import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { HeaderNav } from "../components/headerNav/headerNav"
import '../components/Home/Inicio.css'
import { Home } from "../components/Home/Home"

export const Inicio = () => {

    const navigate = useNavigate()

    

    
    useEffect( () => {

        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

    

    

    

    return(
        <>
        <div className="Inicio">

            <HeaderNav/>
            <Home/>
            

        </div>

        
        </>
    )
}