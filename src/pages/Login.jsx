import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"


export const Login = () => {

    const {VITE_URL_API} = import.meta.env
    const navigate = useNavigate()

    const name = useRef('')
    const pass = useRef('')

    useEffect( () => {
        if( localStorage.getItem('usuarios')){
            navigate('/inicio')
        }
    } , [])

    const formHandler = (e) => {
        e.preventDefault()

        let nuevo = {
            name : name.current.value,
            pass : pass.current.value
        }

        let controller = new AbortController()

        let options = {
            method  : 'post',
            signal  : controller.signal,
            body    : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }
        }

        fetch(VITE_URL_API , options)
            .then( res => res.json() )
            .then( data => {

                if( data ) {
                    localStorage.setItem('usuarios' , JSON.stringify(data))
                    navigate('/inicio')
                }
            })
            .catch( error => console.log(error))
            .finally(()=> controller.abort)
    }



    return(
        <>
        <h2>Login</h2>
        <form onSubmit={formHandler}>
            <input type="text"     name="user" ref={name} placeholder="Nombre de usuario" />
            <input type="password" name="pass" ref={pass} placeholder="Contraseña" />
            <input type="submit" value="Acceder" />
        </form>
        </>
    )
}