import { useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
interface Props {
  values: string[];
  label: string;
  onChange: (value: string[]) => void;
}

export default function MultipleSelect(props: Props) {
  const theme = useTheme();
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const valueToUse = typeof value === "string" ? value.split(",") : value;
    setValue(valueToUse);
    props.onChange(valueToUse);
  };

  return (
    <div>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="multiple-chip-label">{props.label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label={props.label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.values.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
