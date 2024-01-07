import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// project import
import BarAnimation from './MonthlyBarChart';
import MainCard from 'components/MainCard';
import Popover from '@mui/material/Popover';

// assets
import { MoreOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const AdminAllVacations = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
  const [filteredVacations, setFilteredVacations] = useState([]);
  const [vacationsArray, setVacationsArray] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVacationId, setSelectedVacationId] = useState(null);
  const [editButtonHovered, setEditButtonHovered] = useState(false);
  const [deleteButtonHovered, setDeleteButtonHovered] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch vacations
    axios
      .get('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/user/getallvacations')
      .then((response) => {
        const vacationsData = response.data;
        const sortedVacations = vacationsData.sort((a, b) => {
          const dateA = new Date(a.start.split('T')[0]);
          const dateB = new Date(b.start.split('T')[0]);
          return dateA.getTime() - dateB.getTime();
        });
        setVacationsArray(sortedVacations);
        setFilteredVacations(sortedVacations); // Initialize filteredVacations with all vacations
      })
      .catch((error) => {
        console.log('Error fetching vacations:', error);
      });

    // Fetch likes
    axios
      .get('https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/admin/getallLikes')
      .then(() => {
        // const likes = response.data;
        // console.log('Likes', likes);
      })
      .catch((error) => {
        console.log('Error fetching likes:', error);
      });

    const user_id = localStorage.getItem('user_id');

    // Check if user_id is available
    if (!user_id) {
      navigate('/login');
    } else {
      // Continue with your logic using user_id
    }
  }, [navigate]);

  useEffect(() => {
    if (searchValue) {
      const filtered = vacationsArray.filter((vacation) => vacation.destination.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredVacations(filtered);
    } else {
      setFilteredVacations(vacationsArray);
    }
  }, [searchValue, vacationsArray]);

  const handleExpandClick = (id) => {
    setExpandedCards((prevExpandedCards) => ({
      ...prevExpandedCards,
      [id]: !prevExpandedCards[id]
    }));
  };

  function formatDateWithoutTime(dateString) {
    const [date] = dateString.split('T');
    return date;
  }

  function handleAddVacationClick() {
    navigate(`/AddVacation`);
  }

  function handleVacationClick(id) {
    navigate(`/vacationDetails?params=${encodeURIComponent(id)}`);
  }

  const handleMoreOptionsClick = (event, id) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }

    setAnchorEl(event.currentTarget);
    setSelectedVacationId(id);
  };

  const handleOptionsClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedVacationId(null);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    handleClose();
    navigate(`/EditVacation?params=${encodeURIComponent(selectedVacationId)}`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setConfirmationDialogOpen(true);
  };
  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://my-vacation-app-database-721ed7af9c4d.herokuapp.com/api/v1/admin/deleteById/${selectedVacationId}`);

      handleClose();

      console.log(`Vacation ${selectedVacationId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting vacation:', error);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? `popover-${selectedVacationId}` : undefined;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid container item xs={12} sx={{ mb: 2.25 }}>
        <Grid item xs={12}>
          <Typography variant="h4">Hello Admin</Typography>
        </Grid>
        <br />
        <br />
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mt: '10px', Maxwidth: '10px' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Add New Vacation
          </Typography>
          <Button
            startIcon={<PlusCircleOutlined />}
            onClick={() => {
              handleAddVacationClick();
            }}
          ></Button>
        </Grid>
      </Grid>

      {/* row 1 */}
      <Grid container spacing={3} sx={{ mr: '10px', ml: '10px' }}>
        {filteredVacations.map((vacation) => (
          <Grid key={vacation.id} item xs={12} sm={6} md={4}>
            <Card
              onClick={() => handleVacationClick(vacation.id)}
              elevation={5}
              className="vacation-box"
              sx={{ display: 'flex', flexDirection: 'column', maxHeight: '450px' }}
            >
              <CardActionArea>
                <CardMedia sx={{ height: 140, flexGrow: 1 }} image={vacation.img} alt={vacation.destination} title={vacation.destination} />
                <CardContent sx={{ flexGrow: 1, minHeight: '90px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {vacation.destination}
                    </Typography>
                    <div>
                      <MoreOutlined
                        style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoreOptionsClick(e, vacation.id);
                        }}
                      />
                      <Popover
                        id={popoverId}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        onClick={handleOptionsClick} // Added onClick to prevent closing when clicking inside the popover
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        style={{ boxShadow: 'none' }}
                      >
                        <Card style={{ backgroundColor: 'white', padding: '10px' }}>
                          <Button
                            onClick={handleEditClick}
                            style={{
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: editButtonHovered ? '#e0e0e0' : 'transparent' // Change the background color on hover
                            }}
                            onMouseOver={() => setEditButtonHovered(true)}
                            onMouseOut={() => setEditButtonHovered(false)}
                          >
                            <EditOutlined style={{ marginRight: '5px' }} />
                            Edit Vacation
                          </Button>
                          <Button
                            onClick={handleDeleteClick}
                            style={{
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: deleteButtonHovered ? '#e0e0e0' : 'transparent'
                            }}
                            onMouseOver={() => setDeleteButtonHovered(true)}
                            onMouseOut={() => setDeleteButtonHovered(false)}
                          >
                            <DeleteOutlined style={{ marginRight: '5px' }} />
                            Delete Vacation
                          </Button>
                        </Card>
                      </Popover>
                    </div>
                  </div>
                  <br></br>
                  <Typography className="vacation-dates">
                    Start: {formatDateWithoutTime(vacation.start)} | End: {formatDateWithoutTime(vacation.end)}
                  </Typography>{' '}
                  <Typography variant="h5" className="vacation-price">
                    $ {vacation.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expandedCards[vacation.id]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandClick(vacation.id);
                  }}
                  aria-expanded={expandedCards[vacation.id]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedCards[vacation.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {vacation.description}
                  </Typography>
                  <br></br>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Statistics</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                Chart
              </Typography>
              <Typography variant="h3">Vacations Likes</Typography>
            </Stack>
          </Box>
          <BarAnimation />
        </MainCard>
      </Grid>

      <Dialog open={confirmationDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this vacation?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AdminAllVacations;
