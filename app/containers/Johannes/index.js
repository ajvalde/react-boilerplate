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
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
const styles = theme => ({
  container: {
    display: 'flex',
    jusifyContent: "center",
    width: 1200
  },
  ccontainer: {
    display: 'flex',
    jusifyContent: "space-between",
    width: 400
  },
  cccontainer: {
    display: 'flex',
    flexDirection: "row",
    width: 800
  },
  upload:{
    display: "flex",
    flexDirection: "column",
    width: 200
  }
});
export class Johannes extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
  constructor (props) {
    super(props);
    this.state = {
      indexname: ""
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    console.log(this.state.indexname);
  };

  render() {

    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <Link to="/SubmitIndex" style={{alignSelf: "center"}} >
            <Button style={{justifyContent: "center"}} raised color="primary" onClick={this.submitIndex}>
              Submit Index
            </Button>
          </Link>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <TextField
            id="indexname"
            label="indexname"
            placeholder="Index Name"
            value={this.state.indexname}
            onChange={this.handleChange('indexname')}
            className={styles.texts}
            margin="normal"
          />
          <Link to={{
            pathname: '/Features',
            state: { indexname: this.state.indexname }
          }}>
              <Button raised color="primary">
                Next
              </Button>
          </Link>
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
)(Johannes);
