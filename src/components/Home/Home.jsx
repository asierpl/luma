import { useEffect, useState } from 'react'
import './Home.css'
import { Carrousel } from '../Carrousel/Carrousel'

export const Home = () => {


    const { VITE_URL_API } = import.meta.env
    const [datos, setDatos] = useState({})


    useEffect(() => {
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
    
        fetch(`${VITE_URL_API}/inicio`, options)
            .then(res => res.json())
            .then(data => setDatos(data.inicio)) //inicio = nombre de a colección
            .catch(error => console.log(error))
            .finally(() => controller.abort())
    }, []);
    


    return(
        <>
        <h1 className='Inicio-h1' >{datos.texto}</h1>

        <Carrousel/>
        
            
        </>
    )
}