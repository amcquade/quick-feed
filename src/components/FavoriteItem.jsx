import React from "react";
import "../App.css";
import FavoriteButton from "./FavoriteButton";

const FavoriteItem = ({item, index, closePopUp, updateFavorites, isFavoriteSelected, getFeed}) => {

    const removeFavorite = () => {
        localStorage.removeItem(`favorite-${item.program_link}`);
        updateFavorites();
    }

    const seeFavorite = (link) => {
        getFeed({target: {elements: {feed_url: {value: link}}}});
        closePopUp();
    };

    return (
        <div className="favorite-item" key={index}>
            <div className="action-container" onClick={() => seeFavorite(item.program_link)}>
                <div className="img-container">
                <img
                    src={item.program_image}
                    alt={item.program_title}
                />
                </div>
                <div className="informations">
                    <p className="title">{item.program_title}</p>
                    <p className="description">{item.program_description}</p>
                </div>
            </div>
            <FavoriteButton selected={isFavoriteSelected(item.program_link)}
                onClickAction={removeFavorite} />
        </div>
    )
}

export default FavoriteItem;