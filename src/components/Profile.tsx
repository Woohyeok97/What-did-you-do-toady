import PostList from "./PostList"


export default function Profile() {

    return (
        <div className="profile">
            <div className="profile__box">
                <div className="profile__user">
                    <div className="profile__image"></div>
                    <div className="profile__email">qordngur@naver.com</div>
                </div>
                <div className="profile__signout" onClick={()=>{ console.log('signout!') }}>
                    로그아웃
                </div>
            </div>
            <div className="profile__posts">
                <div className="profile__posts-header">나의 작성글</div>
                <PostList/>
            </div>
        </div>
    )
}