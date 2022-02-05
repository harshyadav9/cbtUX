import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ButtonsGroup from '../buttonsGroup/buttonsGroup';
import Header from '../header/header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { getCurrentTime , evaluateEnableDisableBasedOnTime  , isExamStartingTime} from '../utils/utils';
// import image from '../../public/'
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '40vh',
        display: 'flex'
    },
    InstructionsDiv: {
        padding: '9px',
        boxShadow: '0px 3px 8px 6px #ccc',
        // lineHeight: '4rem'
    },
    root: {
        flexGrow: 1
    },
    img1: {
        width: '100px',
        height: '100px'
    }
}));


function Instructions() {
    const classes = useStyles();
    let buttonVal = null;
    const [questionId, setquestionId] = useState({ id: '', type: '' })
    const [isExamStarted, setIsExamStarted] = useState(false)
    useEffect(() => {

        let examStartInterval = setInterval(() => {

            let currentTime = getCurrentTime();
            let examStartingTime = isExamStartingTime();

            if((currentTime.hours == examStartingTime.hours) && (currentTime.minutes == examStartingTime.minutes)){
                setIsExamStarted(true);
            } else {
                setIsExamStarted(false);
            }
        },1000);
    },[]);
    return (
        
        <>
        <Header/>
        <Card className={classes.root}>
             <CardContent>
                <Typography variant="h4" component="h4" gutterBottom>
                    Instructions
                </Typography>
                <hr/>
                <Typography variant="h5" component="h5">
                1. After login, the candidate shall be able to see the detailed instructions for the examination. Candidates are advised to go through the instructions carefully regarding the type   
            of questions, marking scheme, procedure to mark & change answer etc. At the designated time  of start of the examination, the candidates will be able to proceed and see the questions on the
                  computer screen?
                </Typography>

                <Typography variant="h5" component="h5">
                1. After login, the candidate shall be able to see the detailed instructions for the examination. Candidates are advised to go through the instructions carefully regarding the type   
            of questions, marking scheme, procedure to mark & change answer etc. At the designated time  of start of the examination, the candidates will be able to proceed and see the questions on the
                  computer screen?
                </Typography>


                <Typography variant="h5" component="h5">
                1. After login, the candidate shall be able to see the detailed instructions for the examination. Candidates are advised to go through the instructions carefully regarding the type   
            of questions, marking scheme, procedure to mark & change answer etc. At the designated time  of start of the examination, the candidates will be able to proceed and see the questions on the
                  computer screen?
                </Typography>


                <Typography variant="h5" component="h5">
                1. After login, the candidate shall be able to see the detailed instructions for the examination. Candidates are advised to go through the instructions carefully regarding the type   
            of questions, marking scheme, procedure to mark & change answer etc. At the designated time  of start of the examination, the candidates will be able to proceed and see the questions on the
                  computer screen?
                </Typography>


             </CardContent>
             <hr/>
             <CardActions>
                <Button variant="contained"  disabled={!isExamStarted} color="primary">Proceed</Button>
            </CardActions>
        </Card>
        </>
        
    )
}

export default Instructions
