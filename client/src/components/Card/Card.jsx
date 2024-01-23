import React from "react";

const Card = (props) => {

    const{id, name, description, platforms, image_url, released, rating} = props.videogame

    return(
        <div>
            <div>
                <img src={image_url} alt="" />

                <link to={`/detail/${id}`}>{name}</link>
                <h4>{description}</h4>
                <h4>{platforms}</h4>
                <h4>{released}</h4>
                <h4>{rating}</h4>
            </div>
        </div>
    )
}

export default Card;