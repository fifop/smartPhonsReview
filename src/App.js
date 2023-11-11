
import './App.css';
import AppRoutes from './appRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import authReducer from './components/general/features/auth/authSlice'



const myStore = configureStore({
  reducer: {
    auth: authReducer
  }
})

function App() {
  return (
    <div className="App">
   <Provider store={myStore}>
     <ToastContainer />
      <AppRoutes />
    </Provider>

    </div>
  );
}

export default App;
