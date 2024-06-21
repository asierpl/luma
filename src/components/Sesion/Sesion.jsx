import { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import './Sesion.css'
import { useState } from 'react'


export const Sesion = () => {

    const {VITE_URL_API} = import.meta.env

    const navigate = useNavigate()

    const name = useRef('')
    const pass = useRef('')
    
    const [showPass, setShowPass] = useState(false)

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

    const toggleShowPass = () => {
        setShowPass(prevState => !prevState) 
    }

    return(
        <>
            <div className="Login-div">
                <h2 className='Luma' >LUMA</h2>
                <form className="Login-form" onSubmit={formHandler}>
                    <input className='Login-input' type="text"     name="user" ref={name} placeholder="Nombre de usuario" />
                    <div className="Password-wrapper">
                        <input className='Login-input' type={showPass ? "text" : "password"} name="pass" ref={pass} placeholder="Contraseña" />
                        <button type="button" className="Show-password-btn" onClick={toggleShowPass}>
                            {showPass ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <input className='Login-submit' type="submit" value="Acceder" />
                    <p className="Login-footer">*Usuario: luma | *Contraseña: luma</p>
                </form>
            </div>
        </>
    )
}