import {ListOrderElement} from '@app/system/request/orderElement.request';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '@app/utils/Api';
import {OrderElement} from '@app/system/interface/orderElement.interface';
import {BaseResponse} from '@app/system/request/BaseResponse';

interface InitialState {
  orderElements: OrderElement[];
  selectedOrderElement?: OrderElement;
  isModalOpen: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  orderElements: [],
  isLoading: false,
  isModalOpen: false
};

// export const fetchOrderElementAsync = async (req: ListOrderElement) => {
//   const response = await api.orderElementAPI.list(req);
//   return response;
// };

export const fetchOrderElementAsync = createAsyncThunk(
  'OrderElement/fetchOrderElementAsync',
  async (req: ListOrderElement) => {
    const response = await api.gssEmployeeWeebudgetAPI.list(req);
    return response;
  }
);

const orderElementSlice = createSlice({
  name: 'gssEmployeeWeebudgetSlice',
  initialState: initialState,
  reducers: {
    selectedOrderElement: (state, action?) => {
      if (action.payload) {
        state.selectedOrderElement = action.payload;
        state.isModalOpen = true;
      } else {
        state.selectedOrderElement = undefined;
        state.isModalOpen = false;
      }
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
      if (!action.payload) state.selectedOrderElement = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderElementAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderElementAsync.fulfilled, (state, action) => {
        const {result} = action.payload as BaseResponse;
        state.orderElements = result || [];
        state.isLoading = false;
      })
      .addCase(fetchOrderElementAsync.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {selectedOrderElement, setModalOpen} = orderElementSlice.actions;

export default orderElementSlice.reducer;
