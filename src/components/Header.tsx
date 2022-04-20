/** @jsxImportSource @emotion/react */
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { typography, iconButton } from './Header.module.style';

export function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          css={iconButton}
        >
          <Typography variant="h6" noWrap component="div" css={typography}>
            Recruitment Task
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
