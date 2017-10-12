import React, {Component} from 'react';
import './styles/app.css';
import Board from './boardComponents/Board.js';
import Login from "./Login.js";
import Signup from "./Signup.js";
import Connection from "./Connection.js";

class App extends Component{
	constructor(props){
		super(props);
		this.state ={
			inGame: true,
			playerId: null,
			signupMode:false,
			tagLoginSignUp:"Sign Up"

		};
	}
	
	changeSignUpMode(){
		let statut = this.state.signupMode;
		this.setState({ signupMode: !statut});
		if(this.state.signupMode){
			this.setState({ tagLoginSignUp: "Sign Up"});
		}else{
			this.setState({ tagLoginSignUp: "Login"});
		}
	}
	
	render(){
		if(false===this.state.inGame && null !=this.state.playerId){
			return null;
		}else if(true===this.state.inGame){
			return(
				<Board />
			);
		}
		else{
			/*if(this.state.signupMode){
				return <Signup />
			}else{
				return <Login />
			}*/
			return (<div><Connection signupMode={this.state.signupMode} />
			<div className='linkConnection'>Allez à la page: 
				<button onClick={this.changeSignUpMode.bind(this)}>{this.state.tagLoginSignUp}</button>
			</div>
					</div>)
			
		}
	}
	
}

export default App;