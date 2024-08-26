import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import ArticleForm from "../components/ArticleForm"
import Login from "../components/Auth/Login";
import Profile from "../components/Profile";
import ViewArticle from "../components/ArticleView/ViewArticle";



//INICIALIZAMOS EL ENRUTADOR BrowserRouter
const Router = createBrowserRouter([

    //DEFINO LAS RUTAS
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element: <Home />,
            },

            {
                path: "infosphere",
                children: [
                    {
                        index: true,
                        element: <h1>Articulos</h1>,
                    },
                    {
                        path: "articles",
                        element: (
                            <ProtectedRoute>
                                <ArticleForm />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "vista",
                element: <ViewArticle />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            }, 
        ],
    },
    {
        path: "*",
        element: <h1>Sección no encontrada</h1>,
    },

    
],
{
    basename: "/appnoticias/"
},
);

export { Router };
