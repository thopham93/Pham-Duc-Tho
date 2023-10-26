import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../types/FormInputProps";

export type IOption = {
  symbol: string;
  image: string;
  name: string;
};

type IProps = {
  options: IOption[];
} & FormInputProps;

const CurrencyOption = ({ name, control, label, options }: IProps) => {
  return (
    <Controller
      rules={{
        required: "This field is required",
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Autocomplete
          id="currency-select"
          sx={{ width: 300 }}
          options={options}
          autoHighlight
          getOptionLabel={(option) => `${option.symbol}_${option.name}`}
          onChange={(_, option) => onChange(option ? option.symbol : "")}
          renderOption={(props, option) => (
            <Box
              key={`${option.symbol}_${option.name}`}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={option.image}
                src={option.image}
                alt=""
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              helperText={error ? error.message : null}
            />
          )}
        />
      )}
      control={control}
      name={name}
    />
  );
};

export default CurrencyOption;
