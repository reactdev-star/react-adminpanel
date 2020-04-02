import React from "react";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";

function MapConfigPannel({setConfigNeeded}) {
  
  let dragOverHandler = (event) => {  
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  let onFileDrop = (event) => {
    event.preventDefault();
    if(event.dataTransfer.items.length >0 && event.dataTransfer.items.length<2)
    {
      let dropElement = event.dataTransfer.items[0];
      if(dropElement.kind ==="file" && dropElement.type === "application/json")
      {
        let configFile = dropElement.getAsFile();
        if(configFile.name === "map.json")
        {
            let fr = new FileReader();
            let jsonMessage; 
            fr.onload = function() { //Read the fichier => this.result = file.text()
                jsonMessage = new SocketMessage(this.result,SocketMessage.TypeMessage.GAMESETUP);
                var conn = SocketController.getSocket();
                conn.send(jsonMessage.toJson());
                setConfigNeeded(false);
            };
            
            fr.readAsText(configFile); //Run fr.onload
            
        }
      }
    }
  }

  let browseUploadFile = (event) =>
  {
    console.log("browse");
    console.log(event.target.dataTransfer);
    var file = event.target.value;
    console.log(file);
    if(event.dataTransfer.items.length >0 && event.dataTransfer.items.length<2)
    {
      let dropElement = event.dataTransfer.items[0];
      if(dropElement.kind ==="file" && dropElement.type === "application/json")
      {
        let configFile = dropElement.getAsFile();
        if(configFile.name === "map.json")
        {
            let fr = new FileReader();
            let jsonMessage; 
            fr.onload = function() { //Read the fichier => this.result = file.text()
                jsonMessage = new SocketMessage(this.result,SocketMessage.TypeMessage.GAMESETUP);
                var conn = SocketController.getSocket();
                conn.send(jsonMessage.toJson());
                setConfigNeeded(false);
            };
            
            fr.readAsText(configFile); //Run fr.onload
            
        }
      }
    }
    event.preventDefault();
  }

  let drop_zone = {
    textAlign:"center",
    height: "300px",
    background: "url(drop_here.png) center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  }
  
  return (
    <div onDragOver={dragOverHandler} style={{textAlign:"center"}}>
        <span style={{ color:"grey", fontSize:"27px", fontWeight:"bold" }}>Please upload a config file</span>
        <div id="drop_zone" onClick={browseUploadFile} onDrop={onFileDrop} onDragOver={dragOverHandler} style={drop_zone}/>
        <input type="file" onDrop={browseUploadFile}/>
    </div>
  );

}
export default MapConfigPannel;

