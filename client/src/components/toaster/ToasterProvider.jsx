import { Toaster } from 'react-hot-toast';


const ToasterProvider = () => {
  return (
    <Toaster 
      toastOptions={{
            style: {
                  background: '#333',
                  color: '#fff',
                  padding: '40px 20px',
                  fontStyle:'semibold-bold',
                  fontSize: '21px',
            }
      }}
    
    />
  )
}

export default ToasterProvider