import { useTheme } from '@emotion/react'
import { Box, Card, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import {useDispatch} from 'react-redux';
import { jobAction } from '../redux/actions/jobAction'
import { useState } from 'react'
import {useParams} from 'react-router-dom'

function Home() {

  const {palette} = useTheme();
  const dispatch = useDispatch()
  const [page,setPage]=useState(1)
  const [cat,setCat]=useState('')
  const {keyword, location} = useParams(); 


  useEffect(()=>{
    dispatch(jobAction(page,keyword,cat,location));
  },[page,keyword,cat,location])

  
  return (
    <>
    <Box sx={{bgColor:'#fafafa', minHeight:'100vh'}}>
     <Navbar /> 
      <Header />
      <Container>
        <Stack direction={{ xs:'column', sm:'row'}}
          spacing={{xs:1, sm:2, md:2}}
        >
          <Box sx={{flex:2, p:2}}>
            <Card sx={{ minWidth:150, mb:3, mt:3, p:2}}>
            <Box sx={{pb:2}}>
              <Typography component='h4' sx={{color : palette.secondary.main, fontWeight:600}}>
              Filter Job By Category
              </Typography>
            </Box>
            </Card> 
          </Box>
        </Stack>
      </Container>
      </Box>
      </>
  
    )
}

export default Home