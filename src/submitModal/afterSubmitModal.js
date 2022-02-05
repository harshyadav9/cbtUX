import React,{useContext}  from 'react'
import Paper from '@material-ui/core/Paper';
import Typing from 'react-typing-animation';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { ExamDataContext } from '../context/ExamDataContext';
const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        // breakpoints [xs, sm, md, lg, xl]
      },
      typo: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 24
      },
      img: {
        [theme.breakpoints.only('md')]: {
          height: "40%",
          width: "80%",
        },
        [theme.breakpoints.only('lg')]: {
          height: "40%",
          width: "65%",
        },
        [theme.breakpoints.only('xl')]: {
          height: "70%",
          width: "70%",
        },
      },
      ul: {
        margin: 0,
        padding: 0
      },
      li: {
        listStyle: "none"
      }
}));

export default function AfterSubmitModal(props){
 
  
    const classes = useStyles();
    const { state, dispatch } = useContext(ExamDataContext);
    let name  = state.candidateName;
    return (
        <Paper className={classes.root} elevation={0}>
         <Typing >
                  <Typography className={classes.typo} variant="headline" component="h3">
                    <ul className={classes.ul}>
                      <li className={classes.li}> <Typing.Delay ms={1500} />Hi - {name}<Typing.Delay ms={1000} /></li>
                      <li className={classes.li}> Your exam is over and your data is captured <Typing.Delay ms={1000} /></li>
                      <li className={classes.li}> You can close the window <Typing.Delay ms={1000} /></li>
                    </ul>
                  </Typography>
                </Typing>
                <center>
                <Hidden smDown>
                  <img className={classes.img} src={"background.jpg"} alt="response" />
                </Hidden>
              </center>
        </Paper>
    )

}
  

