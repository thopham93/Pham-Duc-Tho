import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, IconButton, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CurrencyOption, { IOption } from "./CurrencyOption";
import IconSwap from "../assets/icons/icon-swap.png";
import CurrencyInput from "./CurrencyInput";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../api";
import { catchError, finalize, of } from "rxjs";
import { useForm } from "react-hook-form";

const Container = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

type IFormInput = {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
};

const defaultValues = {
  fromCurrency: "",
  toCurrency: "",
  amount: "",
};

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<IOption[]>([]);

  const [pairCurrencies, setPairCurrencies] = useState<IOption[]>([]);

  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, getValues, watch } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const values = getValues();

  const onSubmit = (data: IFormInput) =>
    fetchExchangeCurrencies(
      data.fromCurrency,
      data.toCurrency,
      Number(data.amount)
    );

  const fetchExchangeCurrencies = (
    currency_from: string,
    currency_to: string,
    amount: number
  ) => {
    setIsLoading(true);
    return api
      .get("/get_estimated", {
        api_key: process.env.REACT_APP_API_KEY,
        fixed: false,
        currency_from: currency_from,
        currency_to: currency_to,
        amount: amount,
      })
      .pipe(
        catchError((error) => of(error)),
        finalize(() => setIsLoading(false))
      )
      .subscribe((resp) => {
        if (typeof resp === "string" || resp instanceof String) {
          setExchangeRate(Number(resp));
        } else {
          setExchangeRate(0);
        }
      });
  };

  const fetchPairCurrencies = (currency_from: string) => {
    setIsLoading(true);
    return api
      .get("/get_pairs", {
        api_key: process.env.REACT_APP_API_KEY,
        fixed: false,
        symbol: currency_from,
      })
      .pipe(
        catchError((error) => of(error)),
        finalize(() => setIsLoading(false))
      )
      .subscribe((resp: any) => {
        const filterCurrencies = currencies.filter((val) =>
          resp.includes(val.symbol)
        );
        setPairCurrencies(filterCurrencies);
      });
  };

  useEffect(() => {
    const fetchAllCurrencies = () => {
      setIsLoading(true);
      return api
        .get("/get_all_currencies", {
          api_key: process.env.REACT_APP_API_KEY,
        })
        .pipe(
          catchError((error) => of(error)),
          finalize(() => setIsLoading(false))
        )
        .subscribe((resp: any) => setCurrencies(resp));
    };

    fetchAllCurrencies();
    return () => {};
  }, []);

  useEffect(() => {
    if (watch("fromCurrency")) {
      fetchPairCurrencies(watch("fromCurrency"));
    } else {
      setPairCurrencies([]);
    }
    return () => {};
  }, [watch("fromCurrency")]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          minWidth: 500,
          height: "auto",
        },
      }}
    >
      <Paper
        sx={{
          p: 5,
        }}
        elevation={3}
      >
        <Container>
          <CurrencyOption
            name="fromCurrency"
            control={control}
            label="Choose a currency"
            options={currencies}
          />
          <IconButton aria-label="btn-swap">
            <img src={IconSwap} alt="swap" width={30} height={30} />
          </IconButton>
          <CurrencyOption
            name="toCurrency"
            control={control}
            label="Choose a currency"
            options={pairCurrencies}
          />
        </Container>
        <Container sx={{ mt: 5 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <CurrencyInput name="amount" control={control} label="Amount" />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Exchange
              </Button>
            </Grid>
            <Grid>
              <Grid
                sx={{
                  textAlign: "right",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#1A202C",
                  }}
                >
                  {`${values.amount} ${watch("fromCurrency")}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#805AD5",
                  }}
                >
                  {`${exchangeRate} ${watch("toCurrency")}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};

export default CurrencyConverter;
