import "./App.css";
import YProgressbar from "./components/YProgressbar/YProgressbar";
import Register from "./components/Register/Register";
import Countdown from "./components/Countdown/Countdown";
import Thankyou from "./components/Thankyou/Thankyou";
import Checkout from "./components/Checkout/Checkout";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";

import RegistrationClosed from "./components/RegistrationClosed/RegistrationClosed";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import { FormProvider } from './components/FormContext/FormContext';
// import Carousel from "./components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Router>
      <FormProvider>
      <Header />
     <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/register" element={  <Register />}/>
      <Route path="/countdown" element={  <Countdown />}/>
      <Route path="/checkout" element={  <Checkout />}/>
      <Route path="/thankyou" element={     <Thankyou />}/>
      <Route path="/registrationclosed" element={  <RegistrationClosed />}/>
      <Route path="/profile" element={  <Profile/>}/>
      {/* <Route path="/caro" element={  <Carousel/>}/> */}
      <Route path="*" element={<PageNotFound/>} />
      
      </Routes>
      
       
      <YProgressbar />
      <Footer />
      </FormProvider>
      </Router>
    </div>
  );
}

export default App;
