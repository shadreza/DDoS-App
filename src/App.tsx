import { Box } from '@mui/material';
import CsvReader from './components/CsvReader';

function App() {

  return (
    <Box sx={{
      backgroundColor: '#a7ffeb',
      minHeight: '100vh'
    }}>
      <CsvReader/>
    </Box>
  );
}

export default App;
