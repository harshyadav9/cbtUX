import React, { Component, useEffect, useState, useContext,useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { ExamDataContext } from './context/ExamDataContext';
import {
    Paper, Typography, Divider,
    List, ListItem, ListItemText
} from '@material-ui/core';
const useStyles = theme => ({

    padding: {
        padding: 10
    },
    timerStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: 10,
        padding: '20px 10px',
        '& li': {
            textAlign: 'center',
            padding: 0,
            '& div': {
                background: '#2a3b64',
                color: '#fff',
                margin: 0,
                borderRadius: 6,
                padding: '2px 0px 10px',
                '& span': {
                    fontSize: '2rem'
                },
                '& p': {
                    color: '#fff',

                }
            }
        }

    }

});


function Timer(props) {
    const { state } = useContext(ExamDataContext);
    let { classes , hours , minutes , seconds } = props;
    console.log("state", state);
    const [timer, setTimer] = useState({hours:0 , minutes:0 , seconds:0});




    useEffect(() => {
        console.log("initial set timer");
            setTimer(() => ({
                hours: hours, minutes: minutes,
                seconds: seconds
            }));
    },[]);



    React.useMemo(() => {
        if (timer.seconds > 0) {
            
            setTimer(prevState => ({
                ...prevState,
                seconds: prevState.seconds - 1
            }));
        } else  if (timer.hours === 0) {
            //  1 hr scene
            if (timer.minutes === 0) {
                // clearInterval(myInterval);
            } else {
              
                setTimer(prevState => ({
                    ...prevState,
                    minutes: prevState.minutes - 1,
                    seconds: 59,
                }));
            }
        } else {
            // hours not 0 sec 0
            //       01 hrs:00 min :00 sec
            if (timer.minutes > 0) {

                setTimer(prevState => ({
                    ...prevState,
                    minutes: prevState.minutes - 1,
                    seconds: 59,
                }));

            } else {
               

                setTimer(prevState => ({
                    ...prevState,
                    hours: prevState.hours - 1,
                    seconds: 59,
                    minutes: 59,
                }));
            }


        }

    },[timer]);

  


    // useEffect(() => {
    //     console.log("state timer 2  called");
    //     // setTimer(prevState => ({
    //     //             ...prevState,
    //     //             hours:state.hours,
    //     //             minutes:state.minutes
    //     //         }));
    //     // setTimer(prevState => ({
    //     //     ...prevState,
    //     //     hours:state.hours,
    //     //     minutes:state.minutes
    //     // }))

    //     // setTimeout(() => {
    //     if (state.time.hours > 0) {
    //         console.log("inside hours",timer)
    //         let myInterval = setInterval(() => {
    //             // console.log("set intervewl called");
    //             // const { seconds, minutes, hours, count } = this.state
    //             //       00 hrs:00 min :00 sec
    //             // console.log("timer inside interval" , timer);
    //             if (timer.seconds > 0) {
    //                 // setTimer({

    //                 // })
    //                 // console.log("decrement seconds");
    //                 setTimer(prevState => ({
    //                     ...prevState,
    //                     seconds: prevState.seconds - 1
    //                 }));
    //             } else
    //                 // if (seconds === 0) {
    //                 if (timer.hours === 0) {
    //                     //  1 hr scene
    //                     if (timer.minutes === 0) {
    //                         clearInterval(myInterval);
    //                     } else {
    //                         // sec = 0 , hour = 0 , minutes reduced by 1  ,  sec 10
    //                         // console.log("decrement minute");
    //                         setTimer(prevState => ({
    //                             ...prevState,
    //                             minutes: prevState.minutes - 1,
    //                             seconds: 59,
    //                         }));


    //                         // setTimer(({ minutes, count }) => ({

    //                         //     count: count + 1
    //                         // }))
    //                         // if (count === 2) {
    //                         //     setState(({ showWarning }) => ({ showWarning: true }));
    //                         // }
    //                         // if (count == 2) {
    //                         //     this.setState(({ hours }) => ({
    //                         //         hours: hours - 1,
    //                         //         count: 0,
    //                         //         minutes: 2
    //                         //     }))
    //                         // }
    //                     }
    //                 } else {
    //                     // hours not 0 sec 0
    //                     //       01 hrs:00 min :00 sec
    //                     if (timer.minutes > 0) {
    //                         // setTimer(({ minutes, count }) => ({
    //                         //     minutes: minutes - 1,
    //                         //     seconds: 60,
    //                         // }))


    //                         setTimer(prevState => ({
    //                             ...prevState,
    //                             minutes: prevState.minutes - 1,
    //                             seconds: 59,
    //                         }));

    //                     } else {
    //                         // setTimer(({ hours, count }) => ({
    //                         //     hours: hours - 1,
    //                         //     seconds: 60,
    //                         //     minutes: 60,
    //                         // }))

    //                         setTimer(prevState => ({
    //                             ...prevState,
    //                             hours: prevState.hours - 1,
    //                             seconds: 59,
    //                             minutes: 59,
    //                         }));
    //                     }


    //                 }

    //             // }
    //         }, 1000);
    //     }

    //     // },1000);



    // }, []);



    const gettime = (timer) => {
        return (
            <>
                <Paper elevation={3}>
                    <Typography variant="h6" gutterBottom className={classes.padding}>
                        Time Remaining :
                </Typography>
                    <Divider />
                    <List className={classes.timerStyle}>
                        <ListItem>
                            <ListItemText primary={timer.hours < 10 ? `0${timer.hours}` : `${timer.hours}`} secondary="HOURS" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={timer.minutes < 10 ? `0${timer.minutes}` : `${timer.minutes}`} secondary="MINUTES" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`} secondary="SECONDS" />
                        </ListItem>
                    </List>
                </Paper>
            </>
        )
    }

    return (
        <>
            {gettime(timer)}
        </>
    )
}


// export default withStyles(useStyles, { withTheme: true })(Timer);
export default withStyles(useStyles)(Timer);
