import { useContext } from "react"
import AuthContext from "context/AuthContext"
import { getAuth, signOut } from "firebase/auth"
import { app } from "firebaseApp"
import { toast } from "react-toastify"
// components
import PostList from "./PostList"



export default function Profile() {
    const { user } = useContext(AuthContext)

    const onClick = async () => {
        const auth = getAuth(app);

        try {
            await signOut(auth)
            toast.success('로그아웃 하셨습니다.')
        } catch(err : any) {
            toast.error(err?.code)
        }
    }

    return (
        <div className="profile">
            <div className="profile__box">
                <div className="profile__user">
                    <div className="profile__image"></div>
                    <div className="profile__email">{ user?.email }</div>
                </div>
                <div className="profile__signout" onClick={ onClick }>
                    로그아웃
                </div>
            </div>
            <div className="profile__posts">
                <div className="profile__posts-header">나의 작성글</div>
                <PostList profile={true}/>
            </div>
        </div>
    )
}