import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
// compoents
import PostProfile from "./PostProfile";
import { toast } from "react-toastify";


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

    // firestore에서 포스트 삭제하기
    const handleDeletePost = async (postUid : string, postId : string | undefined) => {
        const confirm = window.confirm('포스트를 삭제할까요?')

        // user?.uid 유효성 검사
        if(postUid !== user?.uid) {
            toast.error('너 누구야')
            return
        }
        // 컨펌되고, post?.id가 있을경우에만 로직실행
        if(confirm && postId) {
            try {
                // 포스트 삭제후, 다시 포스트 가져오기
                await deleteDoc(doc(db, 'posts', postId))
                await fetchPosts()
                toast.success('포스트를 삭제하였습니다.')
                
            } catch(err : any) {
                toast.error(err?.code)
            }
        }
    }
    
    // activeCategory가 바뀔때마다 fetchPost()실행
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
                    <div className="post__delete" onClick={()=>{ handleDeletePost(item?.uid, item?.id) }}>
                        삭제
                    </div>
                </div> }
            </div> ) : <div>아직 포스트가 없습니다.</div> }
        </div>
    )
}