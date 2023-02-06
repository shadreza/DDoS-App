import { Box, Button, Container, Input, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DataProcessor = () => {

  // const baseURL = "https://ddos-be.onrender.com/"
  const baseURL = "http://127.0.0.1:8000/"
  const additionOfPostURL = ["data", "predict"]

  const [post, setPost] = useState(null)
  const [connectionState, setConnectionState] = useState(false)
  const [hasDataBeenSent, setHasDataBeenSent] = useState(false)
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [shoeSize, setShoeSize] = useState(0)
  const [responseFromBE, setResponseFromBE] = useState([])

  const { dataJson } = useSelector((state: RootState) => state.dataStore)

  const alterHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const heightValue= parseInt(event.target.value)
    if (heightValue) {
      if (heightValue < 0) {
        setHeight(0)
      } else {
        setHeight(heightValue)
      }
    } else {
      setHeight(0)
    }
  }

  const alterWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weightValue= parseInt(event.target.value)
    if (weightValue) {
      if (weightValue < 0) {
        setWeight(0)
      } else {
        setWeight(weightValue)
      }
    } else {
      setWeight(0)
    }
  }

  const alterShoeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shoeSizeValue= parseInt(event.target.value)
    if (shoeSizeValue) {
      if (shoeSizeValue < 0) {
        setShoeSize(0)
      } else {
        setShoeSize(shoeSizeValue)
      }
    } else {
      setShoeSize(0)
    }
  }
  
  const getDataFromBE = async () => {
    await axios
      .get(`${baseURL}`)
      .then((response) => {
        setPost(response.data["data"])
        setConnectionState(true)
      })
      .catch((err) => {
        console.log(err)
        setConnectionState(false)
      })
  }

  useEffect(() => {
    getDataFromBE()
  }, []);

  const sendDataToBE = async () => {
    await axios
      .post( (baseURL + additionOfPostURL[1]) , {
        data: {
          height: height,
          weight: weight,
          shoeSize: shoeSize
        }
      })
      .then((response) => {
        setHasDataBeenSent(true)
        setResponseFromBE(response.data)
      })
      .catch((e) => {
        console.log(e)
        setHasDataBeenSent(false)
      })
  }

  const beautifyNames = (name: string) => {
    return name.split('(')[0]
  }
  
  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      
      <Typography variant="h5" sx={{fontWeight:"bold"}}>
        {post}
      </Typography>

      {
        connectionState &&

        <Container sx={{ mt: 6 }}>
            <Typography sx={{ mb: 8 }} variant="overline">
              DecisionTreeClassifier, KNeighborsClassifier, MLPClassifier, RandomForestClassifier these 4 classifiers we put to the test with a very small dataset for testing putpose. We used 3 parameters height, weight and shoe size to determine the gender...
            </Typography>
          
            <br />

            <Typography variant="overline" sx={{fontWeight: 'bold', mt: 6}}>So if a person has </Typography>

            <br />

            <Container  sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'baseline', mt: 6}}>
              <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography sx={{mr: 2}}>Height</Typography>
                <Input type="number" sx={{width: 60}} value={height} onChange={alterHeight}/>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography sx={{mr: 2}}>Weight</Typography>
                <Input type="number" sx={{width: 60}} value={weight} onChange={alterWeight}/>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography sx={{mr: 2}}>Shoe Size</Typography>
                <Input type="number" sx={{width: 60}} value={shoeSize} onChange={alterShoeSize}/>
              </Box>
            </Container>

            <br />
            
            <Button sx={{ mt: 4 }} onClick={sendDataToBE} variant="contained"> Process Data </Button>

            <br />

            {
              hasDataBeenSent && 
              <Container >
                  {
                    responseFromBE.map(response => {
                      const classifierName = beautifyNames(response[0])
                      return(
                      <Typography key={response[2]} sx={{mt: 4}}>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{ classifierName }</span>  says the person is <span style={{fontWeight: 'bold', fontSize: '16px'}}>{response[1]}</span>
                      </Typography>
                      )
                    })
                  }
                  <Typography variant="h5" sx={{m: 6}}>
                    The ML model gave the results through the backend
                  </Typography>
              </Container>
            }

            <br />
            
            
        </Container>
        
      }

    </Container>
  )
}

export default DataProcessor