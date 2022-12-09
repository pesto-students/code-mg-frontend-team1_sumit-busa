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
  name: String;
  description: String;
  count: String;

  submit: () => void;
}
function MuiCardThreeLine(props: Props) {
  return (
    <Card
      sx={{ margin: 3, p: 2, textAlign: "left", minWidth: "300px" }}
      onClick={() => props.submit()}
    >
      <CardMedia
        component="img"
        height="140"
        src={randomImage()}
        style={{ backgroundSize: "cover" }}
        alt="coverImage"
      />
      <CardContent>
        <Typography m={2} mb={0} variant="h5">
          {props.name}
        </Typography>
        <Typography mx={2} mb={5}>
          {props.description}
        </Typography>
        <Typography mx={2}>{props.count ?? 0} Assignments</Typography>
        {/* <LinearProgress
  variant="determinate"
  value={20}
  sx={{ margin: 2, height: "10px" }}
/> */}
      </CardContent>
    </Card>
  );
}

export default MuiCardThreeLine;
