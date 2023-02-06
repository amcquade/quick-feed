import React, { useContext } from "react";
import FavoriteButton from "./FavoriteButton";
import Episode from "./Episode";
import { useState } from "react";
import { Context } from "../context/Context";

const EpisodeList = ({
    program_title,
    program_description,
    program_image,
    episodes,
    program_link
  }) => {
  
  const { state, dispatch } = useContext(Context);
  
  // eslint-disable-next-line no-unused-vars
  const [cardStyle, setCardStyle] = useState({width: "20vw", float: "left"});

  const toggleFavorite = () => {
    const feedData = {
      program_title,
      program_image,
      program_description,
      program_link
    };
    isFavoriteSelected() ? dispatch({type: 'REMOVE_FAVORITE_FEED', payload: feedData }) : dispatch({type: 'ADD_FAVORITE_FEED', payload: feedData });
  }

  const isFavoriteSelected = () => {
    return state.favoriteFeeds.some(el => el.program_link === program_link);
  }

  return (
    <div>
      {episodes ? (
        <div>
          <div id="menu" styles={{ float: "left" }}></div>
          <div className="card" style={cardStyle}>
            <img
              src={program_image}
              className="card-img-top"
              alt={program_title}
            />
            <div className="card-body">
              <h5 className="card-title">{program_title}</h5>
              <FavoriteButton 
                selected={isFavoriteSelected()}
                onClickAction={toggleFavorite} />
              <div
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: program_description,
                }}
              />
            </div>
          </div>
          {episodes.map((episode, i) => (
            <Episode
              key={Math.random() * i}
              index={i}
              title={episode.title}
              enclosure={episode.enclosure}
              link={
                episode.enclosure
                  ? episode.enclosure.url
                  : "json_data is null or undefined"
              }
              image={program_image}
              description={episode.description}
            />
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default EpisodeList;
