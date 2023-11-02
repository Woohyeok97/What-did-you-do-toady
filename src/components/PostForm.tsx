import { useParams } from "react-router-dom"


const CATEGORYS = ['자랑', '반성', '뻘글', '살려줘']


export default function PostForm() {
    const { id } = useParams()

    return (
        <form className="form">
            <div className="form__block">
                <label htmlFor="">제목</label>
                <input name="title" id="title" />
            </div>
            <div className="form__block">
                <label htmlFor="category">카테고리</label>
                <select name="category" id="category">
                { CATEGORYS.map((item) => <option value={item} key={item}>{ item }</option>) }
                </select>
            </div>
            <div className="form__block">
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" spellCheck="false"/>
            </div>
            <div className="form__block">
                <input type="submit" value={ id ? "수정" : "작성" } className="form__btn"/>
            </div>
        </form>
    )
}