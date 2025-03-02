import React, { useState } from "react";
import axios from "axios";
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper, 
} from "@mui/material";

const CameraOptions = [
  { id: 1, label: "Camera #1", color: "red" },
  { id: 2, label: "Camera #2", color: "orange" },
  { id: 3, label: "Camera #3", color: "yellow" },
  { id: 4, label: "Camera #4", color: "green" },
  { id: 5, label: "Camera #5", color: "blue" },
  { id: 6, label: "Camera #6", color: "indigo" },
  { id: 7, label: "Camera #7", color: "violet" },
  { id: 8, label: "Camera #8", color: "purple" },
];

const PhotoForm = ({ onSubmit, photos = [] }) => {
  const [title, setTitle] = useState("");
  const [slotNumber, setSlotNumber] = useState(1);
  const [selectedCameras, setSelectedCameras] = useState([]);
 
  // Simulate data fetching (replace with actual API call)
  

  const handleCameraChange = (cameraId) => {
    setSelectedCameras((prev) =>
      prev.includes(cameraId)
        ? prev.filter((id) => id !== cameraId)
        : [...prev, cameraId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photoData = {
      title,
      slot_number: slotNumber,
      cameras: selectedCameras,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/create_photo/", photoData);
      alert("Photo created successfully!");
      onSubmit(photoData);
      setTitle("");
      setSlotNumber(1);
      setSelectedCameras([]);
    } catch (error) {
      console.error("Error creating photo:", error);
      alert("Failed to create photo.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Photo Submission</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          {/* Slot Number */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Slot Number</InputLabel>
              <Select
                value={slotNumber}
                onChange={(e) => setSlotNumber(Number(e.target.value))}
              >
                {[...Array(16).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    Slot {num + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Camera Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Select Cameras</Typography>
            <Grid container spacing={1}>
              {CameraOptions.map((camera) => (
                <Grid item xs={6} sm={4} md={3} key={camera.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCameras.includes(camera.id)}
                        onChange={() => handleCameraChange(camera.id)}
                      />
                    }
                    label={`${camera.label} (${camera.color})`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Submitted Photos */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Submitted Photos</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {photos.map((photo, index) => (
                  <TableRow key={index}>
                    <TableCell>{photo.title}</TableCell>
                    <TableCell>{photo.slot_number}</TableCell>
                    <TableCell>
                      {photo.cameras
                        .map((cameraId) =>
                          CameraOptions.find((c) => c.id === cameraId)?.label
                        )
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </Box>
  );
};

export default PhotoForm;
