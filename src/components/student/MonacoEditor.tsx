import { useCallback, useState } from "react";
import _ from "lodash";
import Editor from "@monaco-editor/react";
import useSocket from "../../hooks/useSocket";
import { Button } from "@mui/material";

function MonacoEditor() {
  const [code, setCode] = useState<string | undefined>("");
  const [isDirty, setDirty] = useState(false);
  const [output, setOutput] = useState("");
  const [customInput, setCustomInput] = useState("");
  const { isConnected, registerEvent } = useSocket();

  const saveCode = registerEvent("save", (payload) => {
    console.log(payload);
    if (payload === "success") setDirty(false);
    else alert("Error saving code");
  });

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
    customRun({ sourceCode: code, language: "C", stdin: customInput });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSave = useCallback(
    _.debounce(handleSaveCode, 1000, { maxWait: 30000 }),
    []
  );
  return (
    <div>
      <div>
        {" "}
        {isConnected ? "connected" : "Not connected"}{" "}
        <div>{isDirty ? "Saving..." : "saved"}</div>
      </div>
      <Editor
        height="60vh"
        defaultLanguage="C"
        defaultValue={code}
        theme="vs-dark"
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleRunCode}>
        Run Code
      </Button>
      <input
        type="text"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
      ></input>
      <div>
        {output?.split("\n")?.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default MonacoEditor;