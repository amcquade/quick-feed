import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../App.css";
const { forwardRef, useImperativeHandle } = React;

const FavoriteDialog = forwardRef((props, ref) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
  
    useImperativeHandle(ref, () => { return {
        handleClickOpen: handleClickOpen,
        handleClose: handleClose
    }});
    
    return (
      <div>
        <Dialog
          open={open}
          onClose={() => handleClose()}
          scroll={'paper'}
          maxWidth={'md'}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Favorite feeds</DialogTitle>
          <DialogContent>
            <p>Favorite item placeholder</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
});


export default FavoriteDialog;