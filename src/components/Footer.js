import * as React from "react";
import { Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Link from "next/link";

const Footer = () => {
  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" display="inline">
        © 2023 Nearby Adda
      </Typography>
      <Link href="https://github.com/ekamid" style={{ margin: 0 }}>
        <GitHub sx={{ fontSize: 22, color: "text.secondary", ml: 0 }} />
      </Link>
    </Paper>
  );
};

export default Footer;
