import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Recaptcha from 'react-recaptcha';
import NavigationBar from './components/UI/NavBar/NavigationBar';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import ScheduleForm from './components/ScheduleForm';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <NavigationBar/>
      <About/>
      <Services/>
      <ScheduleForm/>
      <ContactForm/>
      <ApplicationForm/>
      <Footer/>  
    </div>
  );
}

export default App;
