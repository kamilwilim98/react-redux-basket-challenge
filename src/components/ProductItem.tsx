import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import {
  addToBasket,
  ProductSampleItem,
  removeFromBasket,
} from "../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProductItem = ({ product }: { product: ProductSampleItem }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const basketItem = basketItems[product.sku];
  const quantity = basketItem ? basketItem.quantity : 0;

  const handleAddToBasket = () => {
    if (quantity < product.basketLimit) {
      dispatch(addToBasket(product));
    }
  };

  const handleRemoveFromBasket = () => {
    if (quantity > 0) {
      dispatch(removeFromBasket({ sku: product.sku, price: product.price }));
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>Price: ${product.price.toFixed(2)}</Typography>
        <Typography>
          Total Price: ${(quantity * product.price).toFixed(2)}
        </Typography>
        <Typography>Quantity: {quantity}</Typography>
        <Box mt={2} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToBasket}
            disabled={quantity >= product.basketLimit}
          >
            Add to Basket
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRemoveFromBasket}
            disabled={quantity === 0}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
