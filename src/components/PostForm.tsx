import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "context/AuthContext"
import { toast } from "react-toastify"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "firebaseApp"
// 데이터타입
import { CATEGORYS, CategoryType, PostDataType } from "./PostList"
// 유틸함수
import { dateChangtoLocal } from 'utils/formatDate'


// FormData 타입정의
interface FormDataType {
    title : string,
    category : CategoryType,
    content : string,
}

export default function PostForm() {
    const { user } = useContext(AuthContext)
    // 기존 포스트
    const [ prevPost, setPrevPost ] = useState<PostDataType | null>(null)
    // 업로드할 폼 데이터
    const [ formData, setFormData ] = useState<FormDataType>({
        title : '',
        category : '뻘글',
        content : '',
    })
    const { id } = useParams()
    const navigate = useNavigate()
    

    // postData 핸들러
    const onChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name] : value }))
    }
    
    // 글작성 & 글수정 요청
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // postData 유효성 검사
        const { title, category, content } = formData
        if(!title || !category || !content) {
            toast.warning('입력을 확인해주세요.')
            return
        }
        // user.uid 유효성 검사
        if(!user?.uid) {
            toast.warning('너 뭐야')
            return
        }

        try {
            // prevPost가 있고 prevPost?.id(prevPost.id가 있다는건 { id }가 있다는거니까)가 있으면 포스트 수정로직
            if(prevPost && prevPost?.id) {
                const docObject = {
                    ...formData,
                    email : user?.email,
                    uid : user?.uid,
                    updatedAt : dateChangtoLocal(),
                }

                const postDocRef = doc(db, 'posts', prevPost?.id)
                await updateDoc(postDocRef, docObject)
                toast.success('글수정 완료')

            // 아니라면 포스트 업로드 로직
            } else {
                const docObject = {
                    ...formData,
                    email : user?.email,
                    uid : user?.uid,
                    createdAt : dateChangtoLocal(),
                }
                const postsRef = collection(db, 'posts')
                await addDoc(postsRef, docObject)
                toast.success('글작성 완료')
            }
            navigate('/')
            
        } catch(err : any) {
            toast.error(err?.code)
        }
    }

    // 기존 포스트 가져오기
    const fetchPost = async(id : string) => {
        try {
            const postRef = doc(db, 'posts', id)
            const postSnap = await getDoc(postRef)
            
            setPrevPost({ id : postSnap.id, ...(postSnap.data()) as PostDataType })
        } catch(err : any) {
            console.log(err)
        }
    }

    // 기존 포스트 가져오기
    useEffect(() => {
        if(id) fetchPost(id)
    }, [id])

    // 가져온 기존 포스트로 formData 업데이트하기
    useEffect(() => {
        // 가져온 post의 uid와 로그인중인 uid가 같은경우(먼저 prevPost와 user가 준비되고 나서!)
        if(prevPost && user) {
            // user?.uid 유효성 검사(여기서는 핸들러가 아닌, useEffect에서 유효성검사 실시)
            if(prevPost?.uid === user?.uid) {
                const changed = {
                    title : prevPost?.title,
                    category : prevPost?.category,
                    content : prevPost?.content,
                }
                setFormData(changed as FormDataType)
            // 아니라면 나가
            } else {
                toast.error('너 누구야')
                navigate('/')
            }
        }
    }, [prevPost])

    
    return (
        <div className="post__form">
            <h1>{ id ? "글수정" : "글작성" }</h1>
            <form onSubmit={ onSubmit } className="form">
                <div className="form__block">
                    <label htmlFor="">제목</label>
                    <input name="title" id="title" onChange={ onChange } value={ formData?.title }/>
                </div>
                
                <div className="form__block">
                    <label htmlFor="category">카테고리</label>
                    <select name="category" id="category" onChange={ onChange } defaultValue={ formData?.category }>
                    {/* 카테고리 요소중 '전체글'은 제외하고 렌더링하기 */}
                    { CATEGORYS.map((item) => item !== '전체글' && 
                        <option value={item} key={item}>{ item }</option>) }
                    </select>
                </div>

                <div className="form__block">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" spellCheck="false" onChange={ onChange } value={ formData?.content }/>
                </div>

                <div className="form__block">
                    <input type="submit" value={ id ? "수정" : "작성" } className="form__btn"/>
                </div>
            </form>
        </div>
        
    )
}