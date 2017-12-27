import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSensor } from '../actions/sensorActions';

class Sensors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSensors = this.renderSensors.bind(this);
  }
  renderSensors() {
    const sensors = this.props.sensors;
    const bases = sensors.names.sort();
    return (
      bases.map(name => {
        return (
          <div key={`sensor-${name}`}>
            <div>
              <div>{name} <input type="checkbox" checked={sensors.statuses[name]} onChange={(e) => this.props.toggleSensor(name, e.target.checked)} /></div>
            </div>
          </div>
        );
      })
    );
    /*
    <div>one <input type="checkbox" checked={sensors.statuses[`${name}-one`]} onChange={(e) => this.props.toggleSensor(`${name}-one`, e.target.checked)} /></div>
    <div>two <input type="checkbox" checked={sensors.statuses[`${name}-two`]} onChange={(e) => this.props.toggleSensor(`${name}-two`, e.target.checked)} /></div>
    */
  }
  render() {
    return (
      <div>
        {this.renderSensors()}
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
  return bindActionCreators({ toggleSensor }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sensors);