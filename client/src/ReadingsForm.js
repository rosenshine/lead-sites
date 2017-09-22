import React, {Component} from 'react';
import Map from './Map';
import Pin from './Pin';
import Heading from './Heading'
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './MyGreatPlace'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as stuffActions from './actions/stuffActions'
import thunk from 'redux-thunk';

let locations = require('./LeadSites');

class ReadingsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reading: null
    };
  }

  submitReading(){
    fetch('/contributors', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        lat: this.props.positions.lat,
        lng: this.props.positions.lng,
        reading: this.state.reading
      })
    });
  }
  render(){
    return <div className="App">
      <Heading/>
      <div id="map_holder"><Map/></div>

      <form id='a_form'>
        Reading:<br/><input onChange={(event) =>{this.setState({reading: parseInt(event.target.value)})}} type="text" id="reading" label="reading"/> ppm
      </form>
        <button onClick={() =>{this.submitReading()}}>Submit Measurements</button>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    positions: state.positions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stuffActions: bindActionCreators(stuffActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingsForm);
