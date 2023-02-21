import { Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CsvReader from './components/CsvReader';
import { db } from './firebase.config';

function App() {

  type Attack = {
    [key: string]: string;
    name: string;
    id: string;
  };
  
  // adding a test
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const attackCollectionRef = collection(db, 'attacks-results');

  useEffect(() => {
    const getAttacks = async () => {
      const data = await getDocs(attackCollectionRef);
      const res:Attack[] = data.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          frequency: doc.data().frequency
      }))
      setAttacks(res);
    }
    getAttacks();
  }, [])

  return (
    <Box sx={{
      backgroundColor: '#a7ffeb',
      minHeight: '100vh'
    }}>
      <CsvReader />
      {
        attacks.map((attack) => {
          return (
            <div key={attack.id}>
              <h1>{attack.name}</h1>
            </div>
          )
        })
      }
    </Box>
  );
}

export default App;
