const  getLocation = () => {
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
    document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
  }
export default getLocation;