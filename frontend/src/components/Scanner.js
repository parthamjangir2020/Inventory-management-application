import React, { useState } from 'react';
import axios from '../services/api';
import Header from './Header';

const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [stock, setStock] = useState(null);

  const fetchProductStock = async () => {
    const response = await axios.post('/api/products/scan', { barcode });
    setStock(response.data.stock);
  };

  const updateStock = async (delta) => {
    const response = await axios.post('/api/products/update', { barcode, delta });
    setStock(response.data.newStock);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '20px', backgroundColor: '#ffffff', margin: '20px', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="Scan barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onBlur={fetchProductStock}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        {stock !== null && (
          <div>
            <h3 style={{ color: stock < 10 ? '#d8514d' : '#000000' }}>Current Stock: {stock}</h3>
            <button onClick={() => updateStock(-1)}>-</button>
            <button onClick={() => updateStock(1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
