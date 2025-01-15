import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeAll } from "../redux/basketSlice";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

const BasketCheckoutView = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.basket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");

  const handleCheckout = () => {
    if (cardNumber.length === 16) {
      alert("Checkout Successful");
    } else {
      alert("Invalid Credit Card");
    }
  };

  return (
    <Box padding={3}>
      <Box marginBottom={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Basket Checkout
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(items).map(([sku, item]) => (
          <Grid item xs={12} key={sku}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Quantity:
                </Typography>
                <Select
                  value={item.quantity}
                  fullWidth
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        sku: +sku,
                        quantity: +e.target.value,
                        price: item.price,
                      })
                    )
                  }
                >
                  {[...Array(item.basketLimit)].map((_, i) => (
                    <MenuItem value={i + 1} key={i}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
                <Box marginTop={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() =>
                      dispatch(
                        removeAll({
                          sku,
                          price: item.price,
                          quantity: item.quantity,
                        })
                      )
                    }
                  >
                    Remove All
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box marginTop={4}>
        <Typography variant="h6">Summary</Typography>
        <Typography>Total Items: {totalQuantity}</Typography>
        <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
      </Box>

      <Box marginTop={3}>
        <TextField
          label="Credit Card"
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setCardNumber(value);
            }
          }}
          error={cardNumber.length !== 16 && cardNumber.length > 0}
          helperText={cardNumber.length !== 16 ? "Must be 16 digits" : ""}
          fullWidth
        />
      </Box>

      <Box marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
          disabled={totalQuantity === 0 || cardNumber.length !== 16}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default BasketCheckoutView;
