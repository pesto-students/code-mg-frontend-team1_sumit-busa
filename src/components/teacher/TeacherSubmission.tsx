import Editor from "@monaco-editor/react";
import { Chip, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetSubmissionTeacherQuery } from "../../services/api";
import { LANGUAGES } from "../../utils/constants";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const TeacherSubmission = () => {
  const { submissionId } = useParams();
  const { isLoading, data, isError } = useGetSubmissionTeacherQuery(
    parseInt(submissionId || "")
  );

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Something went Wrong</>;
  if (data) {
    const chipColor = data.status === "Pass" ? "success" : "error";
    return (
      <Grid container justifyContent="center" m={2}>
        <Grid container>
          <Grid>
            <div
              style={{
                textTransform: "capitalize",
                fontSize: "2rem",
                marginBottom: 15,
              }}
            >
              {data.assignment.title}
              <NavigateNextIcon />
              Submissions
              <NavigateNextIcon />
              {data.student.fullName}
              <NavigateNextIcon />
              <Chip
                label={data.status || ""}
                style={{ marginLeft: 15 }}
                color={chipColor}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={4} justifyContent="flex-start">
          <Grid item>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.assignment.problemStatement,
                }}
                style={{
                  textAlign: "left",
                  margin: "1rem",
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Editor
            value={data.submission}
            language={LANGUAGES[data.language as keyof typeof LANGUAGES]}
            height="80vh"
            theme="vs-dark"
            options={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    );
  }

  return <></>;
};

export default TeacherSubmission;
