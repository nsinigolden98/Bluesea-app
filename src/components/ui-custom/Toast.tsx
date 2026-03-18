import { useState, useCallback } from 'react';
import './Toast.css'

export function Toast() {
  const [toastData, setToastData] = useState<{ msg: string; visible: boolean }>({
    msg: '',
    visible: false,
  });

  const showToast = useCallback((msg: string, ms = 3000) => {
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