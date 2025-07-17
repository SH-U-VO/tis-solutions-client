// components/ToasterProvider.jsx
import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#ffffff',
          color: '#374151',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: '0.5rem',
        },
      }}
    />
  );
};

export default ToasterProvider;