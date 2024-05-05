import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const JobCard = ({ jobDetails }) => {
  const {
    jobRole,
    logoUrl,
    companyName,
    location,
    jobDetailsFromCompany,
    minExp,
    maxExp,
    jdLink,
  } = jobDetails;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (text, maxWords = 15) => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <Card
      sx={{
        width: "30%",
        marginRight: "3%",
        borderRadius: "8px",
        transition: "transform 0.2s",
        backgroundColor: "honeydew",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent>
        <img src={logoUrl} alt={companyName} style={{ maxWidth: "50px" }} />
        <Typography variant="h5">
          {jobRole} at {companyName}
        </Typography>
        <Typography variant="body1">Location: {location}</Typography>
        <Typography variant="body2">
          Experience: {minExp} - {maxExp} years
        </Typography>
        <Typography variant="body2">
          {showFullDescription
            ? jobDetailsFromCompany
            : truncateDescription(jobDetailsFromCompany)}
        </Typography>
        {!showFullDescription && (
          <Button onClick={() => setShowFullDescription(true)}>
            View More
          </Button>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            href={jdLink}
            target="_blank"
          >
            Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
