import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { store } from './Redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
        <App />
    </Provider>
  
);
// eslint-disable-next-line no-lone-blocks
// {fields.map((field, index) => (
//   <div key={field.id}>
//     <label>Item Description</label>
//     <input
//       {...register(`items.${index}.description`, { required: true })}
//     />
//     <label>Unit Cost</label>
//     <input
//       type="number"
//       step="0.01"
//       {...register(`items.${index}.unitCost`, { required: true })}
//       onChange={() => handleCalculateAmount(index)}
//     />
//     <label>Quantity</label>
//     <input
//       type="number"
//       {...register(`items.${index}.quantity`, { required: true })}
//       onChange={() => handleCalculateAmount(index)}
//     />
    // <label>Amount</label>
    // <input
    //   type="text"
    //   {...register(`items.${index}.amount`)}
    //   readOnly
    // />
//     <button type="button" onClick={() => remove(index)}>Remove</button>
//   </div>
// ))}
