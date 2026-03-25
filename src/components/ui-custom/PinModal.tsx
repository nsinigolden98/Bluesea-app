import { useState, useCallback } from 'react';
import './PinModal.css'
import { ENDPOINTS, postRequest } from '@/types';

interface PinComponentProps {
  type: string;
  value: object;
}
export function PinModal() {
  const [LoaderData, setModalData] = useState<{ visible: boolean }>({
    visible: false,
  });

  const showPinModal = useCallback(() => {
    setModalData({visible: true });
  }, []);
  const hidePinModal = useCallback(() => {
    
    setModalData({visible: false });
  }, []);
  
  const PinComponent = ({type,value}:PinComponentProps) => {
    const [pin, setPin] = useState('');
    async function completeTransaction() {
     
      if (type === 'airtime') {
        const response = await postRequest(ENDPOINTS.buy_airtime,{...value, transaction_pin: setPin})
      return response
      }
  }
    if (!LoaderData.visible)return null
    return (
      <div id="pin-creation-step" className="form-card active-step">
            <h2> Enter PIN</h2>

            <div id="create-pin-form">
                <div className="input-group">
                    
            <input type="password" id="pin" placeholder="••••" maxLength={4} inputMode="numeric" pattern='[0-9]' value={pin}
            />
                </div>

          <button id='make-payment' className="btn btn-primary"
            onClick={async () => await completeTransaction()}>CONFIRM </button>
                <button id='cancel-payment'  className="btn  btn-primary" onClick={hidePinModal}>CANCEL </button>
            </div>
        </div>
    )
  };
  return { showPinModal, hidePinModal, PinComponent};
}
