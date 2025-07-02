import { RootState } from "main";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "scenes/common/NotFound";
import HomePage from "scenes/home_page";
import DetailPage from "scenes/detail_page/DetailPage";
import LoginPage from "scenes/login_page";
import RegisterForm from "scenes/signup_page/RegisterForm";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books/:bookID' element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>
    )
}
export default Router;