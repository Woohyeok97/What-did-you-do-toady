import { useState } from "react";
import { Link } from "react-router-dom";
// compoents
import PostProfile from "./PostProfile";

// 카테고리 타입
type CategoryType = '전체글' | '자랑' | '반성' | '뻘글' | '살려줘'
// 카테고리 리스트를 상수로 관리(카테고리 리스트 자체는 자주 변경되지않으니까ㅎ)
const CATEGORYS : CategoryType[] = ['전체글', '자랑', '반성', '뻘글', '살려줘'] 

export default function PostList() {
    // 현재 active된 카테고리를 상태로 관리
    const [ activeCategory, setActiveCategory ] = useState<CategoryType>('전체글')


    return (
        <div className="post__list">
            <div className="post__navigation">
                { CATEGORYS.map((item) => 
                <span key={item} className={ activeCategory === item ? "post__category--active" : "post__category" }
                onClick={()=>{ setActiveCategory(item) }}>{ item }</span>) }
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