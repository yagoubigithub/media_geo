import React, { Component } from "react";
import "./App.css";
import SaveIcon from "@material-ui/icons/Save";

import TakePicture from "./components/Take_Picture";
import { Button, Grid, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import getLocation from './getGeo'
class App extends Component {
  state = {
    photos : []
  }
  getData = val => {
    
    
    let photos = [...this.state.photos];
    photos.push({imageData : val,selected : false});
    this.setState({photos})
}
saveImage = () =>{
  this.state.photos.forEach(element => {
    if(element.selected){
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
 
}
selectImage = (imageContainer,index) => {
  console.log()
  if(!this.state.photos[index].selected){
    this.refs[imageContainer].style.backgroundColor= 'red';
    const photos = [...this.state.photos];
    photos[index].selected = true;
    this.setState({photos});
  }else{
    this.refs[imageContainer].style.backgroundColor= 'white';
    const photos = [...this.state.photos];
    photos[index].selected = false;
    this.setState({photos});
  }
 
}
  render() {
    return (
      <div className="App">
        <TakePicture sendData={this.getData} photos={this.state.photos} />
        <Button onClick={getLocation} variant="contained">
          get Geo
        </Button>

        <p id="demo" />
<p>{this.state.photos.length}</p>
{this.state.photos.length > 0 ? (<IconButton
              onClick={this.saveImage}
              
              aria-label="Delete"
            >
              <SaveIcon />
            </IconButton>) : null}
        <GridList cellHeight={200}  cols={2}>
        {this.state.photos.map((tile,index) => (
          <GridListTile  key={index} cols={1}>
          <div className="imageContainer" ref={`imageContainer${index}`} 
          onClick={()=>this.selectImage(`imageContainer${index}`,index)}>
          <img height="200" style={{maxWidth : '100%',maxHeight : '100%'}} src={tile.imageData}  />
          </div>
            
            
          </GridListTile>
        ))}
         
        </GridList>

        
      </div>
    );
  }
}

export default App;
