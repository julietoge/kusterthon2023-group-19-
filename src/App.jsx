import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/Authenication/signIn/SignIn";
import CreateAccount from "./pages/Authenication/createAccount/CreateAccount";
import AccountActivated from "./pages/Authenication/AccountActivated/AccountActivated";
import { ForgetPassWord, ResetPassword } from "./pages/Authenication/PasswordForm/PasswordForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Dashboard/Admin/Admin";
import Customer from "./pages/Dashboard/Customer/Customer";
import Transaction from "./pages/Dashboard/Transaction/Transaction";
import Invoice from "./pages/Dashboard/Invioce/Invioce";
import Settings from "./pages/Dashboard/Settings/Settings";
import SignOut from "./pages/Authenication/signOut/SignOut";
import {ftData, stepsData, aboutData, pricingData} from "./utils/ftData.js"
import NotFound from "./pages/NotFound/NotFound";
function App() {

  const [showNavBar, setShowNavBar] = useState(false);




  function handleShowNavBar(){
      setShowNavBar(!showNavBar)
  }


  return (
    <Routes className="App">
      <Route path="/" element={<LandingPage pricingData={pricingData} handleShowNavBar={handleShowNavBar} showNavBar={showNavBar} ftData={ftData} stepsData={stepsData} aboutData={aboutData}/>} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/accountActivated" element={<AccountActivated />} />
      <Route path="/forgetPassWord" element={<ForgetPassWord />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/admin" element={<Admin />} />
        <Route path="/dashboard/customerProfile" element={<Customer />} />
        <Route path="/dashboard/transaction" element={<Transaction />} />
        <Route path="/dashboard/invoice" element={<Invoice />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/signOut" element={<SignOut />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;