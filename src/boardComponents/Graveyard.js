import React, {Component} from 'react';
import CardTile from '../cardComponents/CardTile.js';
import Card from '../cardComponents/Card.js';

export default class Graveyard extends Component{
	constructor(props){
		super(props);
		this.state={ isEmpty:true};
	}
	
	render(){
		this.state.isEmpty = (this.props.size>0) ? false : true;
		
		if(true == this.state.isEmpty){
			return (<div id={this.props.id} className="graveyard">
				<div className="graveyardCount">
					{this.props.size}
				</div>
	   			<CardTile />
	   		</div>);
		}
		else{
			return (<div id={this.props.id} className="graveyard">
				<div className="graveyardCount">
					{this.props.size}
				</div>
	   			<Card faceUp="false" />
	   		</div>);
		}
	}
}
