import React, { useReducer, useEffect, createContext } from 'react';
import { ExamReducer } from '../reducers/reducer';
export const ExamDataContext = createContext();


const initialState = {
    hours: 0, minutes: 0, name: "", photo: "", candidateName: "", registrationNo: "",
    isLoading: false, finalData: [], questions: {},yearOfExam:"",examCd:"",instCd:"",questionsLength:0,options:{option1:"",option2:"",option3:"",option4:""},
     reset: "",idToSave:[], warningTime: false, timeover: false, time: { hours: 0, minutes: 0, seconds: 59 }
};
const ExamDataProvider = (props) => {

    const [state, dispatch] = useReducer(ExamReducer, initialState);

    return (
        <ExamDataContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ExamDataContext.Provider>
    )


}


export default ExamDataProvider;