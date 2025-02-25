import './App.css';
import { useEffect, useState } from 'react';
import Card from './Components/Card/card';

function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') 
      .then((response) => response.json())
      .then((result) => {
        setCandidates(result); 
      });
  }, []);

  return (
    <div className="App">
      {candidates.length > 0 ? (
        candidates.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            phone={item.phone}
            email={item.email}
            address={`${item.address.street}, ${item.address.city}, ${item.address.zipcode}`} 
            company={item.company.name} 
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;