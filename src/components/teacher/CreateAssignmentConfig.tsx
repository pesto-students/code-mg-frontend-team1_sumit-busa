import Editor from "@monaco-editor/react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TestCase } from "../../services/api/api.interface";
import { LANGUAGES } from "../../utils/constants";
import MultipleSelect from "../common/MultiSelect";

export interface AssignmentConfigProps {
  languages: string[];
  testCases: TestCase[];
}

interface CreateAssignmentConfigParams {
  handleSubmit: (data: AssignmentConfigProps) => void;
  handleStepperBack: (data: AssignmentConfigProps) => void;
  data: AssignmentConfigProps;
}

function CreateAssignmentConfig({
  handleStepperBack,
  handleSubmit,
  data,
}: CreateAssignmentConfigParams) {
  const languages = Object.keys(LANGUAGES);

  const [selectedLanguage, setSelectedLanguage] = React.useState<string[]>(
    data.languages
  );
  const [runTime, setRunTime] = useState("5");

  const [testCases, setTestCases] = useState<TestCase[]>(data.testCases);

  const onSubmit = () => {
    handleSubmit({ languages: selectedLanguage, testCases });
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestChange = (index: number, input: string, output: string) => {
    const updatedTestCases = testCases.map((test, i) => {
      if (i === index) {
        return { input, expectedOutput: output };
      } else return test;
    });
    setTestCases(updatedTestCases);
  };

  return (
    <Grid container xs={12} justifyContent="center" mt={10}>
      <Grid item container xs={12} lg={10}>
        <Grid container item sm={12} md={6} justifyContent="center">
          <Grid container direction="column" spacing={5} lg={8}>
            <Grid item>
              <MultipleSelect
                values={languages}
                label="Choose Programming Languages"
                onChange={(value) => setSelectedLanguage(value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-basic"
                label="Maximum run time (Seconds)"
                variant="standard"
                value={runTime}
                onChange={(e) => setRunTime(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item container justifyContent="space-around" mt={10}>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={() => handleStepperBack({ languages, testCases })}
                >
                  Back
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" onClick={() => onSubmit()}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} direction="column" spacing={5} container>
          {testCases.map((test, index) => {
            return (
              <Grid container item spacing={2}>
                <Grid xs={12} textAlign="left" ml={2}>
                  Test Case {index + 1}
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    id="standard-basic"
                    label="Test Input"
                    key={"input" + index}
                    value={test.input}
                    onChange={(e) =>
                      handleTestChange(
                        index,
                        e.target.value,
                        test.expectedOutput
                      )
                    }
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    id="standard-basic"
                    key={"output" + index}
                    label="Expected Output"
                    value={test.expectedOutput}
                    onChange={(e) =>
                      handleTestChange(index, test.input, e.target.value)
                    }
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                <Grid xs={4} item>
                  {index === testCases.length - 1 ? (
                    <Button variant="outlined" onClick={addTestCase}>
                      Add more{" "}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeTestCase(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CreateAssignmentConfig;
