import React, {Component} from 'react';
import axios from 'axios';

export default class MainMenu extends Component{
	constructor(props){
		super(props);
		this.state={
				playerId: null
			}
	}
	render(){
		return (<div id='MainMenu'>
				<div id='menuBox'>
					<h2> Mysticat</h2>
					<p><button onClick={this.enterQueue.bind(this)}>Enter queue</button></p>
					<p><button onClick={this.deconnexion.bind(this)}>Déconnection</button></p>
				</div>
				<div id="imgMenuPrincipal"></div>
			</div>);
	}
	deconnexion(){
		this.props.disconnectConnectPlayer(null);
	}
	enterQueue(){
		let data = this.props.playerId;
		console.log(data);
		axios({
		  method:'post',
		  url:'http://localhost:8089/enterQueue',
		  responseType:'text',
		  headers: {'Access-Control-Allow-Origin': "true"},
		  data: data
		})
		  .then((response)=>{
			  console.log(response);
			  setTimeout(()=>{
				  this.checkIfQueuePopped();
			  }, 1000)
			})
			.catch(error => {
			  console.log('Error fetching and parsing data', error);
			});
	}
	
	
	checkIfQueuePopped(){
		let data = this.props.playerId;
		console.log(data);
		axios({
		  method:'post',
		  url:'http://localhost:8089/checkIfQueuePopped',
		  responseType:'json',
		  headers: {'Access-Control-Allow-Origin': "true"},
		  data: data
		})
		  .then((response)=>{
			  console.log(response.data);
			  if(response.data===null){
				  setTimeout(()=>{
					  this.checkIfQueuePopped();
				  }, 1000)
			  }
			  else{
				  this.props.getQueueForParent(response.data);
			  }
			})
			.catch(error => {
			  console.log('Error fetching and parsing data', error);
			});
	}
	
	componentWillMount(){
		this.setState({playerId: this.props.playerId});
	}
	
}
