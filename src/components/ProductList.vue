<template>
    <div class="product-list">
      <h2 class="mb-4">商品总览</h2>
      <div class="row">
        <div 
          :class="'col-lg-3 col-md-6 col-sm-6 col-6 mb-4 product-card'" 
          v-for="product in products" 
          :key="product.id"
          @click="viewDetails(product.id)"
        >
          <div class="card">
            <img :src="product.image" class="card-img-top" alt="商品图片" />
            <div class="card-body">
              <h5 class="card-title text-truncate" title="{{ product.name }}">{{ product.name }}</h5>
              <p class="card-text">价格：{{ parsePrice(product.price) }}</p>
              <div class="d-flex align-items-center mb-3">
                <button @click.stop="decreaseQuantity(product)" class="btn btn-outline-secondary btn-sm">-</button>
                <input 
                  type="number" 
                  v-model.number="product.quantity" 
                  min="1"
                  class="form-control mx-2"
                  style="width: 60px;"
                />
                <button @click.stop="increaseQuantity(product)" class="btn btn-outline-secondary btn-sm">+</button>
              </div>
              <button @click.stop="addProductToCart(product)" class="btn btn-primary w-100">添加到清单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["role"],
    data() {
      return {
        products: [
          { id: 1, name: "商品A", price: "100", description: "这是商品A的描述", image: "https://via.placeholder.com/300", quantity: 1, specs: "规格A" },
          { id: 2, name: "商品B", price: "200", description: "这是商品B的描述", image: "https://via.placeholder.com/300", quantity: 1, specs: "规格B" },
          { id: 3, name: "商品C", price: "300", description: "这是商品C的描述", image: "https://via.placeholder.com/300", quantity: 1, specs: "规格C" },
          // 添加其他商品...
        ],
      };
    },
    methods: {
      parsePrice(price) {
        return parseFloat(price) || 0;
      },
      increaseQuantity(product) {
        product.quantity += 1;
      },
      decreaseQuantity(product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          alert("数量不能小于 1！");
        }
      },
      addProductToCart(product) {
        if (product.quantity < 1) {
          alert("请输入有效的数量！");
          return;
        }
        this.$emit("add-to-cart", product, product.quantity);
      },
      viewDetails(productId) {
    console.log("跳转到商品详情，商品ID:", productId); // 添加调试信息
    this.$router.push({ name: "ProductDetails", params: { id: productId } });
  },
    },
  };
  </script>
  
  <style>
  .product-list h2 {
    text-align: center;
  }
  .card {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    height: 100%;
    cursor: pointer;
  }
  .card:hover {
    transform: scale(1.02);
  }
  .text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  </style>
  