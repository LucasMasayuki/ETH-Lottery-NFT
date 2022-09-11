import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import Ball from '../components/ball'
import MintSection from '../components/mint-section'
import styles from '../styles/Home.module.css'
import { Grid, Toolbar, Typography } from '@mui/material'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { CONTRACT_ADDRESS } from '../utils/constants'
import ETHLottery from '../utils/ETHLottery.json'

const Home: NextPage = () => {
  const [qtyMinted, setQtyMinted] = useState(0)
  const [soldOut, setSoldOut] = useState(false)
  const [check, setCheck] = useState(0)

  useEffect(() => {
      const watchMintedFunction = async () => {
        try {
          const { ethereum } = window;

          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner()
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ETHLottery.abi, signer)

            const totalMinted = await connectedContract.totalSupply()
            setQtyMinted(parseFloat(ethers.utils.formatEther(totalMinted)) * 1000000000000000000)
            let maxSupply = await connectedContract.MAX_SUPPLY()

            if (totalMinted === maxSupply) {
              setSoldOut(true)
            }
          } else {
            console.log("Ethereum object doesn't exist")
          }
        } catch (error) {
          console.log(error)
        }
      }

      const id = setInterval(async () => {
          await watchMintedFunction()
          setCheck(check + 1)
      }, 3000);

      return () => clearInterval(id);
  }, [check])

  return (
    <div className={styles.container}>
      <Head>
        <title>ETH Lottery number</title>
        <meta name="description" content="Mint eth lottery number" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Grid container>
          <Grid item xs={12} md={7} textAlign="center" alignSelf='center' justifySelf="center">
            <Ball />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h2">
              ETH Lottery
            </Typography>
            <br />
            <Typography variant="body1" fontWeight="bold">
              Supply:{'  '}
              <Typography variant="body2" component="span">
                {qtyMinted}/5000
              </Typography>
            </Typography>
            <br />
            <Typography variant="body2" fontWeight="bold">
              Price:{'  '}
              <Typography variant="body2" component="span">
                0.001 eth each
              </Typography>
            </Typography>
            <br />
            <Typography variant="body2">
              ETH Lottery is a collection where each nft corresponds to a lottery number, there will be more than 5eth in prizes (there will be 5 draws) for whoever has the 5 numbers drawn,  the first draw will take place after the sold out, the more numbers the greater the chances of winning.
            </Typography>
            <br />
            <Typography variant="body2">
              The numbers will be drawn via contract, that is, they will be registered on the blockchain and the source code of the draw is available in the contract, so there is no possibility of fraud, anyone can see which numbers have been drawn, how many times it has been drawn and if the draw is really a random choice
            </Typography>
            <br />
           {soldOut ? <Typography variant="h4" fontWeight='bold'>SOLD OUT, buy numbers only in secondary marketplaces</Typography> : <MintSection /> }
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Home
