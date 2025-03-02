import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate programmatically
import PhotoForm from "./PhotoForm"; // PhotoForm to add new photos
import ButtonAppBar from "./NavBar";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const Dashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for skeleton
  const navigate = useNavigate(); // Initialize navigate for routing

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/photos/");
      setPhotos(response.data);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching photos:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleEdit = (photoId) => {
    // Navigate to the edit page with the specific photo's id
    navigate(`/edit-photo/${photoId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete_photo/${id}/`);
      fetchPhotos(); // Reload the photos after deletion
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleProgress = (photoId) => {
    navigate(`/progress-photo/${photoId}`);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Box p={3}>
      <ButtonAppBar />
      <Typography variant="h4" gutterBottom>
        Photo Dashboard
      </Typography>

      <PhotoForm onSubmit={fetchPhotos} /> {/* Render the form to add a new photo */}

      <Box mt={4}>
        {loading ? (
          // Show skeleton while data is loading
          <Grid container spacing={3}>
            {[...Array(3)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={250} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : photos.length > 0 ? (
          // Display photos in grid format
          <Grid container spacing={3}>
            {photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {photo.title} (Slot: {photo.slot_number})
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cameras:</strong> {photo.cameras.join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Progress:</strong> {photo.digitization_progress}%
                    </Typography>
                    <Typography variant="body2">
                      <strong>Time Left:</strong> {photo.time_left} min
                    </Typography>
                  </CardContent>

                  <CardActions>
                    {/* Edit and Delete buttons */}
                    <IconButton onClick={() => handleEdit(photo.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(photo.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleProgress(photo.id)} color="third">
                      <AssessmentOutlinedIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No photos added yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
