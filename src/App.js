import Page from './components/Page/Page';
import SideMenu from './components/sideMenu/SideMenu.js';
import styles from './components/sideMenu/SideMenu.module.css';


function App() {
  return (
    <div className="app" id="app">
      <SideMenu pageWrapId={ "page-wrap" } outerContainerId={ "app" }/>

      <div id="page-wrap">
        <Page />
      </div>
    </div>
  );
}


export default App;
