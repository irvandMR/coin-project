import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCoinId, getCoins } from "../../service/coin-service";

const initialState = {
  value: [],
  loading: false,
  filter: [],
  searchText: "",
  selectedType: "select type",
};

const initialDetail = {
  data :{},
  loading : false
}

export const fetchCoins = createAsyncThunk("coin/fetchCoins", async () => {
  const response = await getCoins();
  return response.data;
});

export const fetchCoinDetail = createAsyncThunk("coin/fetchCoinDetail", async(id) => {
  const response = await getCoinId(id);
  return response.data
})

export const deleteCoin = createAsyncThunk("coin/deleteCoin", async(id) => {
  const response = await deleteCoin(id)
  return response.data
})

const coinSlice = createSlice({
  name: "coin",
  initialState: initialState,
  reducers: {
    filterhValue: (state, action) => {
      const inputText = action.payload.toLowerCase();

      if (!inputText) {
        return { ...state, filter: [], searchText: inputText };
      } else {
        const search = state.value.filter((item) => {
          if (typeof item.name === 'string') {
            return item.name.toLowerCase().includes(inputText);
          }
        });
        return { ...state, filter: search, searchText: inputText };
      }
    },
    selectValue: (state, action) => {
      const selectType = action.payload;
      const findSelect = state.value.filter((item) => {
        if (typeof item.type === 'string' && item.type.toLowerCase() === selectType.toLowerCase()) {
          return true;
        }
        return false;
      });
      return { ...state, filter: findSelect, selectedType: selectType };
    },
    deleteValue: (state, action) => {
      const coinIdToDelete = action.payload;
      const deleteData =  state.value.filter((item) => item.id !== coinIdToDelete);
      return { value:deleteData, filter: deleteData}
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.value = action.payload.slice(0,-1)
        state.filter = action.payload.slice(0,-1)
        state.loading = false
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = true
      })
  }
});

const coinDetailSlice = createSlice({
  name: "detail",
  initialState : initialDetail,
  reducers: {},
  extraReducers : (builder) => {
    builder
      .addCase(fetchCoinDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoinDetail.rejected, (state) => {
        state.loading = false;
      })
  },
})

export const { filterhValue, selectValue, deleteValue } = coinSlice.actions;

export const coinReducer = coinSlice.reducer;
export const detailReducer = coinDetailSlice.reducer;
