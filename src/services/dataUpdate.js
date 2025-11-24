import { configureStore, createSlice } from '@reduxjs/toolkit';

// Создаем простой slice только для сигналов
const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    signal: 0 // Просто число, которое инкрементируем
  },
  reducers: {
    // Единственный action - отправить сигнал
    dataUpdate: (state) => {
      state.signal += 1;
    }
  }
});

export const { dataUpdate } = refreshSlice.actions;
export const store = configureStore({
  reducer: {
    refresh: refreshSlice.reducer
  }
});