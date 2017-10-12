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

export default class Insert extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     heading: null,
     lob: null,
     originalid: null,
     text: null,
     success: false
   }

   this.submitInsert = this.submitInsert.bind(this)
   this.handleChange = this.handleChange.bind(this)
}

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  submitInsert(){
    console.log("submitting ", this.state.text);
    console.log("submitting ", this.props.location.state.indexname);
    request.post({
      url:'http://localhost:1026/api/Insert',
      form: {
        IndexName: this.props.location.state.indexname,
        Text: this.state.text,
        OriginalID: this.state.originalid,
        LOB: this.state.lob,
        Heading: this.state.heading,
      }
   },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('request failed:', err);
      }
      console.log('request successful! response:', body);
      // this.state.heading = body.Heading
      // this.state.headingsanitized = body.HeadingSanitized
      // this.state.lob = body.LOB
      // this.state.originalid = body.OriginalID
      // this.state.id = body.ID
      // this.state.score = body.Score
      // this.state.text = body.Text
      return body
    })
  }

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Classify Single</title>
          <meta name="description" content="infer the closest clause in selected index via query text" />
        </Helmet>
        <form method="POST" encType="multipart/form-data">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10%",
            flexDirection: "column"
          }}>
            <TextField
              id="heading"
              label="heading"
              placeholder="Enter heading here"
              onChange={this.handleChange("Heading")}
              margin="normal"
            />
            <TextField
              id="originalid"
              label="originalid"
              placeholder="Enter Original ID here"
              onChange={this.handleChange("originalid")}
              margin="normal"
            />
            <TextField
              id="lob"
              label="lob"
              placeholder="Enter Line of Business here"
              onChange={this.handleChange("lob")}
              margin="normal"
            />
            <TextField
              id="query"
              label="query"
              multiline
              rows="4"
              placeholder="Enter Clause Text here"
              onChange={this.handleChange("text")}
              margin="normal"
            />
            <Button raised color="primary" onClick={this.submitInsert}>
              Insert Clause
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
