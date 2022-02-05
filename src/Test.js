import React, { useState, useEffect, useContext, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Questions from './Questions';
import RadioButtonsGroup from './Objective';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonsGroup from './buttonsGroup/buttonsGroup';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ExamDataContext } from './context/ExamDataContext';
import DisplayQuesCount from './buttonsGroup/displayQuesCount';
import testData from './test.json';
import {
    Divider,
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core';
import Header from './header/header';
import SubmitModal from './submitModal/submitModal';



const useStyles = theme => ({
    root: {
        flexGrow: 1
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        width: '100%',
        marginBottom: 20,
        marginTop: 25,
        backgroundColor: theme.palette.background.default,
        "& p": {
            color: '#000',
            fontSize: '20px',
            lineHeight: '1.4'
        }
    },
    Toolbar: {
        justifyContent: 'center',
        gridGap: 34
    },
    Footer: {
        background: 'transparent',
        boxShadow: 'none'
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: 6,
        height: ' calc(100% - 30px)'
    },
    mobileStepper: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },

    card: {
        margin: '10px',
        // backgroundColor: 'rgb(0,0,0,0.2)',
    },
    containerStyle: {
        padding: '16px 16px 18px 16px',
        background: '#e4e0f9',
        justifyContent: 'space-between'
    },
    appbar: {
        alignItems: 'center'
    },
    mobileStepper: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },

    buttonDefault: {
        margin: '12px',
        borderRadius: '50%',
        padding: '14px 0px',
        backgroundColor: '#fff',
        color: 'black',
        "&:hover": {
            backgroundColor: '#ccc',
        }
    },
    answeredColor: {
        // margin: '12px',
        borderRadius: '50%',
        padding: '14px 0px',
        backgroundColor: 'green',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#8bb58b',
        }
    },

    reviewColor: {
        margin: '12px',
        borderRadius: '50%',
        padding: '14px 0px',
        backgroundColor: 'red',
        color: '#fff',
        "&:hover": {
            backgroundColor: 'red',
        }
    },
    buttonContainer: {
        display: 'flex',
        width: 'calc(100% - 17%)',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: '44px',
        maxHeight: '600px',
        overflowY: 'scroll',
        boxShadow: '0px 4px 13px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.14), 0px 1px 20px 0px rgba(0,0,0,0.19)',
        borderRadius: '4px',
        border: '2px solid  rgba(0,0,0,0.2)',
        padding: '11px',
        "& button": {
            margin: '5px',

            minWidth: '50px'
        }
    },
    rightIcon: {
        height: 40
    },
    legendContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '96%',
        marginTop: 76,
        marginLeft: 19,
        boxShadow: '0px 4px 13px -1px rgb(0 0 0 / 20%), 0px 1px 10px 0px rgb(0 0 0 / 14%), 0px 1px 20px 0px rgb(0 0 0 / 19%)'
    },
    legends: {
        alignItems: 'center',
        display: 'flex',
        height: '40px',
        boxShadow: '0px 4px 13px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.14), 0px 1px 20px 0px rgba(0,0,0,0.19)',
        borderRadius: '7px',
        margin: '4px'

    },
    swipableViews: {
        position: 'relative',
        width: '100%'
    },
    rightContainer: {
        marginLeft: '24px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    }
});

