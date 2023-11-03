import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SigninDataType {
    email : string,
    password : string,
}


export default function SigninForm() {
    const [ signinData, setSigninData ] = useState<SigninDataType>({
        email : '',
        password : ''
    })
    const navigate = useNavigate()

    // signinData 핸들러
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSigninData((prev) => ({ ...prev, [name] : value }))
    }

    // 로그인 요청
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()로 onSubmit이벤트 발생해도 새로고침 안됨
        e.preventDefault()
        const { email, password } = signinData
        // signinData 유효성 검사
        if(!email || !password) {
            toast.warning('입력을 확인해주세요.')
            return
        }

        try {
            const auth = getAuth(app)
            await signInWithEmailAndPassword(auth, email, password)

            navigate('/')
            toast.success('어세오세요.')
        } catch(err : any) {
            toast.error(err?.code)
        }
    }

    return (
        <div className="signin">
            <h1>로그인</h1>
            <form onSubmit={ onSubmit } className="form">
                <div className="form__block">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" onChange={ onChange }/>
                </div>
                <div className="form__block">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" onChange={ onChange }/>
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