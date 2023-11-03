import { useContext } from "react";
import AuthContext from "context/AuthContext";
// toastify 컨테이너 & css파일
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// components
import Router from "Router";
import Loader from "components/Loader";


function App() {
    const { user, init } = useContext(AuthContext)

    return (
        <div>
            { init ? <Router isAuthenticated={ user ? true : false }/> : <Loader/> }
            <ToastContainer/>
        </div>
    )
}

export default App;
