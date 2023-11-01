import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__maker">WooHyeok</div>
            <div>|</div>
            <Link to="https://github.com/Woohyeok97/What-did-you-do-toady" className="footer__github">
                Github
            </Link>
        </footer>
    )
}