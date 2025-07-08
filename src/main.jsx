import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './Store/store.js'
import { createBrowserRouter } from 'react-router'
import {Protected}  from "./Components/index.js"
import LoginPage from './pages/LoginPage.jsx'
import AddpostPage from './pages/AddpostPage.jsx'
import AllPostPage from './pages/AllPostPage.jsx'
import EditPost from './pages/EditPost.jsx'
import HomePage from './pages/HomePage.jsx'
import Post from './pages/PostPage.jsx'
import SignupPage from './pages/SignupPage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: (
                <Protected authentication={false}>
                    <LoginPage />
                </Protected>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protected  authentication={false}>
                    <SignupPage />
                </Protected >
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected  authentication>
                    {" "}
                    <AllPostPage />
                </Protected >
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected  authentication>
                    {" "}
                    <AddpostPage />
                </Protected >
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected  authentication>
                    {" "}
                    <EditPost />
                </Protected >
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)
