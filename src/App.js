import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = () => {
    // Check if the customer already exists
    const existingCustomer = customers.find(
      (c) => c.name === `${firstName} ${lastName}` || c.customerNumber === customerNumber
    );
    if (existingCustomer) {
      alert('Customer already exists!');
      return;
    }

    const newCustomer = {
      name: `${firstName} ${lastName}`,
      customerNumber: customerNumber
    };
    setCustomers([...customers, newCustomer]);
    setFirstName('');
    setLastName('');
    setCustomerNumber('');
  };

  const handleDelete = (customer) => {
    const filteredCustomers = customers.filter(
      (c) => c.name !== customer.name
    );
    setCustomers(filteredCustomers);
    alert(`Customer ${customer.name} deleted!`);
  };

  const handleSort = () => {
    const sortedCustomers = [...customers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCustomers(sortedCustomers);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App'>
      <h1>Customer List</h1>
      <div className='form-group'>
        <label htmlFor='firstName' className='heading'>Person's Name:</label>
        <div className='input-group'>
          <input
            type='text'
            id='firstName'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            id='lastName'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='customerNumber' className='heading'>Customer Number:</label>
        <input
          type='text'
          id='customerNumber'
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSave} className='save'><b>Save</b></button>
      <div className=' search' >
        <div className='search-icon'>
          <i className='fa fa-search'></i>
          <input type='text' id='search'  onChange={handleSearch} />
        </div>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th onClick={handleSort}>Name</th>
              <th>Customer Number</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.customerNumber}>
                <td className='info'>{index + 1}</td>
                <td className='info'>{customer.name}</td>
                <td className='info'>{customer.customerNumber}</td>
                <td className='info'>
                  <button className='delete-button' onClick={() => handleDelete(customer)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
