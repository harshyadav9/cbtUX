import React , {useContext} from 'react';
import {
    AppBar, Toolbar,
    IconButton, makeStyles,
    Typography, MenuItem, Menu,Avatar

} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { ExamDataContext } from '../context/ExamDataContext';
const userStyles = makeStyles({
    Appbar: {
        background: '#2a3b64',
        color: '#fff',
        position: 'static'
    },
    RollNumber: {
        flexGrow: '1',
        textAlign: 'right',
        fontSize: '1rem',
        marginRight: 15
    }
})

export default function Header() {

    const {state,dispatch} = useContext(ExamDataContext);
    console.log("state,dispatch in header" , state,dispatch);
    const classes = userStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const classes = userStyles();
    return (
        <AppBar className={classes.Appbar}>

            <Toolbar>
                <Typography variant="h4" component="h2">{state.name}</Typography>
                <Typography variant="h6" className={classes.RollNumber}>Reg No: {state.registrationNo}</Typography> |
                <Typography variant="h6">
                    <IconButton
                        onClick={handleMenu}
                        color="inherit">
                        <span style={{ fontSize: 18, marginRight: 4 }}>{state.candidateName}</span>
                        {/* <AccountCircle /> */}
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
                </Typography>
            </Toolbar>

        </AppBar>
    )
}
