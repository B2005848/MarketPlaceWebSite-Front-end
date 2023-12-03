// cart-store.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: [],
    selectedQuantity: 0,
    totalPrice: 0,
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find(
        (item) => item.id === product.ProductID
      );

      if (existingProduct) {
        existingProduct.Quantity++;
        existingProduct.Total =
          existingProduct.Quantity * existingProduct.price;
      } else {
        this.cart.push({
          variantID: product.variantID,
          material: product.Material,
          size: product.Size,
          id: product.ProductID,
          Image: product.ImageURL,
          name: product.productname,
          price: product.Price,
          Quantity: 1,
          Total: product.Price,
          quantity: 1,
          isSelected: false,
        });
      }

      console.log("Cart after adding:", this.cart);
      alert(`Đã thêm ${product.productname} ${product.Material} vào giỏ hàng.`);

      // Cập nhật tổng giá và số lượng khi thêm vào giỏ hàng
      this.updateTotalValues();
    },

    // Cập nhât giỏ hàng
    updateCart(selectedProducts) {
      this.cart = selectedProducts;

      // Cập nhật tổng giá và số lượng khi cập nhật giỏ hàng
      this.updateTotalValues();
    },

    // cập nhật sản phẩm
    updateProduct(updatedProduct) {
      const index = this.cart.findIndex(
        (item) => item.id === updatedProduct.id
      );

      if (index !== -1) {
        this.cart[index] = updatedProduct;

        // Cập nhật tổng giá và số lượng khi cập nhật sản phẩm
        this.updateTotalValues();
      }
    },

    incrementQuantity(product) {
      const updatedProduct = { ...product, Quantity: product.Quantity + 1 };
      this.updateProduct(updatedProduct);
      this.updateTotalValues();
    },

    decrementQuantity(product) {
      if (product.Quantity > 1) {
        const updatedProduct = { ...product, Quantity: product.Quantity - 1 };
        this.updateProduct(updatedProduct);
        this.updateTotalValues();
      }
    },

    updateTotalPrice(product) {
      if (product && product.Quantity !== undefined) {
        const updatedProduct = {
          ...product,
          Total: product.Quantity * product.price,
        };
        this.updateProduct(updatedProduct);
        this.updateTotalValues();
      } else {
        console.error("Invalid product or Quantity:", product);
      }
    },
    deleteProduct(index) {
      this.cart.splice(index, 1);

      // Cập nhật tổng giá và số lượng khi xóa sản phẩm
      this.updateTotalValues();
    },

    // Hàm cập nhật tổng giá và số lượng
    updateTotalValues() {
      this.selectedQuantity = this.cart.reduce(
        (total, product) => (product.isSelected ? total + 1 : total),
        0
      );

      this.totalPrice = this.cart
        .filter((product) => product.isSelected)
        .reduce((total, product) => total + product.Total, 0);
    },
  },
});
