import AddBlogs from '../pages/dashboard/blog/add-blogs';
import EditBlogs from '../pages/dashboard/blog/edit-blogs';
import CreateAdmin from '../pages/dashboard/create-users'
import AddEvent from '../pages/dashboard/events/add-event'
import EditEvent from '../pages/dashboard/events/add-event'
import AddClient from '../pages/dashboard/client-dtls/add-client'
import AllClient from '../pages/dashboard/client-dtls/all-clients'
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
    {
        path: '/dashboard/add-client',
        element: <AddClient />,
    },
    {
        path: '/dashboard/all-clients',
        element: <AllClient />,
    },
]

export const AuthenticateRoutes = [
    {
        path: '/',
        element: <Login />,
    },
]