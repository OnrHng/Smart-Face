import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLink from './components/imagelink/ImageLink';
import Info from './components/info/Info';

class App extends React.Component {
  render (){
    return (
      <div>
        <Particles className='particles' />
        <Navigation />
        <Logo />
        <Info />
        <ImageLink />
          
     
        
        {/*
                
               
                <Image />
        */}
       </div>
    )
  }  
}

export default App;
