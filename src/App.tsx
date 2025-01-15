import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductListView from "./views/ProductListView";
import BasketCheckoutView from "./views/BasketCheckoutView";
import { Container, CssBaseline } from "@mui/material";

const App = () => (
  <CssBaseline>
    <Router>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<ProductListView />} />
          <Route path="/checkout" element={<BasketCheckoutView />} />
        </Routes>
      </Container>
    </Router>
  </CssBaseline>
);

export default App;
