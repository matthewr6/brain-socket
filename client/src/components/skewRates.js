import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSkews } from '../actions/parameterActions';

class Skews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axonSkew: 0.75,
      minorSkew: 0.5,
    };
    this.updateSkews = this.updateSkews.bind(this);
    this.changeAxonSkew = this.changeAxonSkew.bind(this);
    this.changeMinorSkew = this.changeMinorSkew.bind(this);
  }
  updateSkews() {
    this.props.setSkews(
      this.state.axonSkew,
      this.state.minorSkew
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.parameters);
  }
  changeAxonSkew(e) {
    this.setState({axonSkew: parseFloat(e.target.value)})
  }
  changeMinorSkew(e) {
    this.setState({minorSkew: parseFloat(e.target.value)})
  }
  render() {
    return (
      <div>
        <div>
          Axon skew:  <input type="number" min={0} value={this.state.axonSkew} onChange={this.changeAxonSkew} />
        </div>
        <div>
          Minor skew:  <input type="number" min={1} value={this.state.minorSkew} onChange={this.changeMinorSkew} />
        </div>
        <button onClick={this.updateSkews}>Update</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parameters: state.parameters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSkews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Skews);