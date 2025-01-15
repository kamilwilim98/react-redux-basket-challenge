import products from "../utils/products_sample.json";
import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";

const ProductListView = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box>
      <Grid container spacing={3} padding={3}>
        {products.map((product) => (
          <Grid item xs={12} key={product.sku}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={3}
        marginTop={3}
      >
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ProductListView;
