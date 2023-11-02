// components
import Footer from "components/Footer";
import Header from "components/Header";
import PostForm from "components/PostForm";

export default function EditPostPage() {
    
    return (
        <div className="page">
            <Header/>
            <main className="main">
                <PostForm/>
            </main>
            <Footer/>
        </div>
    )
}