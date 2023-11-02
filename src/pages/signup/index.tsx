// components
import Footer from "components/Footer";
import Header from "components/Header";
import SignupForm from "components/SignupForm";

export default function SignupPage() {

    return (
        <div className="page">
            <Header/>
            <main className="main">
                <SignupForm/>
            </main>
            <Footer/>
        </div>
    )
}