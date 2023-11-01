import { Route, Routes, Navigate } from "react-router-dom";
// pages
import HomePage from "pages/home";
import ProfilePage from "pages/profile";
import PostsPage from "pages/posts";
import SigninPage from "pages/signin";
import SignupPage from "pages/signup";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/profile" element={ <ProfilePage/> }/>
            <Route path="/posts" element={ <PostsPage/> }/>
            <Route path="/signin" element={ <SigninPage/> }/>
            <Route path="/signup" element={ <SignupPage/> }/>

            {/* 이상한 url 입력했을때 '/'로 이동시킴 */}
            <Route path="*" element={ <Navigate to="/"/>}/>
        </Routes>
    )
}