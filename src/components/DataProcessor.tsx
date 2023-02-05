import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DataProcessor = () => {

  const baseURL = "https://ddos-be.onrender.com/"
  // const baseURL = "http://127.0.0.1:8000/"
  const additionOfPostURL = "data"

  const [post, setPost] = useState(null)
  const [connectionState, setConnectionState] = useState(false)
  const [hasDataBeenSent, setHasDataBeenSent] = useState(false)

  const { dataJson } = useSelector((state: RootState) => state.dataStore)
  
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
      .post( (baseURL + additionOfPostURL) , {
        data: dataJson
      })
      .then((response) => {
        setHasDataBeenSent(true)
        console.log(response.data["data"])
      })
      .catch((e) => {
        console.log(e)
        setHasDataBeenSent(false)
      })
  }
  
  return (
    <Container sx={{mt: 6}}>
      <Typography variant="h5" sx={{fontWeight:"bold"}}>
        {post}
      </Typography>
      
      <Container sx={{ mt: 6 }}>
        {
          connectionState && <Button onClick={sendDataToBE} variant="contained"> Send Data </Button>  
        }
      </Container> 
      
      
    </Container>
  )
}

export default DataProcessor