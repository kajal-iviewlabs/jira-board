import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div>
        <Header />
        <div className="content">
          {isAuthenticated ? <h1>login success</h1> : <h1> please login</h1>}
        </div>
      </div>
    </>
  );
}

export default App;
