// import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import './headerNav.css'

export const HeaderNav = () => {

    const navigate = useNavigate()
    

    const cerrarHandler = () => {
        localStorage.removeItem('usuarios')
        navigate('/')
    }
    

    return(
        <>
        <header className="HeaderNav" >
            <div className="HeaderNav-div">
                <h1 className="Nav-h1">LUMA</h1>
                <nav className="Nav-div" >
                    <NavLink to={`/inicio`} className="HeaderNav-a">Inicio</NavLink> 
                    <NavLink to={`/libros`} className="HeaderNav-a">Libros</NavLink> 
                </nav>
                <button className="Cerrar-btn" onClick={cerrarHandler}>Cerrar sesión</button>
            </div>
            
        </header>
        
        </>
    )
}
