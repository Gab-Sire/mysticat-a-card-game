import React, {Component} from 'react';
import './styles/app.css';
import Board from './boardComponents/Board.js';
import Login from "./Login.js";
import Signup from "./Signup.js";

class App extends Component{
	constructor(props){
		super(props);
		this.state ={
			inGame: false

		};
	}
		
	render(){
		if(true===this.state.inGame){
			return(
				<Board />
			);
		}
		else{
			return <Signup />
		}
	}

}

export default App;