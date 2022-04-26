import { createSlice } from '@reduxjs/toolkit'
import { remove as _remove } from 'lodash'

export const monListSlice = createSlice({
  name: 'monList',
  initialState: {
    value: [{ symbol: 'btcusdt', displayName: 'BTC/USDT' }],
  },
  reducers: {
    add: (state, action) => {
      const selectedCoin = action.payload
      state.value.push({ symbol: selectedCoin.value, displayName: selectedCoin.label })
    },
    remove: (state, action) => {
      const selectedCoin = action.payload
      _remove(state.value, { symbol: selectedCoin.symbol, displayName: selectedCoin.displayName })
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = monListSlice.actions

export default monListSlice.reducer
