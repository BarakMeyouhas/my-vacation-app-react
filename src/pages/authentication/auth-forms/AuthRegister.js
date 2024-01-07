import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import axios from 'axios';

// material-ui
import {
  Box,
  Button,
  // Divider,
  FormControl,
  FormHelperText,
  Grid,
  // Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const [user, setUser] = useState({
    user_name: '',
    user_email: '',
    password: ''
  });

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.password.length < 4) {
      alert('Password should have a minimum of 4 characters.');
      return;
    } else if (user.user_name.length < 3) {
      alert('User name should have a minimum of 3 characters.');
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(user.user_email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Check if the username already exists on the server
    axios
      .post('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/checkUseremail', {
        useremail: user.user_email
      })
      .then((response) => {
        if (response.data.exists) {
          alert('Email already exists. Registration rejected.');
        } else {
          // Username doesn't exist, proceed with registration
          axios
            .post('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/addUser', user)
            .then((response) => {
              console.log('User details sent to the server:', user);
              console.log('Server response:', response.data); // Log the server response
              navigate('/login');
            })
            .catch((error) => {
              console.log(error); // Handle error
            });
        }
      })
      .catch((error) => {
        console.log(error); // Handle error
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          user_name: '',
          user_email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          user_name: Yup.string().max(255).required('User Name is required'),
          user_email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // ... (your existing Formik submission logic)
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, isSubmitting, touched }) => (
          <form noValidate onSubmit={handleSubmit}>
            {' '}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="user-name-register">User Name*</InputLabel>
                  <OutlinedInput
                    required
                    id="user-name"
                    type="user-name"
                    value={user.user_name}
                    name="user_name"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder="Barak"
                    fullWidth
                    error={Boolean(touched.user_name && errors.user_name)}
                  />
                  {touched.user_name && errors.user_name && (
                    <FormHelperText error id="helper-text-user-name-register">
                      {errors.user_name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-register">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.user_email && errors.user_email)} // <-- Change this
                    id="email-register"
                    type="email"
                    value={user.user_email} // <-- Change this
                    name="user_email" // <-- Change this
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder="Barak@gmail.com"
                    inputProps={{}}
                    required
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.user_email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-register">Password</InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInputChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
