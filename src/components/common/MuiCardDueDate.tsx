import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { getFormattedDate } from "../../utils/helper";
import { randomImage } from "../../utils/randomImage";

interface Props {
  title: string;
  date: string;
  submit: () => void;
}
function MuiCardWithDate(props: Props) {
  return (
    <Card sx={{ margin: 3, p: 2, minWidth:"300px" ,maxWidth:"300px" }} >
        <CardMedia
        component="img"
        height="140"
        src={randomImage()}
        style={{backgroundSize:"cover"}}
        alt="coverImage"
      />
      <CardContent>
      <Typography variant="h5" sx={{ m: 1 }}>
        {props.title}
      </Typography>
      <Typography variant="body1"></Typography>
      <Typography variant="body1">
        Due Date: {getFormattedDate(props.date)}
      </Typography>
      <Button variant="outlined" sx={{ mt: 3 }} onClick={() => props.submit()}>
        start
      </Button>
      </CardContent>
    </Card>
  );
}

export default MuiCardWithDate;
