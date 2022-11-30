import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react'


interface InviteTeacherParams {
    handleClose: ()=>void,
    snackbarHandler : ()=>void,
dialogOpen: boolean

}
function InviteTeacher({handleClose,dialogOpen,snackbarHandler} : InviteTeacherParams ) {


  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Invite Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter Teacher Email seperated by comma
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
  )
}

export default InviteTeacher

