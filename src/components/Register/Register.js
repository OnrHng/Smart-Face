import React from 'react';

class Register extends React.Component {
	constructor() {
		super();
		this.state ={
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://damp-mountain-89707.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			})
			.catch(err=> console.log('unexpected type'));
		
	}
	render() {
		return(
			<article className="br3 ba b--black-10 mv5 w-300 w-100-m w-25-l mw5 shadow-5 center">
				<main className="pa5 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 center">Register</legend>
				      <div className="mt3 w-300">
				        <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-white " 
				        	type="text" 
				        	name="name"  
				        	id="name"
				        	onChange= {this.onNameChange}
				        />
				      </div>
				      <div className="mt3 w-300">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-white " 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address"
				        	onChange= {this.onEmailChange}
				        />
				      </div>
				      <div className="mv3 w-300">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-white " 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange= {this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="center">
				      <input 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 br2 pv2 input-reset ba b--black bg-transparent pointer f4 dib pa2" 
				      	type="submit" 
				      	value="Register"
				      />
				    </div>
				  </div>
				</main>

			</article>	
		)
	}
}


export default Register; 