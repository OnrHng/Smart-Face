import React from 'react';


const Navigation = ({ onRouteChange, isSignIn }) => {
	  if (isSignIn) {
	  	return (
			<nav style ={{display: 'flex', justifyContent:'flex-end'}}>
			  <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 ma0 pointer'>Sign Out </p>
			</nav>
	    ) 
	  } else {
	  		return (
	  			<nav style ={{display: 'flex', justifyContent:'flex-end'}}>
				  <p className='f3 link dim black underline pa3 ma0 pointer'></p>
				</nav>
	  			)
	    }
}


export default Navigation; 