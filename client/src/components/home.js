import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { step, saveState } from '../actions/actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveName: '',
      saveFrames: false,
      stepIncrement: 1
    };
    this.step = this.step.bind(this);
    this.saveState = this.saveState.bind(this);
    this.changeIncrement = this.changeIncrement.bind(this);
    this.toggleFrameSave = this.toggleFrameSave.bind(this);
    this.changeSaveName = this.changeSaveName.bind(this);
  }
  step() {
    this.props.step(this.state.stepIncrement, this.state.saveFrames);
  }
  saveState() {
    this.props.saveState(this.state.saveName);
  }
  changeIncrement(e) {
    this.setState({stepIncrement: parseInt(e.target.value)});
  }
  toggleFrameSave(e) {
    this.setState({saveFrames: e.target.checked});
  }
  changeSaveName(e) {
    this.setState({saveName: e.target.value});
  }
  render() {
    return (
      <div>
        <button onClick={this.step}>Step ({this.props.status})</button>
        <button onClick={this.saveState}>Save</button>
        <input type="checkbox" checked={this.state.saveFrames} onChange={this.toggleFrameSave} />
        <input type="text" value={this.state.saveName} onChange={this.changeSaveName} />
        <input type="number" value={this.state.stepIncrement} onChange={this.changeIncrement} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    outputs: state.outputs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ step, saveState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);