
import { Button, ListItemIcon, MenuItem, Typography } from '@mui/material'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { selectAuth, setAccount } from '../stores/auth-slice'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setErrorMessage } from '../stores/mint-slice';
import styles from '../styles/Header.module.css'
import { CONTRACT_ADDRESS } from '../utils/constants'
import AppMenu from './app-menu'
import ETHLottery from '../utils/ETHLottery.json'
import Modal from './modal'

const AccountButton = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { account } = useAppSelector(selectAuth)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  useEffect( () => {
    const getCurrentAccount = async (): Promise<void> => {
      const { ethereum } = window;
      if (!ethereum) {
        dispatch(setErrorMessage(['Plz install Metamask']))
        dispatch(setAccount(''))
        return
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' }) as string[];

      if ((accounts?.length ?? 0) !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        dispatch(setAccount(account))
        //await setupEventListener()

        return
      }

    }

    getCurrentAccount()
  }, [dispatch])

  const onClickConnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        dispatch(setErrorMessage(['Plz install Metamask']))
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" }) as string[];

      console.log("Connected", accounts[0])
      dispatch(setAccount(accounts[0]))

      await setupEventListener()
    } catch (error) {
      dispatch(setErrorMessage('Error ! try again'))
      console.log(error)
    }
  }

  useEffect(() => {
    const setup = async () => {
      await setupEventListener()
    }
    setup()
  }, [])

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ETHLottery.abi, signer);
        console.log('passa')

        connectedContract.on("NewNumbers", (from, tokenId) => {
          console.log('passa')
          setOpen(true)
        })
      } else {
        dispatch(setErrorMessage(['Plz install Metamask']))
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onClickLogout = () => {
    dispatch(setAccount(''))
    handleClose()
  }

  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)} showCloseButton modalName="Minted">
        <>
          <Typography variant="subtitle1">Successfully minted, GOOD LUCK INVESTOR.</Typography>
          <br />
          <Typography variant="body1">Follow us on twitter and enable notifications to stay on top of lottery results.</Typography>
        </>
      </Modal>
      <Button className={styles.button} variant="contained" size="small" sx={{ fontWeight: 'bold', borderRadius: '100px', p: '8px', width: '100%' }}>
        <Typography className={styles.wallet} onClick={account != '' ? handleClick : onClickConnectWallet}>
          {account != '' ? account : 'Connect wallet'}
        </Typography>
      </Button>
      <AppMenu anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={onClickLogout}>
          <ListItemIcon>
            <FaArrowCircleRight />
          </ListItemIcon>
          Logout
        </MenuItem>
      </AppMenu>
    </>
  )
}

export default AccountButton
