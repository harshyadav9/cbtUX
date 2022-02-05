import React from 'react';
import {
Fab, makeStyles, 
Box, List, ListItem, 
ListItemText, Typography, 
ListItemAvatar, Divider 
} from '@material-ui/core';

const userStyles = makeStyles({

    list: {
        display: 'flex',
        '& li': {
            width: 'auto'
        }

    },
    
    answered: {
        background: '#21a026 !important',
        color: '#fff',
        '&:hover': {
        background: '#21a026',

        }
    },
    unanswered: {
        // background: '#f44336 !important',
        background: '#fff !important',
        color: '#333',
        '&:hover': {
        background: '#f44336',

        }
    },
    reviewAnswered: {
        background: '#a4db8a !important',
        color: '#333',
        '&:hover': {
        background: '#a4db8a',

        }
    },
    reviewUnanswered: {
        background: '#e49394 !important',
        color: '#333',
        '&:hover': {
        background: '#e49394',

        }
    },
    unvisitedQuestion: {
        background: '#fff ',
        color: '#000',
        '&:hover': {
        background: '#fff',

        }
    },
    padding: {
        padding: 10
    },
})

const DisplayQuesCount = ({totalQues,activeStep}) => {
    const classes = userStyles();
    // console.log("DisplayQuesCount loaded",activeStep);
    let unansweredQuestions = totalQues;
    let answeredQuestions = 0;
    let reviewUnQuestions = 0;
    let reviewAnQuestions = 0;
   
    let reviewquestionsObj = JSON.parse(localStorage.getItem('reviewQuestionNo'));
    let answeredQuestionsObj = JSON.parse(localStorage.getItem('questionNo'));
    // console.log("JSON.parse(localStorage.getItem('unvisitedQues'))",JSON.parse(localStorage.getItem('unvisitedQues')));
    // let unvisitedQuestions = JSON.parse(localStorage.getItem('unvisitedQues')) === null ? 0 : JSON.parse(localStorage.getItem('unvisitedQues')).length;

   
    if (reviewquestionsObj !== null) {
        reviewUnQuestions = reviewquestionsObj['reviewU'].length;
        reviewAnQuestions = reviewquestionsObj['reviewA'].length;
    }
    if (answeredQuestionsObj !== null) {
        answeredQuestions = answeredQuestionsObj.length;
    }
    unansweredQuestions = totalQues - (answeredQuestions + reviewAnQuestions);
    return (
       
        <Box component="div">
            <Typography variant="h6" gutterBottom className={classes.padding}>
                Question Hints
            </Typography>
            <Divider />
                <List className={classes.list}>
                    <ListItem>
                        <ListItemAvatar>
                            <Fab className={classes.answered} size="small">{answeredQuestions}</Fab>
                        </ListItemAvatar>
                        <ListItemText>Answered </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Fab className={classes.unanswered} size="small">{unansweredQuestions}</Fab>
                        </ListItemAvatar>
                        <ListItemText>Unanswered </ListItemText>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemAvatar>
                            <Fab className={classes.unvisitedQuestion} size="small">{unvisitedQuestions}</Fab>
                        </ListItemAvatar>
                        <ListItemText>Unvisited </ListItemText>
                    </ListItem> */}
                    <ListItem>
                        <ListItemAvatar>
                            <Fab className={classes.reviewAnswered} size="small">{reviewAnQuestions}</Fab>
                        </ListItemAvatar>
                        <ListItemText>Review Answered </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Fab className={classes.reviewUnanswered} size="small">{reviewUnQuestions}</Fab>
                        </ListItemAvatar>
                        <ListItemText>Review Unanswered </ListItemText>
                    </ListItem>
                </List>
               
                <Divider />
            </Box>
  
    )
}

export default  DisplayQuesCount
