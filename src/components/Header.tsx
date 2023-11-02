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

            {/* 임시링크임 */}
            <div>
                <Link to="/signin">로그인</Link>
                <span> | </span>
                <Link to="/signup">회원가입</Link>
            </div>

            <div className="header__menu">
                <BiSolidPencil onClick={()=>{ navigate('/new') }}/>
                <BiSolidUser onClick={()=>{ navigate('/profile') }}/>
                <BsSunFill/>
            </div>
        </header>
    )
}