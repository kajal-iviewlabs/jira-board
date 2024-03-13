import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import LeftMenu from "./components/LeftMenu";

function App() {
  const { isAuthenticated } = useAuth0();

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
