import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'fixed',  // Change to 'sticky' if you want it to be sticky rather than fixed
  top: 0,
  left: 0,
  zIndex: 1000,
  // Add a box shadow to distinguish the navbar from content
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <ul style={{ margin: 0, padding: '10px 20px', listStyleType: 'none' }}>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;

/*import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1000,
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <div>
      <Navbar>
        <ul style={{}}>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </ul>
      </Navbar>
    </div>
  );
};

export default TopNavbar;*/
