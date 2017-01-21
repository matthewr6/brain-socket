import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeSocket } from '../actions/socketActions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.initializeSocket();
  }
  render() {
    if (this.props.connected) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>not connected</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    connected: state.socket.connected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);