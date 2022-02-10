import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { ExamDataContext } from "../context/ExamDataContext";

import Timer from "../Timer";
const userStyles = makeStyles({
  Appbar: {
    background: "#2a3b64",
    color: "#fff",
    position: "static",
    borderRadius: "20px 20px 0 0",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "12px 20px",
    alignItems: "center",
    "& h5": {
      fontSize: "1.2rem",
    },
  },
  RollNumber: {
    flexGrow: "1",
    textAlign: "right",
    fontSize: "1rem",
    marginRight: 15,
  },
});

export default function Header(props) {
  const { state, dispatch } = useContext(ExamDataContext);
  console.log("state,dispatch in header", state, dispatch);
  const classes = userStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isWarning = (text) => {
    console.log("isWarning called", text);
    if (text === "warning") {
      dispatch({ type: "WARNING_TIME", warningTime: true });
    }
  };
  // const classes = userStyles();
  return (
    <AppBar className={classes.Appbar}>
      <Typography variant="h5" component="h5">
        {props.title}
      </Typography>

      <Timer
        hours={state.time.hours}
        minutes={state.time.minutes}
        seconds={state.time.seconds}
        isWarningPopUp={isWarning}
      />
      {/* <Typography variant="h4" component="h2">{state.name}</Typography>
                <Typography variant="h6" className={classes.RollNumber}>Reg No: {state.registrationNo}</Typography> |
                <Typography variant="h6">
                    <IconButton
                        onClick={handleMenu}
                        color="inherit">
                        <span style={{ fontSize: 18, marginRight: 4 }}>{state.candidateName}</span>
         
                        <Avatar alt="Cindy Baker" src={state.photo} />
                    </IconButton>
                    <Menu open={open} onClose={handleClose} anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} keepMounted
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </Typography> */}
    </AppBar>
  );
}

Header.defaultProps = {
  title: "NATIONAL TESTING INSTITUTE",
};
