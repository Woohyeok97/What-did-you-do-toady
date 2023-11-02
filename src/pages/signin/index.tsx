// components
import Footer from "components/Footer";
import Header from "components/Header";
import SigninForm from "components/SigninForm";

export default function SigninPage() {

    return (
        <div className="page">
            <Header/>
            <main className="main">
                <SigninForm/>
            </main>
            <Footer/>
        </div>
    )
}