import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Collapse } from "@material-ui/core";

const Episode = ({ link, title }) => {
  const [open, setOpen] = useState(false);

  const divStyles = {
    width: "77vw",
    float: "right",
    marginRight: "1vw",
  };

  return (
    <div
      className="list-group"
      style={divStyles}
      onClick={() => setOpen((prev) => !prev)}
    >
      <p className="list-group-item list-group-item-action text-left">
        {title}
      </p>
      <Collapse in={open}>
        <ReactAudioPlayer
          className="audioPlayer"
          src={link}
          controls
          autoplay={false}
        />
      </Collapse>
    </div>
  );
};

// class Episode extends Component {
//   divStyles = {
//     width: "77vw",
//     float: "right",
//     marginRight: "1vw",
//   };
//   render() {
//     return (
//       <div className="list-group" style={this.divStyles}>
//         <a
//           href={this.props.link}
//           className="list-group-item list-group-item-action text-left"
//         >
//           {this.props.title}
//         </a>
//         <Collapse>
//           <p>{this.props.title}</p>
//         </Collapse>
//       </div>
//     );
//   }
// }

export default Episode;
