/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
var request = require('request');
var axios = require("axios")

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

export default class Delete extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     originalid: null,
     success: false
    }

   this.submitDelete= this.submitDelete.bind(this)
   this.handleChange = this.handleChange.bind(this)
 }

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitDelete(){
    var formData = new FormData();
    formData.append('IndexName', this.props.location.state.indexname)
    formData.append('OriginalID', this.state.originalid)
    console.log("submitting ", this.props.location.state.indexname);
    axios({
      method: 'post',
      url: "http://localhost:1026/api/Delete",
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(body => {
        this.setState({
          success: body.data,
          originalid: body.data.OriginalID
      });

      console.log("response: ", body.data);
      console.log("success: ", this.state.success);
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
            justifyContent: "space-between",
            paddingTop: "10%",
            flexDirection: "column"
          }}>
            <TextField
              id="originalid"
              label="originalid"
              placeholder="Enter Original ID here"
              onChange={this.handleChange("originalid")}
              margin="normal"
            />
            <Button raised color="primary" onClick={this.submitDelete}>
              Delete Clause
            </Button>
            { this.state.success &&
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "10%",
                  flexDirection: "column"
                }}>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography type="body1" className={styles.title}>
                      "Success:"
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button dense>Learn More</Button>
                  </CardActions>
                </Card>
              </div>
              }
          </div>
        </form>
      </div>
    );
  }
}
