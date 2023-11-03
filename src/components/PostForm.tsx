import { useContext, useState } from "react"
import AuthContext from "context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { CATEGORYS, CategoryType } from "./PostList"
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import { db } from "firebaseApp"
// 유틸함수
import { dateChangtoLocal } from 'utils/formatDate'


// FormData 타입정의
interface FormDataType {
    title : string,
    category : CategoryType,
    content : string,
}

export default function PostForm() {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [ formData, setFormData ] = useState<FormDataType>({
        title : '',
        category : '뻘글',
        content : '',
    })
    
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

        try {
            // post 업로드(user.uid가 있을때만)
            if(user?.uid) {
                const docObject = {
                    ...formData,
                    email : user?.email,
                    uid : user?.uid,
                    createdAt : dateChangtoLocal(),
                }
                await addDoc(collection(db, 'posts'), docObject)
                navigate('/')
                toast.success('글작성 완료')
            }
        } catch(err : any) {
            toast.error(err?.code)
        }
    }
    
    
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