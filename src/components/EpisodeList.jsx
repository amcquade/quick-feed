import React from "react";
import Episode from "./Episode";

function EpisodeList({ program_title, program_description, program_image, episodes }) {
  const cardStyle = {
    width: "20vw",
    float: "left",
  };

  return (
    <div>
      {episodes && (
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
      )}
    </div>
  );

}

export default EpisodeList;
