import "./App.css";
import Header from "./components/header/Header";
import Layout from "./components/router/Layout";
import LeftMenu from "./components/verticalDropDown/LeftMenu";

function App() {
  return (
    <>
      <div>
        <Header />
        <div className="content">
          <LeftMenu />
          <Layout />
        </div>
      </div>
    </>
  );
}

export default App;
