// components
import Footer from "components/Footer";
import Header from "components/Header";
import Carousel from "components/Carousel";
import PostList from "components/PostList";

export default function HomePage() {
    
    return (
        <div className="page">
            <Header/>
            <main className="main">
                <PostList/>
            </main>
            <Footer/>
        </div>
    )
}