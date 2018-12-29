import React, { Component } from 'react';
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
class Take_Video extends Component {
    state = { 
        videoData: [],
    videoRecording : false,
    iconStopStart :<PlayArrow fontSize="large" />,
     }
    render() { 
        return (
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
        </div></Dialog> );
    }
}
 
export default Take_Video;
 
export default withStyles(styles)(Take_Video);