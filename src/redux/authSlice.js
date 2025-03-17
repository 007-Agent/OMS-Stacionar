import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создание асинхронной функции для авторизации
export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
    const url = '/api/login' +
      '?username=' +
      encodeURIComponent(username) +
      '&password=' +
      encodeURIComponent(password);
const response = await axios.post(url);
  // const response = await axios.post('/api/login', { username, password });
  // Сохраняем токен в localStorage
  localStorage.setItem('token', response.data.data);
  return response.data.data; 
  
 // Возвращаем данные пользователя(объект)
  });

export const checkAuth  = createAsyncThunk('auth/check', async () => {
  const response = await axios.get('/api/login/check');
  return response.data.data;
  
})

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/logout'); // Выполняем POST запрос для выхода
      return response.data; // Если данные возвращаются, их можно вернуть
    } catch (error) {
      // Если произошла ошибка, возвращаем сообщение об ошибке
      return rejectWithValue(error.response.data); // Используем rejectWithValue для обработки ошибок
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    checkStatus: 'idle',
    logoutStatus: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Сохраняем сообщение об ошибке
      })
      .addCase(checkAuth.pending, (state) => {
        state.checkStatus = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkStatus = 'succeeded';
        state.user = action.payload; // Устанавливаем пользователя при успешной проверке
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkStatus = 'failed';
        state.error = action.error.message; 
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = 'loading'; // Устанавливаем статус в loading
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutStatus = 'succeeded'; // Устанавливаем статус в succeeded
        state.user = null; // Сбрасываем пользователя
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = 'failed'; // Устанавливаем статус в failed
        state.error = action.payload; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспортируем действия и редюсер
export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null, // Начальное состояние пользователя
//   },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload; // Устанавливаем пользователя при логине
//     },
//     logout: (state) => {
//       state.user = null; // Сбрасываем пользователя при логауте
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;