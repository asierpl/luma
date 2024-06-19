// import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import './headerNav.css'
import { useState } from "react"

export const HeaderNav = () => {

    const navigate = useNavigate()

    const [menu , setMenu] = useState(false)
    const menuToggle = () => setMenu(!menu)

    const cerrarHandler = () => {
        localStorage.removeItem('usuarios')
        navigate('/')
    }
    

    return(
        <>
        <header className="HeaderNav" >
            <div className="HeaderNav-div">
                
                    <h1 className="Nav-h1">LUMA</h1>
                    <nav className={`Nav-div ${menu ? 'isVisible' : ''}`} >
                        <NavLink to={`/inicio`} className="HeaderNav-a">Inicio</NavLink> 
                        <NavLink to={`/libros`} className="HeaderNav-a">Libros</NavLink> 
                        {menu && 
                            <button onClick={menuToggle} className="Cerrar-menu">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button> 
                        }
                    <button className="Cerrar-sesionB" onClick={cerrarHandler}>Cerrar sesión</button>
                    </nav>
                    <button className="Cerrar-sesion" onClick={cerrarHandler}>Cerrar sesión</button>
                
                
                <button onClick={menuToggle} className="Menu-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
                
            </div>
            
        </header>
        
        </>
    )
}
