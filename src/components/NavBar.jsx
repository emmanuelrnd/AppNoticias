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
                className={"navbar has-background-white-ter"}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item column" to="/">
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="image is-160x160"
                            />
                        </Link>
                        <p className="column">La voz <b></b>de la Actualidad</p>
                    </div>                    
                    
                </div>
                <div>
                    <NavMenu
                        
                        items={[
                            { text: "Inicio", url: "/" },
                            { text: "Agregar Noticia", url: "/infosphere/articles" },
                            { text: "Profile", url: "/profile" },
                        ]}
                    />
                </div>
                <div>
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
