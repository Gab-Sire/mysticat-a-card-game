import React, {Component} from 'react';
import axios from 'axios';
import './app.css';
import _ from 'lodash';
import Card from './Card.js';
import Minion from './Minion.js';
import CardTile from './CardTile.js';
import Field from './Field.js';
import Graveyard from './Graveyard.js';
import Deck from './Deck.js';
import Hero from './Hero.js';

class App extends Component{
	constructor(props){
		super(props);
		this.getInitialGameInstance();
		this.state ={
				// En attendant que le call asynchrone finisse besoin d'un
				// player
			gameState : {
				currentMana: 0,
				players: [
						{
						hero: {
							health:30
						},
						hand : [
							{
								name: "test",
								initialPower: "test",
								manaCost: "test",
								initialHealth: "test",
								initialSpeed: "test",
								description: "test"

							}
						], 
						field : [
							null, 
							null, 
							null, 
							null, 
							null, 
							null, 
							null
						]
						},
						{
							hero:{
								health:30
							},
							hand : [
								{
									name: "test",
									initialPower: "test",
									manaCost: "test",
									initialHealth: "test",
									initialSpeed: "test",
									description: "test"

								}
							],
							field : [
								null, 
								null, 
								null, 
								null, 
								null, 
								null, 
								null
							]
						}
				]
			}
		}
	}
	render(){
		let self = this.state.gameState.players[0];
		let opponent = this.state.gameState.players[1];
		let selfHealth = self.hero.health;
		let opponentHealth = opponent.hero.health;
		let selfMana = self.remainingMana;
			return(
				<div id="container">
					<div id="board">
						<div id="opponentHand" className="hand">
						<div className="cardFacedDown"></div>
						</div>
						
						<Hero id="opponentHero" health={opponentHealth} heroName="wizardHero"/>
							
						<div id="opponentFieldContainer" className="fieldContainer">
							<Graveyard id="opponentGraveyard" />
							<Field id="opponentField" grid={[opponent.field]} />
							<Deck id="opponentDeck" />
						</div>
						
						<div id="selfFieldContainer" className="fieldContainer">
							<Graveyard id="selfGraveyard" />
							<Field id="selfField" grid={[self.field]} />
							<Deck id="selfDeck" />
						</div>
							
						<Hero id="selfHero" health={selfHealth} mana={selfMana} heroName="warriorHero"/>
							
						<div id="selfHand" className="hand">
							{this.renderSelfHand()}
						</div>
						<button onClick={this.updateGameState.bind(this)}>End turn</button>
					</div>
					
				</div>
			);
	}
	
	renderSelfHand(){
		let selfHand = this.state.gameState.players[0].hand;
		const props = (this.state.gameState.players[0].hand);
		return _.map(selfHand, card=> <Card {...card}{...props}/>);
		
	}
	
	// Fonction qui fetch un game state fait par Spring avec valeurs par defaut
	getInitialGameInstance(){
		axios({
			  method:'get',
			  url:'http://localhost:8089/getHardCodedGame',
			  responseType:'json',
			  headers: {'Access-Control-Allow-Origin': "true"}
			})
			  .then((response)=>{
				  this.setState({gameState: response.data});
				  this.forceUpdate();
				  console.log(response.data);
				})
				.catch(error => {
				  console.log('Error fetching and parsing data', error);
				});
	}
	
	updateGameState(){
		const data = this.state.gameState;
		axios({
			  method:'post',
			  url:'http://localhost:8089/updateGame',
			  responseType:'json',
			  headers: {'Access-Control-Allow-Origin': "true"},
			  data: data
			})
			  .then((response)=>{
				  this.setState({gameState: response.data});
				  this.forceUpdate();
				  console.log(response.data);
				})
				.catch(error => {
				  console.log('Error fetching and parsing data', error);
				});
	}

}

export default App;