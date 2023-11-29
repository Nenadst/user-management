import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <Typography variant="h2">- Welcome dear customer -</Typography>
    </Box>
  );
};

export default Home;
