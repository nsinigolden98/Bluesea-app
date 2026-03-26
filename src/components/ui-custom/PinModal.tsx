import { useState, useCallback } from 'react';
import { ENDPOINTS, postRequest } from '@/types';
import { Input } from '@/components/ui/input';
import { Loader, Toast } from '@/components/ui-custom'
import  './PinModal.css'

interface PinComponentProps {
  type: string;
  value: object;
}


export function PinModal() {
  const [modalData, setModalData] = useState<{ visible: boolean }>({
    visible: false,
  });
  const { showLoader, hideLoader, LoaderComponent } = Loader();
  const {ToastComponent, showToast} = Toast()
  const showPinModal = useCallback(() => {
    setModalData({visible: true });
  }, []);
  const hidePinModal = useCallback(() => {
    
    setModalData({ visible: false });
    
  }, []);
  

  async function completeTransaction(type: string, value: object) {
     
      if (type === 'airtime') {
        const response = await postRequest(ENDPOINTS.buy_airtime, value)
         return response.response_description  || response.error
    };

  };


    const PinComponent = ({type,value}:PinComponentProps) => {
    const [pin, setPin] = useState('');
    

      const makeTransaction = useCallback(async (type: string, pin: string, value: object) => {
            showLoader();
            const message =await completeTransaction(type, { ...value, transaction_pin: pin });
            hidePinModal();
        hideLoader();
        console.log(message)
        showToast(message)
      },[])
    
      if (!modalData.visible) return null

      return (
      <div>
      <div id="pin-creation-step" className="form-card active-step">
            <h2> Enter PIN</h2>

            <div id="create-pin-form">
                <div className="input-group">
                    
            <Input type="password" id="pin" placeholder="••••" maxLength={4} inputMode="numeric" value={pin} onChange={(e)=> setPin(e.target.value)}
            />
                </div>

          <button id='make-payment' className="btn btn-primary"
            onClick={()=>makeTransaction(type,pin,value,)}>CONFIRM </button>
                <button id='cancel-payment'  className="btn  btn-primary" onClick={hidePinModal}>CANCEL </button>
            </div>
            <ToastComponent/>
          </div>
          <LoaderComponent />
        </div>
    )
  };
  return { showPinModal, hidePinModal, PinComponent, modalData};
}
