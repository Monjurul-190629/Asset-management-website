import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../../Home/Home";
import Join_as_employee from "../../Login_Registration/Join_as_employee";
import Join_as_manager from "../../Login_Registration/Join_as_manager";
import Login from "../../Login_Registration/Login";
import Main from "../../Layout/Main";
import Dashboard from "../../Dashboard/Dashboard";
import Add_an_asset from "../../Dashboard/For_HR/Add_an_asset/Add_an_asset.jsx";
import Payment from "../../Dashboard/Payment/Payment.jsx";
import AssetLIst from "../../Dashboard/For_HR/Add_an_asset/AssestList.jsx/AssetLIst.jsx";
import All_request from "../../Dashboard/For_HR1/All_requests.jsx/All_request.jsx";
import EmployeeList from "../../Dashboard/For_HR1/EmployeeList.jsx/EmployeeList.jsx";
import Profile from "../../Dashboard/For_HR1/Profile.jsx";
import Home1 from "../../Dashboard/For_HR1/Home/Home1.jsx";
import PaymentHistory from "../../Dashboard/Payment/PaymentHistory.jsx";
import Home2 from "../../Dashboard/For_Em/Home2.jsx";
import Myassets from "../../Dashboard/For_Em/Myassets.jsx";
import Myteam from "../../Dashboard/For_Em/Myteam.jsx";
import Request_for_asset from "../../Dashboard/For_Em/Request_for_asset.jsx";
import Add_an_employee from "../../Dashboard/For_HR1/Add_an_employee.jsx";
import Package from "../../Dashboard/For_HR1/Package.jsx";





export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/join_as_employee',
                element: <Join_as_employee></Join_as_employee>
            },
            {
                path: '/join_as_manager',
                element: <Join_as_manager></Join_as_manager>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
          
            
        ]
    },
    {
        path : '/Dashboard',
        element: <Dashboard></Dashboard>,
        children : [
            {
                path: 'Home1',
                element: <Home1></Home1>
            },
            {
                path: 'Add_an_asset',
                element: <Add_an_asset></Add_an_asset>
            },
            {
                path: 'AssetList',
                element: <AssetLIst></AssetLIst>
            },
            {
                path: 'All_requests',
                element: <All_request></All_request>
            },
            {
                path: 'MyEmployeeList',
                element: <EmployeeList></EmployeeList>
            },
            {
                path: 'Add_an_asset',
                element: <Add_an_asset></Add_an_asset>
            },
            {
                path: 'Profile',
                element: <Profile></Profile>
            },
            {
                path: 'payment',
                element : <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element : <PaymentHistory></PaymentHistory>
            },
            {
                path: 'Add_an_employee',
                element: <Add_an_employee></Add_an_employee>
            },
            {
                path: 'Package',
                element: <Package></Package>
            },
            /// for employee
            {
                path: 'Home2',
                element: <Home2></Home2>
            },
            {
                path: 'My_assets',
                element: <Myassets></Myassets>
            },
            {
                path: 'My_team',
                element: <Myteam></Myteam>
            },
            {
                path: 'Request_for_asset',
                element: <Request_for_asset></Request_for_asset>
            }

        ]
    }
    
        
])