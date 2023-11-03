import { useContext, useState } from "react";
import AuthContext from "context/AuthContext";
import { Link } from "react-router-dom";
import { collection, doc } from "firebase/firestore";
import { db } from "firebaseApp";
// compoents
import PostProfile from "./PostProfile";


// 카테고리 타입
export type CategoryType = '전체글' | '자랑' | '반성' | '뻘글' | '살려줘'
// 카테고리 리스트를 상수로 관리(카테고리 리스트 자체는 자주 변경되지않으니까ㅎ)
export const CATEGORYS : CategoryType[] = ['전체글', '자랑', '반성', '뻘글', '살려줘'] 
// post 타입 
export interface PostDataType {
    id? : string,
    title : string,
    content : string,
    category : string,
    createdAt : string,
    email : string,
    uid : string,
}

export default function PostList() {
    const { user } = useContext(AuthContext)
    // 현재 active된 카테고리를 상태로 관리
    const [ activeCategory, setActiveCategory ] = useState<CategoryType>('전체글')
    let temp = { title : 'gd', content : 'asd', category : '뻘글', createdAt : 'ads', email : 'asdd', uid : 'asd' }
    const [ posts, setPosts ] = useState<PostDataType[]>([temp])


    // firestore에서 posts 가져오기 
    const fetchPosts = async () => {
        const postsRef = collection(db, 'posts')
        

    }


    return (
        <div className="post__list">
            <div className="post__navigation">
                { CATEGORYS.map((item) => 
                <span key={item} className={ activeCategory === item ? "post__category--active" : "post__category" }
                onClick={()=>{ setActiveCategory(item) }}>{ item }</span>) }
            </div>

            { posts?.map((item, i) => 
            <Link to={`/detail/${i}`}>
                <div key={item?.id} className="post__item">
                    <PostProfile/>
                    <div className="post__text">
                        <div className="post__title">{ item?.title }</div>
                        <p className="post__content">{ item?.content }</p>
                    </div>


                    { item?.uid === user?.uid && // post의 uid와 현재 user의 uid가 같을때만 렌더링
                    <div className="post__util">
                        <Link to={`/edit/${item?.id}`} className="post__edit">수정</Link>
                        <div className="post__delete">삭제</div>
                    </div> }
                </div>
            </Link> ) }
        </div>
    )
}