import { RootState } from "main";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "components/common/NotFound";
import HomePage from "scenes/home_page";
import DetailPage from "scenes/detail_page/DetailPage";
import LoginPage from "scenes/login_page";
import RegisterForm from "scenes/signup_page/RegisterForm";
import ProfilePage from "scenes/profile_page";
import Authors from "scenes/author_page";
import AboutUs from "scenes/aboutus_page";
import Categories from "scenes/categories_page";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books/:bookID' element={<DetailPage />} />
            <Route path='/categories' element={<Categories/>} />
            <Route path='/authors' element={<Authors/>} />
            <Route path='/about-us' element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>
    )
}
export default Router;