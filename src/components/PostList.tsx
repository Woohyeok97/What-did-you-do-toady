import { Link } from "react-router-dom";


export default function PostList() {

    return (
        <div className="post__list">
            <div className="post__navigation">
                <span className="post__navigation-item--active">전체글</span>
                <span className="post__navigation-item">자랑</span>
                <span className="post__navigation-item">반성</span>
                <span className="post__navigation-item">뻘글</span>
                <span className="post__navigation-item">살려줘</span>
            </div>

            { [...Array(10)].map((item, i) => 
            <Link to={`/detail/${i}`}>
                <div key={i} className="post__item">
                    <div className="post__profile">
                        <div className="post__user-image"></div>
                        <div className="post__user-name">qordngur@naver.com</div>
                        <div className="post__create-date">2023.11.2 목요알</div>
                    </div>
                    <div className="post__text">
                        <div className="post__title">hi~반가워요~</div>
                        <p className="post__content">개발재밌당~</p>
                        
                    </div>
                    <div className="post__util">
                        <Link to="/" className="post__edit">수정</Link>
                        <div className="post__delete">삭제</div>
                    </div>
                </div>
            </Link> ) }
        </div>
    )
}