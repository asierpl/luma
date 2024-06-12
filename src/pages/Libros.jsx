import { NavLink } from "react-router-dom"

export const Libros = () => {


    // const { VITE_URL_API } = import.meta.env


    return(
        <>
        <h2>Libros</h2>
        <NavLink to={`/inicio`} className="HeaderNav-a">Inicio</NavLink> 
        </>
    )
}