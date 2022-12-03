import { ReactNode, useCallback, useEffect, useState } from "react";
import _, { result } from "lodash";
import Editor from "@monaco-editor/react";
import Alert from "@mui/material/Alert";
import useSocket from "../../hooks/useSocket";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { LANGUAGES } from "../../utils/constants";
import { JsxChild } from "typescript";

interface Props {
  selectedLanguage?: string;
  languages: string[];
  code?: string;
  assignmentId: number;
}
function MonacoEditor(props: Props) {
  const [code, setCode] = useState<string | undefined>(props.code);
  const [isDirty, setDirty] = useState(false);
  const [customInputText, setCustomInputText] = useState("");
  const [compilationStatus, setCompilationStatus] = useState<CompilerOutput>();
  const [uploadState, setUploadState] = useState<UploadState>();
  const [testResults, setTestResults] = useState<TestResult[]>();
  const [submissionResult, setSubmissionResult] = useState<Result>();

  const { isConnected, registerEvent } = useSocket();
  const themes: { [key: string]: string } = {
    Dark: "vs-dark",
    Light: "light",
  };

  const [selectedTheme, setSelectedTheme] = useState(themes["Dark"]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    props.selectedLanguage || props.languages[0]
  );
  const [customInputVisible, setCustomInputVisible] = useState(false);
  const steps = ["Uploading", "Compiling", "Test Cases"];

  const isStepFailed = (step: number) => {
    return step === 1;
  };

  const saveCode = registerEvent("save", (payload) => {
    console.log(payload);
    if (payload === "success") setDirty(false);
    else alert("Error saving code");
  });
  const customRun = registerEvent("customRun", (payload) => {
    console.log({ payload, fff: "customRun" });
    setCompilationStatus({ ...payload });
  });

  useEffect(() => {
    console.log({ compilationStatus });
  }, [compilationStatus]);

  const submitAssignment = registerEvent(
    "submit",
    (payload: SubmissionOutput) => {
      console.log({ payload });
      setCompilationStatus(undefined);
      if (payload.type === "uploaded") {
        setUploadState(payload);
      } else if (payload.type === "testCase") {
        setTestResults((results) => {
          if (results === undefined) {
            return [payload];
          } else {
            return [...results, payload];
          }
        });
      } else if (payload.type === "result") {
        setSubmissionResult(payload);
      }
    }
  );

  const handleCustomInputVisibility = () => {
    setCustomInputText("");
    setCustomInputVisible((pre) => !pre);
  };
  const handleLanguageChange = (e: SelectChangeEvent) => {
    console.log("handle language change called", e.target.value);
    setSelectedLanguage(e.target.value);
    handleSaveCode(code || "", e.target.value);
  };
  const handleThemeChange = (e: SelectChangeEvent) => {
    setSelectedTheme(themes[e.target.value]);
  };

  const handleChange = (e: string | undefined) => {
    setCode(e);
    setDirty(true);
    if (e === undefined) return;
    debounceHandleSave(e, selectedLanguage);
  };

  const handleSaveCode = (code: string, selectedLanguage: string) => {
    console.log({ selectedLanguage, code });
    saveCode({
      assignmentId: props.assignmentId,
      language: selectedLanguage,
      sourceCode: code,
    });
  };

  const handleSubmitAssignment = () => {
    setCompilationStatus({ status: Status.uploading });
    setUploadState(undefined);
    setTestResults(undefined);
    setSubmissionResult(undefined);
    submitAssignment({
      sourceCode: code,
      language: selectedLanguage,
      assignmentId: props.assignmentId,
    });
  };

  const handleRunCode = () => {
    setUploadState(undefined);
    setTestResults(undefined);
    setSubmissionResult(undefined);
    setCompilationStatus({ status: Status.uploading });
    customRun({
      sourceCode: code,
      language: selectedLanguage,
      assignmentId: props.assignmentId,
      stdin: customInputText,
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSave = useCallback(
    _.debounce(handleSaveCode, 1000, { maxWait: 30000 }),
    []
  );
  return (
    <div>
      <Paper sx={{ m: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel
              id="language-simple-select-autowidth-label"
              margin="dense"
            >
              Language
            </InputLabel>
            <Select
              labelId="language-simple-select-autowidth-label"
              id="language-simple-select-autowidth"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              label="Language"
            >
              {props.languages.map((lang) => {
                return (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div>
            {isConnected ? "connected" : "Not connected"}{" "}
            <div>{isDirty ? "Saving..." : "saved"}</div>
          </div>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="theme-simple-select-autowidth-label" margin="dense">
              Theme
            </InputLabel>
            <Select
              labelId="theme-simple-select-autowidth-label"
              id="language-simple-select-autowidth"
              value={Object.keys(themes).find(
                (key) => themes[key] === selectedTheme
              )}
              onChange={handleThemeChange}
              label="Theme"
            >
              {Object.keys(themes).map((theme) => {
                return (
                  <MenuItem key={theme} value={theme}>
                    {theme}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <Divider sx={{ m: 1 }} />

        <Editor
          height="60vh"
          language={LANGUAGES[selectedLanguage as keyof typeof LANGUAGES]}
          defaultValue={code}
          width="100%"
          theme={selectedTheme}
          onChange={handleChange}
        />
      </Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value={customInputVisible}
              onChange={handleCustomInputVisibility}
            />
          }
          label="Custom Input"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <Button variant="outlined" onClick={handleRunCode} sx={{ m: 1 }}>
            Run Code
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitAssignment}
            sx={{ m: 1 }}
          >
            Submit
          </Button>
        </div>
      </div>
      {customInputVisible ? (
        <TextField
          variant="outlined"
          multiline
          style={{ width: "30%", display: "block !important" }}
          minRows={2}
          value={customInputText}
          onChange={(e) => setCustomInputText(e.target.value)}
        />
      ) : (
        /* { <input
        width={"100%"}
          type="text"
          value={customInputText}
          onChange={(e) => setCustomInputText(e.target.value)}
        ></input> }*/
        <div></div>
      )}

      <div>
        {compilationStatus &&
          getRunStatus(compilationStatus, customInputVisible)}
      </div>
      <div style={{ height: "30vh" }}>
        {getSubmissionStatus(uploadState, testResults, submissionResult)}
      </div>
    </div>
  );
}

export default MonacoEditor;

const getSubmissionStatus = (
  uploadState: UploadState | undefined,
  testResults: TestResult[] | undefined,
  finalResult: Result | undefined
) => {
  console.log({ finalResult, testResults });
  return (
    <>
      {finalResult && (
        <div>
          {finalResult.successCount} out of {finalResult.totalCount} passed
        </div>
      )}
      {uploadState && !finalResult && (
        <>
          Code Uploaded Successfully
          <Grid container spacing={4} style={{ marginTop: 1 }}>
            {Array(
              uploadState.count - ((testResults && testResults.length) || 0)
            )
              .fill(1)
              .map((_, index) => {
                return (
                  <Grid item sm={4}>
                    <Alert severity="info">Running Test {index}</Alert>
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}

      {testResults &&
        (finalResult === undefined ||
          finalResult.successCount !== finalResult.errorCount) && (
          <>
            {testResults.map((test, index) => {
              // if (test.status.status.description === "Accepted") return "";
              return (
                <div>
                  Test : {index + 1} {getRunStatus(test.status)}
                </div>
              );
            })}
          </>
        )}
    </>
  );
};

const getRunStatus = (data: CompilerOutput | "error", customRun = false) => {
  console.log({ data });
  let text: string = "";
  let details: string | undefined = "";
  let severity: "error" | "info" | "success" = "info";
  if (data === "error") return "something went wrong";

  switch (data.status.description) {
    case "Accepted":
      text = "Accepted";
      severity = "success";
      break;
    case "Uploading":
      text = "Compiling";
      severity = "info";
      break;
    case "Compilation Error":
      text = "Failed";
      severity = "error";
      details = data.compile_output;
      break;
    case "Wrong Answer":
      text = data.status.description;
      severity = "error";
      details = data.expectedOutput + " " + data.stdout;
      break;
    default:
  }

  return (
    <AlertBar severity={severity} details={details}>
      {" "}
      {text}
    </AlertBar>
  );
  //todo
  // const { status } = data;
  // if (status.description === "Uploading")
  //   return (
  //     <Alert severity="info" style={{ width: "20%" }}>
  //       Compiling
  //     </Alert>
  //   );
  // else if (status.description === "Accepted")
  //   return (
  //     <Alert severity="success" style={{ width: "20%" }}>
  //       Success
  //     </Alert>
  //   );
  // else if (status.description === "Compilation Error")
  //   return <AlertBar severity="error" text="Failed" />;
  // else if (status.description === "Time Limit Exceeded")
  //   return status.description;
  // else if (status.description === "Runtime Error (NZEC)") {
  //   return data.stderr;
  // } else
  //   return (
  //     <>
  //       {data.expectedOutput !== false && (
  //         <>
  //           <div>Wrong Answer</div>
  //           <div>Expected: {data.expectedOutput}</div>
  //         </>
  //       )}
  //       <Alert severity="success" style={{ width: "20%" }}>
  //         output: {data.stdout}
  //       </Alert>
  //     </>
  //   );
};

interface AlertProps {
  severity: "success" | "warning" | "error" | "info";
  children?: ReactNode;
  details?: string;
}
export function AlertBar(props: AlertProps) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const isClickable = props.details;
  return (
    <Alert severity={props.severity} style={{ width: "30%" }}>
      {isClickable && (
        <div onClick={handleOpenModal} style={{ cursor: "pointer" }}>
          {props.children}
        </div>
      )}
      {!isClickable && <div>{props.children}</div>}

      <div>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle id="alert-dialog-title">
            {props.children}
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.details}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </Alert>
  );
}

export type SubmissionOutput = UploadState | TestResult | Result;

export type UploadState = { type: "uploaded"; count: number };
export type TestResult = { type: "testCase"; status: CompilerOutput };
export type Result = {
  type: "result";
  totalCount: number;
  successCount: number;
  errorCount: number;
};

export interface CompilerOutput {
  compile_output?: string;
  expectedOutput?: string | false;
  stderr?: string;
  stdout?: string;
  status: typeof Status[keyof typeof Status];
}
export const Status = {
  processing: { id: 2, description: "Processing" },
  uploading: { id: 0, description: "Uploading" },
  success: { id: 3, description: "Accepted" },
  tle: { id: 5, description: "Time Limit Exceeded" },
  compilationError: { id: 6, description: "Compilation Error" },
  wrongAnswer: { id: 4, description: "Wrong Answer" },
  accepted: { id: 3, description: "Accepted" },
  runTimeError: { id: 11, description: "Runtime Error (NZEC)" },
} as const;
