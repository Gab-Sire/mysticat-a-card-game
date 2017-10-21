import React, {Component} from 'react';
import axios from 'axios';
import PopUpQueue from './PopUpQueue.js'

const TIME_BETWEEN_POLLS = 1000;
export default class MainMenu extends Component{
	constructor(props){
		super(props);
		this.state={
				playerId: null,
				isLookingForGame: false,
				tag:"hidden"
			}
	}

	componentWillMount(){
		this.setState({playerId: this.props.playerId});
	}

	render(){
		return (<div id='MainMenu'>
				<div id='menuBox'>
					<h2 id="titleMenu"> Mysticat</h2>
					<div className='menuContainer'>
						<p><button className='btn btn-lg btn-primary btn-block btn-signin' onClick={this.enterQueue.bind(this)}>Trouver un adversaire</button></p>
						<p><button className='btn btn-lg btn-primary btn-block btn-signin' onClick={this.displayUnderContruction.bind(this)}>Regarder une Partie</button></p>
						<p><button className='btn btn-lg btn-primary btn-block btn-signin' onClick={this.displayUnderContruction.bind(this)}>Consulter ses decks</button></p>
						<p><button className='btn btn-lg btn-primary btn-block btn-signin' onClick={(event)=>{this.cancelQueue();
								setTimeout(()=>{
									this.deconnexion();
								}, TIME_BETWEEN_POLLS)
							}
						}
						>Déconnexion</button></p>
						<p><button className='btn btn-lg btn-primary btn-block btn-signin' onClick={this.getHardCodedGame.bind(this)}>Get test game</button></p>
						<div className={this.state.tag}>Pas encore disponible</div>
					</div>
				</div>
				<div id="imgMenuPrincipal"></div>
				<PopUpQueue iSQueueingUp={this.state.isLookingForGame} cancelQueue={this.cancelQueue.bind(this)} />
			</div>);
	}

	enterQueue(){
		this.hideUnderContruction();
		this.setState({isLookingForGame: true})
		this.forceUpdate();
		let data = this.props.playerId;
		axios({
		  method:'post',
		  url:'http://localhost:8089/enterQueue',
		  responseType:'text',
		  headers: {'Access-Control-Allow-Origin': "true"},
		  data: data
		})
		  .then((response)=>{
			  setTimeout(()=>{
				  this.checkIfQueuePopped();
			  }, TIME_BETWEEN_POLLS)
			})
			.catch(error => {
			  console.log('Error fetching and parsing data', error);
			});
	}

	checkIfQueuePopped(){
		let data = this.props.playerId;
		axios({
		  method:'post',
		  url:'http://localhost:8089/checkIfQueuePopped',
		  responseType:'json',
		  headers: {'Access-Control-Allow-Origin': "true"},
		  data: data
		})
		  .then((response)=>{
			  if(response.data===null && this.state.isLookingForGame === true){
				  setTimeout(()=>{
					  this.checkIfQueuePopped();
				  }, TIME_BETWEEN_POLLS)
			  }
			  else if(this.state.isLookingForGame===true){
				  this.props.getQueueForParent(response.data);
			  }
			})
			.catch(error => {
			  console.log('Error fetching and parsing data', error);
			});
	}

	cancelQueue(){
		this.setState({isLookingForGame: false});
		//Contacter le serveur pour etre removed.
		let data = this.props.playerId;
		axios({
		  method:'post',
		  url:'http://localhost:8089/cancelQueue',
		  responseType:'json',
		  headers: {'Access-Control-Allow-Origin': "true"},
		  data: data
		}).catch(error => {
			  console.log('Error fetching and parsing data', error);
			});
	}

	getHardCodedGame(){
		axios({
			  method:'get',
			  url:'http://localhost:8089/getHardCodedGame',
			  responseType:'json',
			  headers: {'Access-Control-Allow-Origin': "true"}
			})
			  .then((response)=>{
									console.log(response.data);
				  this.props.getQueueForParent(response.data);
				})
				.catch(error => {
				  console.log('Error fetching and parsing data', error);
				});
	}

	displayUnderContruction(){
		this.setState({tag: "visible"});
	}
	hideUnderContruction(){
		this.setState({tag: "hidden"});
	}

	deconnexion(){
		this.hideUnderContruction();
		this.props.disconnectPlayer();
	}

}
