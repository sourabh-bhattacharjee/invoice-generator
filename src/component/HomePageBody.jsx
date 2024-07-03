import {useDispatch } from 'react-redux';
import {changeDisplayValue} from '../Redux/slices/dispBody';
import SignupPage from './SignupPage';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import { useEffect, useState } from 'react';
import InvoicePage from './InvoicePage';

export default function HomePageBody({user}) {
    const dispatch = useDispatch();
    const selComp = useSelector((state) => state.displayMainBody.value);
    let isShowFaded = (selComp ==='signupPage' || selComp ==='loginPage')? true: false;
    const [showInv,setShowInv] = useState(false);
    useEffect(() => {
        if(user == null){
            setShowInv(false);
        }
    }, [user]);
    const clickCreateInv = () => {
        if(user == null){
            dispatch(changeDisplayValue('signupPage'))
        }
        else{
            setShowInv(!showInv);
        }
    }
  return (
    showInv? <InvoicePage/> : <><div className={`bg-color-blue ${isShowFaded ? 'faded' : ''}`}>
    <div className="bodyMainDiv">
      <div className="textBody">
        <span className="firstSpan">now quick and easy</span>
        <h1> To Create for the new Invoices</h1>
        <h2>Create invoices in seconds with the excellent invoice template</h2>
        <button onClick={clickCreateInv}>Write an Invoice Now</button>
      </div>
      <div className="imgBody">
        <img
          src="https://www.orgamax.de/fileadmin/redakteure/bilder/landingpages/2021_12_LP_Online/LP_Rechnung_Vertrieb/Header_LP_Rechnung_818_v5.svg"
          alt="image-icon"
        />
      </div>
      <div className="slideBody">
          <div className="sideEffect phone">
              <div>
                  <img src="	https://www.orgamax.de/typo3conf/ext/of_distribution/Resources/Public/Icons/telefon.svg" className="phoneIcon" alt="phone"/>
                  <a className="numberIcon" href="tel:+49 15222014961">+49 15222014961</a>
              </div>
          </div>
          <div className="sideEffect mail">
              <div>
                  <img src="https://www.orgamax.de/typo3conf/ext/of_distribution/Resources/Public/Icons/email.svg" className="phoneIcon" alt="phone"/>
                  <a className="numberIcon" href="mailto:sourabhbhattacharjee123@outlook.com">mailTo:@sourabh</a>
              </div>
          </div>
      </div>
    </div>
  </div>
  {selComp ==='signupPage'?<SignupPage/>:null}
  {selComp ==='loginPage'?<LoginPage/>:null}</>
  );
}
