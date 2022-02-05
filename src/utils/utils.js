
export const isExamStartingTime = () => {
    // let sampleTime = 'January 30, 2022 18:51:00';

    // '6:45'
    // let sampleTime = '01/30/2022 6:15 PM';
    // let dateUTC = new Date(sampleTime);


    // let utcHours =  new Date().getUTCHours();
    // let utcMinutes =  new Date().getUTCMinutes();

    // let istHours = utcHours + 5;
    // let istMinutes = utcHours + 30;
    
    // let hours;
    // hours = (istHours>12) ? (istHours-12) : istHours;
    return {hours:1 , minutes:25};
}


export const getCurrentTime = () => {
    let utcHours =  new Date().getUTCHours();
    let utcMinutes =  new Date().getUTCMinutes();
    let utcSeconds = new Date().getUTCSeconds();
    console.log("utcHours" , utcHours);
    console.log("utcMinutes" , utcMinutes);

    let istHours = utcHours + 5;
    let istMinutes = utcMinutes + 30;
   
    let hours;

    // if(hours == 11){
        hours =  istMinutes >= 60 ? (istHours + 1) : istHours;
        hours = (hours>12) ? (hours-12) : istHours;
    // }
    
    
    if(istMinutes >= 60){
        istMinutes = Math.abs(60 - istMinutes);
    }
   
    return({hours:1 , minutes:istMinutes,seconds:utcSeconds});
};

export const evaluateEnableDisableBasedOnTime = (isLoginAllowedTime , loginDisabledTime , currentTime) => {

    console.log("isLoginAllowedTime",isLoginAllowedTime);
    console.log("loginDisabledTime",loginDisabledTime);
    currentTime = new Date(`2022-02-03 ${currentTime.hours}:${currentTime.minutes}`).getTime();
    let isLoginDisabled = new Date(loginDisabledTime).getTime();
    let isLoginAllowed = new Date(isLoginAllowedTime).getTime();
    let obj = {isLoginAllowed:false , isLoginDisabled:true};
    
    // console.log("currentTime" , currentTime);


    if(currentTime < isLoginAllowed){
        return true;
    }

    if(currentTime > isLoginAllowed){
        if(currentTime < isLoginDisabled){
            return false;
        } else {
            return true;
        }
       
    }
    
   
    
}

