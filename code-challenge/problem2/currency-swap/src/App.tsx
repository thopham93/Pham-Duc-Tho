import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CurrencyConverter from "./components/CurrencyConverter";
import useStore from "./store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled(Grid)(() => ({
  backgroundImage: "linear-gradient(to top, #ae085c, #2e0656)",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function App() {
  const [isError, msgError, setIsError] = useStore((state) => [
    state.isError,
    state.msgError,
    state.setIsError,
  ]);

  useEffect(() => {
    if (isError) {
      toast.dismiss();
      toast.error(msgError, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        onClose: () => setIsError(false, ""),
      });
    }
    return () => {};
  }, [isError]);

  return (
    <Container className="App">
      <Typography variant="h4" color="white">
        {"Currency Converter & Exchange Rates"}
      </Typography>
      <CurrencyConverter />
      <ToastContainer />
    </Container>
  );
}

export default App;
