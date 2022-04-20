import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

export function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Recruitment Task
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
