import { Link } from "react-router-dom";
// compoents
import PostProfile from "./PostProfile";


export default function PostList() {

    return (
        <div className="post__list">
            <div className="post__navigation">
                <span className="post__category--active">전체글</span>
                <span className="post__category">자랑</span>
                <span className="post__category">반성</span>
                <span className="post__category">뻘글</span>
                <span className="post__category">살려줘</span>
            </div>

            { [...Array(10)].map((item, i) => 
            <Link to={`/detail/${i}`}>
                <div key={i} className="post__item">
                    <PostProfile/>
                    <div className="post__text">
                        <div className="post__title">hi~반가워요~</div>
                        <p className="post__content">개발재밌당~</p>
                        
                    </div>
                    <div className="post__util">
                        <Link to={`/edit/${i}`} className="post__edit">수정</Link>
                        <div className="post__delete">삭제</div>
                    </div>
                </div>
            </Link> ) }
        </div>
    )
}