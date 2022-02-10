import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { FormLabel } from "@material-ui/core";
import { ExamDataContext } from "./context/ExamDataContext";
const styles = makeStyles((theme) => ({
  // root: {
  //     display: 'flex',
  //     marginLeft: 2,
  //     marginBottom: 49
  // },
  // formControl: {
  //     margin: theme.spacing.unit * 3,
  //     [theme.breakpoints.only('xs')]: {
  //         margin: 0
  //     },
  //     [theme.breakpoints.between('xs, sm')]: {
  //         margin: 0
  //     }
  // },
  formControl: {
    height: "240px",
    width: "100%",
    "& legend": {
      textAlign: " left",
      color: "#2a3b64",
      margin: 0,
      marginLeft: 15,
      lineHeight: "1.4",
    },
  },
  group: {
    margin: "8px 0 0 0",
    "& label": {
      margin: "0 0 0 16px",
      "& span": {
        fontSize: 14,
      },
    },
  },
  quesNo: {
    marginRight: "8px",
  },
}));

function RadioButtonsGroup(props) {
  const { objective, activeStep } = props;
  console.log(
    " objective,activeStep???????????????????????",
    objective,
    activeStep
  );
  const [radioval, setRadio] = useState({
    radio: "",
    checkbox: new Map(),
    reset: false,
  });

  console.log("radioval", radioval);
  const { state, dispatch } = useContext(ExamDataContext);
  // console.log("state",state);
  const classes = styles();
  // let resetFlag = JSON.parse(localStorage.getItem('isReset')) || false;
  // console.log("resetFlag",resetFlag);
  // class RadioButtonsGroup extends React.Component {
  // state = {
  //     radio: '',
  //     checkbox: new Map(),
  //     reset: false
  // };

  // componentDidMount() {
  //     console.log("value", this.state);
  // }

  useEffect(() => {
    console.log("objective called", objective);
    console.log("inside reloading objective state >>>>>>>>>>>>>>>>>>>");
    if (
      objective &&
      objective.questionNo === activeStep + 1 &&
      state.questions[activeStep + 1] !== undefined &&
      !state.reset
    ) {
      console.log("if callled");
      if (typeof state.questions[activeStep + 1].value === "string") {
        // if (state.idToSave.indexOf(activeStep + 1) > -1) {
        if (state.questions[activeStep + 1].value !== "") {
          setRadio((prevState) => ({
            ...prevState,
            radio: `${state.questions[activeStep + 1].value}-${
              objective.questionNo
            }`,
          }));
        } else {
          setRadio((prevState) => ({
            ...prevState,
            radio: "",
          }));
        }
      } else {
        // if (state.idToSave.indexOf(activeStep + 1) > -1) {
        // let newMap =  createNewMap(state.questions[activeStep + 1].mainValue);
        if (state.questions[activeStep + 1].value !== "") {
          let checkboxMap = state.questions[activeStep + 1].value;
          let myMap = new Map();
          for (var [key, value] of checkboxMap) {
            console.log(key + " = " + value);
            if (key.indexOf("-") == -1) {
              myMap.set(`${key}-${objective.questionNo}`, value);
            } else {
              myMap.set(key, value);
            }
          }

          setRadio((prevState) => ({
            ...prevState,
            checkbox: myMap,
          }));
          // console.log("newMap",newMap)
        } else {
          let arr = new Map();
          for (let i = 0; i < 4; i++) {
            let obj = {};
            arr.set(
              `${state.questions[activeStep + 1].value}-${
                objective.questionNo
              }`,
              false
            );
          }
          setRadio((prevState) => ({
            ...prevState,
            checkbox: arr,
          }));
        }
      }
      console.log("radioval", radioval);
    }
  }, [objective]);

  useEffect(() => {
    let resetObj;
    if (state.reset) {
      console.log("inside reset >>>>>>>>>>>>>>>>>>>");
      if (objective && objective.questionNo === activeStep + 1) {
        // if(typeof(state.questions[activeStep+1]) === "string"){

        let activeQues = activeStep + 1;

        let obj = {};
        if (objective.multiple === "N") {
          setRadio((prevState) => ({
            ...prevState,
            radio: "",
          }));
          state.questions[objective.questionNo] = {
            ...state.questions[objective.questionNo],
            key: "",
            value: "",
          };
          // obj = {...state.questions , ...{[objective.id.questionNo]:}};
        } else {
          let newMap = new Map();
          // let checkboxMap = new Map();
          //  checkboxMap = state.questions[activeStep + 1].value;
          // for (var [key, value] of checkboxMap) {
          //     console.log(key + " = " + value);
          //     newMap.set(`${key}-${objective.questionNo}`, "");
          // }

          setRadio((prevState) => ({
            ...prevState,
            checkbox: newMap,
          }));
          state.questions[objective.questionNo] = {
            ...state.questions[objective.questionNo],
            key: "",
            value: newMap,
          };
          // obj = {...state.questions , ...{[objective.id.questionNo]:arr}};
        }

        let regNo = JSON.parse(localStorage.getItem("regNo"));

        //  resetObj = {
        //     "registrationNo":state.registrationNo,
        //     "questionId":activeQues,
        //     "yearOfExam":state.yearOfExam,
        //     "selectedAnswer": state.questions[objective.id.questionNo]['key'],
        //     "examCd":state.examCd,
        //     "finalExamSubmitFlag":true,
        //     "instCd":state.instCd,
        //     "answeredFlag":false,
        //     "unansweredFlag":false,
        //     "reviewansweredFlag":false,
        //     "reviewunansweredFlag":false
        // };

        resetObj = {
          registrationNo: state.registrationNo,
          questionId: activeQues,
          yearOfExam: state.yearOfExam,
          selectedAnswer: state.questions[objective.questionNo]["key"],
          examCd: state.examCd,
          finalExamSubmitFlag: false,
          instCd: state.instCd,
          answeredFlag: false,
          unansweredFlag: false,
          reviewAnsweredFlag: false,
          reviewUnansweredFlag: false,
        };
        console.log("obj reset", resetObj);

        // } else {

        // }
        let answeredQues = JSON.parse(localStorage.getItem("questionNo"));
        let reviewQuestionNo = JSON.parse(
          localStorage.getItem("reviewQuestionNo")
        );
        if (answeredQues !== null) {
          if (answeredQues.indexOf(activeStep + 1) > -1) {
            answeredQues.splice(answeredQues.indexOf(activeStep + 1), 1);
          }
          localStorage.setItem("questionNo", JSON.stringify(answeredQues));
        }
        if (reviewQuestionNo !== null) {
          if (reviewQuestionNo.reviewU.indexOf(activeStep + 1) > -1) {
            reviewQuestionNo.reviewU.splice(
              reviewQuestionNo.reviewU.indexOf(activeStep + 1),
              1
            );
          }
          if (reviewQuestionNo.reviewA.indexOf(activeStep + 1) > -1) {
            reviewQuestionNo.reviewA.splice(
              reviewQuestionNo.reviewA.indexOf(activeStep + 1),
              1
            );
          }
          localStorage.setItem(
            "reviewQuestionNo",
            JSON.stringify(reviewQuestionNo)
          );
        }
        // dispatch({ type: 'RESET', reset: false });
        dispatch({
          type: "ADD_QUESTION_VALUES",
          questions: state.questions,
          reset: false,
        });
      }
      // localStorage.setItem('isReset',JSON.stringify({'reset':false}));
      // axios.post(`cbt/dataUpload/publish`,resetObj).then(res => {

      // });
    }
  }, [state.reset]);

  const handleChange1 = (eventval, option, objective) => {
    console.log("radio button clicked", option);
    let event = { option: option, id: objective.questionNo, isradio: true };

    setRadio((prevState) => ({
      ...prevState,
      radio: `${option}-${objective.questionNo}`,
    }));
    console.log("radioval", radioval);
    let obj = {
      ...state.questions,
      ...{ [objective.questionNo]: { key: option, value: option } },
    };
    console.log("obj", obj);
    dispatch({ type: "ADD_QUESTION_VALUES", questions: obj, reset: false });
  };

  const createNewMap = (oldMap) => {
    let newMap = new Map();

    for (var [key, value] of oldMap) {
      newMap.set(key, value);
    }
    return newMap;
  };

  const updateQuestionNo = (event) => {
    // console.log("updateQuestionNo",event.id);
    if (event.id !== undefined) {
      let arr = [];
      const questionNo = JSON.parse(localStorage.getItem("questionNo"));
      if (questionNo === null) {
        arr.push(event.id);
      } else {
        if (questionNo.indexOf(event.id) == -1) {
          arr = questionNo.concat(event.id);
        } else {
          arr = questionNo;
        }
      }

      localStorage.setItem("questionNo", JSON.stringify(arr));
    }
  };

  const buttonChangeHandler = (event) => {
    let index = -1;
    let newAns = [];
    if (event.isradio) {
      let resData = [...state.finalData];
      // let resData = [...finalData];

      for (let i = 0; i < resData.length; i++) {
        if (resData[i]["id"]["questionId"] == event.id) {
          // isUpdate = true;
          index = i;
          break;
        }
      }
      newAns.push(event.option);
      let option = newAns[0].trim();
      if (index === -1) {
        let obj = {
          id: {
            registrationNo: 2,
            questionId: event.id,
            yearOfExam: 2020,
          },
          selectedAnswer: option,
        };
        resData = [...resData, obj];
      } else {
        resData[index].selectedAnswer = option;
      }

      //  if radio is checked

      // setfinalData(resData);
      dispatch({
        type: "ADD_FINAL_DATA",
        finalData: [...state.finalData, ...resData],
      });
    } else {
      //  if checkbox is checked
      let resData = [...state.finalData];
      for (let i = 0; i < resData.length; i++) {
        if (resData[i]["id"]["questionId"] == event.id) {
          // isUpdate = true;
          index = i;
          break;
        }
      }
      if (index === -1) {
        newAns.push(event.name);
        let option = newAns[0].trim();
        let obj = {
          id: {
            registrationNo: 2,
            questionId: event.id,
            yearOfExam: 2020,
          },
          selectedAnswer: option,
        };
        resData = [...resData, obj];
        // setfinalData(resData);
        dispatch({
          type: "ADD_FINAL_DATA",
          finalData: [...state.finalData, ...resData],
        });
      } else {
        let selectedOptionObj = resData[index];
        let isElemPresent = false;
        let prevAns = selectedOptionObj["selectedAnswer"];
        // if (prevAns === "") {
        //     newAns.push(event.name);
        // } else {
        newAns = prevAns === "" ? [] : prevAns.split(",");
        // }
        // if (newAns.length === 0) {
        //     newAns.push(event.name);
        // } else {
        for (let i = 0; i < newAns.length; i++) {
          if (newAns[i].trim() == event.name.trim()) {
            isElemPresent = true;
            // if checked flag is turn to false
            if (event.isChecked === false) {
              newAns.splice(i, 1);
              i--;
            }
          }
        }
        if (!isElemPresent) {
          // if checked flag is turned to true
          newAns.push(event.name);
        }
        if (newAns.length === 0) {
          resData[index].selectedAnswer = "";
        } else {
          // let obj = {
          //     "id": {
          //         registrationNo: 2,
          //         questionId: event.id,
          //         yearOfExam: 2020
          //     },
          //     selectedAnswer: (newAns.join(","))
          // }
          resData[index].selectedAnswer = newAns.join(",");
          // resData = [...resData];
        }

        dispatch({
          type: "ADD_FINAL_DATA",
          finalData: [...state.finalData, ...resData],
        });
        // setfinalData(resData);
        // }
      }
    }
    if (event.id !== undefined) {
      let arr = [];
      const questionNo = JSON.parse(localStorage.getItem("questionNo"));
      if (questionNo === null) {
        arr.push(event.id);
      } else {
        if (questionNo.indexOf(event.id) == -1) {
          arr = questionNo.concat(event.id);
        } else {
          arr = questionNo;
        }
      }

      localStorage.setItem("questionNo", JSON.stringify(arr));
    }
  };

  const handleChange = (isChecked, name, objective) => {
    let newMap;
    console.log("handle change called for checkbox");
    let questions = Object.assign({}, state.questions);

    let checkboxValuesArr = [];
    let checkBoxValues = "";

    let setCheckBoxValue = new Map();
    if (radioval.checkbox.size > 0) {
      setCheckBoxValue = radioval.checkbox;
    }

    setCheckBoxValue.set(`${name}-${objective.questionNo}`, isChecked);

    setRadio((prevState) => ({
      ...prevState,
      checkbox: setCheckBoxValue,
    }));

    console.log("radioval", radioval);

    // console.log("state.questions value",state.questions[objective.id.questionNo].value);
    let arr = new Map();
    if (questions[objective.questionNo] === undefined) {
      arr.set(name, isChecked);
    }
    // else {
    //     if(questions[objective.id.questionNo].value !== ""){
    //         arr = questions[objective.id.questionNo].secondValue;
    //     } else {
    //         // let arr = new Map();
    //         if(questions[objective.id.questionNo].mainValue){
    //             arr = questions[objective.id.questionNo].mainValue;
    //         } else {
    //             arr.set(name, isChecked);
    //         }
    //     }
    //     newMap =  createNewMap(arr);
    //     newMap.set(name, isChecked);
    // }
    else {
      let tempArr = [];
      let tempArr2 = [];
      let withoutDashMap = new Map();
      tempArr = questions[objective.questionNo].value;

      if (tempArr.size > 0) {
        let firstItemInCheck = Array.from(tempArr)[0][0];
        if (firstItemInCheck.indexOf("-") > -1) {
          let optionStr = "";
          tempArr.set(`${name}-${objective.questionNo}`, isChecked);
          for (var [key, value] of tempArr) {
            if (value) {
              tempArr2.push(key.split("-")[0]);
              // optionStr+=key.split('-')[0];
            }
            withoutDashMap.set(`${key.split("-")[0]}`, value);
          }

          checkBoxValues = tempArr2.join(",");
          arr = withoutDashMap;
        } else {
          arr = questions[objective.questionNo].value;
          arr.set(name, isChecked);
          for (var [key, value] of arr) {
            console.log(key + " = " + value);
            if (value) {
              checkboxValuesArr.push(key);
            }
          }

          checkBoxValues = checkboxValuesArr.join(",");
        }
      } else {
        arr.set(name, isChecked);
      }
    }

    // for (var [key, value] of newMap) {
    //     console.log(key + " = " + value);
    //     if (value) {
    //         checkboxValuesArr.push(key);
    //     }

    // }

    let prevValueObj = questions[objective.questionNo];
    // console.log("secondValue",newMap)
    // let obj = { ...questions, ...{ [objective.id.questionNo]: { ...prevValueObj , key: checkBoxValues, secondValue:newMap} } };
    let obj = {
      ...questions,
      ...{
        [objective.questionNo]: {
          ...prevValueObj,
          key: checkBoxValues,
          value: arr,
        },
      },
    };
    dispatch({ type: "ADD_QUESTION_VALUES", questions: obj, reset: false });
    // response({'checkBoxValues':checkBoxValues});
    // this.setState(prevState => ({
    //     checkbox: prevState.checkbox.set(name, isChecked)
    // }));
    // let arr = JSON.parse(localStorage.getItem('questionNo'));
    // console.log("arr", arr)
    // if (arr == null) {
    //     arr = [];
    //     arr.push(quesNo);
    //     localStorage.setItem('questionNo', JSON.stringify(arr));
    // } else {
    //     if (arr.indexOf(quesNo) == -1) {
    //         arr.push(quesNo);
    //         localStorage.setItem('questionNo', JSON.stringify(arr));
    //     }

    // }
    // // localStorage.setItem('questionNo', JSON.stringify(quesNo));

    // if (event === ans) {
    // let event = { name: name, isChecked: isChecked, id: objective.id.questionNo, isradio: false };
    // response();
    // buttonChangeHandler(event);
    // updateQuestionNo(event);
    // response({ name: name, isChecked: isChecked, id: objective.id.questionNo, isradio: false });
    //     // this.setState({ value: '' });
    // } else {
    //     this.props.checkQuestionNo(quesNo);
    //     // this.setState({ value: '' });
    // }
  };

  const setCheckboxState = (objective) => {
    let arr = new Map();
    for (let i = 0; i < 4; i++) {
      let obj = {};
      arr.set(`option${i + 1}`, false);
    }
    setRadio((prevState) => ({
      ...prevState,
      checkbox: arr,
    }));
    // this.setState({ checkbox: arr });
  };

  const resetValues = (resetValue) => {
    console.log("reset called");
    if (resetValue) {
      setRadio((prevState) => ({
        ...prevState,
        radio: "",
      }));
      // this.setState({ radio: '' });
    }
  };

  // componentDidMount() {
  //     console.log("this.state", this.state);
  //     if (this.props.objective.single === "N") {
  //         this.setCheckboxState(this.props.objective);
  //     }

  //     // console.log("this.state>>", this.state)

  // }

  // render() {

  // useEffect(() => {
  //     // console.log("activeStep",activeStep);
  //     // console.log("objective",objective);
  //     console.log("radio state" , radio);
  //     if(objective.id.questionNo === 1){
  //         setRadio(prevState => ({
  //             ...prevState,
  //             radio: ' A- Thermal pollution'
  //         }));

  //     }
  //     if (objective.single === "N") {
  //         setCheckboxState(objective);
  //     }
  //     if (reset === 'radio') {
  //         setRadio(prevState => ({
  //             ...prevState,
  //             radio: ''
  //         }));
  //         // this.props.setReset('');
  //         setReset('')
  //     }
  //     if (reset === 'checkbox') {
  //         // this.setState(() => ({
  //         //     checkbox: new Map()
  //         // }));
  //         setRadio(prevState => ({
  //             ...prevState,
  //             checkbox: new Map()
  //         }));
  //         // this.props.setReset('');
  //         setReset('')
  //     }

  // },[objective,reset]);

  // console.log("this.props.reset",this.props.reset);

  // if (isReset) {
  //     this.resetState(objective);
  // }
  // console.log("isReset", isReset)

  return (
    <div className={classes.root}>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            <span>{objective && objective.questionNo})</span>
            <span className={classes.quesText}>
              {objective && objective.question}
            </span>
          </FormLabel>
          {objective && objective.multiple === "N" ? (
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={`${radioval.radio}`}
              // onChange={(e) => this.handleChange(e.target, objective)}
            >
              <FormControlLabel
                value={`${objective.option1.split("-")[0]}-${
                  objective.questionNo
                }`}
                onChange={(e) =>
                  handleChange1(
                    e.target.value,
                    objective.option1.split("-")[0],
                    objective
                  )
                }
                control={<Radio />}
                label={objective.option1}
              />
              <FormControlLabel
                value={`${objective.option2.split("-")[0]}-${
                  objective.questionNo
                }`}
                onChange={(e) =>
                  handleChange1(
                    e.target.value,
                    objective.option2.split("-")[0],
                    objective
                  )
                }
                control={<Radio />}
                label={objective.option2}
              />
              {objective.option3 === undefined ? null : (
                <FormControlLabel
                  value={`${objective.option3.split("-")[0]}-${
                    objective.questionNo
                  }`}
                  onChange={(e) =>
                    handleChange1(
                      e.target.value,
                      objective.option3.split("-")[0],
                      objective
                    )
                  }
                  control={<Radio />}
                  label={objective.option3}
                />
              )}
              {objective.option4 === undefined ? null : (
                <FormControlLabel
                  value={`${objective.option4.split("-")[0]}-${
                    objective.questionNo
                  }`}
                  onChange={(e) =>
                    handleChange1(
                      e.target.value,
                      objective.option4.split("-")[0],
                      objective
                    )
                  }
                  control={<Radio />}
                  label={objective.option4}
                />
              )}
            </RadioGroup>
          ) : (
            <FormGroup className={classes.group}>
              {objective && objective.option1 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        !!radioval.checkbox.get(
                          `${objective.option1.split("-")[0]}-${
                            objective.questionNo
                          }`
                        )
                      }
                      onChange={(e) =>
                        handleChange(
                          e.target.checked,
                          objective.option1.split("-")[0],
                          objective
                        )
                      }
                      name={objective && objective.option1}
                    />
                  }
                  label={objective && objective.option1}
                />
              )}
              {objective && objective.option2 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        !!radioval.checkbox.get(
                          `${objective.option2.split("-")[0]}-${
                            objective.questionNo
                          }`
                        )
                      }
                      onChange={(e) =>
                        handleChange(
                          e.target.checked,
                          objective.option2.split("-")[0],
                          objective
                        )
                      }
                      name={objective && objective.option2}
                    />
                  }
                  label={objective && objective.option2}
                />
              )}
              {objective && objective.option3 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        !!radioval.checkbox.get(
                          `${objective.option3.split("-")[0]}-${
                            objective.questionNo
                          }`
                        )
                      }
                      onChange={(e) =>
                        handleChange(
                          e.target.checked,
                          objective.option3.split("-")[0],
                          objective
                        )
                      }
                      name={objective && objective.option3}
                    />
                  }
                  label={objective && objective.option3}
                />
              )}
              {objective && objective.option4 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        !!radioval.checkbox.get(
                          `${objective.option4.split("-")[0]}-${
                            objective.questionNo
                          }`
                        )
                      }
                      onChange={(e) =>
                        handleChange(
                          e.target.checked,
                          objective.option4.split("-")[0],
                          objective
                        )
                      }
                      name={objective && objective.option4}
                    />
                  }
                  label={objective && objective.option4}
                />
              )}
            </FormGroup>
          )}
        </FormControl>
      </div>
    </div>
  );
  // }
}

// RadioButtonsGroup.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default RadioButtonsGroup;
