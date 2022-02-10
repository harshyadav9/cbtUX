import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { green, red, grey } from "@material-ui/core/colors";
import { Fab, Box, Typography, Divider } from "@material-ui/core";
import Timer from "../Timer";
import { ExamDataContext } from "../context/ExamDataContext";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    width: "100%",
    paddingLeft: theme.spacing.unit * 5,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
  },

  card: {
    margin: "10px",
    // backgroundColor: 'rgb(0,0,0,0.2)',
  },
  container: {
    overflow: "auto",
  },
  appbar: {
    alignItems: "center",
  },

  buttonDefault: {
    // margin: "12px",
    borderRadius: "20px 0 0 0",
    boxShadow: "none",
    height: 38,
    minWidth: 38,
    fontSize: 11,
    border: "1px solid #cfd0e9",
    padding: "0px 6px",
    backgroundColor: "#fff",
    color: "black",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  answeredColor: {
    // margin: '12px',
    padding: "0px 6px",
    borderRadius: "20px 0 0 0",
    boxShadow: "none",
    height: 38,
    minWidth: 38,
    fontSize: 10,
    border: "0px solid #d7d7d7",
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    // color: '#fff',
    "&:hover": {
      backgroundColor: green[900],
    },
  },

  reviewAnsweredColor: {
    borderRadius: "20px 0 0 0",
    boxShadow: "none",
    height: 38,
    minWidth: 38,
    fontSize: 10,
    border: "0px solid #d7d7d7",
    padding: "0px 6px",
    color: "#fff",
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[400],
    },
  },
  reviewUnAnsweredColor: {
    borderRadius: "20px 0 0 0",
    boxShadow: "none",
    height: 38,
    minWidth: 38,
    fontSize: 10,
    border: "0px solid #d7d7d7",
    padding: "0px 6px",
    color: "#fff",
    backgroundColor: red[200],
    "&:hover": {
      backgroundColor: red[200],
    },
  },
  unansweredColor: {
    borderRadius: "20px 0 0 0",
    boxShadow: "none",
    height: 38,
    minWidth: 38,
    fontSize: 10,
    border: "0px solid #d7d7d7",
    padding: "0px 6px",
    backgroundColor: "red",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
    },
  },

  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 38px)",
    placeContent: "start",
    justifyItems: "center",
    padding: "10px 0 0 0",
    height: "calc(100vh - 400px)",
    overflowY: "auto",
    gridGap: 10,
    border: "1px solid #cfd0e9",
    padding: 10,
    borderRadius: "0 0 6px 6px",
  },
  legendContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 76,
  },
  legends: {
    alignItems: "center",
    display: "flex",
    height: "40px",
    boxShadow:
      "0px 4px 13px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.14), 0px 1px 20px 0px rgba(0,0,0,0.19)",
    borderRadius: "7px",
    margin: "4px",
    height: "auto",
  },

  buttonStyle: {},
  buttonCls: {
    marginTop: 20,
  },
  buttonsContainer: {
    "& button>span": {
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.2",
    },
  },
  answerKey: {
    // marginTop: "-8px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  // answeredSample: {
  //     color: theme.palette.getContrastText(green[900]),
  //     backgroundColor: green[900]
  // },
  // unansweredSample: {
  //     color: theme.palette.getContrastText(red[500]),
  //     backgroundColor: red[500]
  // },
  // reviewansweredSample: {
  //     color: theme.palette.getContrastText(green[400]),
  //     backgroundColor: green[400]
  // },
  // reviewunansweredSample: {
  //     color: theme.palette.getContrastText(red[200]),
  //     backgroundColor: red[200]
  // },
  // unvisitedSample: {
  //     color: theme.palette.getContrastText(grey[500]),
  //     backgroundColor: grey[500]
  // },
  buttonGroupText: {
    lineHeight: "12px",
    fontSize: " 12px",
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    textAlign: " left",
    fontWeight: "bold",
    color: "#2a3b64",
    background: "#cfd0e9",
    margin: 0,
    padding: 12,
    lineHeight: "1",
    fontSize: 14,
    borderRadius: "6px 6px 0 0",
  },
}));

