import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { PhotoCamera, Close } from "@material-ui/icons/";

const styles = {
  container: {
    position: "relative",
    display: "block",
    height: "100%",
    background: "#ddd"
  },
  video: {
    position: "fixed",
    background: "#555",
    top: "25%",
    maxWidth: "100%"
  },
  canvas: {
    position: "absolute",
    opacity: 0
  },
  img: {
    position: "fixed",
    top: "25%",
   
  }
};
class TakePicture extends Component {
  state = {
    open: false,
    photos: this.props.photos
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    setTimeout(function() {
      const video = document.getElementById("video"),
        canvas = document.getElementById("canvas"),
        capture = document.getElementById("capture");
      let width = 0;
      let height = 0;
      capture.style.opacity = 0;

      video.addEventListener("loadedmetadata", function() {
        capture.style.opacity = 1;
        width = this.videoWidth;
        height = this.videoHeight;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        //
        // ...
      });
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      navigator.getMedia(
        {
          video: {
            width: { min: window.innerWidth },
            height: { min: window.innerHeight }
          },
          audio: false
        },
        function(stream) {
          //
          video.srcObject = stream;
          video.play();
        },
        function(error) {
          //error
        }
      );
    }, 500);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handelCapture = () => {
    const video = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      span_img = document.getElementById("span_img"),
      context = canvas.getContext("2d");
      span_img.innerHTML ='';

      var img = document.createElement("img");
      span_img.appendChild(img);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    this.props.sendData(canvas.toDataURL("image/png"));

    console.log("capture");
    img.setAttribute("src", canvas.toDataURL("image/png"));
    img.setAttribute("width", window.innerWidth);

    img.style.opacity = 1;
    img.style.transition = "transform 1s";
    img.style.transform = "scale(0,0)";
   
    /*-ms-transform: scale(0.5, 0.5); 
-webkit-transform: scale(0.5, 0.5);
transform: scale(0.5, 0.5);*/
/* 
    let imgData = canvas.toDataURL("image/png");
   
    var save_btn = document.getElementById("save_btn");
    save_btn.style.opacity = 1;
 var xhttp = new XMLHttpRequest();
    save_btn.addEventListener("click", function() {
      //save image
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log("saved");
        }
      };
      xhttp.open("POST", "http://localhost/getImage/index.php", false);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send(`imgData=${imgData}`);
    }); */
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
          <div className={classes.container}>
            <video className={classes.video} id="video" autoPlay />

            <canvas className={classes.canvas} id="canvas" />
            <span id="span_img" className={classes.img} />

            <IconButton
              onClick={this.handleClose}
              style={{ position: "absolute" }}
              aria-label="Close"
            >
              <Close />
            </IconButton>
            <IconButton
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={this.handelCapture}
              id="capture"
            >
              <PhotoCamera />
            </IconButton>
            <IconButton
              id="save_btn"
              style={{ position: "absolute", bottom: 0, left: 0, opacity: 0 }}
              aria-label="Delete"
            >
              <SaveIcon />
            </IconButton>
          </div>
        </Dialog>

        <IconButton
          onClick={this.handleClickOpen}
          variant="contained"
          color="primary"
        >
          Take Picture
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(TakePicture);
