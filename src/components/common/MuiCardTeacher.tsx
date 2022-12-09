import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { getFormattedDate } from "../../utils/helper";
  import { randomImage } from "../../utils/randomImage";
  
interface Props {
    title: string;
    createdAt: string;
    dueDate:string;
    submissions: number;
    submit: () => void;
  }
function MuiCardTeacher(props:Props) {
  return (
    <Card sx={{ margin: 3, p: 2 , minWidth: "300px",maxWidth:"300px"  }}>
     <CardMedia
        component="img"
        height="140"
        src={randomImage()}
        style={{ backgroundSize: "cover" }}
        alt="coverImage"
      />
            <CardContent>

    <Typography variant="h5" sx={{ m: 1 }}>
      {props.title}
    </Typography>
    <Typography variant="body1">
      Created on : {getFormattedDate(props.createdAt)}
    </Typography>
    <Typography variant="body1">
      Due Date: {getFormattedDate(props.dueDate)}
    </Typography>
    <Button
      variant="outlined"
      sx={{ mt: 3 }}
      onClick={() => props.submit()}
    >
      {props.submissions} Submissions
    </Button>
    </CardContent>

  </Card>
  )
}

export default MuiCardTeacher