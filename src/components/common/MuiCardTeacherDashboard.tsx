import { Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import { getFormattedDate } from "../../utils/helper";
import { randomImage } from "../../utils/randomImage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  name: String;
  count: string;
  submit: () => void;
  iconButton:()=>void;
}
function MuiCardTeacherDashboard(props:Props) {
  return (
    <Card sx={{ margin: 3, p: 2 , minWidth:"300px" ,maxWidth:"300px" }}>
      <CardMedia
        component="img"
        height="140"
        src={randomImage()}
        style={{backgroundSize:"cover"}}
        alt="coverImage"
      />
         <CardContent>
    <Typography>{props.name}</Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: 20,
      }}
    >
      <Typography>{props.count} Students</Typography>
      <Button
        variant="contained"
        onClick={() => props.submit()}
      >
        Invite Students
      </Button>
    </div>
    <IconButton
      onClick={() => {
      props.iconButton()
      }}
    >
      <ArrowForwardIcon />
    </IconButton>
    </CardContent>
  </Card>
  )
}

export default MuiCardTeacherDashboard