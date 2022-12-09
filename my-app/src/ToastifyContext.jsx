import { React, createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ToastifyContext = createContext({});

export function ToastifyProvider({ children }) {
  const successToast = (message) => toast.success(message);
  const timeToast = (message) => toast.info(message);
  return (
    <ToastifyContext.Provider value={{ successToast, timeToast }}>
      <ToastContainer />
      { children }
    </ToastifyContext.Provider>
  );
}

export const useToastify = () => useContext(ToastifyContext);