import React from 'react';


class Signin extends React.Component {
	constructor() {
		super();
		this.state ={
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
		
	}

	render () { 
		const {onRouteChange} = this.props;
		return(
			<article className="br3 ba b--black-10 mv4 w-150 w-50-m w-25-l mw5 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
				      <div className="mt3 w-200">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        	onChange= {this.onEmailChange} 
				        	className="pa2 input-reset ba bg-transparent hover-white " 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address"
				        />
				      </div>
				      <div className="mv3 w-200">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	onChange= {this.onPasswordChange} 
				        	className="pa2 input-reset ba bg-transparent hover-white " 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        />
				      </div>
				    </fieldset>
				    <div className="center">
				      <input 
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 br2 pv2 input-reset ba b--black bg-transparent pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3 center">
				      <p  
				      	onClick={() => onRouteChange('register')} 
				      	className="f4 link dim black db pointer ">Register
				      </p>
				    </div>
				  </div>
				</main>

			</article>	
		);
	}
	
}
export default Signin; 