import { useEffect, useState } from "react";
import './Carrousel.css'

export const Carrousel = () => {

    const { VITE_URL_API } = import.meta.env
    const [datos, setDatos] = useState([])
    const [ active , setActive ] = useState(0)

    useEffect(() => {
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
    
        fetch(`${VITE_URL_API}/inicio`, options)
            .then(res => res.json())
            .then(data => setDatos( data.carrousel ))  //nombre de la colección
            .catch(error => console.log(error))
            .finally(() => controller.abort())
    }, [])

    const rightHandler = () => {
        setActive( active + 1 )

        if ( active >= datos.length - 1 ) {
            setActive(0)
        }
    }
   
    const leftHandler = () => {
        setActive( active - 1 )

        if ( active <= 0 ) {
            setActive( datos.length - 1 )
        }
    }

    return(
        <>
        <div className="Carrousel">

            <h2 className="Carrousel-h2" >Novedades</h2>
            <div className="Carrousel-container" 
                style={{
                    width : `${ datos.length * 100 }%`,
                    gridTemplateColumns : `repeat( -${datos.length} , 1fr )`,
                    transform : `translateX( -${ active * (100/datos.length) }% )`
                }}  >

                {datos.length > 0 ? (
                        datos.map( img =>
                            <Imagenes key={img.src} {...img} />
                        )
                    ) : (
                        <h3>No hay imágenes disponibles</h3>
                )}
            </div>

            <button className="Boton-right" onClick={rightHandler}>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                </svg>
            </button>
            <button className="Boton-left"  onClick={leftHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
                </svg>
            </button>
            
        </div>
        </>
    )
}


const Imagenes = (props) => {

    const {src , alt} = props

    return(
        <>
            <img src={src} alt={alt} className="Carrousel-img" loading="lazy" />
        </>
    )
}