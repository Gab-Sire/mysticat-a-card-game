import React, {Component} from 'react';
import './styles/app.css';
import axios from 'axios';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			password:'',
			errorMessage: ''
		}
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleSubmit(event){
		event.preventDefault();
	}
	
	handleChangeUsername(event){
		this.setState({username: event.target.value});
	}
	
	handleChangePassword(event){
		this.setState({password: event.target.value});
	}
	
	handleClick(event){
		console.log('Signup form submitted');
		this.attemptSignup();
	}
	
	attemptSignup(){
		const data = {username: this.state.username, password: this.state.password}
		axios({
			  method:'post',
			  url:'http://localhost:8089/signUp',
			  responseType:'json',
			  headers: {'Access-Control-Allow-Origin': "true"},
			  data: data
			})
			  .then((response)=>{
				  console.log(response.data);
				  if(response.data!==null){
					  this.props.connectPlayer(response.data);
					  this.setState({errorMessage: ""}); 
				  }
				  else{
					  	this.setState({errorMessage: "Échec, veuillez vérifier le format de votre nom d'utilisateur et mot de passe."}); 
					  }
				})
				.catch(error => {
				  console.log('Error fetching and parsing data', error);
				});
	}
	
	checkIfUsernameTaken(){
		console.log("entering");
		const data = {username: this.state.username}
		axios({
			  method:'post',
			  url:'http://localhost:8089/usernameAvailability',
			  responseType:'json',
			  headers: {'Access-Control-Allow-Origin': "true"},
			  data: data
			})
			  .then((response)=>{
				  console.log("User avail: ",response)
				  this.forceUpdate();
				})
				.catch(error => {
				  console.log('Error fetching and parsing data', error);
				});
	}
	
	
	render(){
		const USERNAME_MIN_LENGTH = 5;
		const USERNAME_MAX_LENGTH = 30;
		const PASSWORD_MIN_LENGTH = 5;
		const PASSWORD_MAX_LENGTH = 100;
		return (<div id="loginForm">
	    <form onSubmit={this.handleSubmit}>
	    <h1>Sign up</h1>
	    	<p><label htmlFor="username">Nom d'utilisateur: </label><input required type="text" name="username" id="username" ref="username" onChange={this.handleChangeUsername}/></p>
	    	<p><label htmlFor="password">Mot de passe: </label><input required type="password" name="password" id="password" ref="password" onChange={this.handleChangePassword}/></p>
	        <p><input type="Submit" onClick={this.handleClick} value="Submit" readOnly={true}/>  <input type="reset" value="Reset" /></p>
	        <p className="errorMessage">{this.state.errorMessage}</p>
	    </form>
        <div className="expectedFormat">
        	<div id="usernameFormat">
				<h4>Votre nom d'utilisateur doit être unique et doit comprendre:</h4>
				<ul>
					<li>Entre {USERNAME_MIN_LENGTH} et {USERNAME_MAX_LENGTH} caracteres inclusivement</li>
					<li>Au moins 1 chiffre</li>
					<li>Au moins 1 lettre minuscule</li>
					<li>Au moins 1 lettre majuscule</li>
				</ul>
			</div>
			<div id="passwordFormat">
				<h4>Votre mot de passe doit comprendre:</h4>
				<ul>
					<li>Entre {PASSWORD_MIN_LENGTH} et {PASSWORD_MAX_LENGTH} caracteres inclusivement</li>
					<li>Au moins 1 chiffre</li>
					<li>Au moins 1 lettre minuscule</li>
					<li>Au moins 1 lettre majuscule</li>
				</ul>
			</div>
        </div>
	    </div>)
	}
}