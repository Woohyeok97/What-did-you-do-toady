import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SigninForm() {

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()로 onSubmit이벤트 발생해도 새로고침 안됨
        e.preventDefault()
        toast.success('누르면 어쩔건데ㅋㅋ')
    }

    return (
        <div className="signin">
            <h1>로그인</h1>
            <form onSubmit={ onSubmit } className="form">
                <div className="form__block">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form__block">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password"/>
                </div>

                {/* 회원가입페이지로 이동 */}
                <div className="form__block signup">
                    <span>처음 방문하시나요?</span>
                    <Link to="/signup" className="signup__link">회원가입</Link>
                </div>

                <div className="form__block">
                    <input type="submit" value="로그인" className="form__btn"/>
                </div>
            </form> 
        </div>
    )
}