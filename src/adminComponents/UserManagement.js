import React, {Component} from 'react';
import '../styles/admin.css';

export default class UserManagement extends Component{

	constructor(props){
		super(props);
		
	}

	render(){
		let connected = "isNotConnected";
		if(true === this.props.connected){
			connected = "isConnected";
		}
		return(
			<div>
			<p className={connected}>{this.props.index} {this.props.username}</p><button className="btnDeconnexionUser">D&eacute;connexion</button>
			</div>
		)
	}
}