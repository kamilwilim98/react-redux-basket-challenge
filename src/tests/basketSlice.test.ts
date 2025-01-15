import { describe, it, expect } from "vitest";
import basketReducer, {
  addToBasket,
  removeFromBasket,
  removeAll,
  updateQuantity,
  initialState,
  ProductSampleItem,
} from "../redux/basketSlice";

describe("basketSlice", () => {
  const product: ProductSampleItem = {
    sku: 1,
    name: "Sample Product",
    description: "A sample product",
    price: 10,
    basketLimit: 5,
  };

  it("should handle initial state", () => {
    expect(basketReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add an item to the basket", () => {
    const state = basketReducer(initialState, addToBasket(product));
    expect(state.items[product.sku]).toEqual({ ...product, quantity: 1 });
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(product.price);
  });

  it("should not exceed basket limit", () => {
    let state = initialState;
    for (let i = 0; i < product.basketLimit + 1; i++) {
      state = basketReducer(state, addToBasket(product));
    }
    expect(state.items[product.sku]?.quantity).toBe(product.basketLimit);
  });

  it("should remove an item from the basket", () => {
    let state = basketReducer(initialState, addToBasket(product));
    state = basketReducer(
      state,
      removeFromBasket({ sku: product.sku, price: product.price })
    );
    expect(state.items[product.sku]).toBeUndefined();
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it("should update item quantity", () => {
    let state = basketReducer(initialState, addToBasket(product));
    state = basketReducer(
      state,
      updateQuantity({ sku: product.sku, quantity: 3, price: product.price })
    );
    expect(state.items[product.sku]?.quantity).toBe(3);
    expect(state.totalQuantity).toBe(3);
    expect(state.totalPrice).toBe(30);
  });

  it("should remove all items of a product", () => {
    let state = basketReducer(initialState, addToBasket(product));
    state = basketReducer(
      state,
      removeAll({
        sku: product.sku.toString(),
        price: product.price,
        quantity: 1,
      })
    );
    expect(state.items[product.sku]).toBeUndefined();
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });
});
