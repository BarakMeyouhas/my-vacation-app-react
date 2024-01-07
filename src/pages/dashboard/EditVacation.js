import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditVacation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const vacationId = parseInt(searchParams.get('params'), 10);
  const [vacationDetails, setVacationDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    destination: '',
    description: '',
    start: '',
    end: '',
    price: 0
  });

  const fetchVacationDetails = async () => {
    try {
      const response = await axios.get(`https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/vacationById/${vacationId}`);
      setVacationDetails(response.data[0]);
      setFormValues({
        destination: response.data[0].destination,
        description: response.data[0].description,
        start: response.data[0].start.split('T')[0],
        end: response.data[0].end.split('T')[0],
        price: response.data[0].price,
        img: response.data[0].img,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching vacation details:', error);
    }
  };

  useEffect(() => {
    if (!isNaN(vacationId)) {
      fetchVacationDetails();
    }
  }, [vacationId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let sanitizedValue = '';

    if (name === 'price') {
      // Convert the input to a non-negative number
      const numericValue = parseFloat(value);
      sanitizedValue = isNaN(numericValue) ? '' : Math.max(0, Math.min(10000, numericValue)).toString();
    } else {
      sanitizedValue = value;
    }

    if (name === 'start') {
      // Compare start and end dates
      const endDate = formValues.end;
      if (endDate && value > endDate) {
        // Reset the end date if it's earlier than the new start date
        setFormValues((prevValues) => ({
          ...prevValues,
          end: ''
        }));
      }
    } else if (name === 'end') {
      // Compare start and end dates
      const startDate = formValues.start;
      if (startDate && value < startDate) {
        // Reset the start date if it's later than the new end date
        setFormValues((prevValues) => ({
          ...prevValues,
          start: ''
        }));
      }
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: sanitizedValue
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formValues.end) < new Date(formValues.start)) {
      alert('End date cannot be earlier than the start date');

      return;
    }

    try {
      await axios.put(`https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/updateVacation/${vacationId}`, {
        ...formValues
      });
      await fetchVacationDetails();
      navigate('/adminAllVacations');
    } catch (error) {
      console.error('Error updating vacation:', error);
    }
  };

  if (!vacationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        <CardMedia component="img" alt={vacationDetails.destination} height="300" image={vacationDetails.img} />
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div>
              <TextField
                name="destination"
                label="Destination"
                variant="outlined"
                fullWidth
                value={formValues.destination}
                onChange={handleInputChange}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={formValues.description}
                onChange={handleInputChange}
              />
              <TextField
                name="start"
                type="date"
                value={formValues.start}
                onChange={handleInputChange}
                label="Start Date"
                variant="outlined"
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                name="end"
                type="date"
                value={formValues.end}
                onChange={handleInputChange}
                label="End Date"
                variant="outlined"
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  min: formValues.start // Restrict earlier dates than start date
                }}
              />
              <TextField
                name="price"
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                value={formValues.price}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Update Vacation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditVacation;
