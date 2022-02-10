import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
const useStyles = (theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
  },
  padding: {
    padding: 10,
  },
  timerStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 38px)",
    gridGap: 10,
    // padding: "20px 10px",
    padding: 0,
    "& li": {
      textAlign: "center",
      padding: 0,
      "& div": {
        // background: "#2a3b64",
        background: "#fff",
        color: "#2a3b64",
        margin: 0,
        borderRadius: 6,
        // padding: "2px 0px 10px",
        padding: "5px 0px",
        "& span": {
          fontSize: "1rem",
        },
        "& p": {
          color: "#fff",
        },
      },
    },
  },
});
class Timer extends Component {
  state = {
    minutes: 0,
    seconds: 0,
    hours: 0,
    count: 0,
    showWarning: false,
    warningMin: 0,
  };

  componentWillUnmount() {
    if (this.myInterval) clearInterval(this.myInterval);
  }

  getTime() {
    if (this.state.seconds > 0) {
      this.setState(({ seconds, count }) => ({
        seconds: seconds - 1,
        count: count + 1,
      }));
      if (this.state.count == 20) {
        this.setState({
          showWarning: true,
        });
      }
    } else if (this.state.hours == 0) {
      if (this.state.minutes === 0) {
        this.props.isWarningPopUp("timeUp");
        clearInterval(this.myInterval);
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
          warningMin: minutes,
        }));
        console.log("this.warningMin", this.state.warningMin);
        if (this.state.warningMin === 1) {
          this.props.isWarningPopUp("warning");
        }
      }
    } else {
      if (this.state.minutes > 0) {
        this.setState(({ minutes, count }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      } else {
        this.setState(({ hours, count }) => ({
          hours: hours - 1,
          seconds: 59,
          minutes: 59,
        }));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { hours, seconds, minutes } = this.props;
    if (prevProps.hours !== hours || prevProps.minutes !== minutes) {
      this.setState({
        seconds: seconds,
        hours: hours,
        minutes: minutes,
      });
      this.myInterval = setInterval(() => {
        this.getTime();
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {/* <Paper elevation={3}> */}
        <Box className={classes.box}>
          <AccessAlarmIcon />
          <Typography variant="div" className={classes.padding}>
            Remaining :
          </Typography>
          {/* <Divider /> */}
          <List className={classes.timerStyle}>
            <ListItem>
              <ListItemText
                primary={
                  this.state.hours < 10
                    ? `0${this.state.hours}`
                    : `${this.state.hours}`
                }
                // secondary="HOURS"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  this.state.minutes < 10
                    ? `0${this.state.minutes}`
                    : `${this.state.minutes}`
                }
                // secondary="MINUTES"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  this.state.seconds < 10
                    ? `0${this.state.seconds}`
                    : `${this.state.seconds}`
                }
                // secondary="SECONDS"
              />
            </ListItem>
          </List>
        </Box>
        {/* </Paper> */}
      </>
    );
  }
}
export default withStyles(useStyles)(Timer);
