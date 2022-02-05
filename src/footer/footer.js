import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    footer:{
        padding:theme.spacing(3 , 2),
        marginTop:'auto',
        backgroundColor:theme.palette.grey[200]
    }
}));

export default  function Footer() {
    const classes = useStyles();
    return (
       <footer className={classes.footer}>
           <Container maxWidth="sm">
               THIS IS FOOTER
           </Container>
       </footer>
    )
}

