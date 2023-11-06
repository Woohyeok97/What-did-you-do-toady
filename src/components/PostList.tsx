import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { Link } from "react-router-dom";
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
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

interface PostListProps {
    profile? : boolean,
}

export default function PostList({ profile = false } : PostListProps) {
    const { user } = useContext(AuthContext)
    // 현재 active된 카테고리를 상태로 관리
    const [ activeCategory, setActiveCategory ] = useState<CategoryType>('전체글')
    const [ posts, setPosts ] = useState<PostDataType[]>([])


    // firestore에서 posts 가져오기 
    const fetchPosts = async () => {
    
        try {
            const postsRef = collection(db, 'posts')
            let postsQuery;

            // Profile 컴포넌트에서 렌더링할때(로그인중인 유저가 작성한 포스트만 가져오기)
            if(profile) {
                if(activeCategory === '전체글') {
                    postsQuery = query(postsRef, where('uid', '==', user?.uid), orderBy('createdAt', 'desc'))
                } else {
                    postsQuery = query(postsRef, 
                    where('uid', '==', user?.uid), 
                    where('category', '==', activeCategory), 
                    orderBy('createdAt', 'desc'))
                }
            // HomePage컴포넌트에서 렌더링할때(모든 포스트 가져오기)
            } else {
                if(activeCategory === '전체글') {
                    postsQuery = query(postsRef, orderBy('createdAt', 'desc'))
                } else {
                    postsQuery = query(postsRef, where('category', '==', activeCategory), orderBy('createdAt', 'desc'))
                }
            }

            const result = await getDocs(postsQuery)
            const postArr : PostDataType[] = []
            result?.forEach((doc) => {
                // 아직 doc.data()의 존재를 확신할수 없어서 as PostType으로 타입을 덮어줌
                postArr.push({ id : doc.id, ...doc.data() } as PostDataType)
            })
            setPosts(postArr)

        } catch(err : any) {
            console.log(err)
        }
    }
    

    useEffect(() => {
        fetchPosts()
    }, [activeCategory])

    return (
        <div className="post__list">
            <div className="post__navigation">
                { CATEGORYS.map((item) => 
                <span key={item} className={ activeCategory === item ? "post__category--active" : "post__category" }
                onClick={()=>{ setActiveCategory(item) }}>{ item }</span>) }
            </div>

            { posts?.length > 0 ? posts?.map((item) => 
            <div key={item?.id}className="post__item">
                <Link to={`/detail/${item?.id}`} >
                    <PostProfile/>
                    <div className="post__text">
                        <div className="post__title">{ item?.title }</div>
                        <p className="post__content">{ item?.content }</p>
                    </div>
                </Link>

                { item?.uid === user?.uid && // post의 uid와 현재 user의 uid가 같을때만 렌더링
                <div className="post__util">
                    <Link to={`/edit/${item?.id}`} className="post__edit">수정</Link>
                    <div className="post__delete">삭제</div>
                </div> }
            </div> ) : <div>아직 포스트가 없습니다.</div> }
        </div>
    )
}