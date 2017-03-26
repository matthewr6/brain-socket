import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createSensor } from '../actions/actions';

// todo - center validation
class SensorCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      radius: 5,
      count: 1,
      plane: '',
      centerX: 2,
      centerY: 2,
      centerZ: 2,
      outputCount: 1
    };
    this.create = this.create.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeX = this.changeX.bind(this);
    this.changeY = this.changeY.bind(this);
    this.changeZ = this.changeZ.bind(this);
    this.changeOutputCount = this.changeOutputCount.bind(this);
    this.changePlane = this.changePlane.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
  }
  create() {
    // todo - do validation
    if (['x', 'y', 'z'].indexOf(this.state.plane) > -1 || this.state.plane === '') {
      this.props.createSensor(this.state); // because SCREW IT that's a lot of params
    }
  }
  changeName(e) {
    this.setState({name: e.target.value});
  }
  changePlane(e) {
    this.setState({plane: e.target.value});
  }
  changeRadius(e) {
    this.setState({radius: e.target.value});
  }
  changeX(e) {
    this.setState({centerX: parseInt(e.target.value)});
  }
  changeY(e) {
    this.setState({centerY: parseInt(e.target.value)});
  }
  changeZ(e) {
    this.setState({centerZ: parseInt(e.target.value)});
  }
  changeOutputCount(e) {
    this.setState({outputCount: parseInt(e.target.value)});
  }
  changeCount(e) {
    this.setState({count: parseInt(e.target.value)});
  }
  render() {
    return (
      <div>
        <div>Name:  <input type="text" value={this.state.name} onChange={this.changeName} /></div>
        <div>Plane:  <input type="text" maxLength="1" value={this.state.plane} onChange={this.changePlane} /></div>
        <div>Radius: <input type="number" value={this.state.radius} min="1" onChange={this.changeRadius} /></div>
        <div>Count: <input type="number" min="1" value={this.state.count} onChange={this.changeCount} /></div>
        <div>Center X: <input type="number" value={this.state.centerX} onChange={this.changeX} /></div>
        <div>Center Y: <input type="number" value={this.state.centerY} onChange={this.changeY} /></div>
        <div>Center Z: <input type="number" value={this.state.centerZ} onChange={this.changeZ} /></div>
        <div>Output Count: <input type="number" value={this.state.outputCount} onChange={this.changeOutputCount} /></div>
        <div><button onClick={this.create}>Create</button></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sensors: state.sensors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createSensor }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorCreation);