import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import AltarManager from './model/elements/Altar.js';
import ItemManager from './model/elements/Item.js';
import Game from './model/Game.js';
import $ from 'jquery';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  addAltar = (mousePos) => // event add Altar marker
  {
    let newAltar = AltarManager.createAltar(mousePos);
    var withColision=true;
    var withVisionCircle=true;
    newAltar.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle,withColision);
    Game.getInstance().addAltar(newAltar);
  }

  addItem = (mousePos) => // event add Item marker
  {
    let newItem = ItemManager.createItem(mousePos,"CultMag");
    var withColision=true;
    var withVisionCircle=true;
    newItem.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle,withColision);
    Game.getInstance().addItem(newItem);
  }

  componentWillMount() { // MapControll creation
    this.map = this.context[MAP]; // get the google map object
    this.divDrawManager = window.document.createElement('div'); // create a body div
    this.map.controls[this.props.position].push(this.divDrawManager); // put the body div on the map
  }

  componentDidUpdate() {
    if(!this.props.canDraw())
    {
        //delete the cursor option
        $('div.gm-style').find('div[style*="z-index: 2000000000;"]').remove();
        //window.google.maps.event.clearListeners(this.map, 'click'); // clear all action add Element on the map
        Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
          window.google.maps.event.clearListeners(zone.toMapElement(), 'click'); // clear all action add Element on zone
          if(zone.editable)
            window.google.maps.event.addListener(zone.toMapElement(), 'click',()=>!this.props.canDraw()&&this.props.setSelectedEdited(zone));
          else
            window.google.maps.event.addListener(zone.toMapElement(), 'click',()=>!this.props.canDraw()&&this.props.setSelectedDrawed(zone)); // clear all action add Element on zone
        });
    }
    else
    {
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.clearListeners(zone.toMapElement(), 'click'); // clear all action add Element on zone
      });
    }

    if(this.props.canDrawItem)
    { 
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
      //this.map.addListener('click',this.addItem); // add the action listener click add Altar on the map
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.addListener(zone.toMapElement(), 'click',(event)=>this.addItem([event.latLng.lat(),event.latLng.lng()])); // add the action listener click add Altar on zone
      });
    }
    else if(this.props.canDrawAltar)
    {
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
      //this.map.addListener('click',this.addAltar); // add the action listener click add Altar on the map
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.addListener(zone.toMapElement(),'click',(event)=>this.addAltar([event.latLng.lat(),event.latLng.lng()])); // add the action listener click add Altar on zone
      });
    }        
  }

  componentWillUnmount() { // MapControll destroyer
    this.map.controls[this.props.position].removeAt(this.divIndex); // remove the div body on the map
  }

  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}