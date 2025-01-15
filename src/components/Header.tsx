import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const Header = () => {
  const { totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.basket
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Shopping Basket
        </Typography>
        <Button color="inherit" component={Link} to="/checkout">
          Items: {totalQuantity} | Cost: ${totalPrice.toFixed(2)}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
