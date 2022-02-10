import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ButtonsGroup from "../buttonsGroup/buttonsGroup";
import Header from "../header/header";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {
  getCurrentTime,
  evaluateEnableDisableBasedOnTime,
  isExamStartingTime,
} from "../utils/utils";
import SubHeader from "../header/subHeader";
// import image from '../../public/'
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "40vh",
    display: "flex",
  },
  InstructionsDiv: {
    padding: "9px",
    boxShadow: "0px 3px 8px 6px #ccc",
    // lineHeight: '4rem'
  },
  InstructionsApp: {
    maxWidth: 850,
    margin: "0 auto",
  },
  root: {
    flexGrow: 1,
    borderRadius: "0 0px 20px 20px",
  },
  img1: {
    width: "100px",
    height: "100px",
  },
  content: {
    maxHeight: "calc(100vh -  315px)",
    overflow: "auto",
    padding: 20,
    textAlign: "left",
    "& h5": {
      fontSize: "1rem",
    },
  },
  footer: {
    display: "block",
    padding: "17px 20px 17px",
    borderTop: "1px solid #cfd0e9",
  },
  Divider: {
    display: "block",
    background: "#cfd0e9",
  },
  subheader: {
    padding: "15px",
  },
}));

function Instructions() {
  const classes = useStyles();
  let buttonVal = null;
  const [questionId, setquestionId] = useState({ id: "", type: "" });
  const [isExamStarted, setIsExamStarted] = useState(false);
  const history = useHistory();

  const openTest = () => {
    var popup = window.open("/test", "popup", "fullscreen");
    if (
      popup.outerWidth < window.screen.availWidth ||
      popup.outerHeight < window.screen.availHeight
    ) {
      popup.moveTo(0, 0);
      popup.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }

    history.push("/test");
  };
  useEffect(() => {
    let examStartInterval = setInterval(() => {
      let currentTime = getCurrentTime();
      let examStartingTime = isExamStartingTime();

      if (
        currentTime.hours == examStartingTime.hours &&
        currentTime.minutes == examStartingTime.minutes
      ) {
        setIsExamStarted(true);
      } else {
        setIsExamStarted(false);
      }
    }, 1000);
  }, []);
  return (
    <div className={classes.InstructionsApp}>
      <Header title="INSTRUCTIONS" />
      <Card className={classes.root}>
        <SubHeader className="subheader " />
        <Divider className={classes.Divider} />
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h5">
            1. After login, the candidate shall be able to see the detailed
            instructions for the examination. Candidates are advised to go
            through the instructions carefully regarding the type of questions,
            marking scheme, procedure to mark & change answer etc. At the
            designated time of start of the examination, the candidates will be
            able to proceed and see the questions on the computer screen?
          </Typography>

          <Typography variant="h5" component="h5">
            1. After login, the candidate shall be able to see the detailed
            instructions for the examination. Candidates are advised to go
            through the instructions carefully regarding the type of questions,
            marking scheme, procedure to mark & change answer etc. At the
            designated time of start of the examination, the candidates will be
            able to proceed and see the questions on the computer screen?
          </Typography>

          <Typography variant="h5" component="h5">
            1. After login, the candidate shall be able to see the detailed
            instructions for the examination. Candidates are advised to go
            through the instructions carefully regarding the type of questions,
            marking scheme, procedure to mark & change answer etc. At the
            designated time of start of the examination, the candidates will be
            able to proceed and see the questions on the computer screen?
          </Typography>

          <Typography variant="h5" component="h5">
            1. After login, the candidate shall be able to see the detailed
            instructions for the examination. Candidates are advised to go
            through the instructions carefully regarding the type of questions,
            marking scheme, procedure to mark & change answer etc. At the
            designated time of start of the examination, the candidates will be
            able to proceed and see the questions on the computer screen?
          </Typography>
        </CardContent>

        <CardActions className={classes.footer}>
          <Button variant="contained" onClick={openTest} color="primary">
            Proceed
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Instructions;
