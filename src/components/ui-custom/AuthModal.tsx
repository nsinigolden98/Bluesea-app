import { useState, useCallback } from 'react';
import './AuthModal.css'


export function ForgotPasswordModal() {
  const [toastData, setToastData] = useState<{ msg: string; visible: boolean }>({
    msg: '',
    visible: false,
  });

  const showToast = useCallback((msg: string, ms = 10000) => {
    setToastData({ msg, visible: true });
    
    setTimeout(() => {
      setToastData((prev) => ({ ...prev, visible: false }));
    }, ms);
  }, []);

  // This is the component you render in your JSX
  const ToastComponent = () => {
    if (!toastData.visible) return null;
    return (
      <div className='toast'>
        {toastData.msg}
      </div>
    );
  };

  return { showToast, ToastComponent };
}

export function AuthEmailModal() {
  const [modalData, setModalData] = useState<{ visible: boolean }>({
    visible: false,
  });

  const showModal = useCallback(() => {
    setModalData({visible: true });
  }, []);
  const hideModal = useCallback(() => {
    setModalData({visible: false });
  }, []);

  const ModalComponent = () => {
   if (!modalData.visible) return null;
    return (
       <div className="modal_panel" id="modal_panel">
      <button className="modal_close" id="modal_close" aria-label="Close" onClick={hideModal}>✕</button>
      <h2 id="modal_title" className="modal_title">Verify Account</h2>
        
      <div className='modal_body'>
        <div className="modal_panel_item email_modal" id="email_modal" data-panel="email" aria-hidden="false">
          <p className="small">We sent a 6-digit code to your email. Enter it below.</p>
          <div className="field">

            <label >Email OTP</label>
            
            <input id="modal_email_otp" className="input" type="text" inputMode="numeric" maxLength={6} placeholder="Enter email OTP" />
            
            <div id="modal_email_error" className="error" aria-live="polite"></div>
          </div>
          <div className="row modal_actions">

            <button id="modal_verify_email" className="btn btn_primary"  type="button">Verify Email OTP</button> 
            <button id="modal_resend_email" className="btn btn_primary" type="button">Resend (<span id="modal_timer_email">50</span>s)</button>
          </div>
        </div>
        </div>
      </div>
    );
  };

  return { showModal, hideModal,ModalComponent };
}



