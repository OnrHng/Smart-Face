import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './facelogo.png';

const Logo = () => {
	return(
		<div className='nt0'>
			<Tilt className="Tilt br2 shadow-2 ma3 pa3" options={{ max : 25 }} style={{ height: 110, width: 100 }} >
			 <div className="Tilt-inner "><img src={logo} alt='logo'/>  </div>
			</Tilt>
		</div>
		)
}
export default Logo; 