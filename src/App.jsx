import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Container from './components/layout/container/Container'
import User from './components/pages/user/User';
import Home from './components/pages/home/Home';

function App() {
  return (
    <Router className="App">
      <Container>

        <Routes>
          <Route path='/user/:name' element={<User />} />
          <Route exact path='/' element={<Home />} />
        </Routes>

      </Container>

    </Router>
  );
}

export default App;
