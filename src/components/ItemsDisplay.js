import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

import ItemManager from "../model/elements/ItemManager";

function ItemsDisplay({items}) { //affiche la liste des objetc que possède un joueur

    let listItems = null;
    if (Game.getInstance() && items && Object.keys(items).length > 0 ) { 
        let _listItems = items;
    
        listItems = Object.keys(_listItems).map(function (keyI, index) // Pour chaque objet dans son sacs
        {
            let item = _listItems[keyI];
            let icon = ItemManager.getIcon(item.Type).url; //on cherche l'image de l'objet
            return <Col key={keyI}>
                        <img style={{width: "60px"}} alt={item.Type} src={icon}></img> 
                    </Col>

        });

    }

    return (
        <div style={{marginBottom: "5px"}}>
            <Container style={{borderStyle:"outset",borderWidth: "2px"}}>
                <span>BackPack</span>
                <Row style={{borderStyle:"outset",borderWidth: "2px",backgroundColor:"#9d9b97a6"}}>
                    {listItems ?listItems: <span style={{ fontSize:"18px", fontWeight:"bold" }}>No Items</span>}
                </Row>                    
            </Container>    
        </div>
    );

}
export default ItemsDisplay;