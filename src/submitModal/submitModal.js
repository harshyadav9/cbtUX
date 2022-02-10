import React, { useContext, useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SubmitModal(props) {
  const { isSubmit, submitAnswers, setIsSubmit, isSave, setIsSave } = props;
  // const [isOpen, setIsOpen] = useState(false);
  // const [isSave, setIsSave] = useState(false);

  const handleClose = () => {
    // setIsOpen(false);
    setIsSubmit(false);
  };

  const handleSaveClose = () => {
    setIsSave(false);
  };

  const handleSubmit = () => {
    submitAnswers("userSubmit");
  };

  // useEffect(() => {

  //     if (isSubmit) {
  //         setIsOpen(true);
  //     }

  // }, [isSubmit]);

  // let isLoading = state.isLoading;
  // let warningTime = state.warningTime;
  // console.log("state,dispatch in loading", state, dispatch);
  // const classes = useStyles();
  return (
    <>
      <Dialog
        open={isSave}
        onClose={handleSaveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You do not have any saved changes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kindly select an option to save the question.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSubmit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to submit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Submitting will automatically end your test, Continue by clicking on{" "}
            <strong> Submit </strong> if you're done.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Don't Submit
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
