import React, { Component } from "react";
import "./App.css";
import getPicture from "./photos";
import TakePicture from "./components/Take_Picture";
import { Button, Grid, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import getLocation from './getGeo'
class App extends Component {
  state = {
    photos : []
  }
  getData = val => {
    
    
    let photos = [...this.state.photos];
    photos.push(val);
    this.setState({photos})
}
  render() {
    return (
      <div className="App">
        <TakePicture sendData={this.getData} photos={this.state.photos} />
        <Button onClick={getLocation} variant="contained">
          get Geo
        </Button>

        <p id="demo" />

        <GridList cellHeight={200}  cols={2}>
        {this.state.photos.map((tile,index) => (
          <GridListTile  key={index} cols={1}>
            <img src={tile}  />
            
          </GridListTile>
        ))}
         
        </GridList>
      </div>
    );
  }
}

export default App;
