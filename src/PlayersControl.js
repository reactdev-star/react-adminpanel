import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';
import Game from './model/Game';
import Entity from './model/elements/Entity';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  newMarkerPlayers = (players,Initiate=false) =>
  {
    players.forEach((player)=>{
      if(player.Id != null && player.Position != null)
      {
        let indexP = Game.getInstance().findPlayerById(player.Id);
        if( indexP != -1)
        {
          let _currentPlayer = Game.getInstance().Players[indexP];
          if(!Initiate)
          {
            if( _currentPlayer.MapEntity &&  _currentPlayer.MapEntity !== null)
            {
              _currentPlayer.Position = player.Position;
              _currentPlayer.toMapElement().setPosition({lat:player.Position[0],lng:player.Position[1]});
              if(_currentPlayer.toMapElement().visionCircle)
              _currentPlayer.toMapElement().visionCircle.setCenter({lat:player.Position[0],lng:player.Position[1]});
            }
            else
            {
              let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
              newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
              Game.getInstance().replacePlayer(indexP,newPlayer);
            }
          }
        }
        else
        {
          if(!Initiate)
          {
            let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
            newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
            Game.getInstance().addPlayer(newPlayer);
            Entity.IncrId++;
          }
        }          
      }
      else if(!Initiate)     
        console.log("Un id n'est pas indiqué pour le player: ", player);
    });
  }


  newPlayerInLobby = (players) =>
  {
    players.forEach((player)=>{
      if(player !=null && player.Id != null)
      {
        let exist = false;
        let indexP = Game.getInstance().findPlayerById(player.Id);
        if( indexP != -1)
        {
          exist = true;
        }

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
        if(exist)
        {
          Game.getInstance().replacePlayer(indexP,newPlayer);
        }
        else
        {
          Game.getInstance().addPlayer(newPlayer);
          Entity.IncrId++;
        }
      }
      else
        console.log("Un id n'est pas indiqué pour le player: ", player);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.listPlayer = [];
    let gameBegin = true;
    let gameEnded = false;

    if(Game.getInstance() != null)
    {
      let this_game = Game.getInstance();
      if((new Date()) > (new Date(this_game.EndDate)))
      {
        gameEnded=true;
      }
      else if((new Date(this_game.BeginDate)) > (new Date()))
      {
        gameBegin=false;
      }
      if(gameBegin && !gameEnded)
        this.newMarkerPlayers(Game.getInstance().Players.slice(0),true);
      
    }
    
  }

  componentDidUpdate() {
    let gameBegin = true;
    let gameEnded = false;
    if(Game.getInstance() != null)
    {
      let this_game = Game.getInstance();
      if((new Date()) > (new Date(this_game.EndDate)))
      {
        gameEnded=true;
      }
      else if((new Date(this_game.BeginDate)) > (new Date()))
      {
        gameBegin=false;
      }
    }

    if(gameBegin && !gameEnded){
      this.newMarkerPlayers(this.props.listPlayerPos);
    }
    else if (!gameBegin)
    {
      this.newPlayerInLobby(this.props.listPlayer);
    }
  }

  render()
  {
    return <div></div>
  }

}