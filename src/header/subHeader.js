import React from "react";
import { makeStyles, Typography, Avatar, Box } from "@material-ui/core";
// import avatar from "../../public/login.jpg";
const userStyles = makeStyles({
  Box: {
    display: "flex",
    gridGap: 15,
  },
  Avatar: {
    width: 65,
    height: 65,
    backgroundColor: "#cfd0e9",
  },
  CandidateInfo: {
    flex: "1",
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // padding: 10,
    alignItems: "center",
    gridGap: "5%",

    "& div": {
      //   display: "flex",
      textAlign: "left",
      gridGap: 5,
      alignItems: "center",
      "& label": {
        width: 115,
        color: "#034078",
        fontSize: 14,
        display: "block",
      },
      "& span ": {
        fontSize: 16,
      },
    },
  },
});
function SubHeader(props) {
  const classes = userStyles();
  return (
    <Box className={classes.Box}>
      <Avatar variant="rounded" className={classes.Avatar} />
      <div className={classes.CandidateInfo}>
        <div>
          <Typography component="label">
            {" "}
            <b>Candidate Name </b>
          </Typography>
          <Typography component="span"> Harh Yadav</Typography>
        </div>
        <div>
          <Typography component="label">
            {" "}
            <b>Exam Name </b>
          </Typography>
          <Typography component="span">UPSE </Typography>
        </div>
        <div>
          <Typography component="label">
            {" "}
            <b>Subject Name </b>
          </Typography>
          <Typography component="span">Mathematics</Typography>
        </div>
      </div>
    </Box>
  );
}

export default SubHeader;
