import React from "react";

import logo from "../logo.svg";

const LoadingStatus = ({ fetching }) => {
  const styles = {
    statusContainer: {
      height: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContainer: {
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.25)",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1
    },
    modal: {
      width: "250px",
      height: "200px",
      background: "white",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    statusText: {
      margin: 0
    }
  };

  return (
    <div style={styles.statusContainer}>
      {fetching ? (
        <div style={styles.modalContainer}>
          <div style={styles.modal}>
            <img src={logo} alt="loading animation" />
          </div>
        </div>
      ) : (<div></div>)}
    </div>
  );
};

export default LoadingStatus;
