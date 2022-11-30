import { useCallback, useState } from "react";
import _ from "lodash";
import Editor from "@monaco-editor/react";
import useSocket from "../../hooks/useSocket";

import { InfoOutlined } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function MonacoEditor() {
  const [code, setCode] = useState<string | undefined>("");
  const [isDirty, setDirty] = useState(false);
  const [output, setOutput] = useState("");
  const [customInputText, setCustomInputText] = useState("");
  const { isConnected, registerEvent } = useSocket();
  const languages: string[] = ["C", "C++", "Python", "Java"];

  const themes: { [key: string]: string } = {
    Dark: "vs-dark",
    Light: "light",
  };

  const [selectedTheme, setSelectedTheme] = useState(themes["Light"]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
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

  const handleCustomInputVisibility = () => {
    setCustomInputVisible((pre) => !pre);
  };
  const handleLanguageChange = (e: SelectChangeEvent) => {
    setSelectedLanguage(e.target.value);
  };
  const handleThemeChange = (e: SelectChangeEvent) => {
    setSelectedTheme(themes[e.target.value]);
  };

  const customRun = registerEvent("customRun", (payload) => {
    console.log({ payload });
    if (payload?.status?.id === 6) setOutput(payload.compile_output);
    else setOutput(payload.stdout);
  });

  const handleChange = (e: string | undefined) => {
    setCode(e);
    setDirty(true);
    if (e === undefined) return;
    debounceHandleSave(e);
  };

  const handleSaveCode = (code: string) => {
    saveCode({ assignmentId: 1, language: "C", sourceCode: code });
  };

  const handleRunCode = () => {
    console.log(code);
    customRun({ sourceCode: code, language: "C", stdin: customInputText });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSave = useCallback(
    _.debounce(handleSaveCode, 1000, { maxWait: 30000 }),
    []
  );
  return (
    <div>
      <div>
        {isConnected ? "connected" : "Not connected"}{" "}
        <div>{isDirty ? "Saving..." : "saved"}</div>
      </div>

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
              {languages.map((lang) => {
                return (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
          defaultLanguage="C"
          defaultValue={code}
          width="100%"
          theme={selectedTheme}
          // theme="vs-dark"
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
          <Button variant="contained" onClick={() => null} sx={{ m: 1 }}>
            Submit
          </Button>
        </div>
      </div>
      {customInputVisible ? (
        <TextField
          variant="outlined"
          multiline
          fullWidth
          minRows={4}
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
        {output?.split("\n")?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="stepper">
        <Stepper activeStep={1}>
          {steps.map((label, index) => {
            const labelProps: {
              optional?: React.ReactNode;
              error?: boolean;
              icon?: React.ReactNode;
            } = {};
            if (isStepFailed(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Failed
                </Typography>
              );
              labelProps.error = true;
            }
            if (index == 2) {
              labelProps.icon = <InfoOutlined />;
            }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div>
        <Box sx={{ backgroundColor: "red", padding: 2, color: "white" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <InfoOutlined />
            <span>
              <Typography>&nbsp;&nbsp;Compilation Error</Typography>
            </span>
          </div>
          <div>Error message</div>
        </Box>
      </div>
    </div>
  );
}

export default MonacoEditor;
