/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
var request = require('request');
var axios = require("axios")

export default class BatchClassifySingle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
   super(props);
   this.state = {
     batchfile: null,
     minscore: ''
   }

   this.submitBatchIndex = this.submitBatchIndex.bind(this)
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getBatchFile = event => {
    let batchfile = event.target.files[0];
    this.setState({
      batchfile: batchfile,
    });
  }

  handleChangeMinScore = event => {
    this.setState({
      minscore: event.target.value,
    });
  };

  submitBatchIndex(){
    console.log("trying ", this.state.batchfile.name);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('batchfile',this.state.batchfile)
    fd.append('MinScore',this.state.minscore)



    axios.post('http://localhost:1026/api/UploadBatchFile', fd, config);
  }


  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <Helmet>
          <title>Submi Batch Index</title>
          <meta name="description" content="submit an index to get all info back" />
        </Helmet>
        <Button raised color="primary"
          label="batchfile"
          style = {{
            width: "-webkit-fill-available"
          }}
        >
          <input type="file" onChange={this.getBatchFile} name="batchfile"/>
        </Button>
        <FormControl>
          <InputLabel htmlFor="minscore">MinScore</InputLabel>
            <Select
              value={this.state.minscore}
              onChange={this.handleChange('minscore')}
              input={<Input id="minscore" />}
            >
             <MenuItem value={0.90}>90%</MenuItem>
             <MenuItem value={0.80}>80%</MenuItem>
             <MenuItem value={0.70}>70%</MenuItem>
             <MenuItem value={0.60}>60%</MenuItem>
             <MenuItem value={0.50}>50%</MenuItem>
             <MenuItem value={0.40}>40%</MenuItem>
             <MenuItem value={0.30}>30%</MenuItem>
             <MenuItem value={0.20}>20%</MenuItem>
             <MenuItem value={0.10}>10%</MenuItem>
             <MenuItem value={0.00}>0%</MenuItem>
           </Select>
          <FormHelperText>MinScore if returning more than 1 result</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="maxresults">MaxResults</InputLabel>
          <Input id="maxresults" />
          <FormHelperText>Enter Max Results if not using Classify Single</FormHelperText>
        </FormControl>
        <Button raised color="primary" onClick={this.submitBatchIndex}>
          Submit Batch Index
        </Button>
      </div>
    );
  }
}
