import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ExamDataContext } from './context/ExamDataContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    loader: {
        width: 263,
        height: 227,
        backgroundImage: `url(loader_static.png)`,
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50% 50%',
        transform: 'translate(50%,-50%)',
        top: '61%',
        right: '47%',
        zIndex: '99999'
    },
    overlay: {
        content: "",
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'rgb(93 90 90 / 80%)',
        zIndex: '9999'
    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Loader() {
    const { state, dispatch } = useContext(ExamDataContext);
    const [isOpen, setIsOpen] = useState(false);
   


    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {

        if (state.warningTime) {
            setIsOpen(true);
            dispatch({ type: 'WARNING_TIME', warningTime: false });
        }
    
    }, [state.warningTime]);


    let isLoading = state.isLoading;
    let warningTime = state.warningTime;
    console.log("state,dispatch in loading", state, dispatch);
    const classes = useStyles();
    return (
        <>
            {isLoading && (
                <div>
                    <div className={classes.loader}>
                    </div>
                    <div className={classes.overlay}>
                    </div>
                </div>

            )}

            {(
                <Dialog
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Your Time is about to get up , kindly finish your paper quickly
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Close
          </Button>

                    </DialogActions>
                </Dialog>
            )

            }
        </>

    )

}