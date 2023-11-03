import { useContext } from "react";
import AuthContext from "context/AuthContext";
// toastify 컨테이너 & css파일
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Router from "Router";


function App() {
    const { user, init } = useContext(AuthContext)

    return (
        <div>
            { init ? <Router isAuthenticated={ user ? true : false }/> : '기다려~' }
            <ToastContainer/>
        </div>
    )
}

export default App;
