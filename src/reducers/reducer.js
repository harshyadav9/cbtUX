

export const ExamReducer = (state, action) => {
    switch (action.type) {
        case 'ADDINFO':
            console.log("state", state);
            return {
                ...state,
                ...{
                    hours: action.hours,
                    minutes: action.minutes,
                    name: action.name,
                    photo: action.photo,
                    candidateName: action.candidateName,
                    registrationNo: action.registrationNo,
                    isLoading: false,
                    reset: false,
                    yearOfExam:action.yearOfExam,
                    examCd:action.examCd,
                    instCd:action.instCd,
                    questionsLength:action.questionsLength,
                    options:{option1:action.options.option1,option2:action.options.option2,
                        option3:action.options.option3,option4:action.options.option4},
                    time: { hours: action.time.hours, minutes: action.time.minutes, seconds: action.time.seconds }
                }
            };
        case 'HANDLELOADING':
            console.log(action);
            return {
                ...state,
                ...{
                    isLoading: action.isLoading
                }
            };

        case 'ADD_FINAL_DATA':
            console.log(action);
            return {
                ...state,
                ...{
                    finalData: action.finalData
                }
            };



        case 'WARNING_TIME':
            console.log(action);
            return {
                ...state,
                ...{
                    warningTime: action.warningTime
                }
            };




        case 'TIME_UP':
            console.log(action);
            return {
                ...state,
                ...{
                    timeover: action.timeover
                }
            };


            case 'SAVE_AND_NEXT':
            console.log(action);
            return {
                ...state,
                ...{
                    idToSave: action.idToSave
                },
                ...{
                    questions:action.questions
                }
            };


        case 'ADD_QUESTION_VALUES':
            console.log(action);
            return {
                ...state,

                ...{
                    questions: action.questions,
                    reset: action.reset
                }
            };


        case 'HANDLE_PREV_NEXT_BTN':
        console.log(action);
        return {
            ...state,

            ...{
                questions: action.questions
            }
        };

        case 'RESET':
            return {
                ...state,
                ...{
                    reset: action.reset,
                    idToSave:action.idToSave
                }
            }
        default:
            return state;
    }
};