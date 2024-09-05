// Loader.tsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={9999}
      bgcolor="rgba(255, 255, 255, 0.7)"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
