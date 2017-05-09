import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setLearningRates } from '../actions/learningRateActions';

class LearningRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 1.0,
      probSphere: 2.0,
      minConn: 5,
      maxConn: 10
    };
    this.updateRates = this.updateRates.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.changeSphere = this.changeSphere.bind(this);
    this.changeRateBlur = this.changeRateBlur.bind(this);
    this.changeSphereBlur = this.changeSphereBlur.bind(this);
    this.changeMinConn = this.changeMinConn.bind(this);
    this.changeMaxConn = this.changeMaxConn.bind(this);
  }
  updateRates() {
    this.props.setLearningRates(
      this.state.rate,
      this.state.probSphere,
      this.state.minConn,
      this.state.maxConn
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.learningRate);
  }
  changeRate(e) {
    this.setState({rate: e.target.value})
  }
  changeSphere(e) {
    this.setState({probSphere: e.target.value})
  }
  changeRateBlur(e) {
    this.setState({rate: parseFloat(e.target.value)})
  }
  changeSphereBlur(e) {
    this.setState({probSphere: parseFloat(e.target.value)})
  }
  changeMinConn(e) {
    this.setState({minConn: parseInt(e.target.value)})
  }
  changeMaxConn(e) {
    this.setState({maxConn: parseInt(e.target.value)})
  }
  render() {
    return (
      <div>
        <div>
          Modification rate:  <input type="text" value={this.state.rate} onChange={this.changeRate} onBlur={this.changeRateBlur} />
        </div>
        <div>
          Probability sphere:  <input type="text" value={this.state.probSphere} onChange={this.changeSphere} onBlur={this.changeSphereBlur} />
        </div>
        <div>
          Min connections:  <input type="number" min={0} value={this.state.minConn} onChange={this.changeMinConn} />
        </div>
        <div>
          Max connections:  <input type="number" min={1} value={this.state.maxConn} onChange={this.changeMaxConn} />
        </div>
        <button onClick={this.updateRates}>Update</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    learningRate: state.learningRate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setLearningRates }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningRates);