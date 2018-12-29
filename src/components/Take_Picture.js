import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { PhotoCamera, Close, Videocam, Camera,PlayArrow,Pause,Brightness1,CameraFront,CameraRear} from "@material-ui/icons/";
import soundFile from "../audio/camera-shutter-click-03.mp3";

const styles = {
  container: {
    position: "relative",
    display: "block",
    height: "100%",
    background: "#ddd",
    overflow : 'hidden',
    maxWidth : '100%'
  },
  video: {
    position: "fixed",
    background: "#555",
    maxWidth: "100%"
  },
  canvas: {
    position: "absolute",
    opacity: 0
  },
  img: {
    position: "fixed",
   
  }
};
class TakePicture extends Component {
  state = {
    openDialogPicture: false,
    openDialogVideo: false,
    photos: this.props.photos,
    videoData: [],
    videoRecording : false,
    iconStopStart :<PlayArrow fontSize="large" />,
    facingMode : { exact: "environment" }
    
   
  };

  handelOpenDialogPicture = () => {
    this.setState({ openDialogPicture: true });
    setTimeout(()=> {
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
          video:{facingMode: "user"},
          audio: false
        },
        (stream)=> {
          //
          if (window.URL) {
            try {
              video.src = window.URL.createObjectURL(stream);
            } catch (error) {
              video.srcObject = stream;
            }
          } else {
            video.src = stream;
          }
          video.play();
        },
        (error)=> {
          //error
        }
      );
    }, 500);
  };

  handelcloseDialogPictue = () => {
   
    this.setState({ openDialogPicture: false });
   

  };

  handelCapture = () => {
    const video = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      span_img = document.getElementById("span_img"),
      context = canvas.getContext("2d");
    span_img.innerHTML = "";

    var img = document.createElement("img");
    span_img.appendChild(img);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    this.props.sendData(canvas.toDataURL("image/png"));

    console.log("capture");
    var audio = new Audio(soundFile);
    audio.play();
    img.setAttribute("src", canvas.toDataURL("image/png"));
    img.setAttribute("width", window.innerWidth);

    img.style.opacity = 1;
    img.style.transition = "transform 1s";

    img.style.transform = `translate(-${video.videoWidth}px,-${
      video.videoHeight
    }px)`;
  };
  handelcloseDialogVideo = () => {
    this.setState({ openDialogVideo: false });
  };
  InitVideo = () => {
    setTimeout(()=> {
      const video = document.getElementById("video");
      console.log("initVideo");
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      navigator.getMedia(
        {
          video:{facingMode : "user"} ,
          audio: false
        },
      (stream)=> {
          //
          
          
          if (window.URL) {
            try {
              video.src = window.URL.createObjectURL(stream);
            } catch (error) {
              video.srcObject = stream;
            }
          } else {
            video.src = stream;
          }
          video.play();
          const mediaRecorder = new MediaRecorder(stream);
          document
            .getElementById("startRecordBtn")
            .addEventListener("click", ()=> {
              if(this.state.videoRecording){
                console.log("stop record");
                mediaRecorder.stop();
                
                this.setState({videoRecording : false});
                this.setState({iconStopStart : <PlayArrow fontSize="large" /> });
  
              }else{
                console.log("start record");
                mediaRecorder.start();
                this.setState({videoRecording : true});
                this.setState({iconStopStart : <Pause fontSize="large" /> });
  
              }
            });
          let videoData = [];
          mediaRecorder.ondataavailable = (ev) => {
            console.log("ondataavailable");
            videoData.push(ev.data);
          };
          mediaRecorder.onstop = evt => {
            console.log("onStop");
            let blob = new Blob(videoData, { type: "video/mp4" });
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.setAttribute("download","video");
            a.target = "_blank";
            
            document.body.appendChild(a);

            a.click();
          };
        },
        function(error) {
          //error
          console.log(error);
        }
      );
    }, 500);
  };
  closePictureOpenVideo = () => {
    this.setState({ openDialogVideo: true });
    this.setState({ openDialogPicture: false });
    this.InitVideo();
  };
  closeVideoOpenPicture = () => {
    this.setState({ openDialogVideo: false });
    this.handelOpenDialogPicture();
  };
  switchFacingMode =()=>{
    if(this.state.facingMode === "user"){
     this.setState({facingMode : { exact: "environment" }})

    }else{
      this.setState({facingMode :"user"})
    }
    this.handelcloseDialogVideo();
    this.closePictureOpenVideo();
    
  }
 
  
  render() {
    const { classes } = this.props;
    console.log(this.state.facingMode);
    // console.log(this.state.videoData);
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.openDialogPicture}
          onClose={this.handelcloseDialogPictue}
        >
          <div className={classes.container}>
            <video className={classes.video} id="video" autoPlay />

            <canvas className={classes.canvas} id="canvas" />
            <span id="span_img" className={classes.img} />

            <IconButton
              onClick={this.handelcloseDialogPictue}
              style={{ position: "absolute" }}
              aria-label="Close"
            >
              <Close fontSize="large" />
            </IconButton>
            <IconButton
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={this.closePictureOpenVideo}
            >
              <Videocam fontSize="large" />
            </IconButton>

            <IconButton
              style={{ position: "absolute", bottom: 0, left: "47vw" }}
              onClick={this.handelCapture}
              id="capture"
            >
              <Camera fontSize="large" />
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
        <Dialog
          fullScreen
          open={this.state.openDialogVideo}
          onClose={this.handelcloseDialogVideo}
        >
          <div className={classes.container}>
            <IconButton
              onClick={this.handelcloseDialogVideo}
              style={{ position: "absolute",top: 0, left: 0,zIndex : 20 }}
              aria-label="Close"
            >
              <Close fontSize="large" />
            </IconButton>

            <video className={classes.video} id="video" autoPlay />
            <IconButton
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={this.closeVideoOpenPicture}
            >
              <PhotoCamera fontSize="large" />
            </IconButton>

            <IconButton
              style={{ position: "absolute", bottom: 0, left: "47vw" }}
              
              id="startRecordBtn"
            >
            {this.state.iconStopStart}
              
            </IconButton>
           
            <IconButton
              style={{ position: "absolute", top: 0, right: 0 }}
              
            >
            {this.state.videoRecording ?  <Brightness1   color="error"/> : null}
             
            </IconButton>
            <IconButton
              style={{ position: "absolute", top: '5%', right: 0 }}
              onClick={this.switchFacingMode}
              
            >
            {this.state.facingMode === "user" ?  <CameraRear   fontSize="large"/> : <CameraFront   fontSize="large"/>}
             
            </IconButton>
          
          </div>
        </Dialog>
        <IconButton
          onClick={this.handelOpenDialogPicture}
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
