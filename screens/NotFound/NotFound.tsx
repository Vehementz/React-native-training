import { Link } from "react-router-dom";
import './NotFound.scss'

export default function NotFound() {
    return (
        <div className="main404">
            <h2>Oops! Vous avez l'air perdu</h2>
            <img src="./error404.webp" alt="image d'erreur 404" />
        </div>
    )
}