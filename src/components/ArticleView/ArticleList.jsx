import React, { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard"
import { useAuth } from "../../contexts/AuthContext";

function ArticleList() {
    const [page, setPage] = useState(1);
    const [articles, setarticles] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const { user__id } = useAuth("state");

    const observerRef = useRef();
    const lastarticleElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(
            `${import.meta.env.VITE_API_BASE_URL}infosphere/articles/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setarticles((prevarticles) => [...prevarticles, ...data.results]);
                    setNextUrl(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        // Si la petición esta en proceso no creamos observador
        if (isLoading) return;

        // Si hay otro observador definido lo desuscribimos
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Creamos y referenciamos el observador de tarjetas actual
        observerRef.current = new IntersectionObserver((cards) => {
            // Observamos todas las tarjetas de la nueva página cargada
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        // Actualizamos la referencia al última tarjeta
        if (lastarticleElementRef.current) {
            observerRef.current.observe(lastarticleElementRef.current);
        }
    }, [isLoading, nextUrl]);

    function handleSearch(event) {
        event.preventDefault();

        const searchForm = new FormData(event.target);

        const newFilters = {};

        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });

        setFilters(newFilters);
        setarticles([]);
        setPage(1);
    }

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!articles.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <form className="box" onSubmit={handleSearch}>
                    <div className="field">
                        <label className="label">Título:</label>
                        <div className="control">
                            <input className="input" type="text" name="title" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Artista:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="artists"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de inicio:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_min"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de fin:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_max"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
                <ul>
                    {articles.map((article, index) => {
                        if (articles.length === index + 1) {
                            return (
                                <div
                                    key={article.id}
                                    ref={lastarticleElementRef}
                                    className="column is-two-thirds"
                                >
                                    <ArticleCard article={article} user_ID={user__id} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={article.id}
                                    className="column is-two-thirds"
                                >
                                    <ArticleCard article={article} user_ID={user__id} />
                                </div>
                            );
                        }
                    })}
                </ul>
                {isLoading && <p>Cargando más noticias...</p>}
            </div>
        </div>
    );
}

export default ArticleList;
