import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Импортируем редюсер

const store = configureStore({
  reducer: {
    auth: authReducer,
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