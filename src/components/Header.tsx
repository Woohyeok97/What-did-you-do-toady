import { useContext } from 'react'
import AuthContext from 'context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
// react-icons
import { IoTodaySharp } from 'react-icons/io5'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'
import { BiSolidUser, BiSolidPencil } from 'react-icons/bi'


export default function Header() {
    const { user } = useContext(AuthContext)
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
                {/* 로그인 상태일때만 글작성 페이지로 이동할수있음 */}
                { user && <BiSolidPencil onClick={()=>{ navigate('/new') }}/> }
                {/* 로그인 상태라면 프로필페이지로, 없다면 로그인페이지로 */}
                <BiSolidUser onClick={()=>{ navigate(user ? '/profile' : '/signin') }}/>
                <BsSunFill/>
            </div>
        </header>
    )
}