import React from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';

const About = () => (
  <Container>
    <Typography variant="h5" paragraph>
      Welcome to My Vacations Application! This platform provides an interactive and user-friendly environment for exploring and managing
      vacations.
    </Typography>

    <Typography variant="h5" paragraph>
      <strong>Login Options:</strong>
    </Typography>

    <Typography variant="body1" paragraph>
      <strong>1. Regular User:</strong> If you are a regular user, you can log in using your registered email and password. This will grant
      you access to explore and interact with available vacations.
    </Typography>

    <Typography variant="body1" paragraph>
      <strong>2. Admin:</strong> Administrators have additional privileges. To log in as an admin, please use the following credentials:
    </Typography>

    <List>
      <ListItem>
        <ListItemText
          primary="Email"
          secondary={
            <Typography variant="body1" color="textSecondary">
              admin1@gmail.com
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Password"
          secondary={
            <Typography variant="body1" color="textSecondary">
              admin123
            </Typography>
          }
        />
      </ListItem>
    </List>

    <Typography variant="h5" paragraph>
      Admins can manage all vacations and have access to administrative features.
    </Typography>

    <Typography variant="body1" paragraph className="contact-text">
      If you have any questions or feedback, feel free to contact me at barakm25@gmail.com. and my{' '}
      <a target="_blank" rel="noreferrer" href="https://github.com/BarakMeyouhas">
        GitHub account
      </a>
    </Typography>

    <Typography variant="body1">Thank you for using my application!</Typography>
  </Container>
);

export default About;
