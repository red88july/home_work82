import { NavLink } from 'react-router-dom';
import {AppBar, Box, Button, Grid, styled, Toolbar, Typography} from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Spoti</Link>
          </Typography>
          <Box>
            <Button component={NavLink} to={'/register'} color="inherit">
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;