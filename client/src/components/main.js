import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeSocket } from '../actions/socketActions';

class Main extends Component {
  componentDidMount() {
    this.props.initializeSocket();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeSocket }, dispatch);
}

export default connect(null, mapDispatchToProps)(Main);