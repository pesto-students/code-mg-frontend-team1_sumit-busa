import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import CreateAssignmentConfig from "./CreateAssignmentConfig";
import CreateAssignmentDetails from "./CreateAssignmentDetails";
import CreateAssignmentSummary from "./CreateAssignmentSummary";

function CreateAssignment() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Details", "Configuration", "Summary"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
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
      {activeStep == 0 ? (
        <CreateAssignmentDetails handleStepperNext={handleNext} />
      ) : activeStep == 1 ? (
        <CreateAssignmentConfig handleStepperNext={handleNext} handleStepperBack={handleBack}/>
      ) : (
        <CreateAssignmentSummary handleStepperBack={handleBack} />
      )}
    </div>
  );
}

export default CreateAssignment;
