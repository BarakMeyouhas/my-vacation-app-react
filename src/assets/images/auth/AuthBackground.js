// material-ui
import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const imageUrl = 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        top: 0,
        left: 'auto', // Set left to 'auto'
        right: 0, // Align to the right side of the screen        transform: 'translateX(-50%)', // Adjust to center the content
        width: '40%', // Set the width of the box (adjust as needed)
        height: '100vh'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <image href={imageUrl} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" opacity="1" />
        {/* Other SVG elements */}
      </svg>
    </Box>
  );
};

export default AuthBackground;
