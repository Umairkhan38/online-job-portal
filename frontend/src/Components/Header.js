import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../images/jobbg.jpg';

const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => (
        {
            display: "flex",
            justifyContent: 'center',
            backgroundImage:`radial-gradient( rgba(0, 0, 0, -0.104), rgba(0, 0, 0, 0.75)),url(${headerImage}) `,
            height: '400px', /* You must set a specified height */
            backgroundPosition: 'center', /* Center the image */
            backgroundRepeat: 'no-repeat', /* Do not repeat the image */
            backgroundSize: 'cover' ,
            backgroundColor: theme.palette.secondary.main
        }

    ));
    return (
        <>
            <StyleHeader >

            </StyleHeader>
        </>
    )
}

export default Header