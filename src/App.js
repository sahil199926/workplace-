import logo from './logo.svg';
import './App.css';
import Navs from './Navs';
import {UserContextProvider} from './context/userContext'
function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <Navs/>
      </UserContextProvider>
    </div>
  );
}

export default App;
