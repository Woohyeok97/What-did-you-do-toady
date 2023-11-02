import { Link } from "react-router-dom"
// compoents
import PostProfile from "./PostProfile"


export default function PostDetail() {

    return (
        <div className="detail">
            <div className="detail__header">
                <div className="detail__category">뻘글</div>
                <h1 className="detail__title">안녕하세요</h1>
            </div>
            <div className="detail__profile">
                <PostProfile/>
                <div className="detail__util">
                    <Link to={`/edit/1`} className="detail__edit">수정</Link>
                    <div className="detail__delete">삭제</div>
                </div>
            </div>
            
            <p className="detail__content">반가워요~</p>
        </div>
    )
}