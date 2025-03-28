import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Импортируем редюсер
import textReducer from './InfoTitle';

const store = configureStore({
  reducer: {
    auth: authReducer,
    text: textReducer,
  },
  
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './authSlice'; // Импортируем редюсер

// const store = configureStore({
//   reducer: {
//     auth: authSlice, // Используем authSlice как редюсер
//   },
// });

// export default store;