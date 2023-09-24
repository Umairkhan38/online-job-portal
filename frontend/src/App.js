import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './Pages/Login';
import UserDashboard from './Pages/user/UserDashboard';
import UserRoute from './Components/UserRoute';
import Layout from './Pages/globle/Layout';
import UserJobsHistory from './Pages/user/UserJobHistory.js';
import UserInfoDashboard from './Pages/user/UserInfoDashboard';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminRoute from './Components/AdminRoute';
import SingleJob from './Pages/SingleJob';
import DashUsers from './Pages/admin/DashUsers';
import DashJobs from './Pages/admin/DashJobs';
import DashCategory from './Pages/admin/DashCategory';
import DashCreateJob from './Pages/admin/DashCreateJob';
import DashCreateCategory from './Pages/admin/DashCreateCategory';
import Register from './Pages/Register';



//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC=Layout(UserInfoDashboard)
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory)
const DashCreateJobHOC = Layout(DashCreateJob)
const DashCreateCategoryHOC = Layout(DashCreateCategory)


const App = () => {

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/search/location/:location' element={<Home />} />
                            <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                            <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />

                            <Route path='/job/:id' element={<SingleJob />} />


                            <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                            <Route path='/user/jobs' element={<UserRoute><UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute><UserInfoDashboardHOC /></UserRoute>} />

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App