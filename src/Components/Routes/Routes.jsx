import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../../Home/Home";
import Join_as_employee from "../../Login_Registration/Join_as_employee";
import Join_as_manager from "../../Login_Registration/Join_as_manager";
import Login from "../../Login_Registration/Login";
import Main from "../../Layout/Main";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children : [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/join_as_employee',
                element : <Join_as_employee></Join_as_employee>
            },
            {
                path: '/join_as_manager',
                element: <Join_as_manager></Join_as_manager>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])