/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
var request = require('request');
var axios = require("axios")

export default class SubmitIndex extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     query: null,
     file: null
   }

   this.submitIndex= this.submitIndex.bind(this)
   this.getFile = this.getFile.bind(this)
 }

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  getFile = event => {
    let file = event.target.files[0];
    this.setState({
      file: file,
    });
  }

  submitIndex(){
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('file',this.state.file)
    console.log("submitting ", this.state);


    axios.post('http://localhost:1026/api/', fd, config);

    // redirect to Johannes on success.
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <Helmet>
          <title>Submit Index</title>
          <meta name="description" content="infer the closest clause in selected index via query text" />
        </Helmet>
        <Button raised color="primary"
          label="file"
          style = {{
            width: "-webkit-fill-available"
          }}
        >
          <input type="file" onChange={this.getFile} name="file"/>
        </Button>
        <Button raised color="primary" onClick={this.submitIndex}>
          Submit Index
        </Button>

      </div>
    );
  }
}
