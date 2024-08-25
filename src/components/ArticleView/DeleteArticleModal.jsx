import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

function DeletearticleModal({ isOpen, onClose, article_id, onDelete }) {
    const { token } = useAuth("state");

    const handleDetelearticle = (event) => {
        event.preventDefault();

        onDelete.doFetch(
            `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/articles/${article_id}/`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
    };

    useEffect(() => {
        if (onDelete.data) {
            onClose();
        }
    }, [onDelete.data]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Eliminar Articulo</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleDetelearticle}>
                        <div className="field">
                            <p className="subtitle">
                                Estas seguro que deseas eliminar este Articulo.
                                No se podrá recuperar el mismo.
                            </p>
                        </div>
                        <button
                            className="button is-danger"
                            type="submit"
                            disabled={onDelete.isLoading}
                        >
                            {onDelete.isLoading ? "Eliminando..." : "Confirmar"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default DeletearticleModal;
