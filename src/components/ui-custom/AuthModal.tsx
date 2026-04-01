import { useState, useEffect } from 'react';
import { postRequest, ENDPOINTS } from '@/types';
import { useAuth } from '@/context/AuthContext';
import './AuthModal.css';
import {Toast, Loader} from '@/components/ui-custom'
import { Input } from '@/components/ui/input';

export const ForgotPasswordModal=()=> {
  const [visibility, setForgotPasswordVisibility] = useState<boolean>(false);



  // This is the component you render in your JSX
  const ForgotPasswordComponent = () => {
    const { showLoader, hideLoader, LoaderComponent } = Loader();
    const { showToast, ToastComponent } = Toast();


    if (visibility) return null;
    return (
      <div>
        
        <ToastComponent />
        <LoaderComponent />
      </div>
    );
  };
 
  return {setForgotPasswordVisibility, ForgotPasswordComponent };
}



export const AuthEmailModal = () => {

  const [visibility, setComponentVisibilty] = useState<boolean>(false);
  
  const AuthComponent = () => {
  const { showLoader, hideLoader, LoaderComponent } = Loader();
  const { showToast, ToastComponent } = Toast();

  
  
    const [count, setCount] = useState(60);
    const [isCounting, setIsCounting] = useState(true);
    const { user } = useAuth();
   
  
    const verifyEmailOTP = async (otp:string) => {
      showLoader()
      const verifyResponse = await postRequest(ENDPOINTS.verifyOtp, { email: user?.email, otp: Number(otp) });
      
      hideLoader()
      if (verifyResponse.state) {
        showToast(verifyResponse.message)
        setTimeout(()=>{ setComponentVisibilty(false)},3000)
       
      }
      else {
        showToast(verifyResponse.message)
      }
    };
  const resendOTP = async () => {
    await postRequest(ENDPOINTS.sendOtp, { email: user?.email }) 
    setIsCounting(true);
    setCount(60);
  };
  useEffect(() => {
    let interval = undefined;
    
      if (isCounting && count > 0) {
        interval = setInterval(() => {
          setCount((prev)=> prev - 1)
        }, 1000)
      } else if (count === 0) {
        setIsCounting(false);
        clearInterval(interval);
      }
      
    return ()=> clearInterval(interval)
  }, [count, isCounting]);
  
     const [otp, setOTP] = useState('');
  
    if (visibility) {
      return (

        <div className='modalBody'>

          <div className="modal_panel dark:bg-slate-600 dark:text-white" id="modal_panel">
            <button className="modal_close dark:text-white" id="modal_close" aria-label="Close"
              onClick={() => setComponentVisibilty(false)}
            > X </button>
            <h1 id="modal_title" className="modal_title">Verify Account</h1>
        
            <div className='modal_body'>
              <div className="modal_panel_item email_modal" id="email_modal" data-panel="email" aria-hidden="false">
                <p className="small">We sent a 6-digit code to your email. Enter it below.</p>
                <div className="field">

                  <label htmlFor='otp'className='otp'>Email OTP</label>
            
                  <Input id="modal_email_otp"
                    className="input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter email OTP"
                    value={otp}
                    required
                   />
            
                </div>
                <div className="row modal_actions">

                  <button id="modal_verify_email" onClick={() => { verifyEmailOTP(otp) }} className=" rounded-xl bg-sky-500 hover:bg-sky-600 h-8 text-sm px-3 mx-2" type="button">Verify Email OTP</button>
                  <button id="modal_resend_email" className="rounded-xl bg-sky-500 hover:bg-sky-600 h-8 text-sm px-3 mx-2" type="button"
                    onClick={resendOTP} disabled={isCounting}
                  >Resend
                    {isCounting ? (
                      <span id="modal_timer_email">({count}s)</span>
                    ):(
                    <span></span>
                  )}</button>
                </div>
              </div>
            </div>
          </div>
          <ToastComponent />
          <LoaderComponent />
        </div>
      );
    }
  }
  return {AuthComponent, setComponentVisibilty}
  };





