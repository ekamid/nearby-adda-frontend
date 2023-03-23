import React from "react";
import { BiMap } from "react-icons/bi";
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";

const SingleEvent = ({ data, className }) => {
  const { name, address, imageUrl, description, _id } = data;
  console.log(className);

  return (
    <Box
      bgcolor={className && "secondary"}
      id={`event-${_id}`}
      sx={{
        border: "1px solid #FEF7D8",
        marginTop: "10px",
        boxShadow: "0px 16px 32px rgba(111, 86, 67, 0.3)",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "200px",
        }}
      >
        <Image fill src={`${imageUrl}`} alt={data.name} />
      </Box>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h6" fontWeight="bold">
        <BiMap /> {address}
      </Typography>
      <Typography>{description}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button variant="contained" size="large" color="primary">
          Join
        </Button>
        <Button variant="contained" size="large" color="danger">
          Cancel
        </Button>
        <Button variant="contained" size="large" color="warning">
          Chat
        </Button>
      </Box>
    </Box>
  );
};

export default SingleEvent;
