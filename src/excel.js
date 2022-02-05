import React, { useState, useEffect, useContext } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSnackbar } from "notistack";
import Slide from '@material-ui/core/Slide';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { ExamDataContext } from './context/ExamDataContext';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '60px'
    },
    buttonContainer: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'space-evenly'
    },
    rounded: {
        background: 'green',
        borderRadius: '50%',
        color: 'white',
        width: '25px',
        height: '21px'
    }

}));
const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
    container: {
        marginTop: '63px',
        width: '100%'
    }
}))(Chip);





export default function Excel(props) {
    const { state, dispatch } = useContext(ExamDataContext);
    const classes = useStyles();
    let endPoint = "";
    // const { enqueueSnackbar } = useSnackbar();
    let [apiName, setApiName] = useState("");
    const [fileName , setFileName] = useState("No File Selected");
    const [uploadStatus, setUploadStatus] = useState({
        'importQuesMaster': false, 'importInstMaster': false,
        'importExamYear': false, 'importConfig': false, 'importCandidMaster': false
    });
    const [apiClicked, setApiClicked] = useState('');
    let [uploadExcelButton, setUploadExcel] = useState(true);
    // const {  error, success } = props;
    // console.log(enqueueSnackbar,error,success)

    function handleClick(apiName, event) {
        console.log("{[apiName]:!uploadStatus[apiName]}", { ...uploadStatus, ...{ [apiName]: false } });
        setApiClicked(apiName);
        setUploadStatus({ ...uploadStatus, ...{ [apiName]: false } });
        event.preventDefault();
        console.info('You clicked a breadcrumb.', event.target.outerText);
        setApiName(event.target.outerText);
        console.log("endPoint", endPoint);
    }


    // function onChanges(e){
    //     setUploadExcel(false);
    //     let files = e.target.files;
    //     let reader = new FileReader();
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (e) => {
    //         console.log(e);
    //     }
    // }


    function changeApiStatus(status) {
        status === 'success' ? (setUploadStatus({ ...uploadStatus, ...{ [apiClicked]: true } })) : (setUploadStatus({ ...uploadStatus, ...{ [apiClicked]: false } }));

    }

    function downloadExcel() {
        // axios.get(`/candidatesAnswers/export/excel/${examCd}/${instCd}/${year}`, {

            dispatch({ type: 'HANDLELOADING', isLoading: true });
        axios.get(`/cbt/student/candidatesAnswers/export/excel/MBBS/I001/2021`, {

        }).then(response => {
            dispatch({ type: 'HANDLELOADING', isLoading: false });
            alert("excel file uploaded successfully");
            // changeApiStatus('success');
            console.log("response excel", response);
        }).catch(error => {
            dispatch({ type: 'HANDLELOADING', isLoading: false });
            alert("There is error in upload the excel kindly select the file and upload again");
            // changeApiStatus('error');
            console.log("error in excel", error);
        })
    }

    function onChangeFile(event){
        console.log("event.target.files" , event.target.files);
        if(event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("No File Selected");
        }
    }

    function uploadExcel() {


        let imagefile = document.querySelector('#file').files[0];
        console.log("imagefile", imagefile)
        if (imagefile && imagefile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            let formData = new FormData();
            console.log("imagefile", imagefile)
            formData.append("file", imagefile);
            // console.log("endPoint",endPoint);
           
            dispatch({ type: 'HANDLELOADING', isLoading: true });
            axios.post(`cbt/upload${apiName}`, formData, {
                headers: {
                    'Content-Type': imagefile.type
                }
            }).then(response => {
                alert(`${response.data.records} uploaded successfully`);
                changeApiStatus('success');
                console.log("response excel", response);
                dispatch({ type: 'HANDLELOADING', isLoading: false });
            }).catch(error => {
                alert("There is error in upload the excel kindly select the file and upload again");
                changeApiStatus('error');
                console.log("error in excel", error);
                dispatch({ type: 'HANDLELOADING', isLoading: false });
            })
            // document.querySelector('#file').files = "";document.querySelector('#file')
            document.querySelector('#file').value = "";
            setApiName("");
            setFileName('No File Selected');
            // enqueueSnackbar({
            //     variant: "success",
            //     anchorOrigin: {
            //       vertical: "bottom",
            //       horizontal: "right",
            //     },

            //   });
        } else {
            setUploadExcel(false);
            // enqueueSnackbar({
            //     variant: "error",
            //     anchorOrigin: {
            //       vertical: "bottom",
            //       horizontal: "right",
            //     },

            //   });
            alert("Either you have not selected the file or the file type is not excel ");
        }

    }

    return (
        <div className={classes.container}>
            <div>
                <h3>Admin Functions</h3>
                <hr />
                <Breadcrumbs aria-label="breadcrumb">
                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="/importQuestionMasterData"
                        icon={(uploadStatus.importQuesMaster === true) ? <CheckRoundedIcon className={classes.rounded} fontSize="small" /> : <ClearRoundedIcon fontSize="small" />}
                        onClick={(event) => { handleClick('importQuesMaster', event) }}
                    />

                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="/importInstitutionMasterData"
                        icon={(uploadStatus.importInstMaster === true) ? <CheckRoundedIcon className={classes.rounded} fontSize="small" /> : <ClearRoundedIcon fontSize="small" />}
                        onClick={(event) => { handleClick('importInstMaster', event) }}
                    />

                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="/importExamYearMasterData"
                        icon={(uploadStatus.importExamYear === true) ? <CheckRoundedIcon className={classes.rounded} fontSize="small" /> : <ClearRoundedIcon fontSize="small" />}
                        onClick={(event) => { handleClick('importExamYear', event) }}
                    />

                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="/importConfigData"
                        icon={(uploadStatus.importConfig === true) ? <CheckRoundedIcon className={classes.rounded} fontSize="small" /> : <ClearRoundedIcon fontSize="small" />}
                        onClick={(event) => { handleClick('importConfig', event) }}
                    />

                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="/importCandidateMasterData"
                        icon={(uploadStatus.importCandidMaster === true) ? <CheckRoundedIcon className={classes.rounded} fontSize="small" /> : <ClearRoundedIcon fontSize="small" />}
                        onClick={(event) => { handleClick('importCandidMaster', event) }}
                    />

                </Breadcrumbs>
                <div className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={apiName === "" ? true : false}
                        component="label"
                    >
                        Select File
                    <input id='file'
                            type="file"
                            onChange={(event) => {onChangeFile(event)}}
                            hidden
                        />
                        
                    </Button>                    
                    <Button color="secondary" variant="contained" onClick={uploadExcel}>Upload</Button>
                </div>
                <div style={{display:'flex' , justifyContent:'center'}}>
                    <h2 style={{marginLeft:'-50px'}}>Filename selected: {fileName}</h2>
                </div>
               

                <hr />
                <div>
                    <h3>Download Report</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        onClick={downloadExcel}
                    >
                        Download Report
                </Button>
                </div>



            </div>
            <div>
            </div>
        </div>
    )
}