function ButtonsGroup({
  arrLen,
  questionInfo,
  changeStep,
  submitAnswers,
  optionSelected,
  buttonState,
}) {
  const { state, dispatch } = useContext(ExamDataContext);
  const option = { ...state.options };
  console.log("options", state.options);
  console.log("state in ButtonsGroup", state, changeStep);
  console.log("optionSelected", optionSelected);
  console.log("questionInfo", questionInfo);
  const classes = useStyles();
  // const [itemClicked, setitemClicked] = useState(-1);
  // const [answersCount, setanswersCount] = useState({ unanswered: 0, answered: 0, reviewA: 0, reviewU: 0 });
  const [newArr, setnewArr] = useState({});

  // const { state } = useContext(ExamDataContext);
  // console.log("ButtonsGroup*******", arrLen, questionInfo, totalQues, changeStep);

  // useEffect(() => {
  //     console.log("ButtonsGroup called");
  // },[state.reset]);
  // console.log("questionInfo in ButtonsGroup", questionInfo);

  useEffect(() => {
    setnewArr((prevState) => ({
      ...prevState,
      ...buttonState,
    }));

    console.log("buttonState>>", buttonState);
  }, [buttonState]);

  useEffect(() => {
    // console.log("useEffect else called");
    let tempArr = [];
    // if(isIntermittentLoading){

    // } else {
    if (questionInfo.id == "") {
      const createArr = () => {
        // console.log("createArr called");
        let obj = {};
        for (let i = 0; i < arrLen.length; i++) {
          obj[i + 1] = {};
          obj[i + 1]["answered"] = false;
          obj[i + 1]["default"] = true;
          obj[i + 1]["unanswered"] = false;
          obj[i + 1]["reviewA"] = false;
          obj[i + 1]["reviewU"] = false;
          obj[i + 1]["id"] = i + 1;
          obj[i + 1]["answer"] = "";
          // tempArr.push(obj);
        }
        // console.log("newArr123", [...newArr, ...tempArr])
        // setnewArr(prevArrValues => (...prevArrValues , ...obj));
        setnewArr((prevState) => ({
          ...prevState,
          ...obj,
        }));
        // setnewArr([...newArr, ...tempArr]);
      };
      if (Object.keys(newArr).length == 0) {
        createArr();
      }
      console.log("newArr", newArr);
    } else {
      updateButtons(questionInfo);
    }

    // }
  }, [arrLen, questionInfo]);

  // const isWarning = (text) => {
  //     console.log("isWarning called",text);
  //     if(text === "warning"){
  //         dispatch({type:'WARNING_TIME' ,warningTime:true });
  //     } else {
  //         submitAnswers();
  //         // dispatch({type:'TIME_UP' ,timeover:true , warningTime:false });
  //     }

  // }

  const updateButtons = (questionInfo) => {
    // console.log("questionInfo called",questionInfo);
    let buttonState = { ...newArr };
    // console.log("buttonState called",buttonState);
    // if (!buttonState[questionInfo.id][questionInfo.type] === true){
    buttonState[questionInfo.id]["answered"] = false;
    buttonState[questionInfo.id]["default"] = false;
    buttonState[questionInfo.id]["unanswered"] = false;
    buttonState[questionInfo.id]["reviewA"] = false;
    buttonState[questionInfo.id]["reviewU"] = false;
    buttonState[questionInfo.id][questionInfo.type] = true;
    if (questionInfo.id === optionSelected.questionNo) {
      // if(optionSelected.option.indexOf(",") > -1){
      //    let optionArr =  optionSelected.option.split(",");
      //    let multipleOptionString = optionArr.map(val => {
      //        return option[val];
      //    }).join(",");
      //    buttonState[questionInfo.id]['answer'] =  optionSelected.option;
      // } else {
      // buttonState[questionInfo.id]['answer'] = option[optionSelected.option];
      buttonState[questionInfo.id]["answer"] = optionSelected.option;
      // }
    } else {
      buttonState[questionInfo.id]["answer"] = "";
    }

    // }

    setnewArr((prevState) => ({
      ...prevState,
      ...buttonState,
    }));
    // setnewArr(state => {
    //     const newArr = state.map(item => {
    //         if (item.id == questionInfo.id) {
    //             item.answered = false;
    //             item.default = false;
    //             item.unanswered = false;
    //             item.reviewA = false;
    //             item.reviewU = false;
    //             item[questionInfo.type] = true;
    //             item['id'] = questionInfo.id;

    //         }
    //         return item;
    //     })
    //     return newArr;
    // })

    console.log("buttonState", buttonState);
  };

  // let unansweredQuestions = totalQues;
  // let answeredQuestions = 0;
  // let reviewUnQuestions = 0;
  // let reviewAnQuestions = 0;
  // let unvisitedQuestions = 0;

  // let reviewquestionsObj = JSON.parse(localStorage.getItem('reviewQuestionNo'));
  // let answeredQuestionsObj = JSON.parse(localStorage.getItem('questionNo'));
  // let unvisitedQuestions = JSON.parse(localStorage.getItem('unvisitedQues')) === null ? 0 : JSON.parse(localStorage.getItem('unvisitedQues')).length;

  // console.log("unvisitedQuestions", unvisitedQuestions);
  // console.log("answeredQuestionsObj", answeredQuestionsObj);
  // if (reviewquestionsObj !== null) {
  //     reviewUnQuestions = reviewquestionsObj['reviewU'].length;
  //     reviewAnQuestions = reviewquestionsObj['reviewA'].length;
  // }
  // if (answeredQuestionsObj !== null) {
  //     answeredQuestions = answeredQuestionsObj.length;
  // }
  // unansweredQuestions = totalQues - (answeredQuestions)
  // const [isAnsweredColor, setisAnsweredColor] = useState(false);
  // if (id !== undefined) {
  //     updateButtons(id);
  // }

  // console.log("newArr", newArr);

  return (
    <>
      {/* <Grid container className={classes.container}> */}

      {/* <Grid item xs={12} md={4} lg={3}> */}
      {/* <Card className={classes.card}>
                        {
                            newArr.map((val, key) => {
                                console.log(val, key);
                                return (<Button key={key} className={classNames({ [classes.buttonDefault]: (itemClicked === key ? false : true), [classes.answeredColor]: (itemClicked === key ? true : false) })} onClick={(val) => clicked(val)} variant="contained" color="primary">
                                    {val.value}
                                </Button>)
                            })
                        }
                    </Card> */}

      {/* <Timer hours={state.time.hours}  minutes={state.time.minutes}  seconds={state.time.seconds} isWarningPopUp = {isWarning} /> */}
      {/* <div className={classes.legendContainer}>
                <div className={classes.legends} style={{ width: '45%' }}>
                  
                    <Avatar className={classes.answeredSample}>{answeredQuestions}</Avatar>
                    <span className={classes.buttonGroupText}> Answered Questions</span>
                </div>
                <div className={classes.legends} style={{ width: '45%' }}>
                    <Avatar className={classes.unansweredSample}>{unansweredQuestions}</Avatar>
                    <span className={classes.buttonGroupText}> Unanswered Questions</span>
                </div>

                <div className={classes.legends} style={{ width: '45%' }}>
                    <Avatar className={classes.unvisitedSample}>{unvisitedQuestions}</Avatar>
                    <span className={classes.buttonGroupText}> Unvisited Questions</span>
                </div>

                <div className={classes.legends} style={{ width: '45%' }}>
                    <Avatar className={classes.reviewansweredSample}>{reviewAnQuestions}</Avatar>
                    <span className={classes.buttonGroupText}> Review Answered Question</span>
                </div>
                <div className={classes.legends} style={{ width: '45%' }}>
                    <Avatar className={classes.reviewunansweredSample}>{reviewUnQuestions}</Avatar>
                    <span className={classes.buttonGroupText}> Review Unanswered Question</span>
                </div>

            </div> */}

      {/* <div style={{ width: '100%' }}>
                <h3>Question Numbers</h3>
            </div> */}
      {/* <div className={classes.buttonContainer}>


                <br />
                {
                    newArr.map((val, key) => {
                        return (
                            <Button key={key} onClick={() => { changeStep(key) }} className={classNames({
                                [classes.buttonDefault]: (val.default === true ? true : false),
                                [classes.unansweredColor]: (val.unanswered === true ? true : false),
                                [classes.answeredColor]: (val.answered === true ? true : false),
                                [classes.reviewAnsweredColor]: (val.reviewA === true ? true : false),
                                [classes.reviewUnAnsweredColor]: (val.reviewU === true ? true : false)
                            })} variant="contained" color="primary">
                                {key + 1}
                            </Button>)
                    })
                }
            </div> */}

      <Paper elevation={0} className={classes.buttonCls}>
        <Typography variant="h6" gutterBottom className={classes.heading}>
          Question Numbers
        </Typography>

        <Box component="div" className={classes.buttonContainer}>
          {Object.keys(newArr).map((val, key) => {
            // newArr.map((val, key) => {
            // console.log(val, key);
            return (
              <div className={classes.buttonsContainer} key={key}>
                <Fab
                  onClick={() => {
                    changeStep(key);
                  }}
                  className={classNames({
                    [classes.buttonDefault]:
                      newArr[val].default === true ? true : false,
                    [classes.unansweredColor]:
                      newArr[val].unanswered === true ? true : false,
                    [classes.answeredColor]:
                      newArr[val].answered === true ? true : false,
                    [classes.reviewAnsweredColor]:
                      newArr[val].reviewA === true ? true : false,
                    [classes.reviewUnAnsweredColor]:
                      newArr[val].reviewU === true ? true : false,
                  })}
                  variant="contained"
                  color="primary"
                >
                  <div>{key + 1}</div>
                  <div className={classes.answerKey}>{newArr[val].answer}</div>
                </Fab>
              </div>
            );
          })}
        </Box>
        {/* <Divider />
        <Typography
          variant="h6"
          gutterBottom
          className={classes.footer}
        ></Typography> */}
      </Paper>
    </>
  );
}

export default React.memo(ButtonsGroup);
