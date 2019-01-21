import React from 'react';
import { connect } from 'react-redux';
import BaseRoute from '../../pages/router';
import Loading from '../loading';
import Toast from '../toast';
import { show, hide } from '../../redux/actions/loading';
import HttpClient from '../../tools/httpClient';

export interface AppProps { showLoading: any; hideLoading: any; showToast: boolean; toastMsg: string; }

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    const { showLoading, hideLoading } = this.props;
    HttpClient.setBefore(() => {
      showLoading();
    });

    HttpClient.setAfter(() => {
      hideLoading();
    });
  }

  render() {
    const { showToast, toastMsg } = this.props;
    return (
      <div className="container">
        <Loading />
        <Toast visible={showToast} msg={toastMsg} />
        <BaseRoute />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { toast: { visible, msg } } = state;
  return {
    showToast: visible,
    toastMsg: msg,
  };
}
// export default App;
export default connect(mapStateToProps, { showLoading: show, hideLoading: hide })(App);
