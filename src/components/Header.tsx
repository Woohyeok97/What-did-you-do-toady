import { Link, useNavigate } from 'react-router-dom'
import { IoTodaySharp } from 'react-icons/io5'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'
import { BiSolidUser, BiSolidPencil } from 'react-icons/bi'

export default function Header() {
    const navigate = useNavigate()
 
    return (
        <header className="header">
            <Link to="/">
                <div className="header__logo">
                    <IoTodaySharp/>
                    <span>오늘 뭐했음?</span>
                </div>
            </Link>

            <div className="header__menu">
                <BiSolidPencil onClick={()=>{ navigate('/new') }}/>
                <BiSolidUser onClick={()=>{ navigate('/profile') }}/>
                <BsSunFill/>
            </div>
        </header>
    )
}