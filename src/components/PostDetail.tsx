import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AuthContext from "context/AuthContext"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { db } from "firebaseApp"
import { toast } from "react-toastify"
// compoents
import PostProfile from "./PostProfile"
import Loader from "./Loader"
// 데이터 타입
import { PostDataType } from "./PostList"



export default function PostDetail() {
    const { user } = useContext(AuthContext)
    const [ post, setPost ] = useState<PostDataType | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()

    // 기존 포스트 가져오기
    const fetchPost = async(id : string) => {
        try {
            const postRef = doc(db, 'posts', id)
            const postSnap = await getDoc(postRef)
            
            setPost({ id : postSnap.id, ...(postSnap.data()) as PostDataType })
        } catch(err : any) {
            console.log(err)
        }
    }
    
    // 포스트 삭제로직
    const handleDeletePost = async () => {
        const confirm = window.confirm('포스트를 삭제할까요?')

        // user?.uid 유효성 검사
        if(post?.uid !== user?.uid) {
            toast.error('너 누구야')
            return
        }
        // 컨펌되고, post?.id가 있을경우에만 로직실행
        if(confirm && post?.id) {
            try {
                const postRef = doc(db, 'posts', post?.id)
                await deleteDoc(postRef)
    
                navigate('/')
                toast.success('포스트 삭제')
            } catch(err : any) {
                toast.error(err?.code)
            }
        }
    }

    useEffect(() => {
        if(id) fetchPost(id)
    }, [id])

    console.log(post?.id)

    return (
        <div className="detail">
        { post ? <>
            <div className="detail__header">
                <div className="detail__category">{ post?.category }</div>
                <h1 className="detail__title">{ post?.title }</h1>
            </div>
            <div className="detail__profile">
                <PostProfile/>
                { user?.uid === post?.uid &&
                <div className="detail__util">
                    <Link to={`/edit/${post?.id}`} className="detail__edit">수정</Link>
                    <div className="detail__delete" onClick={ handleDeletePost }>삭제</div>
                </div>}
            </div>
            
            <p className="detail__content">{ post?.content }</p>
        </> : <Loader/> }
        </div>
    )
}