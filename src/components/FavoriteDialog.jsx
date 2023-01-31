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
    
    const getFavoritesFeeds = () => {

      let favorites = [];
      for (let [key, value] of Object.entries(localStorage)) {
        if (key.startsWith('favorite-')) {
            favorites.push(JSON.parse(value));
        }
      } 
      return favorites;
    } 


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
              getFavoritesFeeds().length > 0 ? getFavoritesFeeds().map((item, i) => {
                return (
                  <FavoriteItem 
                    item={item} 
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