function Test(props) {
    const { state, dispatch } = useContext(ExamDataContext);
    let reviewObj = { 'reviewA': [], 'reviewU': [] };
    // console.log("state,dispatch", state, dispatch);
    const [activeStep, setactiveStep] = useState(0);
    const history = useHistory();
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [finalData, setfinalData] = useState([]);
    const [maxSteps, setMaxSteps] = useState(0);
    // const maxSteps = Questions.length;
    const { classes, theme } = props;
    let quesNo = '';
    var hidden, visibilityChange;
    const [logout, setLogout] = useState(false);
    const [question, setquestion] = useState(0);
    const [optionSelected, setOptionSelected] = useState({ questionNo: '', option: '' });
    const [questionList, setquestionList] = useState([]);
    const [buttonState , setButtonState] = useState({});
    const [resetData, setResetData] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [intermittentLoadingObj, setIntermittentLoadingObj] = useState({});
    const [questionNo, setquestionNo] = useState({ id: '', type: 'unanswered' });
    console.log("Tets component loaded");
    useEffect(() => {
        console.log("test getting called");
        dispatch({ type: 'HANDLELOADING', isLoading: true });
        let keys = {};
        let regNo = JSON.parse(localStorage.getItem('regNo'));
        // axios.get(`cbt/candidate/getQuestions/${regNo.registrationNo}`).then(res => {

        let res = {data:testData};
            let arr = [];
            let unansweredArr = [];

            if (res.data.unansweredFlagsCount.length > 0) {
                localStorage.setItem('unansweredArr', JSON.stringify(res.data.unansweredFlagsCount));
            } else {
                for (let i = 0; i < res.data.questionList.length; i++) {
                    unansweredArr.push(i + 1);
                    arr.push(res.data.questionList[i]);
                }
                localStorage.setItem('unansweredArr', JSON.stringify(unansweredArr));
            }


            // console.log("res.data.questionList",res.data.questionList);
            setquestionList(arr);
            // console.log("arr.length", arr.length);
            setMaxSteps(arr.length);
           
            let intermittentObj = {};
           
            let answeredFlagsCount = 0;
            let reviewAnsweredFlagsCount = 0;
            let reviewUnansweredFlagsCount = 0;
            let isIntermittentFlag = false;
            if (res.data.answeredFlagsCount.length > 0) {
                localStorage.setItem('questionNo', JSON.stringify(res.data.answeredFlagsCount));
                answeredFlagsCount = res.data.answeredFlagsCount;
                for (let i = 0; i < answeredFlagsCount.length; i++) {
                    intermittentObj[answeredFlagsCount[i]] = {};
                    intermittentObj[answeredFlagsCount[i]]['default'] = false;
                    intermittentObj[answeredFlagsCount[i]]['unanswered'] = false;
                    intermittentObj[answeredFlagsCount[i]]['reviewA'] = false;
                    intermittentObj[answeredFlagsCount[i]]['reviewU'] = false;
                    intermittentObj[answeredFlagsCount[i]]['id'] = i + 1;
                    intermittentObj[answeredFlagsCount[i]]['answer'] = "";
                    intermittentObj[answeredFlagsCount[i]]['answered'] = true;
                }
            }

            if (res.data.reviewAnsweredFlagsCount.length > 0) {
                reviewObj['reviewA'] = res.data.reviewAnsweredFlagsCount;
                for (let i = 0; i < res.data.reviewAnsweredFlagsCount.length; i++) {
                    reviewAnsweredFlagsCount = res.data.reviewAnsweredFlagsCount;
                    intermittentObj[reviewAnsweredFlagsCount[i]] = {};
                    intermittentObj[reviewAnsweredFlagsCount[i]]['default'] = false;
                    intermittentObj[reviewAnsweredFlagsCount[i]]['unanswered'] = false;
                    intermittentObj[reviewAnsweredFlagsCount[i]]['reviewA'] = true;
                    intermittentObj[reviewAnsweredFlagsCount[i]]['reviewU'] = false;
                    intermittentObj[reviewAnsweredFlagsCount[i]]['id'] = i + 1;
                    intermittentObj[reviewAnsweredFlagsCount[i]]['answer'] = "";
                    intermittentObj[reviewAnsweredFlagsCount[i]]['answered'] = false;
                }
            }

            if (res.data.reviewUnansweredFlagsCount.length > 0) {
                reviewObj['reviewU'] = res.data.reviewUnansweredFlagsCount;
                for (let i = 0; i < res.data.reviewUnansweredFlagsCount.length; i++) {
                    reviewUnansweredFlagsCount = res.data.reviewUnansweredFlagsCount;
                    intermittentObj[reviewUnansweredFlagsCount[i]] = {};
                    intermittentObj[reviewUnansweredFlagsCount[i]]['default'] = false;
                    intermittentObj[reviewUnansweredFlagsCount[i]]['unanswered'] = false;
                    intermittentObj[reviewUnansweredFlagsCount[i]]['reviewA'] = false;
                    intermittentObj[reviewUnansweredFlagsCount[i]]['reviewU'] = true;
                    intermittentObj[reviewUnansweredFlagsCount[i]]['id'] = i + 1;
                    intermittentObj[reviewUnansweredFlagsCount[i]]['answer'] = "";
                    intermittentObj[reviewUnansweredFlagsCount[i]]['answered'] = false;
                }
            }

            if(answeredFlagsCount.length > 0 && reviewAnsweredFlagsCount.length > 0 && reviewUnansweredFlagsCount.length > 0) {
                isIntermittentFlag = true;
            }
           

            localStorage.setItem('reviewQuestionNo', JSON.stringify(reviewObj));

            // if(isIntermittentFlag){
                loadQuestionsFromMiddle(res.data.questionList);
                loadButtonStateInIntermittent(res.data);
                setCurrentQuestion(res.data.questionList[activeStep]);
            // }

            setIntermittentLoadingObj(intermittentObj);
            // setquestionList(arr);
            dispatch({
                type: 'ADDINFO', hours: res.data.durationHr, minutes: res.data.durationMin, photo: res.data.photo, name: res.data.instituteName,
                candidateName: res.data.candidateName,
                yearOfExam: res.data['year'],
                examCd: res.data['examCd'],
                instCd: res.data['instCd'],
                questionsLength: res.data.questionList.length,
                registrationNo: res.data.registrationNo,
                isLoading: false,
                options: {
                    option1: res.data.questionList[activeStep]['option1'].split("-")[0],
                    option2: res.data.questionList[activeStep]['option2'].split("-")[0],
                    option3: res.data.questionList[activeStep]['option3'].split("-")[0],
                    option4: res.data.questionList[activeStep]['option4'].split("-")[0]
                },
                time: { hours: 0, minutes: 25, seconds: 60 }
            });
            // populateResultSet();

        // });


        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        // alert(visibilityChange)




        // window.onbeforeunload = (event) => {
        //     console.log("onbeforeunload called");
        //     const e = event || window.event;
        //     // Cancel the event
        //     var msg = '';
        //     e = e || window.event;
        //     e.preventDefault();
        //     if (e) {
        //         e.returnValue = msg; // Legacy method for cross browser support
        //     }
        //     return msg; // Legacy method for cross browser support
        //     // return "Are you sure you want to navigate away?";
        // };

        document.addEventListener(visibilityChange, handleVisibilityChange, false);

        document.addEventListener('keydown', (e) => {
            console.log(e.which);
            // if (e.which === 91 || e.key === "Tab")
            keys[e.which] = true;
            if (e.keyCode === 18) e.preventDefault()
            e.preventDefault();

        });


        document.addEventListener('contextmenu', (e) => {
            console.log(e.which);

            e.preventDefault();
        });
    }, []);


    // useEffect(() => {
    //     const unblock = history.block((location, action) => {
    //         // if (checkBlockingCondition) {
    //         alert("called");
    //         return window.confirm("Navigate Back?");
    //         // }
    //         // return true;
    //     });
    //     return () => {
    //         unblock();
    //     }
    // }, [])

    // useEffect(() => {
    //     const unblock = history.block((location, action) => {

    //         return window.confirm("Navigate Back?");

    //         // return true;
    //     });

    //     return () => {
    //         unblock();
    //     };
    // }, [])




    const loadButtonStateInIntermittent = (questions) => {
        let buttonObj = {};
       
        for(let i = 0; i  < questions.questionList.length ; i++){
            
            let defaultCaseFlag = true;
            buttonObj[i+1] = {};
            if(questions.reviewAnsweredFlagsCount.indexOf(questions.questionList[i]['questionNo']) > -1){
                defaultCaseFlag = false;
                buttonObj[i+1]['answer'] = questions.questionList[i]['selectedAnswer'];
                buttonObj[i+1]['answered'] = false;
                buttonObj[i+1]['default'] = false;
                buttonObj[i+1]['id'] = i+1;
                buttonObj[i+1]['reviewA'] = true;
                buttonObj[i+1]['reviewU'] = false;
                buttonObj[i+1]['unanswered'] = false;
            }


            if(questions.reviewUnansweredFlagsCount.indexOf(questions.questionList[i]['questionNo']) > -1){
                defaultCaseFlag = false;
                buttonObj[i+1]['answer'] = ""
                buttonObj[i+1]['answered'] = false;
                buttonObj[i+1]['default'] = false;
                buttonObj[i+1]['id'] = i+1;
                buttonObj[i+1]['reviewA'] = false;
                buttonObj[i+1]['reviewU'] = true;
                buttonObj[i+1]['unanswered'] = false;
            }

            if(questions.answeredFlagsCount.indexOf(questions.questionList[i]['questionNo']) > -1){
                defaultCaseFlag = false;
                buttonObj[i+1]['answer'] = questions.questionList[i]['selectedAnswer']
                buttonObj[i+1]['answered'] = true;
                buttonObj[i+1]['default'] = false;
                buttonObj[i+1]['id'] = i+1;
                buttonObj[i+1]['reviewA'] = false;
                buttonObj[i+1]['reviewU'] = false;
                buttonObj[i+1]['unanswered'] = false;
            }


            if(questions.unansweredFlagsCount.indexOf(questions.questionList[i]['questionNo']) > -1){
                defaultCaseFlag = false;
                buttonObj[i+1]['answer'] = "";
                buttonObj[i+1]['answered'] = false;
                buttonObj[i+1]['default'] = true;
                buttonObj[i+1]['id'] = i+1;
                buttonObj[i+1]['reviewA'] = false;
                buttonObj[i+1]['reviewU'] = false;
                buttonObj[i+1]['unanswered'] = false;
            }

            if(defaultCaseFlag){
                buttonObj[i+1]['answer'] = "";
                buttonObj[i+1]['answered'] = false;
                buttonObj[i+1]['default'] = true;
                buttonObj[i+1]['id'] = i+1;
                buttonObj[i+1]['reviewA'] = false;
                buttonObj[i+1]['reviewU'] = false;
                buttonObj[i+1]['unanswered'] = false;
            }

           

           
        }

        setButtonState(prevState => ({
            ...prevState,
            ...buttonObj
        }));
    }

    const loadQuestionsFromMiddle =  (questions) => {
        let stateObj = {};
        for(let i = 0; i  < questions.length ; i++){
            if(questions[i]['selectedAnswer']){
                stateObj[questions[i]['questionNo']] = {};
                    if(questions[i]['multiple'] === 'N'){
                        stateObj[questions[i]['questionNo']]['key'] = questions[i]['selectedAnswer'];
                        stateObj[questions[i]['questionNo']]['value'] = questions[i]['selectedAnswer'];
                    } else {
                        let checkBoxAnswersArr = [];
                        stateObj[questions[i]['questionNo']]['key'] = questions[i]['selectedAnswer'];
                        console.log("questions[i]",questions[i])
                        if(questions[i]['selectedAnswer'].includes(',')){
                            checkBoxAnswersArr = questions[i]['selectedAnswer'].split(',');
                        } else {
                            checkBoxAnswersArr = [questions[i]['selectedAnswer']];
                        }
                        let myMap = new Map();

                        for(let j = 0 ; j < checkBoxAnswersArr.length ; j++){
                            myMap.set(`${checkBoxAnswersArr[j]}-${questions[i]['questionNo']}`, true);
                        }
                        stateObj[questions[i]['questionNo']]['value'] = myMap;
                        
                    }
            }
        }
        dispatch({ type: 'ADD_QUESTION_VALUES', questions: stateObj, reset: false });
        console.log("stateObj",stateObj);
    }


    const handleVisibilityChange = () => {
        // console.log("called");
        // if (!document[hidden]) {

        //    alert(localStorage.getItem('pageNavigateAway'));

        // } else {
        //     localStorage.setItem('pageNavigateAway' , 1);
        // }

        // window.reload();
        // setLogout(true);
        //  

    }

    // const saveQuestion = (e) => {
    //     console.log(e);
    //     console.log("quesNo", quesNo);
    //     // if (e == "save")
    //     //     setquestionNo({ id: 1, type: 'answered' });
    //     // else {
    //     //     if (JSON.parse(localStorage.getItem('questionNo')) === null)
    //     //         setquestionNo({ id: 1, type: 'reviewU' });
    //     //     else
    //     //         setquestionNo({ id: 1, type: 'reviewA' });
    //     // }

    //     if (JSON.parse(localStorage.getItem('questionNo')) === null) {
    //         if (e == "save") {
    //             setquestionNo({ id: 1, type: 'unanswered' });
    //         } else {
    //             setquestionNo({ id: 1, type: 'reviewU' });
    //         }
    //     } else {
    //         if (e == "save") {
    //             setquestionNo({ id: 1, type: 'answered' });
    //         } else {
    //             setquestionNo({ id: 1, type: 'reviewA' });
    //         }

    //     }



    // }


    const submitBtnHandler = () => {
        setIsSubmit(true);
    }

    const submitAnswers = (submitType) => {
        // for(let i = 1 ; i < questionList.length;i++){
        //     if(finalData() questionList[i])
        // }
        console.log("submitType", submitType);
        dispatch({ type: 'HANDLELOADING', isLoading: true });
        let finalData = { resp: [] };
        let finalStateData = state.questions;
        let savedIds = state.idToSave;
        let regNo = JSON.parse(localStorage.getItem('regNo'));
        for (let i = 0; i < savedIds.length; i++) {
            let obj = {
                "id": {
                    registrationNo: regNo.registrationNo,
                    questionNo: savedIds[i],
                    year: questionList[0].id.year
                },
                setNo: questionList[0].setNo,
                answer: finalStateData[savedIds[i]].key,
                examCd: questionList[0].id.examCd,
                instCd: questionList[0].id.instCd
            };
            finalData.resp.push(obj);
        }
        // for(let question in finalStateData){
        //     let obj = {
        //         "id": {
        //             registrationNo: 1,
        //             questionNo:question,
        //             year: questionList[0].id.year
        //         },
        //         setNo:questionList[0].setNo,
        //         answer: finalStateData[question].key,
        //         examCd:questionList[0].id.examCd,
        //         instCd:questionList[0].id.instCd
        //     };
        //     finalData.resp.push(obj);
        // }
        console.log(JSON.stringify(finalData));
        // let obj = { registrationNo: 2, resp: finalData };
        // axios.put('cbt/student/submitExam', finalData).then(res => {
        //     console.log("res", res);
        //     dispatch({ type: 'HANDLELOADING', isLoading: false });
        //     history.push('/response');
        //     setIsSubmit(false);
        // }).catch(error => {
        //     dispatch({ type: 'HANDLELOADING', isLoading: false });
        //     setIsSubmit(false);
        // });
        console.log("finalData", finalData);
    }

    // const reviewQuestion = () => {
    //     let reviewquestions;
    //     if ((JSON.parse(localStorage.getItem('reviewQuestionNo'))) === null) {

    //         localStorage.setItem('reviewQuestionNo', JSON.stringify({ 'reviewU': [], 'reviewA': [] }));
    //     }
    //     reviewquestions = JSON.parse(localStorage.getItem('reviewQuestionNo'));

    //     console.log("activeStep", activeStep)
    //     let activeQues = activeStep + 1;
    //     let questions = JSON.parse(localStorage.getItem('questionNo'));
    //     console.log("reviewquestions", reviewquestions);
    //     if (questions && questions.indexOf(activeQues) > -1) {
    //         // if (JSON.parse(localStorage.getItem('questionNo')) === question) {
    //         if (reviewquestions && reviewquestions['reviewA'].indexOf(activeQues) == -1) {

    //             reviewquestions['reviewA'].push(activeQues);
    //             if (reviewquestions['reviewU'].indexOf(activeQues) > -1) {
    //                 reviewquestions['reviewU'].splice(reviewquestions['reviewU'].indexOf(activeQues), 1);
    //             }
    //         }


    //         setquestionNo({ id: activeQues, type: 'reviewA' });
    //     } else {
    //         if (reviewquestions && reviewquestions['reviewU'].indexOf(activeQues) == -1) {
    //             reviewquestions['reviewU'].push(activeQues);
    //             if (reviewquestions['reviewA'].indexOf(activeQues) > -1) {
    //                 reviewquestions['reviewA'].splice(reviewquestions['reviewA'].indexOf(activeQues), 1);
    //             }
    //         }


    //         setquestionNo({ id: activeQues, type: 'reviewU' });
    //     }
    //     localStorage.setItem('reviewQuestionNo', JSON.stringify(reviewquestions));
    //     setactiveStep(activeStep + 1);
    // }



    const checkVisitedQues = (key) => {
        let unvisitedQues = JSON.parse(localStorage.getItem('unvisitedQues'));
        if (unvisitedQues !== null) {
            if (unvisitedQues.indexOf(key + 1) > -1) {
                unvisitedQues.splice(unvisitedQues.indexOf(key + 1), 1);
            }
            localStorage.setItem('unvisitedQues', JSON.stringify(unvisitedQues));
        }

    }

    const changeActiveStep = (key) => {
        // console.log("key", key);
        checkVisitedQues(key);
        setCurrentQuestion(questionList[key]);
        setactiveStep(key);
    }

    const reviewAndNext = () => {
        let reviewObj = {};
        let activeQues = activeStep + 1;
        checkVisitedQues(activeStep);
        let questions = JSON.parse(localStorage.getItem('questionNo'));
        let obj;
        if ((state.questions === undefined) || (state.questions[activeQues] === undefined) || state.questions[activeQues]['key'] === "") {
            // if (questions === null || (questions.indexOf(activeQues) === -1)) {
            let reviewQues = JSON.parse(localStorage.getItem('reviewQuestionNo'));
            if (reviewQues === null) {
                obj = { reviewU: [activeQues], reviewA: [] };
            } else {
                obj = reviewQues;
                if (obj.reviewU.indexOf(activeQues) === -1) {
                    obj.reviewU = obj.reviewU.concat(activeQues);
                }
                if (obj.reviewA.indexOf(activeQues) > -1) {
                    obj.reviewA.splice(obj.reviewA.indexOf(activeQues), 1);
                }
            }
            
            setquestionNo({ id: activeQues, type: 'reviewU' });
            localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));

            reviewObj = {
                "registrationNo": state.registrationNo,
                "questionId": activeQues,
                "yearOfExam": state.yearOfExam,
                "selectedAnswer": "",
                "examCd": state.examCd,
                "finalExamSubmitFlag": false,
                "instCd": state.instCd,
                "answeredFlag": false,
                "unansweredFlag": false,
                "reviewAnsweredFlag": false,
                "reviewUnansweredFlag": true
            };

            console.log("unanwered reviewObj", reviewObj);
        } else {
            if (state.questions && state.questions && state.questions[activeQues] && state.questions[activeQues]['key'] !== "") {
                let reviewQues = JSON.parse(localStorage.getItem('reviewQuestionNo'));
                let answeredQues = [];
                answeredQues = JSON.parse(localStorage.getItem('questionNo'));
                if (reviewQues === null) {
                    let obj = { reviewU: [], reviewA: [activeQues] };
                    setquestionNo({ id: activeQues, type: 'reviewA' });
                    localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
                } else {
                    let obj = reviewQues;
                    if (obj.reviewA.indexOf(activeQues) === -1) {
                        obj.reviewA = obj.reviewA.concat(activeQues);
                    }
                    if (obj.reviewU.indexOf(activeQues) > -1) {
                        obj.reviewU.splice(obj.reviewU.indexOf(activeQues), 1);
                    }

                    if (answeredQues.length > 0) {
                        if (answeredQues.indexOf(activeQues) > -1) {
                            answeredQues.splice(answeredQues.indexOf(activeQues), 1);
                            localStorage.setItem('questionNo', JSON.stringify(answeredQues));
                        }
                    }

                    console.log("answeredQues", answeredQues);
                    setOptionSelected({ questionNo: activeQues, option: state.questions[activeQues]['key'] });
                    setquestionNo({ id: activeQues, type: 'reviewA' });
                    localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
                }
            }
            // else {
            //     let reviewQues = JSON.parse(localStorage.getItem('reviewQuestionNo'));
            //     if(reviewQues === null){
            //         let obj = {reviewU:[activeQues] , reviewA:[]};
            //         localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
            //           setquestionNo({ id: activeQues, type: 'reviewU' });
            //     } else {
            //         let obj = reviewQues;
            //         obj.reviewU = obj.reviewU.concat(activeQues);
            //         obj.reviewA.splice( obj.reviewA.indexOf(activeQues) , 1);
            //         localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
            //         setquestionNo({ id: activeQues, type: 'reviewU' });
            //     }
            // }
            // }

            reviewObj = {
                "registrationNo": state.registrationNo,
                "questionId": activeQues,
                "yearOfExam": state.yearOfExam,
                "selectedAnswer": state.questions[activeQues]['key'],
                "examCd": state.examCd,
                "finalExamSubmitFlag": false,
                "instCd": state.instCd,
                "answeredFlag": false,
                "unansweredFlag": false,
                "reviewAnsweredFlag": true,
                "reviewUnansweredFlag": false
            };



            console.log("anwered reviewObj", reviewObj);

        }

        axios.post(`cbt/dataUpload/publish`, reviewObj).then(res => {

        });

        if(activeQues < state.questionsLength){
            setCurrentQuestion(questionList[(activeStep + 1)]);
            setactiveStep(activeStep + 1);
        }
       



    }
    // () => {

    // }


    // const saveAndNext =  useCallback(() => {
    //     let activeQues = activeStep + 1;
    //     checkVisitedQues(activeStep);
    //     setCurrentQuestion(questionList[activeQues]);
    //     let questions = JSON.parse(localStorage.getItem('questionNo'));
    //     let reviewQues = JSON.parse(localStorage.getItem('reviewQuestionNo'));
    //     if (questions && questions.indexOf(activeQues) > -1) {
    //         setquestionNo({ id: activeQues, type: 'answered' });
    //     }
    //     if (reviewQues !== null) {
    //         let obj = reviewQues;
    //         if (obj.reviewA.indexOf(activeQues) > -1) {
    //             obj.reviewA.splice(obj.reviewA.indexOf(activeQues), 1);
    //         }

    //         if (obj.reviewU.indexOf(activeQues) > -1) {
    //             obj.reviewU.splice(obj.reviewU.indexOf(activeQues), 1);
    //         }

    //         console.log("obj", obj);
    //         localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
    //     }
    //     setactiveStep(activeStep + 1);
    // },[activeStep]);


    const checkReviewQuestions = (activeQues) => {
        let reviewQues = JSON.parse(localStorage.getItem('reviewQuestionNo'));
        // if (questions && questions.indexOf(activeQues) > -1) {
        //     setquestionNo({ id: activeQues, type: 'answered' });
        // }
        if (reviewQues !== null) {
            let obj = reviewQues;
            if (obj.reviewA.indexOf(activeQues) > -1) {
                obj.reviewA.splice(obj.reviewA.indexOf(activeQues), 1);
            }

            if (obj.reviewU.indexOf(activeQues) > -1) {
                obj.reviewU.splice(obj.reviewU.indexOf(activeQues), 1);
            }

            console.log("obj", obj);
            localStorage.setItem('reviewQuestionNo', JSON.stringify(obj));
        }
    }

    const checkemptyValueInQuestions = () => {

        let isEmptyValueInCheckbox = false;
        if (state.questions[activeStep + 1] === undefined) {
            return true;
        }
        let questionValue = state.questions[activeStep + 1].value;
        if (state.questions[activeStep + 1] === undefined) {
            return true;
        } else {
            if (typeof (questionValue) === "string") {
                //  radio button case
                if (questionValue === "") {
                    return true;
                }
            } else {
                //  checkbox button case
                for (var [key, value] of questionValue) {
                    if (value === true) {
                        isEmptyValueInCheckbox = true;
                    }
                }
                if (isEmptyValueInCheckbox) {
                    return false;
                } else {
                    return true;
                }
            }
        }

    }

    const saveAndNext = () => {
        // setIsSave(true);
        console.log("saveAndNext>>>>>>>>>>>");
        let answerKeys;
        let activeQues = activeStep + 1;
        if (state.questions && state.questions[activeQues]) {


            setOptionSelected({ questionNo: activeQues, option: state.questions[activeQues]['key'] });
            let questions = state.questions;
            let answeredQuestions = JSON.parse(localStorage.getItem('questionNo'));
            console.log("answeredQuestions" , answeredQuestions);
            if(answeredQuestions){
                 answerKeys = [...answeredQuestions, ...state.idToSave];
            } else {
                 answerKeys = [ ...state.idToSave];
            }
           

            checkVisitedQues(activeStep);
            // let questions = JSON.parse(localStorage.getItem('questionNo'));
            checkReviewQuestions(activeQues);

            let isEmpty = checkemptyValueInQuestions();

            console.log("isEmpty", isEmpty);





            if (isEmpty) {

                if (answerKeys.indexOf(activeStep + 1) > -1) {
                    answerKeys.splice(answerKeys.indexOf(activeStep + 1), 1);
                }
                setquestionNo({ id: activeQues, type: 'default' });
                setIsSave(true);
                return;
            } else {
                if (answerKeys.indexOf(activeStep + 1) == -1) {
                    answerKeys.push(activeStep + 1);
                }
                setquestionNo({ id: activeQues, type: 'answered' });
                if(activeQues < state.questionsLength){
                    setCurrentQuestion(questionList[(activeStep + 1)]);
                    setactiveStep(activeStep + 1);
                }
            }




            // if(answerKeys.indexOf(activeStep + 1) == -1){
            //     answerKeys.push(activeStep + 1);
            //     setquestionNo({ id: activeQues, type: 'answered' });
            // } else {
            //     setquestionNo({ id: activeQues, type: 'unanswered' });
            // }     
            // if(questions[activeStep + 1] !== undefined){

            //     if(questions[activeStep + 1].secondValue !== ""){
            //         questions[activeStep + 1].mainValue = questions[activeStep + 1].secondValue;
            //         questions[activeStep + 1].secondValue = "";
            //         console.log("questions on save button clicked" , questions);
            //         dispatch({type:'SAVE_AND_NEXT',idToSave:answerKeys,questions:questions});
            //     }           

            // }  

            // let regNo =  JSON.parse(localStorage.getItem('regNo'));
            let obj = {
                "registrationNo": state.registrationNo,
                "questionId": activeQues,
                "yearOfExam": state.yearOfExam,
                "selectedAnswer": questions[activeQues]['key'],
                "examCd": state.examCd,
                "finalExamSubmitFlag": false,
                "instCd": state.instCd,
                "answeredFlag": true,
                "unansweredFlag": false,
                "reviewAnsweredFlag": false,
                "reviewUnansweredFlag": false
            };
            console.log("obj", obj);
            axios.post(`cbt/dataUpload/publish`, obj).then(res => {

            });
            localStorage.setItem('questionNo', JSON.stringify(answerKeys));
        }

    }

    const handleNext = () => {
        checkVisitedQues(activeStep);
        let questions = state.questions;

        // if(questions[activeStep + 1] !== undefined){           
        //     questions[activeStep + 1].secondValue = "";
        //     dispatch({type:'HANDLE_PREV_NEXT_BTN',questions:questions});          
        // }
        setCurrentQuestion(questionList[(activeStep + 1)]);
        setactiveStep(activeStep + 1);
    };


    const resetoption = () => {

        // dispatch({type:'RESET',reset:true});
        let savedIds = state.idToSave;

        localStorage.setItem('isReset', JSON.stringify({ 'reset': true }));

        // for (let i = 0; i < questionList.length; i++) {
        //     if (questionList[i].id.questionNo === (activeStep + 1)) {
        //         if (questionList[i].multiple === 'N') {
        //             setResetData('radio');
        //         } else {
        //             setResetData('checkbox');
        //         }
        //     }
        // }
        let answeredQues = JSON.parse(localStorage.getItem('questionNo'));
        let reviewQuestionNo = JSON.parse(localStorage.getItem('reviewQuestionNo'));
        if (answeredQues !== null) {
            if (answeredQues.indexOf(activeStep + 1) > -1) {
                answeredQues.splice(answeredQues.indexOf(activeStep + 1), 1);
            }
            localStorage.setItem('questionNo', JSON.stringify(answeredQues));

        }
        if (reviewQuestionNo !== null) {
            if (reviewQuestionNo.reviewU.indexOf(activeStep + 1) > -1) {
                reviewQuestionNo.reviewU.splice(reviewQuestionNo.reviewU.indexOf(activeStep + 1), 1);
            }
            if (reviewQuestionNo.reviewA.indexOf(activeStep + 1) > -1) {
                reviewQuestionNo.reviewA.splice(reviewQuestionNo.reviewA.indexOf(activeStep + 1), 1);
            }
            localStorage.setItem('reviewQuestionNo', JSON.stringify(reviewQuestionNo));
        }
        setOptionSelected({ questionNo: (activeStep + 1), option: "" });
        setquestionNo({ id: (activeStep + 1), type: 'default' });
        setactiveStep(activeStep);
        if (savedIds.indexOf(activeStep + 1) > -1) {
            savedIds.splice(savedIds.indexOf(activeStep + 1), 1);
        }
        dispatch({ type: 'RESET', reset: true, idToSave: savedIds });

        let regNo = JSON.parse(localStorage.getItem('regNo'));


        // axios.post(`cbt/dataUpload/publish`,obj).then(res => {
        //     localStorage.setItem('questionNo', JSON.stringify(answerKeys));
        // });
    }

    const handleBack = () => {

        // let questions = state.questions;        
        // if(questions[activeStep - 1] !== undefined){           
        //     questions[activeStep - 1].secondValue = "";
        //     dispatch({type:'HANDLE_PREV_NEXT_BTN',questions:questions});          
        // }
        // let questions = state.questions;        
        // if(questions[activeStep + 1] !== undefined){           
        //     questions[activeStep + 1].secondValue = "";
        //     dispatch({type:'HANDLE_PREV_NEXT_BTN',questions:questions});          
        // }
        setactiveStep(activeStep - 1);
        setCurrentQuestion(questionList[(activeStep - 1)]);
        checkVisitedQues(activeStep - 1);
    };


    const handleStepChange = activeStep => {
        setactiveStep(activeStep);
    };



    const response = (event) => {
        // console.log("event",event);
        // let index = -1;
        // let newAns = [];
        // if (event.isradio) {
        //     let resData = [...state.finalData];

        //     for (let i = 0; i < resData.length; i++) {
        //         if (resData[i]['id']['questionId'] == event.id) {
        //             // isUpdate = true;
        //             index = i;
        //             break;
        //         }
        //     }
        //     newAns.push(event.option);
        //     let option = newAns[0].trim();
        //     if (index === -1) {
        //         let obj = {
        //             "id": {
        //                 registrationNo: 2,
        //                 questionId: event.id,
        //                 yearOfExam: 2020
        //             },
        //             selectedAnswer: option
        //         }
        //         resData = [...resData, obj];
        //     } else {
        //         resData[index].selectedAnswer = option;
        //     }

        //     //  if radio is checked

        //     // setfinalData(resData);
        //     dispatch({ type: 'ADD_FINAL_DATA', finalData: resData });

        // } else {
        //     //  if checkbox is checked
        //     let resData = [...state.finalData];
        //     for (let i = 0; i < resData.length; i++) {
        //         if (resData[i]['id']['questionId'] == event.id) {
        //             // isUpdate = true;
        //             index = i;
        //             break;
        //         }
        //     }
        //     if (index === -1) {
        //         newAns.push(event.name);
        //         let option = newAns[0].trim();
        //         let obj = {
        //             "id": {
        //                 registrationNo: 2,
        //                 questionId: event.id,
        //                 yearOfExam: 2020
        //             },
        //             selectedAnswer: option
        //         }
        //         resData = [...resData, obj];
        //         // setfinalData(resData);
        //         dispatch({ type: 'ADD_FINAL_DATA', finalData: resData });
        //     } else {
        //         let selectedOptionObj = resData[index];
        //         let isElemPresent = false;
        //         let prevAns = selectedOptionObj['selectedAnswer'];
        //         // if (prevAns === "") {
        //         //     newAns.push(event.name);
        //         // } else {
        //         newAns = prevAns === "" ? [] : prevAns.split(",");
        //         // }
        //         // if (newAns.length === 0) {
        //         //     newAns.push(event.name);
        //         // } else {
        //         for (let i = 0; i < newAns.length; i++) {
        //             if (newAns[i].trim() == event.name.trim()) {
        //                 isElemPresent = true;
        //                 // if checked flag is turn to false
        //                 if (event.isChecked === false) {
        //                     newAns.splice(i, 1);
        //                     i--;
        //                 }
        //             }
        //         }
        //         if (!isElemPresent) {
        //             // if checked flag is turned to true
        //             newAns.push(event.name);
        //         }
        //         if (newAns.length === 0) {
        //             resData[index].selectedAnswer = "";
        //         } else {
        //             // let obj = {
        //             //     "id": {
        //             //         registrationNo: 2,
        //             //         questionId: event.id,
        //             //         yearOfExam: 2020
        //             //     },
        //             //     selectedAnswer: (newAns.join(","))
        //             // }
        //             resData[index].selectedAnswer = (newAns.join(","));
        //             // resData = [...resData];
        //         }

        //         dispatch({ type: 'ADD_FINAL_DATA', finalData: resData });
        //         // setfinalData(resData);
        //         // }
        //     }
        // }
        // if (event.id !== undefined) {
        //     let arr = [];
        //     const questionNo = JSON.parse(localStorage.getItem('questionNo'));
        //     if (questionNo === null) {
        //         arr.push(event.id);
        //     } else {
        //         if (questionNo.indexOf(event.id) == -1) {
        //             arr = questionNo.concat(event.id);
        //         } else {
        //             arr = questionNo;
        //         }

        //     }

        //     localStorage.setItem('questionNo', JSON.stringify(arr));
        // }

    }



    const resetValue = (flag) => {
        setResetData(flag);
    }

    const checkQuestionNo = (quesNo) => {
        console.log("quesNo", quesNo);
        // localStorage.setItem('questionNo', JSON.stringify(quesNo));
        quesNo = quesNo;
        setquestion(quesNo);
        //setquestionNo({ id: quesNo, type: 'answered' });
        // setquestionNo(quesNo);
        // quesNo = String(quesNo);
        // const questionNo = JSON.parse(localStorage.getItem('questionNo'));
        // const result = questionNo.includes(quesNo);

        // if (result === true) {
        //     const questionNos = questionNo.filter((questionNumber) => {
        //         return questionNumber !== quesNo;
        //     });

        //     localStorage.setItem('questionNo', JSON.stringify(questionNos));
        //     localStorage.setItem('candidateScore', String(questionNos.length));
        // }
    }
    return (
        <>
            <Header />
            <SubmitModal isSubmit={isSubmit} setIsSubmit={setIsSubmit} isSave={isSave} setIsSave={setIsSave} submitAnswers={submitAnswers} />
            <Grid container className={classes.containerStyle}>
                <Grid container xs={12} md={8} lg={8} className={classes.leftContainer}>
                    <DisplayQuesCount totalQues={questionList.length} activeStep={activeStep} />
                    {/* <Paper square elevation={0} className={classes.header}>
                       <span>
                       <Typography>{questionList && questionList[activeStep] && questionList[activeStep].id && questionList[activeStep].id.questionNo} {questionList && questionList[activeStep] && questionList[activeStep].question}</Typography>
                       </span> 
                    </Paper> */}
                    {/* <Prompt  message="Are you sure you want to logout ?" /> */}
                    {/* {Questions.map(question => ( */}



                    <div>

                        {questionList && (<div>
                            <RadioButtonsGroup
                                // isReset={resetData}
                                activeStep={activeStep}
                                objective={currentQuestion}
                               
                            // setReset={(isReset) => { resetValue(isReset) }}
                            // reset={resetData}

                            // response={response}
                            // checkQuestionNo={(quesNo) => checkQuestionNo(quesNo)}
                            />
                        </div>)}

                    </div>
                    {/* <div className={classes.swipableViews}>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            key={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >                           
                            {questionList && questionList.map(question => (
                                <div key={question.id.questionNo}>
                                     <RadioButtonsGroup
                                    activeStep={activeStep}
                                    objective={question}
                                     />
                                </div>
                               
                            ))}

                        </SwipeableViews>
                    </div> */}

                    {/* ))} */}
                    {/* <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="progress"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Save & Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
            </Button>

                        }
                    /> */}
                    <Divider />
                    <AppBar position="static" className={classes.Footer}>
                        <Toolbar className={classes.Toolbar}>
                            <IconButton aria-label="left arrow" disabled={activeStep === 0} onClick={handleBack}>
                                <ArrowBackIosIcon></ArrowBackIosIcon>
                            </IconButton>
                            {/* <Button variant="outlined" onClick={handleBack} endIcon={<ArrowBackIosIcon></ArrowBackIosIcon>} disabled={activeStep === 0}></Button> */}

                            <Button variant="outlined" onClick={resetoption} color="secondary">Reset</Button>

                            <Button type="button" variant="outlined" color="primary" onClick={reviewAndNext}>
                                Review & Next
                            </Button>
                            <Button type="button" variant="outlined" color="primary" onClick={saveAndNext}>
                                Save & Next
                            </Button>
                            <Button color="primary" variant="contained" onClick={submitBtnHandler}>Submit</Button>
                            {/* <Button color="primary" className={classes.rightIcon} onClick={handleNext} endIcon={<ArrowForwardIosIcon></ArrowForwardIosIcon>} disabled={activeStep === maxSteps - 1} variant="contained"></Button> */}
                            <IconButton aria-label="right arrow" disabled={activeStep === maxSteps - 1} onClick={handleNext}>
                                <ArrowForwardIosIcon></ArrowForwardIosIcon>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    {/* <div className={classes.buttonContainer}>

                        <div>
                            <Button size="small" onClick={handleBack} endIcon={<ArrowBackIosIcon></ArrowBackIosIcon>} disabled={activeStep === 0}>
                            </Button>
                        </div>




                        <div>
                            <Button variant="contained" color="primary" size="small" onClick={resetoption} >

                                Reset
                            </Button>

                            <Button variant="contained" color="primary" size="small" onClick={submitAnswers} >

                                Submit
                            </Button>


                            <Button variant="contained" color="primary" size="small" onClick={reviewAndNext} disabled={activeStep === maxSteps - 1}>

                                Review & Next
                            </Button>


                            <Button variant="contained" color="primary" size="small" onClick={saveAndNext} disabled={activeStep === maxSteps - 1}>

                                Save & Next
                            </Button>
                        </div>


                        <div>
                            <Button size="small" onClick={handleNext} endIcon={<ArrowForwardIosIcon></ArrowForwardIosIcon>} disabled={activeStep === maxSteps - 1}>
                            </Button>
                        </div>


                    </div>







                    {/* <Button onClick={() => { saveQuestion('save') }} value="save" variant="contained">Save & Next</Button>
                    <Button onClick={() => { saveQuestion('review') }} onClick={saveQuestion} variant="contained" color="primary">
                        Review
                    </Button> */}
                </Grid>
                <Grid item xs={12} md={4} lg={3} className={classes.rightContainer}>

                    <ButtonsGroup arrLen={questionList} optionSelected={optionSelected} questionInfo={questionNo} changeStep={changeActiveStep} submitAnswers={submitAnswers}  buttonState={buttonState} />


                </Grid>
            </Grid>

        </>
    )
}
export default withStyles(useStyles, { withTheme: true })(Test);
// export default Test
