import { Route, Routes, Navigate } from "react-router-dom";
// pages
import HomePage from "pages/home";
import ProfilePage from "pages/profile";
import DetailPage from "pages/detail";
import EditPostPage from "pages/edit";
import NewPostPage from "pages/new";
import SigninPage from "pages/signin";
import SignupPage from "pages/signup";

interface RouterProps {
    isAuthenticated : boolean
}

export default function Router({ isAuthenticated } : RouterProps) {
    
    return (
        <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/detail/:id" element={ <DetailPage/> }/>

            {/* 로그인 상태일때만 프로필, 글작성, 글수정 페이지로 이동할수있도록 */}
            { isAuthenticated && <>
            <Route path="/profile" element={ <ProfilePage/> }/>
            <Route path="/new" element={ <NewPostPage/> }/>
            <Route path="/edit/:id" element={ <EditPostPage/> }/> 
            </> }
            
            {/* 로그인 상태가 아닐때만 로그인, 회원가입 페이지로 이동할수있도록 */}
            { !isAuthenticated && <>
            <Route path="/signin" element={ <SigninPage/> }/>
            <Route path="/signup" element={ <SignupPage/> }/>
            </> }
            
            {/* 이상한 url 입력했을때 '/'로 이동시킴 */}
            <Route path="*" element={ <Navigate to="/"/>}/>
        </Routes>
    )
}