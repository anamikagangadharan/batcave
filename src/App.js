import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import YProgressbar from './components/YProgressbar/YProgressbar';
import Cards from './components/Cards/Cards';
import Register from './components/Register/Register';
import Countdown from './components/Countdown/Countdown';

import Thankyou from './components/Thankyou/Thankyou';
import About from './components/About/About';
import MemberProgress from './components/MemberProgress/MemberProgress';
import Checkout from './components/Checkout/Checkout';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import RegistrationClosed from './components/RegistrationClosed/RegistrationClosed';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Header/>
     <Main/>
     <MemberProgress/>
     <Cards/>
     <About/>
   
     <YProgressbar/>
     <Register/>
     <Countdown/> 
     <Thankyou/>
     <Checkout/> 
     <PageNotFound/>
     <RegistrationClosed/>
     <Profile/>
     <Footer/>
    </div>
  );
}

export default App;
