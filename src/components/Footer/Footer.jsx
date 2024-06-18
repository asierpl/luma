import './Footer.css'

// Librerías necesarias de Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Añade todos los iconos de marcas (brand icons) a la librería
library.add(fab);

export const Footer = () => {

    return(
        <>
        <div className="Footer">
            <div className="Politicas">
                <p className="Politica">Política de cookies</p>
                <p className="Politica">Política de privacidad</p>
                <p className="Politica">Información legal</p>
            </div>
            <div className="Redes">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="Red">
                    <FontAwesomeIcon icon={['fab', 'facebook']} /> Facebook
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="Red">
                    <FontAwesomeIcon icon={['fab', 'twitter']} /> Twitter
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="Red">
                    <FontAwesomeIcon icon={['fab', 'instagram']} /> Instagram
                </a>
            </div>
            <div className="Paginas">
                <a href="https://www.goodreads.com/"  target="_blank" rel="noopener noreferrer" className="Pagina">Goodreads</a>
                <a href="https://entrelectores.com/"  target="_blank" rel="noopener noreferrer" className="Pagina">EntreLectores</a>
                <a href="https://www.lecturalia.com/" target="_blank" rel="noopener noreferrer" className="Pagina">Lecturalia</a>
                <a href="https://www.wattpad.com/"    target="_blank" rel="noopener noreferrer" className="Pagina">Wattpad</a>
                <a href="https://www.librote.com/"    target="_blank" rel="noopener noreferrer" className="Pagina">Librote</a>
            </div>
        </div>
        </>
    )
}


