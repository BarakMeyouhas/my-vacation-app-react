import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActionArea
} from '@mui/material';
const AddVacation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [vacation, setVacation] = useState({
    destination: '',
    description: '',
    start: '',
    end: '',
    price: '',
    img: ''
  });
  var [images, setImages] = useState([]);

  const navigate = useNavigate();

  const fetchData = async (page, query) => {
    const apiKey = 'OQ9XdBxhpTSqIJb7fvEGfw7uYXnDxrOSiPAooXzMiu8yQyen9aiGou7a';
    const perPage = 80; // Set a large value

    const apiUrl = query ? `https://api.pexels.com/v1/search?query=${query}` : 'https://api.pexels.com/v1/curated';

    const axiosConfig = {
      headers: {
        Authorization: apiKey
      },
      params: {
        per_page: perPage,
        page: page,
        order_by: 'random',
        seed: Math.random()
      }
    };

    try {
      const response = await axios.get(apiUrl, axiosConfig);
      setImages(response.data.photos);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching data from Pixels API:', error);
    }
  };

  const handleSearchImageClick = () => {
    if (!vacation.destination.trim()) {
      alert('Please enter a destination before searching for images.');
      return;
    }
    fetchData(null, searchQuery); // Pass the searchQuery to the fetchData function
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDestinationChange = (event) => {
    const destinationValue = event.target.value;
    setSearchQuery(destinationValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let sanitizedValue = '';

    if (name === 'price') {
      const numericValue = parseFloat(value);
      sanitizedValue = isNaN(numericValue) ? '' : Math.max(0, Math.min(10000, numericValue)).toString();
    } else {
      sanitizedValue = value;
    }

    if (name === 'start') {
      const endDate = vacation.end;
      if (endDate && value > endDate) {
        setVacation((prevVacation) => ({
          ...prevVacation,
          end: ''
        }));
      }
    } else if (name === 'end') {
      const startDate = vacation.start;
      if (startDate && value < startDate) {
        setVacation((prevVacation) => ({
          ...prevVacation,
          start: ''
        }));
      }
    }

    setVacation((prevVacation) => ({
      ...prevVacation,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/admin/addVacation', vacation)
      .then((response) => {
        console.log('Vacation added successfully:', response.data);
        navigate('/AdminAllVacations');
      })
      .catch((error) => {
        console.log('Failed to add vacation:', error);
      });
  };

  const selectedImageStyle = {
    border: '4px solid blue'
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleSelectImage = (imageUrl) => {
    setVacation((prevVacation) => ({
      ...prevVacation,
      img: imageUrl
    }));
    handleCloseModal();
  };

  return (
    <>
      <Container>
        <Grid item xs={12} sm={6} md={4} sx={{ justifyContent: 'center' }}>
          <Card id="form" sx={{ maxWidth: 600, margin: 'auto', marginTop: 2, marginLeft: 2 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    type="text"
                    name="destination"
                    value={vacation.destination}
                    onChange={(e) => {
                      handleDestinationChange(e);
                      handleInputChange(e);
                    }}
                    label="Destination"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    type="text"
                    name="img"
                    value={vacation.img}
                    onChange={handleInputChange}
                    label="Image URL"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={handleSearchImageClick} color="primary" variant="outlined">
                    Search Image
                  </Button>
                  <TextField
                    type="text"
                    name="description"
                    value={vacation.description}
                    onChange={handleInputChange}
                    label="Description"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="start"
                    type="date"
                    value={vacation.start}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    label="Start Date"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                  />
                  <TextField
                    name="end"
                    type="date"
                    value={vacation.end}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    label="End Date"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      min: vacation.start
                    }}
                  />
                  <TextField
                    type="number"
                    name="price"
                    value={vacation.price}
                    onChange={handleInputChange}
                    label="Price"
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Add Vacation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card id="vacation" sx={{ maxWidth: 600, margin: 'auto', marginTop: 2, marginLeft: 2 }}>
            <CardMedia component="img" alt={vacation.destination} height="300" image={vacation.img} />
            <CardContent>
              <div>
                <Typography variant="h5">{vacation.destination}</Typography>
                <Typography variant="body1">{vacation.description}</Typography>
                <Typography variant="subtitle1">
                  Start: {vacation.start} | End: {vacation.end}
                </Typography>
                <Typography variant="h6">Price: ${vacation.price}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Image Search Results</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <CardActionArea onClick={() => handleImageClick(index)}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={vacation.destination}
                      height="300"
                      image={image.src.large}
                      sx={selectedImageIndex === index ? selectedImageStyle : {}}
                      onClick={() => handleImageClick(index)}
                    />
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleSelectImage(images[selectedImageIndex].src.original)} variant="contained" color="primary">
            Select Image
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddVacation;
