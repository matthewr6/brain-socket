import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { step, saveState, loadState, toggleAutorun, changeDirectoryName } from '../actions/actions';
import Outputs from './outputs';
import Sensors from './sensors';
import NetCreation from './netCreation';
import SensorCreation from './sensorCreation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveName: '',
      loadName: '',
      saveFrames: false,
      saveIO: true,
      stepIncrement: 1,
      showNetCreation: false,
      showSensorCreation: false,
    };
    this.step = this.step.bind(this);
    this.saveState = this.saveState.bind(this);
    this.changeIncrement = this.changeIncrement.bind(this);
    this.toggleFrameSave = this.toggleFrameSave.bind(this);
    this.toggleIOSave = this.toggleIOSave.bind(this);
    this.changeSaveName = this.changeSaveName.bind(this);
    this.autorunToggle = this.autorunToggle.bind(this);
    this.loadState = this.loadState.bind(this);
    this.changeLoadName = this.changeLoadName.bind(this);
    this.toggleNewNet = this.toggleNewNet.bind(this);
    this.closeNewNet = this.closeNewNet.bind(this);
    this.toggleNewSensor = this.toggleNewSensor.bind(this);
    this.closeNewSensor = this.closeNewSensor.bind(this);
  }
  step() {
    this.props.step(this.state.stepIncrement, this.state.saveFrames, this.state.saveIO);
  }
  saveState() {
    this.props.saveState(this.state.saveName);
  }
  loadState() {
    this.props.loadState(this.state.loadName); // todo - have same input for load/save name?
  }
  changeIncrement(e) {
    this.setState({stepIncrement: parseInt(e.target.value)});
  }
  toggleFrameSave(e) {
    this.setState({saveFrames: e.target.checked});
  }
  toggleIOSave(e) {
    this.setState({saveIO: e.target.checked});
  }
  changeSaveName(e) {
    this.setState({saveName: e.target.value});
  }
  changeLoadName(e) {
    this.setState({loadName: e.target.value});
  }
  autorunToggle(e) {
    this.props.autorunToggle(e.target.checked);
  }
  toggleNewNet() {
    this.setState({showNetCreation: !this.state.showNetCreation});
  }
  closeNewNet() {
    this.setState({showNetCreation: false});
  }
  toggleNewSensor() {
    this.setState({showSensorCreation: !this.state.showSensorCreation});
  }
  closeNewSensor() {
    this.setState({showSensorCreation: false});
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.step}>Step ({this.props.status.frames})</button>
        </div>
        <div>
          Save frames:  <input type="checkbox" checked={this.state.saveFrames} onChange={this.toggleFrameSave} />
        </div>
        <div>
          Save sensors/output state:  <input type="checkbox" checked={this.state.saveIO} onChange={this.toggleIOSave} />
        </div>
        <div>
          Cycle automatically:  <input type="checkbox" checked={this.props.status.autorun} onChange={this.autorunToggle} />
        </div>
        <div>
          Cycle increment:  <input type="number" min="1" value={this.state.stepIncrement} onChange={this.changeIncrement} />
        </div>
        
        <div>
          <button onClick={this.saveState}>Save</button>
        </div>
        <div>
          Save name:  <input type="text" value={this.state.saveName} onChange={this.changeSaveName} />
        </div>

        <div>
          <button onClick={this.loadState}>Load</button>
        </div>
        <div>
          Load name:  <input type="text" value={this.state.loadName} onChange={this.changeLoadName} />
        </div>

        <div>
          Directory:  <input type="text" value={this.props.status.directory} onChange={(e) => this.props.changeDirectoryName(e.target.value)} />
        </div>

        <div>
          <button onClick={this.toggleNewNet}>Create New</button>
        </div>
        {this.state.showNetCreation && <NetCreation close={this.closeNewNet} />}

        <div>
          <button onClick={this.toggleNewSensor}>Create Sensor</button>
        </div>
        {this.state.showSensorCreation && <SensorCreation close={this.closeNewSensor} />}

        <div>
          <div>Outputs</div>
          <Outputs />
          <div>Sensors</div>
          <Sensors />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ step, saveState, loadState, toggleAutorun, changeDirectoryName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);