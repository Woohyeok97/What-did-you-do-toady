// components
import Footer from "components/Footer";
import Header from "components/Header";
import Profile from "components/Profile";

export default function ProfilePage() {
    
    return (
        <div className="page">
            <Header/>
            <main className="main">
                <Profile/>
            </main>
            <Footer/>
        </div>
    )
}