import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box position="fixed" bottom={0} right={0} px={1}>
        <Typography variant="caption" color="InactiveCaptionText">Made with ❣️ by Konstantinos Andreou, 2023</Typography>
    </Box>
  )
}

export default Footer