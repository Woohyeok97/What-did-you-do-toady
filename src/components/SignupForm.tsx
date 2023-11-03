import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

interface SignupDataType {
    email : string,
    password : string,
    passwordConfirm : string
}


export default function SignupForm() {
    // 나중에 input이 추가될수있으므로 form데이터를 객체로 관리
    const [ signupData, setSignupData ] = useState<SignupDataType>({
        email : '',
        password : '',
        passwordConfirm : ''
    })
    // 에러메시지 상태관리
    const [ errorMessage, setErrorMessage ] = useState('')
    const navigate = useNavigate()

    // signupData 핸들러
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({ ...prev, [name] : value }))

        // 유효성 검사
        let error = ''
        // 이메일 형식체크
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        switch(name) {
            case 'email' : 
                if (!value?.match(validRegex)) {
                    error = '이메일형식으로 입력해주세요.'
                } else if(signupData.password && signupData.password?.length < 8) {
                    error = '비밀번호는 8자리 이상이 국룰입니다.'
                } else if(signupData.passwordConfirm && signupData.password !== signupData.passwordConfirm) {
                    error = '비밀번호를 확인해 주세요.'
                }
                break;

            case 'password' :
                if(value.length < 8) {
                    error = '비밀번호는 8자리 이상이 국룰입니다.'
                } else if(signupData.passwordConfirm && value !== signupData.passwordConfirm) {
                    error = '비밀번호를 확인해 주세요.'
                } else if(signupData.email && !signupData.email?.match(validRegex)) {
                    error = '이메일형식으로 입력해주세요.'
                }
                break;
            
            case 'passwordConfirm' : 
                if(value !== signupData.password) {
                    error = '비밀번호를 확인해 주세요.'
                } else if(signupData.password.length < 8) {
                    error = '비밀번호는 8자리 이상이 국룰입니다.'
                } else if(signupData.email && !signupData.email?.match(validRegex)) {
                    error = '이메일형식으로 입력해주세요.'
                }
                break;

            default : 
                break;
        }
        setErrorMessage(error)
    }


    // 회원가입 요청
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()로 onSubmit이벤트 발생해도 새로고침 안됨
        e.preventDefault()
        const { email, password, passwordConfirm } = signupData
        // signupData 유효성 검사
        if(errorMessage.length || !email || !password || !passwordConfirm) {
            toast.warning('입력을 확인해주세요.')
            return
        }

        try {
            const auth = getAuth(app)
            // 회원가입 함수
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')

            toast.success('회원가입을 추카합니다.')
        } catch(err : any) {
            toast.error(err?.code)
        }
    }
    

    return (
        <div className="signup">
            <h1>회원가입</h1>
            <form onSubmit={ onSubmit } className="form">
                <div className="form__block">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" 
                    onChange={ onChange }/>
                </div>

                <div className="form__block">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder="8자리 이상 입력해주세요."
                    onChange={ onChange }/>
                </div>

                <div className="form__block">
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm"
                    onChange={ onChange }/>
                </div>

                {/* 에러메시지 */}
                { errorMessage && 
                <div className="form__block">
                    <span className="error-message">{ errorMessage }</span>     
                </div> }

                {/* 로그인페이지로 이동 */}
                <div className="form__block signin">
                    <span>계정이 있으신가요?</span>
                    <Link to="/signin" className="signin__link">로그인</Link>
                </div>

                <div className="form__block">
                    <input type="submit" value="회원가입" className="form__btn" disabled={ errorMessage.length ? true : false }/>
                </div>
            </form> 
        </div>
    )
}