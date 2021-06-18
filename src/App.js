
import './App.css';
import AppRouter from './components/AppRouter/AppRouter.jsx';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer.jsx'
function App() {
  return (
    <div className="App">
      <NavBar/>
      <AppRouter/>
      <div className="footer__spacer"></div>
      <Footer/>
    </div>
  );
}

export default App;
