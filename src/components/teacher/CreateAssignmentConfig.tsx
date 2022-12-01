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

interface CreateAssignmentConfigParams {
    handleStepperNext: () => void;
    handleStepperBack:()=>void;
}
  
function CreateAssignmentConfig({handleStepperBack , handleStepperNext}:CreateAssignmentConfigParams) {
  const languages = [
    {
      value: "C",
      label: "C",
    },
    {
      value: "C++",
      label: "C++",
    },
    {
      value: "Python",
      label: "Python",
    },
    {
      value: "Java Script",
      label: "Java Script",
    },
  ];
  const [code, setCode] = useState<string | undefined>("");

  const [language, setLanguage] = React.useState("C");
  const [checkPlagiarism, setCheckPlagiarism] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (e: string | undefined) => {
    setCode(e);
    // setDirty(true);
    // if (e === undefined) return;
    // debounceHandleSave(e);
  };
  //   const languages: string[] = ["C", "C++", "Python", "Java"];
  const themes: { [key: string]: string } = {
    Dark: "vs-dark",
    Light: "light",
  };

  const [selectedTheme, setSelectedTheme] = useState(themes["Light"]);
  const [selectedLanguage, setSelectedLanguage] = useState("C");

  const handleCheckPlagiarism = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckPlagiarism(event.target.checked);
  };
  const handleLanguageChange = (e: SelectChangeEvent) => {
    setSelectedLanguage(e.target.value);
  };
  const handleThemeChange = (e: SelectChangeEvent) => {
    setSelectedTheme(themes[e.target.value]);
  };
  return (
    <Grid container textAlign={"left"}>
      <Grid
        item
        xs={12}
        lg={4}
        height={"80vh"}
        pr={5}
      >
        <Grid xs={12} item m={2}>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Select Programming Language"
            value={language}
            onChange={handleChange}
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Maximum run time (Seconds)"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Test Input"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid xs={12} item m={2}>
          <TextField
            id="standard-basic"
            label="Expected Output"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid
          xs={12}
          item
          m={2}
          display={"flex"}
          p={2}
          justifyContent="space-between"
        >
          <Button variant="contained" onClick={handleStepperBack}>Back</Button>
          <Button variant="contained" onClick = {handleStepperNext}>Next</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8} p={2}>
        <FormGroup>
          <FormControlLabel
            style={{ alignSelf: "flex-start" }}
            control={
              <Switch
                value={checkPlagiarism}
                onChange={handleCheckPlagiarism}
              />
            }
            label="Test for Plagiarism"
            labelPlacement="start"
          />
        </FormGroup>
        {checkPlagiarism ? (
          <>
            <Typography variant="body1" mt={4} mb={4}>
              Sample Code for Plagiarism Scan
            </Typography>
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
                      <MenuItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "200px" }}>
                <InputLabel
                  id="theme-simple-select-autowidth-label"
                  margin="dense"
                >
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
              onChange={handleCodeChange}
            />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}

export default CreateAssignmentConfig;
