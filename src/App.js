import React,  {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Info from './components/Info/Info';
import Image from './components/Image/Image';

const app = new Clarifai.App({
 apiKey: '6b3aeb6efa814671beaaf12c6aa52c11'
});

class App extends Component {
 constructor (){
    super()
    this.state = {
      input:'',
      imageUrl:'',
      box:{}
    }
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
    console.log(box);
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
    .then(response => this.displayFaceBox(this.callFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Particles className='particles' />
        <Navigation />
        <Logo />
        <Info />
        <ImageLink 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <Image box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>
    )
  }  
}

export default App;
