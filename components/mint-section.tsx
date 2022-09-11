
import { Grid, IconButton, TextField } from '@mui/material'
import { FaMinus, FaPlus } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import styles from '../styles/MintSection.module.css'
import { useState } from 'react';
import { selectAuth } from '../stores/auth-slice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { ethers } from 'ethers';
import ETHLottery from '../utils/ETHLottery.json'
import { selectMint, setIsMinting, setErrorMessage } from '../stores/mint-slice';
import { CONTRACT_ADDRESS } from '../utils/constants';

const MintSection = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { account } = useAppSelector(selectAuth)
  const { isMinting } = useAppSelector(selectMint)
  const [qty, setQty] = useState(1)

  const onClickIncrease = () => {
    const increment = qty + 1
    if (increment > 20) {
      return
    }

    setQty(increment)
  }

  const onClickDecrement = () => {
    const decrement = qty - 1
    if (decrement < 1) {
      return
    }

    setQty(decrement)
  }

  const onClickMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        dispatch(setIsMinting(true))
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ETHLottery.abi, signer)

        const price = await connectedContract.PRICE()

        let mintPrice = qty * parseFloat(ethers.utils.formatEther(price))

        const nftTxn = await connectedContract.mint(qty, { value: ethers.utils.parseEther(mintPrice.toString()) })

        await nftTxn.wait()
        console.log(nftTxn)
        dispatch(setIsMinting(false))
      } else {
        console.log("Ethereum object doesn't exist")
        dispatch(setErrorMessage(['Plz install Metamask']))
      }
    } catch (error) {
      dispatch(setErrorMessage('Error ! try again'))
      console.log(error)
      dispatch(setIsMinting(false))
    }
  }

  return (
    <div className={styles.mintSection}>
      <Grid className={styles.qtyMint} container textAlign="center" alignItems="center">
        <Grid item xs={4}>
          <IconButton className={styles.actionIcon} onClick={onClickDecrement} sx={{
            background: 'white',
            fontWeight: 'bold',
            "&:hover": {
              backgroundColor: 'lightgray',
            }
          }}>
            <FaMinus />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <TextField className={styles.input} value={qty} disabled size='small'/>
        </Grid>
        <Grid item xs={4}>
          <IconButton className={styles.actionIcon} onClick={onClickIncrease} sx={{
            background: 'white',
            fontWeight: 'bold',
            "&:hover": {
              backgroundColor: 'lightgray',
            }
          }}>
            <FaPlus />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container alignItems="center" textAlign="center">
        <Grid item xs={3} />
        <Grid item xs={6}>
          <LoadingButton
           sx={{
            fontWeight: 'bold',
            borderRadius: '100px',
            backgroundColor: 'tomato',
            "&:hover": {
              backgroundColor: '#af321c',
            }
           }}
           loading={isMinting}
           className={styles.mintButton}
           color="primary"
           disabled={account.length <= 0}
           variant="contained"
           size="medium"
           onClick={onClickMint}>
            {isMinting ? 'Getting numbers' : 'Mint Numbers'}
          </LoadingButton>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  )
}

export default MintSection
