import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import {
  PhotoCamera,
  Close,
  Videocam,
  Camera,
  PlayArrow,
  Pause,
  Brightness1,
  CameraFront,
  CameraRear
} from "@material-ui/icons/";

const styles = {
  container: {
    position: "relative",
    display: "block",
    height: "100%",
    background: "#ddd",
    overflow: "hidden",
    maxWidth: "100%"
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
    position: "fixed"
  }
};
class Take_Video extends Component {
  state = {
    videoData: [],
    videoRecording: false,
    iconStopStart: <PlayArrow fontSize="large" />,
    facingMode: { exact: "environment" }
  };
  componentDidMount(){
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
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>


               {/*   close Button*/ }
        <IconButton
          onClick={this.props.handelcloseDialog}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }}
          aria-label="Close">
          <Close fontSize="large" />
        </IconButton>

        <video className={classes.video} id="video" autoPlay />

{/* 
 <IconButton
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={this.closeVideoOpenPicture}
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
*/}



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
       

       {/*    <IconButton
              style={{ position: "absolute", top: '5%', right: 0 }}
              onClick={this.switchFacingMode}
              
            >
            {this.state.facingMode === "user" ?  <CameraRear   fontSize="large"/> : <CameraFront   fontSize="large"/>}
             
            </IconButton> */}
      </div>
    );
  }
}

export default withStyles(styles)(Take_Video);
