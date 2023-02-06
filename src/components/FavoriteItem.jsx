import React, { useContext } from "react";
import "../App.css";
import { Context } from "../context/Context";
import { getFeed } from "./utils/httpRequests";
import FavoriteButton from "./FavoriteButton";

const FavoriteItem = ({item, index, closePopUp}) => {

    const { state, dispatch } = useContext(Context);

    const removeFavorite = () => {
        if (isFavoriteSelected) {
            dispatch({type: 'REMOVE_FAVORITE_FEED', payload: item });
        }
    }

    const seeFavorite = (link) => {
        fetchFeed({target: {elements: {feed_url: {value: link}}}});
        closePopUp();
    };

    const fetchFeed = async (event) => {
        dispatch({ type: 'SET_FETCHING',  payload: true });
        try {
          const feed = await getFeed(event);
          dispatch({type: 'SET_CURRENT_FEED', payload: feed})
          dispatch({ type: 'SET_ERROR',  payload: false });
          return
        } catch (error) {
          dispatch({ type: 'SET_ERROR',  payload: true });
          return error;
        } finally {
          dispatch({ type: 'SET_FETCHING',  payload: false });
        }
    }

    const isFavoriteSelected = () => {
        return state.favoriteFeeds.some(el => el.program_link === item.program_link);
    }

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
            <FavoriteButton selected={isFavoriteSelected()}
                onClickAction={removeFavorite} />
        </div>
    )
}

export default FavoriteItem;