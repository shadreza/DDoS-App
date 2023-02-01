import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import { Container, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const CsvReader = () => {

  const [csvFile, setCsvFile] = useState<File>(new File([], ''))
  const dataArray: Object[] = []

  const handleCsvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0])
    }
  }

  const uploadCsvFile = () => {
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
    const headers = str.slice(0, str.indexOf('\n',)).split(delim)
    if (headers[0] === '') {
      headers[0] = 'Index No'
    }
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')
    rows.pop()

    let seperatedRows: object[] = []

    for (let i = 0; i < rows.length; i++) { 
      let tempRow = rows[i].split(delim)
      seperatedRows.push(tempRow)
    }

    seperatedRows.forEach(row => {
      const el = Object.values(row)
      let tempObj: Object = {}
      for (let i = 0; i < el.length; i++) {
        // tempObj = { [headers[i]]: el[i] }
        Object.defineProperty(tempObj, headers[i], {value : el[i],
          writable : true,
          enumerable : true,
          configurable : true});
      }
      dataArray.push(tempObj)
    })

    console.log(dataArray)
  }

  return (
    <Container sx={{
      textAlign: 'center',
      p: 4,
    }}>
      <Typography variant='h3'> CSV Reader </Typography>
      <br />
      <Typography variant='overline' sx={{ color: '#48007f', fontWeight: 'bold' }}> Upload your CSV log file</Typography>
      <br />
      <Container>
        <form
          style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          id='inputForm'>
          <input
            type="file"
            accept='.csv'
            id='csvFileInput'
            onChange={handleCsvFileChange}
          />
          <UploadRoundedIcon sx={{ height: 40, cursor: 'pointer', color: '#48007f'}}
            onClick={(e) => {
              e.preventDefault()
              if(csvFile) uploadCsvFile()
            }}
          />
        </form>
      </Container>
    </Container>
  )
}

export default CsvReader

