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
import Button from 'material-ui/Button';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import TextField from 'material-ui/TextField';
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

export default class ClassifySingle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     query: null,
     heading: null,
     headingsanitized: null,
     lob: null,
     originalid: null,
     id: null,
     score: null,
     text: null,
     success: false
   }

   this.submitClassifySingle = this.submitClassifySingle.bind(this)
   this.handleChangeQuery = this.handleChangeQuery.bind(this)
 }

  handleChangeQuery = event => {
    this.setState({
      query: event.target.value,
    });
  };

  handleResponse = body => {
    self.setState({
      heading: body.Heading,
      headingsanitized: body.HeadingSanitized,
      lob: body.LOB,
      originalid: body.OriginalID,
      id: body.ID,
      score: body.Score,
      text: body.Text,
    });
  };




  submitClassifySingle(){
    var formData = new FormData();
    formData.append('IndexName', this.props.location.state.indexname)
    formData.append('QueryText', this.state.query)
    console.log("submitting ", this.state.query);
    console.log("submitting ", this.props.location.state.indexname);
    axios({
      method: 'post',
      url: "http://localhost:1026/api/ClassifySingle",
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(body => {
        this.setState({
          heading: body.data.Heading,
          headingsanitized: body.data.HeadingSanitized,
          lob: body.data.LOB,
          originalid: body.data.OriginalID,
          id: body.ID,
          score: body.data.Score,
          text: body.Text,
      });

      console.log(body.data);
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
              id="query"
              label="query"
              multiline
              rows="4"
              placeholder="Enter Clause Text here"
              onChange={this.handleChangeQuery}
              margin="normal"
            />
            <Button raised color="primary" onClick={() => this.submitClassifySingle()}>
              Classify Single
            </Button>
          </div>
        </form>
        { this.state.score &&
            <div style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10%",
              flexDirection: "column"
            }}>
            <Card className={styles.card}>
              <CardContent>
                <Typography type="body1" className={styles.title}>
                  {this.state.heading}
                </Typography>
                <Typography type="headline" component="h2">
                  {this.state.score}
                </Typography>
                <Typography type="body1" className={styles.pos}>
                  {this.state.id}
                </Typography>
                <Typography component="p">
                  {this.state.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button dense>Learn More</Button>
              </CardActions>
            </Card>
          </div>
          }
      </div>
    );
  }
}
