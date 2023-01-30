import React from 'react';
import { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { incrementTemp, decrementTemp } from './redux/features/temp';

function App() {

  // the state.[name] -> [name] comes from the store.ts as we are using the object property
  const {tmpVariable} = useSelector((state: RootState) => state.tmpStore)
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(incrementTemp())}
      >
        Increment
      </button>
      <span>{tmpVariable}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrementTemp())}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
