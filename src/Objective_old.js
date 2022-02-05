import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import 
{
    FormLabel
} from '@material-ui/core';
const styles = theme => ({
    root: {
        display: 'flex',
        marginLeft: 2,
        marginBottom:49
    },
    // formControl: {
    //     margin: theme.spacing.unit * 3,
    //     [theme.breakpoints.only('xs')]: {
    //         margin: 0
    //     },
    //     [theme.breakpoints.between('xs, sm')]: {
    //         margin: 0
    //     }
    // },
    formControl: {
        margin: '33px 1px 4px 7px',
        padding:'6px',
        '& legend': {
            fontSize: 20,
            display:'flex',
            lineHeight: '1.4',
            marginBottom: 6,
            color: '#000',
        }
    },
    group: {
        margin: '8px 0 0 23px',
    },
    quesNo:{
        marginRight:'8px'
    },
    quesText:{
        textAlign:'left'
    }
});

class RadioButtonsGroup extends React.Component {
    state = {
        radio: '',
        checkbox: new Map(),
        reset: false
    };


    // componentDidMount() {
    //     console.log("value", this.state);
    // }
    handleChange1 = (event, option, objective) => {
        console.log("event, option, objective",event, option, objective);
        this.setState(() => ({
            radio:event
        }))
        // this.setState({ radio: event });
        console.log("this.state",this.state);
        this.props.response({ option: option, id: objective.id.questionNo, isradio: true });
    }

    

    handleChange = (isChecked, name, objective) => {


        this.setState(prevState => ({
            checkbox: prevState.checkbox.set(name, isChecked)
        }));
        // let arr = JSON.parse(localStorage.getItem('questionNo'));
        // console.log("arr", arr)
        // if (arr == null) {
        //     arr = [];
        //     arr.push(quesNo);
        //     localStorage.setItem('questionNo', JSON.stringify(arr));
        // } else {
        //     if (arr.indexOf(quesNo) == -1) {
        //         arr.push(quesNo);
        //         localStorage.setItem('questionNo', JSON.stringify(arr));
        //     }

        // }
        // // localStorage.setItem('questionNo', JSON.stringify(quesNo));


        // if (event === ans) {
        this.props.response({ name: name, isChecked: isChecked, id: objective.id.questionNo, isradio: false });
        //     // this.setState({ value: '' });
        // } else {
        //     this.props.checkQuestionNo(quesNo);
        //     // this.setState({ value: '' });
        // }
    }

    setCheckboxState = (objective) => {
        let arr = new Map();
        for (let i = 0; i < 4; i++) {
            let obj = {};
            arr.set(`option${i + 1}`, false);
        }
        this.setState({ checkbox: arr });
    }

    resetState = (objective) => {
        console.log("objective", objective);
        console.log("this.state", this.state);
        // this.setCheckboxState();
    };

    resetValues = (resetValue) => {
        console.log("reset called");
        if (resetValue) {
            this.setState({ radio: '' });
        }
    }

    componentDidMount() {
        console.log("this.state",this.state);
        if (this.props.objective.single === "N") {
            this.setCheckboxState(this.props.objective);
        }

        // console.log("this.state>>", this.state)

    }


    render() {
        const { classes, objective } = this.props;
        // console.log("this.props.reset",this.props.reset);
       
        if (this.props.reset === 'radio') {
            this.setState(() => ({
                radio: ""
            }));
            this.props.setReset('');
        }

        if (this.props.reset === 'checkbox') {
            this.setState(() => ({
                checkbox: new Map()
            }));
            this.props.setReset('');

        }

        // if (isReset) {
        //     this.resetState(objective);
        // }
        // console.log("isReset", isReset)

        return (
            <div className={classes.root}>
                <div>
              
                    <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend"><span className={classes.quesNo}>{objective.id.questionNo})</span><span className={classes.quesText}>{objective.question}</span></FormLabel>
                        {objective.multiple === 'N' ? (<RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.radio}
                        // onChange={(e) => this.handleChange(e.target, objective)}
                        >
                            <FormControlLabel value={objective.option1} onChange={(e) => this.handleChange1(e.target.value, 'option1', objective)} control={<Radio />} label={objective.option1} />
                            <FormControlLabel value={objective.option2} onChange={(e) => this.handleChange1(e.target.value, 'option2', objective)} control={<Radio />} label={objective.option2} />
                            {objective.option3 === undefined ? null
                                :
                                <FormControlLabel value={objective.option3} onChange={(e) => this.handleChange1(e.target.value, 'option3', objective)} control={<Radio />} label={objective.option3} />}
                            {objective.option4 === undefined ? null :
                                <FormControlLabel value={objective.option4} onChange={(e) => this.handleChange1(e.target.value, 'option4', objective)} control={<Radio />} label={objective.option4}
                                />}
                        </RadioGroup>) : (
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={!!this.state.checkbox.get('option1')} onChange={(e) => this.handleChange(e.target.checked, 'option1', objective)} name={objective.option1} />}
                                        label={objective.option1}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!!this.state.checkbox.get('option2')} onChange={(e) => this.handleChange(e.target.checked, 'option2', objective)} name={objective.option2} />}
                                        label={objective.option2}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!!this.state.checkbox.get('option3')} onChange={(e) => this.handleChange(e.target.checked, 'option3', objective)} name={objective.option3} />}
                                        label={objective.option3}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={!!this.state.checkbox.get('option4')} onChange={(e) => this.handleChange(e.target.checked, 'option4', objective)} name={objective.option4} />}
                                        label={objective.option4}
                                    />
                                </FormGroup>

                            )}
                    </FormControl>
                </div>

            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
