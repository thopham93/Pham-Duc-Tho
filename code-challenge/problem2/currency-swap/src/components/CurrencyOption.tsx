import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconNoImg from "../assets/icons/no-image.png";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../types/FormInputProps";
import { useState } from "react";

export type IOption = {
  symbol: string;
  image: string;
  name: string;
};

type IProps = {
  options: IOption[];
} & FormInputProps;

const CurrencyOption = ({ name, control, label, options }: IProps) => {
  const [imgCurrency, setImgCurrency] = useState<string>(IconNoImg);
  return (
    <Controller
      rules={{
        required: "This field is required",
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Grid container alignItems="center" sx={{ gap: 2 }}>
          <Avatar src={imgCurrency} />
          <Grid item xs>
            <Autocomplete
              id="currency-select"
              fullWidth
              options={options}
              autoHighlight
              getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
              onChange={(_, option) => {
                setImgCurrency(option ? option.image : IconNoImg);
                onChange(option ? option.symbol : "");
              }}
              renderOption={(props, option) => (
                <Box
                  key={`${option.symbol} - ${option.name}`}
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
          </Grid>
        </Grid>
      )}
      control={control}
      name={name}
    />
  );
};

export default CurrencyOption;
