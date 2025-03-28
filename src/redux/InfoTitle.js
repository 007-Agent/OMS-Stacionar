import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textInfo: null,
  
};

const InfoTitle = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText(state, action) {
        state.textInfo = action.payload; // Обновляем состояние
      },
  },
});

export const { setText } = InfoTitle.actions;

export default InfoTitle.reducer;