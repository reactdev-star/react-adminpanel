import React,{useState,useEffect} from "react";
import momentLocalizer from 'react-widgets-moment';
import styled from "styled-components";
import moment from 'moment';


import GoogleMap from "./mapControllers/GoogleMap.js";
import MapImportConfigPannel from "./mapControllers/MapImportConfigPannel";

import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import Game from "./model/Game";

import MapConfigPannel from "./form/MapConfigPannel";

import ModalEndGame from "./components/ModalEndGame";
import ModalBeginGame from "./components/ModalBeginGame";

const MapContainer = styled.div`
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
z-index: 10;
`


function App() {
  const [gameInstance,setGameInstance] = useState(false);
  const [configJsonNeeded,setConfigJsonNeeded]  = useState(false); // MODIF false
  const [gameEnded,setGameEnded]  = useState(false);
  const [gameBegin,setGameBegin]  = useState(true);
  const [beginDate,setBeginDate] = useState(new Date());
  const [config,setConfig]= useState(false);
  const [winners,setWinners] = useState(null);

  const openUpload = () =>{
    setGameEnded(false);
    setGameInstance(false);
    setConfigJsonNeeded(true);
  }

  const initWebsocket= () => {
    let conn = SocketController.getSocket();
    conn.onmessage = function(event){
      var message = new SocketMessage(event.data);
      switch(message.MessageType)
      {
        case SocketMessage.TypeMessage.NOMAP:
          setConfigJsonNeeded(true);
          break;
        case SocketMessage.TypeMessage.GAMESETUP:
          if(!config)
          {
            let game = message.ContainedEntity;
            let this_game = Game.getInstance(game);
            if(this_game.IsFinal)
            {
              setBeginDate(this_game.BeginDate);
              setGameInstance(true);
              if(((new Date()) > (new Date(this_game.EndDate) ))&& (this_game.Type === Game.GameType.TIME || this_game.Type === Game.GameType.FLAG))
              {
                setGameEnded(true);
              }
              else if((new Date(this_game.BeginDate)) > (new Date()))
              {
                setGameBegin(false);
              }
            }
            else
            {
              setConfig(this_game);
            }
          }
          break;
        case SocketMessage.TypeMessage.GAMEENDED:
          if(!config)
          {
            setWinners(message.ContainedEntity.Teams);
            let game = message.ContainedEntity.Game;
            Game.getInstance(game);
            setGameEnded(true);
            setGameInstance(true);
            /*let game = message.ContainedEntity;
            let this_game = Game.getInstance(game);
            if(this_game.IsFinal)
            {
              setBeginDate(this_game.BeginDate);
              setGameInstance(true);
              if(((new Date()) > (new Date(this_game.EndDate) )&& this_game.Type === Game.GameType.TIME))
              {
                setGameEnded(true);
              }
              else if((new Date(this_game.BeginDate)) > (new Date()))
              {
                setGameBegin(false);
              }
            }
            else
            {
              setConfig(this_game);
            }*/
          }
          break;
        default:
          break;
      }
    }
  }
  
  useEffect(() => { // On Open Admin
    momentLocalizer(moment);
    initWebsocket();
  }, []);
  
  return (
    <MapContainer>  
        {configJsonNeeded&&<MapImportConfigPannel setConfigJsonNeeded={setConfigJsonNeeded} setConfig= {setConfig}/>}
        {config&&<MapConfigPannel Config={config} setConfig={setConfig}/>}
        {gameInstance&&<GoogleMap gameEnded={gameEnded} setWiner={setWinners} setGameEnded={setGameEnded}/>}
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin} beginDate={beginDate}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded} winners={winners} openUpload={openUpload}/>}
        <div style={{textAlign: "center",paddingTop: "20%"}}>
          {!gameInstance&& !configJsonNeeded && !config &&<span style={{ color:"grey", fontSize:"22px", fontWeight:"bold" }}>Game Server Is Down</span>}
        </div>
    </MapContainer>
  );

}
export default App;

