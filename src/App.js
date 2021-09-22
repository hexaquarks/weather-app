import Page from './components/Page/Page';
import Test from './test.js';
import SideMenu from './components/sideMenu/SideMenu.js';
import { HashRouter, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import styles from './components/sideMenu/SideMenu.module.css';


function App() {
  return (
    <HashRouter>
      <div className="app" id="app">
      <SideMenu pageWrapId={"page-wrap"} outerContainerId={"app"} />

      <div id="page-wrap" >
      <Switch>
        <Route path='/' exact component={() => <Page type={'weekly'}/>} />
        <Route path='/36HoursForecast' exact component={() => <Page type={'hourly'}/>} />
        <Route path='/7DaysForecast' exact component={() => <Page type={'weekly'}/>} />
        <Route path='/about' exact component={() => <Page type={'weekly'}/>} />
      </Switch>
        {/* <Page /> */}
      </div>
    </div>
    </HashRouter>
  );
}


export default App;
