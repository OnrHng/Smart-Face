import React from 'react';
import './ImageLink.css';

const ImageLink = ({onInputChange, onButtonSubmit}) => {
 return(
   <div>
	<p className='f3 center'>
	  This Magic App will detect faces in your photos. Try it...
	</p>
	<div className='center'>
	  <div className='patterns center pa4 br3 shadow-5 '>
		<input  
			className='f4 pa2 br1 w-80 center' 
			type='text' 
			onChange={onInputChange}/>
		<button 
			onClick={onButtonSubmit}
			className='w-20 grow br2 f4 link ph3 pv2 dib white bg-light-purple'>Start</button>
	  </div>
	</div>
  </div>	
	)
}
export default ImageLink; 