import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment1, increment2,addCounter, increment3, decrement3} from "../featurs/counter/CounterSlice"
const Counter = () => {
    const count = useSelector((state)=> state.counter.count)
    const count2 = useSelector((state)=> state.counter.count2)
    const counters = useSelector((state)=> state.counter.counters)
    const dispatch = useDispatch()
  return (
    <div className='m-5'>
      <h1> {count} metr </h1>
      <button onClick={()=>dispatch(increment1(count2))} className='btn btn-success m-2'>yurish</button>
      <h1>  Qadam kattaligi: {count2} metr</h1>
      <button onClick={()=>dispatch(increment2(1))} className='btn btn-danger m-2 '>qadam kengaytirish</button>
      <div className='mt-5'>
        <button className='btn btn-outline-primary' onClick={() => dispatch(addCounter(0))}>
          Add Counter
        </button>
        {counters.map((item, index) => (
          <div key={index}>
            <button onClick={() => dispatch(increment3(index))} className='btn btn-success m-2 '>
              +
            </button>
            <span>{item}</span>
            <button onClick={() => dispatch(decrement3(index))} className='btn btn-danger m-2 '>
              -
            </button>
          </div>
        ))}
      </div>
     
    </div>
  )
}

export default Counter
