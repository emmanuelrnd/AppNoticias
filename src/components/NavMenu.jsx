import { Link } from "react-router-dom";

function NavMenu({ items }) {
    return (
        <div className="navbar-menu">
            <div className="navbar-start">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        className={"navbar-item has-text-black-bis"}
                        to={item.url}
                    >
                        {item.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavMenu;
