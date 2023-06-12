import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Error/ErrorPage";
import SignUp from "../Pages/SignUpPage/SignUp";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddAClass from "../Pages/Dashboard/Instructors/AddAClass/AddAClass";
import MyClasses from "../Pages/Dashboard/Instructors/MyClasses/MyClasses";
import InstructorRoute from "./InstructorRoute";
import Feedback from "../Pages/Dashboard/Admin/Feedback/Feedback";
import ShowFeedback from "../Pages/Dashboard/Instructors/ShowFeedback/ShowFeedback";
import SeletedClasses from "../Pages/Dashboard/Students/SelectedClasses/SeletedClasses";
import EnrolledClasses from "../Pages/Dashboard/Students/EnrolledClasses/EnrolledClasses";
import Payment from "../Pages/Dashboard/Students/Payment/Payment";
import StudentRoute from "./StudentRoute";
import PaymentHistory from "../Pages/Dashboard/Students/PaymentHistory/PaymentHistory";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "../Pages/Dashboard/Students/StudentHome/StudentHome";
import InstructorHome from "../Pages/Dashboard/Instructors/InstructorHome/InstructorHome";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/about',
                element: <About></About>
            }
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'home',
                element: <DashboardHome></DashboardHome>
            },
            // for admin
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'feedback/:id',
                element: <AdminRoute><Feedback></Feedback></AdminRoute>
            },
            // for instructor
            {
                path: 'instructorHome',
                element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>
            },
            {
                path: 'addClass',
                element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
            },
            {
                path: 'myClasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: 'seeFeedback/:id',
                element: <InstructorRoute><ShowFeedback></ShowFeedback></InstructorRoute>,
                loader: ({ params }) => fetch(`https://summer-camp-server-xi-three.vercel.app/classes/showFeedback/${params.id}`)
            },
            // for student or user
            {
                path: 'studentHome',
                element: <StudentRoute><StudentHome></StudentHome></StudentRoute>
            },
            {
                path: 'selectedClasses',
                element: <StudentRoute><SeletedClasses></SeletedClasses></StudentRoute>
            },
            {
                path: 'enrolledClasses',
                element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
            },
            {
                path: 'payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>
            },
            {
                path: 'paymentHistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
            }

        ]
    }
]);

export default router;