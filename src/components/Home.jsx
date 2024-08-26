import React, { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleView/ArticleCard"
import { useAuth } from "../contexts/AuthContext";


function Home() {
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
            page_size: 1,
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

    if (isError) return <p>Error al cargar las noticias.</p>;
    if (!articles.length && !isLoading) return <p>No hay noticias disponibles</p>;

    return (
        <div className="has-auto-count"> 
            <div className="fixed-grid">
                
                <div className="grid">
                    {articles.map((article, index,array) => {
                        if (articles.length === index + 1) {
                            return (
                                <div className= "columns">
                                    <div
                                        key={article.id}
                                        ref={lastarticleElementRef}
                                        className="column"
                                    >
                                        <ArticleCard article={article} user_ID={user__id} />                                       
                                    </div>                                                                    
                                </div>
                            );
                        } else {
                            return (        
                                    <div
                                        key={article.id}                                    
                                        className="cell"
                                    >
                                        <ArticleCard article={article} user_ID={user__id} />                                        
                                    </div>
                                    
                                
                            );
                        }
                    })}

                    
                </div>                
                
                {isLoading && <p>Cargando más noticias...</p>}
            </div>
        </div>
    );
}

export default Home;
