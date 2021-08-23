import Page from './components/Page/Page';
import Test from './test.js';
import SideMenu from './components/sideMenu/SideMenu.js';
import Particles from 'react-particles-js';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import styles from './components/sideMenu/SideMenu.module.css';


function App() {
  return (
    <BrowserRouter>
      <div className="app" id="app">
      <SideMenu pageWrapId={"page-wrap"} outerContainerId={"app"} />

      <div id="page-wrap" >
      <Switch>
        <Route exact path='/' component={() => <Page type={'weekly'}/>} />
        <Route exact path='/Weather_App' component={() => <Page type={'weekly'}/>} />
        <Route exact path='/36HoursForecast' component={() => <Page type={'hourly'}/>} />
        <Route exact path='/7DaysForecast' component={() => <Page type={'weekly'}/>} />
        <Route exact path='/about' component={() => <Page type={'weekly'}/>} />
      </Switch>
        {/* <Page /> */}
      </div>
    </div>
    </BrowserRouter>
  );
}


export default App;
