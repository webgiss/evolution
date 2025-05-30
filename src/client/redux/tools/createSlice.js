import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice as createSliceRedux } from '@reduxjs/toolkit';

export function createSlice(sliceStruct) {
  const { name: sliceName, extraReducers, asyncReducers } = sliceStruct;

  // #region handling extraReducers
  const asyncFunctions = {}
  const extraReducersFunctions = []

  const addReducerFunction = (type, reducer) => {
    if (reducer !== undefined || reducer !== null) {
      extraReducersFunctions.push({ type, reducer })
    }
  }

  if (asyncReducers) {
    for (const [name, [asyncFunctionBase, pendingReducer, fulfilledReducer, rejectedReducer]] of Object.entries(asyncReducers)) {
      const fullName = `${sliceName}/${name}`

      const asyncFunction = createAsyncThunk(fullName, asyncFunctionBase)
      addReducerFunction(asyncFunction.pending, pendingReducer)
      addReducerFunction(asyncFunction.fulfilled, fulfilledReducer)
      addReducerFunction(asyncFunction.rejected, rejectedReducer)
      asyncFunctions[name] = asyncFunction
    }
  }

  sliceStruct.extraReducers = (builder) => {
    extraReducers !== undefined && extraReducers(builder)
    extraReducersFunctions.forEach(({ type, reducer }) => {
      builder.addCase(type, reducer)
    })
  }
  // #endregion

  const slice = createSliceRedux(sliceStruct)

  // #region handling actions for extraReducers
  for (const [name, asyncFunction] of Object.entries(asyncFunctions)) {
    slice.actions[name] = asyncFunction
  }
  // #endregion

  // #region Original structure (for testing purposes)
  slice.sliceStruct = sliceStruct
  // #endregion

  return slice
}
