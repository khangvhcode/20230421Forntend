import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BaseResponse} from '@app/system/request/BaseResponse';
import {GssEmployeeWeebudget} from '@app/system/interface/gssEmployeeWeeklyBudget.interface';
import {
  DeleteGssEmployeeWeebudget,
  ListGssEmployeeWeebudget,
  UpdateGssEmployeeWeebudget
} from '@app/system/request/gssEmployeeWeebudget.request';
import api from '@app/utils/Api';

interface InitialState {
  gssEmployeeWeebudgets: GssEmployeeWeebudget[];
  selectedGssEmployeeWeebudget?: GssEmployeeWeebudget;
  isModalOpen: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  gssEmployeeWeebudgets: [],
  isLoading: false,
  isModalOpen: false
};

export const fetchGssEmployeeWeebudgetAsync = createAsyncThunk(
  'gssEmployeeWeebudget/fetchGssEmployeeWeebudgetAsync',
  async (req: ListGssEmployeeWeebudget) => {
    const response = await api.gssEmployeeWeebudgetAPI.list(req);
    return response;
  }
);

export const addGssEmployeeWeebudgetAsync = createAsyncThunk(
  'gssEmployeeWeebudget/addCustomerVoucherConfigAsync',
  async (req: UpdateGssEmployeeWeebudget) => {
    const response =
      req.id.gssEmployeeId > 0 && req.id.orderElementId > 0
        ? await api.gssEmployeeWeebudgetAPI.update(req)
        : await api.gssEmployeeWeebudgetAPI.add(req);
    return response;
  }
);

export const deleteGssEmployeeWeebudgetAsync = createAsyncThunk(
  'gssEmployeeWeebudget/deleteGssEmployeeWeebudgetAsync',
  async (req: DeleteGssEmployeeWeebudget) => {
    const response = await api.gssEmployeeWeebudgetAPI.del(req);
    return response;
  }
);

const gssEmployeeWeebudgetSlice = createSlice({
  name: 'gssEmployeeWeebudgetSlice',
  initialState: initialState,
  reducers: {
    setSelectedGssEmployeeWeebudget: (state, action?) => {
      if (action.payload) {
        state.selectedGssEmployeeWeebudget = action.payload;
        state.isModalOpen = true;
      } else {
        state.selectedGssEmployeeWeebudget = undefined;
        state.isModalOpen = false;
      }
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
      if (!action.payload) state.selectedGssEmployeeWeebudget = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGssEmployeeWeebudgetAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGssEmployeeWeebudgetAsync.fulfilled, (state, action) => {
        const {result} = action.payload as BaseResponse;
        state.gssEmployeeWeebudgets = result || [];
        state.isLoading = false;
      })
      .addCase(fetchGssEmployeeWeebudgetAsync.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {setSelectedGssEmployeeWeebudget, setModalOpen} =
  gssEmployeeWeebudgetSlice.actions;

export default gssEmployeeWeebudgetSlice.reducer;
