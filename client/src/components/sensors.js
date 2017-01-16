import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Sensors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSensors = this.renderSensors.bind(this);
  }
  renderSensors() {
    let bases = this.props.sensors.sort();
    return (
      bases.map(name => {
        return (
          <div key={`sensor-${name}`}>
            <div>{name}</div>
          </div>
        );
      })
    );
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
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sensors);