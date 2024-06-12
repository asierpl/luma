// import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import './headerNav.css'

export const HeaderNav = () => {

    const { VITE_URL_API } = import.meta.env

    // const [ nav , setNav ] = useState([])

    // useEffect( ()=> {
        
    //     let controller = new AbortController()

    //     let options = {
    //         method  : 'get',
    //         signal  : controller.signal
    //     }

    //     fetch(`${VITE_URL_API}/inicio` , options)
    //         .then( res => res.json() )
    //         .then( data => setNav(data.headerNav))  //headerNav es el nombre de la colección, nada que ver con el useState
    //         .catch( error => console.log(error))
    //         .finally(()=> controller.abort())

    // } , [])


    

    return(
        <>
        <div className="HeaderNav-div">
            <h1 className="Nav-h1">Hacer diseño de un libro de fondo</h1>
            <div className="Nav-div" >
                <NavLink to={`/inicio`} className="HeaderNav-a">Inicio</NavLink> 
                <NavLink to={`/libros`} className="HeaderNav-a">Libros</NavLink> 
            </div>
        </div>
       
        
       
        

            {/* {nav.length > 0 ? (
                nav.map((item, index) => (
                    <ul key={index}>
                        <li className="HeaderNav-li" >
                            <NavLink to={item.href} className="HeaderNav-a">{item.title}</NavLink> 
                             
                        </li>
                    </ul>
                ))
            ) : (
                <h3>No hay datos disponibles</h3>
            )} */}


        {/* <ul className="HeaderNav-ul">
            {datos.map ((page ) => 
                <HeaderNav key={page.index} {...page} />
            )}
        </ul> */}
        
        </>
    )
}


// const HeaderNav = (props) => {
    
//     const {href , title} = props
    

//     return(
//         <>
//         <li className="HeaderNav-li" >
//             <NavLink to={href} className="HeaderNav-a">{title}</NavLink>  
//         </li>
//         </>
//     )
// }