import appLogo from "../assets/logo.png";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


function NavBar({ appName }) {
    const { isAuthenticated } = useAuth("state");
    const { logout } = useAuth("actions");
    const navigate = useNavigate();

    return (
        <header>
            <nav
                className="navbar is-link"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <Link className="navbar-item column" to="/">
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="image is-64x64"
                            />
                        </Link>                    
                    </a>

                    <div className="columns is-vcentered">
                        <p className="column">{appName}</p>
                    </div>                       
                    
                </div>

                <div className="navbar-start is-expanded">
                        <NavMenu
                            
                            items={[
                                { text: "Inicio", url: "/" },
                                { text: "Agregar Noticia", url: "/infosphere/articles" },
                                { text: "Profile", url: "/profile" },
                            ]}
                        />
                </div>
                <div className="navbar-end">
                        <button
                            className={`button is-small is-primary`}
                            onClick={
                                isAuthenticated
                                    ? () => {
                                        logout();
                                    }
                                    : () => {
                                        navigate("/login");
                                    }
                            }
                        >
                            {isAuthenticated ? "Cerrar sesión" : "Iniciar Sesión"}
                        </button>
                </div>              
               
            </nav>

        </header>
    );
}

export default NavBar;
