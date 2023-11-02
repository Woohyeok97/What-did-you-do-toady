// components
import Footer from "components/Footer";
import Header from "components/Header";
import PostDetail from "components/PostDetail";

export default function DetailPage() {
    
    return (
        <div className="page">
            <Header/>
            <main className="main">
                <PostDetail/>
            </main>
            <Footer/>
        </div>
    )
}