import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import Industries from '../industries';
import thenBy from 'thenby';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function getSteps() {
  return ['About You', 'About The Evenet'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    default:
      return 'Unknown step';
  }
}

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      askedFor: 0,
      exchangeForStake: 0,
      valuation: 0,
      industry: null,
      valuationOffer: -1
    };
    
    this.getOffer = this.getOffer.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async getOffer() {
    await fetch(`http://localhost:8081`, 
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ askedFor: parseInt(this.state.askedFor), exchangeForStake: parseInt(this.state.exchangeForStake), valuation: parseInt(this.state.valuation), industry: this.state.industry }) }).then(async (res) => {
        let r = await res.json()
        this.setState({
        valuationOffer: r 
      })
    }).catch((error) => console.error(error))
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <div>
          <Paper className={classes.paper} elevation={1}>
            <Typography variant='h5' component='h3'>
              New Business Predictor{' '}
            </Typography>{' '}
            <Typography component='p'>
              This form will be used to create a prediction for you.{' '}
            </Typography>{' '}
            <Grid container spacing={12}>
              <Grid item xs={6}>
                <TextField
                  id='standard-select-currency'
                  select
                  className={classes.textField}
                  value={this.state.industry}
                  onChange={this.handleChange('industry')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText='Please select your industry'
                  margin='normal'>
                  {Industries.sort(thenBy('industry_name')).map(industry => (
                    <MenuItem key={industry.code} value={industry.code}>
                      {' '}
                      {industry['industry_name']}{' '}
                    </MenuItem>
                  ))}{' '}
                </TextField>
              </Grid>{' '}
              <Grid item xs={6}>
               <TextField
                  id="standard-number"
                  label="Exchange Stake (%)"
                  defaultValue={this.state.exchangeForStake}
                  onChange={this.handleChange('exchangeForStake')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  min={0}
                  max={100}
                />
              </Grid>{' '}
              <Grid item xs={6}>
               <TextField
                  id="standard-number"
                  label="Valuation"
                  defaultValue={this.state.valuation}
                  onChange={this.handleChange('valuation')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  min={0}
                />
              </Grid>{' '}
              <Grid item xs={6}>
               <TextField
                  id="standard-number"
                  label="Asking For ($)"
                  defaultValue={this.state.askedFor}
                  onChange={this.handleChange('askedFor')}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  min={0}
                />
              </Grid>{' '}
            </Grid>{' '}
            <Button
              variant='contained'
              color='primary'
              onClick={this.getOffer}
              className={classes.button}>
              Submit <Icon className={classes.rightIcon}> send </Icon>{' '}
            </Button>{' '}
            {
              (this.state.valuationOffer > -1) && (
                <Typography variant="caption">
                      You can expect an offer of ${parseInt(this.state.valuationOffer).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </Typography>
              )
            }
          </Paper>{' '}
        </div>{' '}
      </main>
    );
  }
}
export default withStyles(styles)(Landing);
