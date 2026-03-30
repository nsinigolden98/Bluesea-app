import { useState, useCallback} from 'react';
import { ENDPOINTS, postRequest } from '@/types';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui-custom'
import  './PinModal.css'

interface PinComponentProps {
  type: string;
  value: object;
}

interface Message {
  success?: boolean;
  code?: string;
  response_description?: string;
  error?: string;
}

export function PinModal() {
  const [modalData, setModalData] = useState<{ visible: boolean }>({
    visible: false,
  });
  const { showLoader, hideLoader, LoaderComponent } = Loader();
  const [message, setMessage] = useState<Message>();
  
  
  
  const showPinModal = useCallback(() => {
    setModalData({visible: true });
  }, []);
  const hidePinModal = useCallback(() => {
    
    setModalData({ visible: false });
    
  }, []);

  

  async function completeTransaction(type: string, value: object) {
    let response = undefined;
    
      if (type === 'airtime') {
        response = await postRequest(ENDPOINTS.buy_airtime, value)  
     }   else if (type === 'light') {
         response = await postRequest(ENDPOINTS.electricity, value);
          
      } else if (type === 'data-MTN') {
      response = await postRequest(ENDPOINTS.buy_mtn, value);
        
      } else if (type === 'data-Glo') {
      response = await postRequest(ENDPOINTS.buy_glo, value);
       
      } else if (type === 'data-Airtel') {
        response = await postRequest(ENDPOINTS.buy_airtel, value);
        
      } else if (type === 'data-9mobile') {
        response = await postRequest(ENDPOINTS.buy_etisalat, value);   
      }
    return response

  };
 
    



  const PinComponent = ({type,value}:PinComponentProps) => {
    const [pin, setPin] = useState('');
    
    const makeTransaction = async (type: string, pin: string, value: object) => {
      
      showLoader();
      
        const response = await completeTransaction(type, { ...value, transaction_pin: pin });
        hidePinModal();
        hideLoader();
      setMessage(response);
    }
      
    
      if (!modalData.visible) return null

    return (
        
      <div>
      <div id="pin-creation-step" className="form-card active-step">
            <h2> Enter PIN</h2>

            <div id="create-pin-form">
                <div className="input-group">
                    
            <Input  className='password' type="password" id="pin" placeholder="••••" maxLength={4} inputMode="numeric" value={pin} onChange={(e)=> setPin(e.target.value)}
            />
                </div>

          <button id='make-payment' className="btn btn-primary"
            onClick={()=>makeTransaction(type,pin,value,)}>CONFIRM </button>
                <button id='cancel-payment'  className="btn  btn-primary" onClick={hidePinModal}>CANCEL </button>
            </div>
            
             
            
            </div>
        <LoaderComponent />
        </div>
    )
  };
  return { showPinModal, hidePinModal, PinComponent, modalData, message};
}
