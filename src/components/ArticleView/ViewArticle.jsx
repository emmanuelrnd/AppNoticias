import React, {  useState, useRef } from "react";


function ObtenerPostID(article_id){
    return new Promise ((resolve, reject) =>{
        
        fetch(`${import.meta.env.VITE_API_BASE_URL}/infosphere/articles/${article_id}/`)
        .then(response=>{
            console.log(response);
            if(!response.ok){
                throw new Error('LA RESPUESTA NO FUE OK');
            }
            return response.json();
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            reject(error)
        });
    });
}

export default function ViewArticle(article) {
    
    ObtenerPostID(9)
        .then(article=>{
            console.log(article);
        })
        .catch(error=>{
            console.log(error);
        })
        
    
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
        </div>
        )       

    };

