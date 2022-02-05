import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Timer from '../Timer';
import Avatar from '@material-ui/core/Avatar';
import ExamDataProvider, { ExamDataContext } from '../context/ExamDataContext';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '3em',
        flexGrow: 1,

    },
    appbar: {
        alignItems: 'center',
        display: "flex",
        justifyContent: "space-between"

    },
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        boxShadow: '0px 0px 13px 1px rgb(0 0 0 / 84%)',
        border: '2px solid green'
    },
    avtarInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '78px',
        justifyContent: 'space-around'
    },
    avtarContainer: {
        display: 'flex',
        alignItems: 'center'

    }
}));

function Header() {
    const classes = useStyles();
    const { state } = useContext(ExamDataContext);
    console.log("state in header", state);
    return (
        <>
            {/* <ExamDataProvider> */}
                <div className={classes.root}>
                    <AppBar position="fixed" color="grey">
                        <Toolbar className={classes.appbar}>
                            <Typography variant="h6">
                                CBT-Exam
                </Typography>
                            <Timer hours={state.hours} minutes={state.minutes} />
                            <div className={classes.avtarContainer}>
                                <Avatar alt="Remy Sharp" src="avatar.jpg" className={classes.small} />
                                <div className={classes.avtarInfo}>
                                    <span>Name:Harsh Yadav</span>
                                    <span>Reg No :1212</span>
                                </div>
                            </div>

                            {/* <Typography color="inherit" >Time: 123 </Typography> */}
                        </Toolbar>

                    </AppBar>
                </div>
            {/* </ExamDataProvider> */}
        </>
    )
}

export default Header
