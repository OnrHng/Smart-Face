import React,  {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLink from './components/ImageLink/ImageLink';
import Info from './components/Info/Info';
import Image from './components/Image/Image';

const app = new Clarifai.App({
 apiKey: '6b3aeb6efa814671beaaf12c6aa52c11'
});

const initialState = {
   input:'',
   imageUrl:'',
   box:{},
   route: 'signin',
   isSignIn: false,
   user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined:new Date()
   } 
}

class App extends Component {
 constructor (){
    super()
    this.state = initialState;
    
  }

  loadUser = (data ) => {
    this.setState( {user: {
       id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
 
  callFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const face = document.getElementById('inputimage');
    const width = Number(face.width);
    const height = Number(face.height);
    return {
      leftCol:faceData.left_col * width,
      topRow: faceData.top_row *height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState ({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => {
      if (response) {
        fetch ('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        }) 
      })
        .then(response => response.json())
        .then(count => {
          this.setState (Object.assign(this.state.user, {entries : count}))
        })
        .catch(console.log)
       } 
      this.displayFaceBox(this.callFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignIn: true})
    } else if (route === 'signin' || route === 'register') {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div>
        <Particles className='particles' />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} />
        { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Info name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLink 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <Image box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : ( this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register  loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ) 
        }
       </div>
    )
  }  
}

export default App;
