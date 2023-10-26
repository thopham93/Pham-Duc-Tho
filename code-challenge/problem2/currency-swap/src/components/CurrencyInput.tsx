import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../types/FormInputProps";

const CurrencyInput = ({ name, control, label }: FormInputProps) => {
  const REGEX_NUMBER = /^\d+$/;

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Amount is required",
          pattern: {
            value: REGEX_NUMBER,
            message: "Amount is accept numbers only",
          },
        }}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
          />
        )}
      />
    </Box>
  );
};

export default CurrencyInput;
