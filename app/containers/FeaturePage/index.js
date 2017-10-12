/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
var axios = require("axios")


import Button from 'material-ui/Button';
import { Link } from 'react-router-dom'

export class FeaturePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  // componentDidMount() {
  //   if (this.props.username && this.props.username.trim().length > 0) {
  //     this.props.onSubmitForm();
  //   }
  // }

  // const { loading, error, repos } = this.props;
  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // };
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      success: null
    }

  }

  downloadIndex = () => {
    var formData = new FormData();
    formData.append('IndexName', this.props.location.state.indexname)
    console.log("submitting ", this.props.location.state.indexname);
    axios({
      method: 'post',
      url: "http://localhost:1026/api/DownloadIndex",
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(body => {
      console.log("Download response: ", body);
        this.setState({
        success: body.data
      });

      console.log(body.data);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

  }


  render() {

    return (
      <div style={{display: "flex", justifyContent: "center"}}>

        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

          <Link to={{
            pathname: '/ClassifySingle',
            state: { indexname: this.props.location.state.indexname }
          }}>
            <Button raised color="primary" onClick={this.submitClassifySingle}>
              Classify Single
            </Button>
          </Link>
          <Link to="/BatchClassifySingle">
            <Button raised color="primary">
              Batch Classify
            </Button>
          </Link>
          <Link to={{
            pathname: '/Insert',
            state: { indexname: this.props.location.state.indexname }
          }}>
            <Button raised color="primary">
              Insert
            </Button>
          </Link>
          <Link to={{
            pathname: '/Delete',
            state: { indexname: this.props.location.state.indexname }
          }}>
            <Button raised color="primary">
              Delete
            </Button>
          </Link>
          <Link to={{
            pathname: '/Update',
            state: { indexname: this.props.location.state.indexname }
          }}>
            <Button raised color="primary">
              Update
            </Button>
          </Link>
          <Button raised color="primary" onClick={this.downloadIndex}>
            Download Index
          </Button>

        </div>

      </div>
    );
  }
}

// HomePage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.bool,
  // ]),
  // repos: PropTypes.oneOfType([
  //   PropTypes.array,
  //   PropTypes.bool,
  // ]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
// };

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: (evt) => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }

// const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  // withReducer,
  // withSaga,
  // withConnect,
)(FeaturePage);
