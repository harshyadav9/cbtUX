import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Instructions from './instructions/instructions';
import Test from './Test';
import Excel from './excel';
import ExamDataProvider from './context/ExamDataContext';
import Loader from './Loader';
import AfterSubmitModal from './submitModal/afterSubmitModal';



// const RouteAdmin = ({ Component  ,...props}) => {
//   const { state } = useContext(ExamDataContext);
//   console.log("state" , state);
//   return (
//     <Route
//       {...props}
//       render={() =>
//        (
//          <Component/>
//        )
//       }
//     />
//   );
// };

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <ExamDataProvider>
          {/* <MuiThemeProvider theme={theme}> */}
          <Loader/>
          {/* <div className="App"> */}
         

          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/uploadExcel" component={Excel} />
            <Route exact path="/instructions" component={Instructions} />
            <Route exact path="/response" component={AfterSubmitModal} />
          </Switch>

          {/* <Footer /> */}
          {/* </div> */}

          {/* </MuiThemeProvider> */}
        </ExamDataProvider>
      </BrowserRouter>

      {/* <Login/> */}
    </div>
  );
}


export default App;
