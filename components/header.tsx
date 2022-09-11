
import { Box,  Grid, IconButton } from '@mui/material'
import Link from 'next/link'
import { FaTwitter } from 'react-icons/fa'
import styles from '../styles/Header.module.css'
import AccountButton from './account-button'
import { useRouter } from 'next/router'

const Header = (): JSX.Element => {
  const router = useRouter()

  return (
    <Box width="100%" sx={{ p: "2% 0"  }}>
      <Grid container alignItems="center" justifyItems="center">
        <Grid item xs={6} md={2}>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://twitter.com/ethlotteryball', '_blank')
          }}>
            <FaTwitter color="#1DA1F2"/>
          </IconButton>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://opensea.io/collection/ethlotteryball', '_blank')
          }}>
            <img src={'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png'} alt="opensea-logo" height={27} width={27} />
          </IconButton>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://etherscan.io/address/0x8Dfb966D4B0784CE376A9C4fba3FE88393af9552', '_blank')
          }}>
            <img src={'https://etherscan.io/images/brandassets/etherscan-logo-circle.png'} alt="opensea-logo" height={27} width={27} />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={8} sx={{display: { xs: 'none', md: 'block' }}}/>
        <Grid item xs={5} md={2} textAlign="center">
          <AccountButton />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
