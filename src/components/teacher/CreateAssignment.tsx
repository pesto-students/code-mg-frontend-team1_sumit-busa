import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Dayjs } from "dayjs";
import draftToHtml from "draftjs-to-html";
import React, { useState } from "react";
import { convertToRaw } from "draft-js";
import { useCreateAssignmentMutation } from "../../services/api";
import CreateAssignmentConfig, {
  AssignmentConfigProps,
} from "./CreateAssignmentConfig";
import CreateAssignmentDetails from "./CreateAssignmentDetails";
import { EditorState } from "react-draft-wysiwyg";
import { useNavigate, useParams } from "react-router-dom";

export interface Details {
  title: string;
  dueDate: Dayjs | null;
  problemStatement?: EditorState;
}
function CreateAssignment() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const steps = ["Details", "Configuration"];
  const [details, setDetails] = useState<Details>({
    title: "",
    dueDate: null,
  });
  const [config, setConfig] = useState<AssignmentConfigProps>({
    languages: [],
    testCases: [{ expectedOutput: "", input: "" }],
    runTime: 5,
  });

  const [createAssignment] = useCreateAssignmentMutation();

  const handleSetDetails = (data: Details) => {
    setDetails(data);
    handleNext();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { classId } = useParams();
  const handleSubmit = async (data: AssignmentConfigProps) => {
    setConfig(data);
    let problemStatement;
    if (!details.problemStatement) {
      problemStatement = "";
    } else {
      problemStatement = draftToHtml(
        convertToRaw(details.problemStatement.getCurrentContent())
      );
    }
    await createAssignment({
      classId: parseInt(classId || ""),
      maximumRunTime: config.runTime,
      testCases: config.testCases,
      title: details.title,
      problemStatement,
      dueDate: details.dueDate?.toISOString(),
    }).unwrap();

    navigate('../teacher');
    alert("Created Success fully");
  };

  const handleBack = (config: AssignmentConfigProps) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setConfig(config);
  };

  return (
    <div>
      <Grid
        container
        xs={12}
        justifyContent="center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <Grid item xs={8}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
      </Grid>
      {activeStep === 0 ? (
        <CreateAssignmentDetails
          data={details}
          handleStepperNext={handleSetDetails}
        />
      ) : activeStep === 1 ? (
        <CreateAssignmentConfig
          handleSubmit={handleSubmit}
          handleStepperBack={handleBack}
          data={config}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreateAssignment;
