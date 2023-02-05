import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import { Box, Container, Input, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataJson, clearHeaders, setDataJson, setHeaders } from '../redux/features/dataJson';
import { RootState } from '../redux/store';
import DataTable from './DataTable';

const CsvReader = () => {

  const dispatch = useDispatch();
  const {dataJson} = useSelector((state: RootState) => state.dataStore)


  const [csvFile, setCsvFile] = useState<File>(new File([], ''))
  let dataArray: Object[] = []

  const handleCsvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0])
    }
  }

  const uploadCsvFile = () => {
    dispatch(clearDataJson())
    dispatch(clearHeaders())

    const file : File = csvFile
    const reader = new FileReader()

    reader.onload = (e) => { 
      let text= e.target?.result
      if (typeof (text) != 'string') {
        text = ''
      }
      processCsvFile(text)
    }

    reader.readAsText(file)

  }
  

  const processCsvFile = (str: string, delim = ',') => {

    dispatch(clearDataJson())
    dispatch(clearHeaders())
    
    const headers = str.slice(0, str.indexOf('\n',)).split(delim)
    if (headers[0] === '') {
      headers[0] = 'Index No'
    }

    dispatch(setHeaders(headers))

    const rows = str.slice(str.indexOf('\n') + 1).split('\n')
    rows.pop()

    const seperatedRows: object[] = []

    for (let i = 0; i < rows.length; i++) { 
      const tempRow = rows[i].split(delim)
      seperatedRows.push(tempRow)
    }

    dataArray = []
    
    seperatedRows.forEach(row => {
      const el = Object.values(row)
      const tempObj: Object = {}
      for (let i = 0; i < el.length; i++) {
        Object.defineProperty(tempObj, headers[i], {value : el[i],
          writable : true,
          enumerable : true,
          configurable : true});
      }
      dataArray.push(tempObj)
    })
    dispatch(setDataJson(dataArray))
  }

  return (
    <Box sx={{
      textAlign: 'center',
      p: 4,
    }}>
      <Typography variant='h3' sx={{fontWeight: 'bold'}}>DDoS Log File Reader </Typography>
      <br />
      <Typography variant='overline' sx={{ color: '#48007f', fontWeight: 'bold' }}> Upload your CSV log file</Typography>
      <br />
      <Container>
        <form
          style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          id='inputForm'>
          <Input
            type="file"
            inputProps={{accept: ".csv"}}
            id='csvFileInput'
            onChange={handleCsvFileChange}
          />
          <UploadRoundedIcon sx={{ cursor: 'pointer', color: '#48007f', ml: 2 }}
            onClick={(e) => {
              e.preventDefault()
              if(csvFile) uploadCsvFile()
            }}
          />
        </form>
      </Container>
      <Container sx={{ mt: 6, }}>
        {
          dataJson.length > 0 && <DataTable />
        }
      </Container>
    </Box>
  )
}

export default CsvReader

