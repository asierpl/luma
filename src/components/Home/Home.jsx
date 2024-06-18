import { useEffect, useState } from 'react'
import './Home.css'
import { Carrousel } from '../Carrousel/Carrousel'

export const Home = () => {


    const { VITE_URL_API } = import.meta.env
    const [datos, setDatos] = useState({inicio : {} , webs : []})

    

    useEffect(() => {
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
    
        fetch(`${VITE_URL_API}/inicio`, options)
            .then(res => res.json())
            .then(data => setDatos(data)) //inicio = nombre de a colección
            .catch(error => console.log(error))
            .finally(() => controller.abort())
    }, []);
    


    return(
        <>
        <div className="Inicio-titulos">
            <h1 className='Inicio-h1' >{datos.inicio.titulo}</h1>
            <h2 className="Inicio-h2">{datos.inicio.subtitulo}</h2>
        </div>
        
        <div className="Inicio-container">
            <div className="Inicio-carrousel">
                <Carrousel/>
            </div>
            <div className="Inicio-webs">
                <h2 className='Webs-h2'>Comunidades online para acertar con tu próxima lectura</h2>
                
                { datos.webs.map( web =>
                    <Webs key={web.id} {...web} />
                )}
            </div>
           
        </div>
        </>
    )
}

const Webs = (props) => {
    const {href , title , parrafo} = props
    return(
        <>
        <a href={href} target='_blank' className="Inicio-enlaces">{title}</a>
        <p className="Inicio-parrafo">{parrafo}</p>
        </>
    )
}