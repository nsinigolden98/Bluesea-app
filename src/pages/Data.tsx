import { useState, useRef, useEffect} from 'react';
import { Sidebar, Header, PinModal, TransactionModal, Toast } from '@/components/ui-custom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { networks, dataPlanFunction } from '@/data';
import { cn } from '@/lib/utils';
import type { Network, DataPlan } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type PlanType = 'Daily' | 'Weekly' | 'Monthly' | 'Extravalue';

const planTypes: { value: PlanType; label: string }[] = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Extravalue', label: 'Extravalue' },
];

export function Data() {
  const { user } = useAuth();
  const defaultNumber = "0" + user?.phone.slice(-10,);
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('MTN');
  const [phoneNumber, setPhoneNumber] = useState(defaultNumber);
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('Daily');
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const { PinComponent, modalData, showPinModal, message } = PinModal();
   const { showToast, ToastComponent } = Toast()
  const [isOpen, setIsOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<boolean | null>(null);
  const [toastMessage, setToastMessage] = useState('')
  
  const dataPlans = dataPlanFunction()

  const filteredPlans = dataPlans.filter(
    plan => plan.network === selectedNetwork && plan.planType === selectedPlanType
  );
  const payload = {
    plan: selectedPlan?.description,
    billersCode: phoneNumber,
    phone_number: phoneNumber //defaultNumber
  }

  const handleBuyData = () => {
    if (!phoneNumber || !selectedPlan) {
      alert('Please fill in all fields');
      return;
    }else if (!user?.pin_is_set) {
      navigate('/settings');
      navigate('/pin');
      return;
    } else {
      console.log(payload)
      showPinModal()
    }
  };

  const bodyDivRef = useRef<HTMLDivElement>(null)
  
    const hidePaymentModal = () => {
      if (bodyDivRef.current) {
        bodyDivRef.current.style.opacity = '1'
        
      }
    }
      const showPaymentModal = () => {
      if (bodyDivRef.current) {
        bodyDivRef.current.style.opacity = '0.5'
      }
    }
    if (!modalData.visible) {
      hidePaymentModal()
    }
    else {
      showPaymentModal()
    }
  
   useEffect(() => {
          
        if (message) {
          console.log(message)
          setIsOpen(true)
          
          if (message?.success || message?.code === '000') {
            showToast(message?.response_description || '')
            setToastMessage(message?.response_description || '')
            setTxStatus(true)
          } else {
            showToast(message?.error|| message?.response_description || '')
            setToastMessage(message?.error || message?.response_description || '')
            setTxStatus(false)
          }
            
        } else {
          return
        };
      }, [message, showToast]);
  
  return (
    <div>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex" ref={bodyDivRef}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Data" 
          subtitle="Buy Smarter & Cheaper"
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6">
              {/* Network Selection */}
              <div className="space-y-3">
                <Label>Select Network</Label>
                <div className="flex flex-wrap gap-2">
                  {networks.map((network) => (
                    <button
                      key={network}
                      onClick={() => setSelectedNetwork(network)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        selectedNetwork === network
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      )}
                    >
                      {network}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-3">
                <Label htmlFor="phone">Recipient's Phone Number</Label>
                <Input
                  id="phone"
                    type="tel"
                    maxLength={11}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Plan Type Selection */}
              <div className="space-y-3">
                <Label>Select Plan</Label>
                <div className="flex flex-wrap gap-2">
                  {planTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedPlanType(type.value)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        selectedPlanType === type.value
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Plans Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-center',
                      selectedPlan?.id === plan.id
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    )}
                  >
                    <p className="font-bold text-slate-800 dark:text-white">{plan.size}</p>
                    <p className="text-xs text-slate-500 mb-2">
                      {plan.network} ₦{plan.price} {plan.size} - {plan.validity}
                    </p>
                    <div className="flex gap-1">
                      <span className="flex-1 bg-sky-500 text-white text-xs py-1 rounded">
                        PRICE ₦{plan.price}
                      </span>
                      <span className="flex-1 bg-sky-500 text-white text-xs py-1 rounded">
                        VALIDITY {plan.validity.toUpperCase()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Network</span>
                  <span className="font-medium">{selectedNetwork}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium">
                    {selectedPlan ? `₦${selectedPlan.price} - ${selectedPlan.size}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Recipient ID</span>
                  <span className="font-medium">{phoneNumber || '-'}</span>
                </div>
              </div>

              {/* Buy Button */}
              <Button 
                onClick={handleBuyData}
                className="w-full rounded-full bg-sky-500 hover:bg-sky-600 py-6"
                disabled={!phoneNumber || !selectedPlan}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </main>
      </div>
      </div>
      <PinComponent type={`data-${selectedPlan?.network}`} value={payload} />
      <ToastComponent />
      { isOpen &&(
        <TransactionModal isSuccess={txStatus} onClose={()=> setIsOpen(false)} toastMessage={toastMessage} />)}
      </div>
  );
}
