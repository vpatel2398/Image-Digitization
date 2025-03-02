import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // For getting the ID and navigating
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const EditPhotoPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // For navigating after edit
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the photo details using the ID
    const fetchPhoto = async () => {
      const url = `http://127.0.0.1:8000/api/photos/${id}/`;
      try {
        const response = await axios.get(url);
        setPhoto(response.data);
        setTitle(response.data.title);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching photo details:", error);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Submit the updated title (without changing the slot_number or cameras)
      await axios.put(`http://127.0.0.1:8000/api/edit_photo/${id}/`, { title });
      alert("Photo updated successfully!");
      navigate("/"); // Redirect to home page after edit
    } catch (error) {
      console.error("Error updating photo:", error);
      alert("Failed to update photo.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ); // Show loading spinner while data is being fetched
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Edit Photo
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Slot Number"
                variant="outlined"
                fullWidth
                value={photo.slot_number}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Cameras"
                variant="outlined"
                fullWidth
                value={photo.cameras.join(", ")}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditPhotoPage;
