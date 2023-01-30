import { useDispatch, useSelector } from 'react-redux';
import { decrementTemp, incrementTemp } from '../../redux/features/temp';
import { RootState } from '../../redux/store';

const Temp = () => {
  
  // the state.[name] -> [name] comes from the store.ts as we are using the object property
  const {tmpVariable} = useSelector((state: RootState) => state.tmpStore)
  const dispatch = useDispatch();

  return (
    <div>
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
  )
}

export default Temp