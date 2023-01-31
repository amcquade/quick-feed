import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const FavoriteButton = ({selected, onClickAction}) => {

    const theme = createMuiTheme({
        palette: {
          primary: {
            light: amber[100],
            main: amber[500],
            dark: amber[800],
            contrastText: '#fff',
          },
          secondary: {
              light: grey[100],
              main: grey[400],
              dark: grey[800],
            contrastText: '#000',
          }
        },
      });

    const StarIcon = (props) => {
        return (
          <SvgIcon {...props}>
            <path d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z" />
          </SvgIcon>
        );
    };

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <StarIcon onClick={onClickAction} className="favorite" color={(selected ? 'primary' : 'secondary')} />
            </MuiThemeProvider>
        </div>
    );
};

export default FavoriteButton;