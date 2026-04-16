import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { RootState } from '../store';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { bun, ingredients } = state.burgerConstructor;

      if (!bun) {
        return rejectWithValue('Выберите булку');
      }

      const ingredientIds = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id
      ];

      const data = await orderBurgerApi(ingredientIds);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка оформления заказа'
      );
    }
  }
);

type TOrderState = {
  orderRequest: boolean;
  orderModalData: { number: number } | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
