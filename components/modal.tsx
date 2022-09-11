import { Close } from '@mui/icons-material'
import {
  AppBar,
  Backdrop,
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ModalProps,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

type Props = {
  showCloseButton?: boolean
  handleClose?: () => void
  width?: string | number | undefined
  fullScreen?: boolean | undefined
  modalName?: string | undefined
  size?: Breakpoint
}

const Modal: React.FC<Props & ModalProps> = ({
  width,
  showCloseButton,
  fullScreen,
  modalName,
  handleClose,
  children,
  size,
  ...props
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md')) || fullScreen

  return (
    <Dialog
      fullScreen={isFullScreen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
      maxWidth={size}
      {...props}
    >
      {isMobile ? (
        <AppBar sx={{ position: 'relative', backgroundColor: theme.palette.primary.main }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {modalName}
            </Typography>
            {showCloseButton ? (
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Close />
              </IconButton>
            ) : null}
          </Toolbar>
        </AppBar>
      ) : null}
      <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>
            Ok
            </Button>
        </DialogActions>
    </Dialog>
  )
}

Modal.defaultProps = {
  showCloseButton: false,
  width: undefined,
  size: 'xs',
}

export default Modal
