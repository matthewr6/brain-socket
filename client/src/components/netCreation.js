import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createNew } from '../actions/actions';

class NetCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 1,
      y: 1,
      z: 1
    };
    this.create = this.create.bind(this);
    this.changeX = this.changeX.bind(this);
    this.changeY = this.changeY.bind(this);
    this.changeZ = this.changeZ.bind(this);
  }
  create() {
    // this.props.createNew(this.state.x, this.state.y, this.state.z);
    console.log(this.state);
  }
  changeX(e) {
    this.setState({x: parseInt(e.target.value)});
  }
  changeY(e) {
    this.setState({y: parseInt(e.target.value)});
  }
  changeZ(e) {
    this.setState({z: parseInt(e.target.value)});
  }
  render() {
    //x, y , z, sensors
    return (
      <div>
        <div>X (will be doubled): <input type="number" min="1" value={this.state.x} onChange={this.changeX} /></div>
        <div>Y: <input type="number" min="1" value={this.state.y} onChange={this.changeY} /></div>
        <div>Z: <input type="number" min="1" value={this.state.z} onChange={this.changeZ} /></div>
        <div><button onClick={this.create}>Create</button></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createNew }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NetCreation);