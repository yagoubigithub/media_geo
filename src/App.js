import React, { Component } from "react";
import "./App.css";
import SaveIcon from "@material-ui/icons/Save";
import Checkbox from "@material-ui/core/Checkbox";

import TakePicture from "./components/Take_Picture";
import {
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  FormControlLabel
} from "@material-ui/core";
import getLocation from "./getGeo";
class App extends Component {
  state = {
    photos: [],
    selectAll: false
  };
  getData = val => {
    let photos = [...this.state.photos];
    photos.push({ imageData: val, selected: false });
    this.setState({ photos });
  };
  saveImage = () => {
    this.state.photos.forEach(element => {
      if (element.selected) {
        const xhttp = new XMLHttpRequest();
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
        xhttp.send(`imgData=${element.imageData}`);
      }
    });
  };
  selectImage = (imageContainer, index) => {
    console.log();
    if (!this.state.photos[index].selected) {
      this.refs[imageContainer].style.backgroundColor = "#0088cc";
      const photos = [...this.state.photos];
      photos[index].selected = true;
      this.setState({ photos });
    } else {
      this.refs[imageContainer].style.backgroundColor = "white";
      const photos = [...this.state.photos];
      photos[index].selected = false;
      this.setState({ photos });
    }
  };
  handelSelectAll = () => {
    this.selectAll();
    this.setState({ selectAll: !this.state.selectAll });
  };
  selectAll = () => {
    if (!this.state.selectAll) {
      const photos = [...this.state.photos];
      photos.map((element,index) => {
        photos[index].selected = true;
        this.refs[`imageContainer${index}`].style.backgroundColor = "#0088cc";
      });
      this.setState({photos});
    } else {
      const photos = [...this.state.photos];
      photos.map((element,index) => {
        photos[index].selected = false;
        this.refs[`imageContainer${index}`].style.backgroundColor = "white";
      });
      this.setState({photos});
    }
  };

  render() {
    return (
      <div className="App">
        <TakePicture sendData={this.getData} photos={this.state.photos} />
        <Button onClick={getLocation} variant="contained">
          get Geo
        </Button>

        <p id="demo" />
        <p>{this.state.photos.length}</p>
        {this.state.photos.length > 0 ? (
          <div>
            <IconButton onClick={this.saveImage} aria-label="Delete">
              <SaveIcon />
            </IconButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.selectAll}
                  onClick={this.handelSelectAll}
                  color="primary"
                />
              }
              label="Select All"
            />
          </div>
        ) : null}
        <GridList cellHeight={150} cols={2}>
          {this.state.photos.map((tile, index) => (
            <GridListTile key={index} cols={1}>
              <div
                className="imageContainer"
                ref={`imageContainer${index}`}
                onClick={() =>
                  this.selectImage(`imageContainer${index}`, index)
                }
              >
                <img
                  height="136"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  src={tile.imageData}
                />
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default App;
