import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";

const Progress = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [photoData, setPhotoData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Ensure ID is available before fetching

    // Fetch photo details (title, slot number, cameras)
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/photos/${id}/`);
        setPhotoData(response.data);
      } catch (error) {
        console.error("Error fetching photo details:", error);
      }
    };

    // Fetch progress details (progress, time left, status)
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/progress/${id}/`);
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
    fetchProgress();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!photoData || !progressData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Failed to load data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ minWidth: 300, maxWidth: 500, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Photo Progress
          </Typography>
          <Typography variant="body1">
            <strong>Title:</strong> {photoData.title}
          </Typography>
          <Typography variant="body1">
            <strong>Slot Number:</strong> {photoData.slot_number}
          </Typography>
          <Typography variant="body1">
            <strong>Selected Cameras:</strong> {photoData.cameras.join(", ")}
          </Typography>
          <Typography variant="body1">
            <strong>Progress:</strong> {progressData.progress}%
          </Typography>
          <Typography variant="body1">
            <strong>Time Left:</strong> {progressData.time_left} minutes
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong>{" "}
            <span style={{ color: progressData.is_completed ? "green" : "orange" }}>
              {progressData.is_completed ? "Completed" : "In Progress"}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Progress;
