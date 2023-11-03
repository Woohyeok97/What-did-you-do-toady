import { ReactNode, createContext, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";

interface AuthContextProps {
    children : ReactNode
}

// AuthContext의 user의 초기값은 null이고, 타입은 firebaseAuth의 User이거나 null
const AuthContext = createContext({
    user : null as User | null,
    init : false // onAuthStateChanged()함수의 실행완료 여부를 저장할 용도임
})

export function AuthContextProvider({ children } : AuthContextProps) {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const auth = getAuth(app);

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {}) -> auth의 user(로그인 여부)에 따라 auth를 변경하는 함수임
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setIsLoading(true)
        })
    }, [auth]) // auth가 변경될때마다 실행

    // auth의 변경이 있을때마다(로그인, 로그아웃 등등) 전역상태 user를 업데이트해줌
    return (
        <AuthContext.Provider value={{ user : currentUser, init : isLoading }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext