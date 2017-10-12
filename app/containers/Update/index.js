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

export default class Update extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     heading: null,
     lob: null,
     originalid: null,
     score: null,
     text: null,
     success: false
   }
   this.submitGetClause = this.submitGetClause.bind(this)
   this.submitUpdate = this.submitUpdate.bind(this)
   this.handleChange = this.handleChange.bind(this)
 }

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitGetClause(){
    var formData = new FormData();
    formData.append('IndexName', this.props.location.state.indexname)
    formData.append('OriginalID', this.state.originalid)
    axios({
      method: 'post',
      url: "http://localhost:1026/api/GetClause",
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(body => {
      console.log("Got Clause: ",body);
        this.setState({
          // heading: body.data.Heading,
          lob: body.data.LOB,
          heading: body.data.Heading,
          originalid: body.data.OriginalID,
          id: body.data.ClauseID,
          score: body.data.Score,
          text: body.data.Text,
          success: true,
      });

    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

  }

  submitUpdate(){
    var formData = new FormData();
    formData.append('IndexName', this.props.location.state.indexname)
    formData.append('QueryText', this.state.text)
    formData.append('LOB', this.state.lob)
    formData.append('OriginalID', this.state.originalid)
    formData.append('Heading', this.state.heading)
    console.log("submitting ", this.state.text);
    console.log("submitting ", this.props.location.state.indexname);
    axios({
      method: 'post',
      url: "http://localhost:1026/api/Update",
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(body => {
      console.log("success: ", body);
        this.setState({
          success: body,
      });

    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

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
            justifyContent: "center",
            paddingTop: "10%",
            flexDirection: "column"
          }}>
          {
            !this.state.success &&
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row"
            }}>
            <TextField
              id="originalid"
              label="originalid"
              placeholder="Enter Original ID here"
              onChange={this.handleChange("originalid")}
              margin="normal"
            />
            <Button raised color="primary" onClick={this.submitGetClause}>
              Get Clause
            </Button>
            </div>
          }
          {
            this.state.success &&
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            }}>
            <TextField
              id="heading"
              label="heading"
              value={this.state.heading}
              placeholder="Enter heading here"
              onChange={this.handleChange("heading")}
              margin="normal"
            />
            <TextField
              id="originalid"
              label="originalid"
              value={this.state.originalid}
              placeholder="Enter Original ID here"
              onChange={this.handleChange("originalid")}
              margin="normal"
            />
            <TextField
              id="lob"
              label="lob"
              value={this.state.lob}
              placeholder="Enter Line of Business here"
              onChange={this.handleChange("lob")}
              margin="normal"
            />
            <TextField
              id="query"
              label="query"
              multiline
              rows="4"
              value={this.state.text}
              placeholder="Enter Clause Text here"
              onChange={this.handleChange("text")}
              margin="normal"
            />
            <Button raised color="primary" onClick={this.submitUpdate}>
              Update Clause
            </Button>
            </div>

          }
          </div>
        </form>
      </div>
    );
  }
}
