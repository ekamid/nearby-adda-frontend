import React from "react";
import { BiMap } from "react-icons/bi";
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const SingleEvent = ({ data, toggleDrawer, selected }) => {
  const { name, address, imageUrl, description, _id } = data;

  return (
    <Box
      bgcolor="secondary"
      id={`event-${_id}`}
      sx={{
        border: selected ? "2px solid red" : "1px solid #FEF7D8",
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
          height: "280px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", padding: "10px" }}>
            <Button
              onClick={toggleDrawer}
              sx={{
                display: "inline-block",
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            >
              <ForumIcon />
            </Button>
            <Button
              onClick={toggleDrawer}
              sx={{
                display: "inline-block",
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            >
              <BookmarkIcon />
            </Button>
          </Box>
        </Box>
        <Link href={"/"}>
          <Image fill src={imageUrl} alt={data.name} objectFit="cover" />
        </Link>
      </Box>
      <Link href={"/"}>
        <Typography
          variant="h5"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
      </Link>

      <Typography
        fontWeight="bold"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <BiMap /> {address}
      </Typography>
    </Box>
  );
};

export default SingleEvent;
