import AddBlogs from '../pages/dashboard/add-blogs';
import EditBlogs from '../pages/dashboard/edit-blogs';
import CreateAdmin from '../pages/dashboard/create-users'
import AddEvent from '../pages/dashboard/add-event'
import EditEvent from '../pages/dashboard/all-events'
import Login from '../pages/auth/Login';

export const UnAuthenticateRoutes = [
    {
        path: '/dashboard/add-blogs',
        element: <AddBlogs />,
    },
    {
        path: '/dashboard/blogs',
        element: <EditBlogs />,
    },
    {
        path: '/dashboard/create-user',
        element: <CreateAdmin />,
    },
    {
        path: '/dashboard/add-event',
        element: <AddEvent />,
    },
    {
        path: '/dashboard/all-events',
        element: <EditEvent />,
    },
]

export const AuthenticateRoutes = [
    {
        path: '/',
        element: <Login />,
    },
]