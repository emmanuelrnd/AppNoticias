import useFetch from "../../hooks/useFetch";
//import DeletearticleModal from "./DeleteSongModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewArticle from "./ViewArticle";

function ArticleCard({ article, user_ID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();
    const navigate = useNavigate();

    return (
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img
                        src= {article.image}
                        alt="Placeholder image"
                        />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media-left">
                    
                    <div class="media-content">
                        <p className={`title is-4 has-text-black`}>                            
                            {article.title}
                        </p>
                    </div>
                    </div>

                    <div class="content">
                    <p className={`title is-5 has-text-black`}>                            
                        {article.abstract}
                    </p>
                    <br />
                    <time datetime="2016-1-1">{article.created_at}</time>
                    </div>
                </div>     

                {article.author == user_ID ? (
                    <div className="column" onClick={() => setIsModalOpen(true)}>
                        <button className="button is-danger">Eliminar</button>
                    </div>
                ) : (
                    <div className="column" onClick={() => navigate("/vista")}>
                        <p>{article.id}</p>
                         <ViewArticle article_id={article.id}  />

                        <button className="button is-danger">VER ARTICULO</button>
                    </div>
                )}
                {isModalOpen ? (
                    <DeletearticleModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        article_id={article.id}
                        onDelete={{ data, isLoading, isError, doFetch }}
                    />
                ) : null}
            </div>
    );
}

export default ArticleCard;
