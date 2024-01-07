import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, CardMedia, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const VacationDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vacationId = parseInt(searchParams.get('params'), 10);
  const [vacationDetails, setVacationDetails] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleBookNow = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchVacationDetails = async () => {
      try {
        const response = await axios.get(`https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/vacationById/${vacationId}`);
        setVacationDetails(response.data[0]);
      } catch (error) {
        console.error('Error fetching vacation details:', error);
      }
    };

    if (!isNaN(vacationId)) {
      fetchVacationDetails();
    }
  }, [vacationId]);

  if (!vacationDetails) {
    return <div>Loading...</div>;
  }

  function formatDateWithoutTime(dateString) {
    const [date] = dateString.split('T');
    return date;
  }

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2, marginLeft: 2 }}>
        <CardMedia component="img" alt={vacationDetails.destination} height="300" image={vacationDetails.img} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {vacationDetails.destination}
          </Typography>
          <Typography variant="body1" paragraph>
            {vacationDetails.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${vacationDetails.price}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Start: {formatDateWithoutTime(vacationDetails.start)} | End: {formatDateWithoutTime(vacationDetails.end)}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleBookNow}>
            Book Now
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>Congratulations on booking a vacation to {vacationDetails.destination}! We wish you enjoy every moment!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VacationDetails;
