import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, Link, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_email: 'demo@gmail.com',
    password: 'demo123'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserName = localStorage.getItem('user_name');
    if (storedUser && storedUserName) {
      navigate('/allVacations');
    }
  }, [navigate]);

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('email-login').value = 'demo@gmail.com';
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? value : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/login', user)
      .then((response) => {
        const userData = response.data.loginSuccessful;

        if (userData.userExists) {
          // Save user information to local storage only if "Keep me signed in" is checked
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('user_name', userData.user_name);
          localStorage.setItem('user_email', userData.user_email);
          localStorage.setItem('user_id', userData.user_id);

          if (userData.user_email === 'admin1@gmail.com') {
            navigate('/adminAllVacations');
          } else {
            navigate('/allVacations');
          }
        } else {
          alert('This user is not registered. Please register to enter the website.');
        }
      })
      .catch(() => {
        alert('Failed to login. Please try again later.');
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          user_email: 'demo@gmail.com', // Set default email value
          password: 'demo123', // Set default password value
          submit: null
        }}
        validationSchema={Yup.object().shape({
          user_email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, isSubmitting, touched }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={user.user_email}
                    name="user_email"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder="demo@gmail.com"
                    fullWidth
                    error={Boolean(touched.user_email && errors.user_email)}
                  />
                  {touched.user_email && errors.user_email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.user_email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    defaultValue="demo123" // Set default value here
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
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
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    id="login"
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
