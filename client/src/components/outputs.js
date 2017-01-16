import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Outputs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderOutputs = this.renderOutputs.bind(this);
  }
  renderOutputs() {
    let bases = Object.keys(this.props.outputs).sort();
    return (
      bases.map(name => {
        return (
          <div key={`output-${name}`}>
            <div>{name}</div>
            <div>
              <div>
                {this.props.outputs[name].left.map(val => <div>{val}</div>)}
              </div>
              <br />
              <div>
                {this.props.outputs[name].right.map(val => <div>{val}</div>)}
              </div>
            </div>
          </div>
        );
      })
    );
  }
  render() {
    return (
      <div>
        {this.renderOutputs()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    outputs: state.outputs
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Outputs);