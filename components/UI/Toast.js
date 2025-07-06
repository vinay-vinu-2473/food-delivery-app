import { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      <div className="flex items-center">
        <span>{toast.message}</span>
        <button onClick={hideToast} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;