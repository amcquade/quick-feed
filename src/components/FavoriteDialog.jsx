import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../App.css";
import FavoriteItem from './FavoriteItem';
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
            <div className="favorites-list-section">

            {
              props.favoriteFeeds.length > 0 ? props.favoriteFeeds.map((item, i) => {
                return (
                  <FavoriteItem 
                    item={item}
                    updateFavorites={props.updateFavorites} 
                    getFeed={props.getFeed}
                    isFavoriteSelected={props.isFavoriteSelected}
                    closePopUp={() => {handleClose()}} 
                    key={i} index={i} />)
                }) 
                : 
                <div>No favorites</div>
            }

            </div>
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