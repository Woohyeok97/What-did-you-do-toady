import Router from "Router";
// toastify 컨테이너 & css파일
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <div>
            <Router/>
            <ToastContainer/>
        </div>
    )
}

export default App;
