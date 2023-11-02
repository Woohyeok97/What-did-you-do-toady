import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupForm() {

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()로 onSubmit이벤트 발생해도 새로고침 안됨
        e.preventDefault()
        toast.success('버튼을 누르셨군요.')
    }
    
    return (
        <div className="signup">
            <h1>회원가입</h1>
            <form onSubmit={ onSubmit } className="form">
                <div className="form__block">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form__block">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder="8자리 이상 입력해주세요."/>
                </div>
                <div className="form__block">
                    <label htmlFor="password-confirm">비밀번호 확인</label>
                    <input type="password" name="password-confirm" id="password-confirm"/>
                </div>

                {/* 로그인페이지로 이동 */}
                <div className="form__block signin">
                    <span>계정이 있으신가요?</span>
                    <Link to="/signin" className="signin__link">로그인</Link>
                </div>

                <div className="form__block">
                    <input type="submit" value="회원가입" className="form__btn" />
                </div>
            </form> 
        </div>
        
    )
}