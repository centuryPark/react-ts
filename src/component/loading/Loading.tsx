import React, { Component } from 'react';
import { connect } from 'react-redux';

interface LoadingProps {
  isShow?: boolean;
}

class Loading extends Component<LoadingProps> {
  render() {
    const { isShow } = this.props;
    return (
      <div className="component-loading" style={{ display: isShow ? 'flex' : 'none' }}>
        loading...
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isShow: state.loading,
  };
}

export default connect(mapStateToProps)(Loading);
