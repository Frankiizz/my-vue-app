<template>
    <div class="product-details container py-5">
      <!-- 返回主页按钮 -->
      <button class="btn-close" @click="goBackHome"></button>
  
      <div class="row">
        <div class="col-md-6 text-center">
          <img :src="product.image" alt="商品图片" class="img-fluid product-image" />
        </div>
        <div class="col-md-6">
          <h2>{{ product.name }}</h2>
          <p class="price">价格：{{ product.price }}</p>
          <p class="description">{{ product.description }}</p>
          <div class="quantity-control mt-3">
            <button class="btn btn-outline-secondary" @click="decreaseQuantity">-</button>
            <input
              type="number"
              class="form-control quantity-input"
              v-model.number="quantity"
              min="1"
            />
            <button class="btn btn-outline-secondary" @click="increaseQuantity">+</button>
          </div>
          <!-- 动态添加 click-animation 类触发动画 -->
          <button
            class="btn btn-primary mt-3"
            @click="addToCart"
            :class="{ 'click-animation': isClicked }"
          >
            添加到清单
          </button>
        </div>
      </div>
  
      <!-- 商品规格 -->
      <div class="product-specs mt-4">
        <h4>规格</h4>
        <pre class="specs-content">{{ product.specs }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {},
        quantity: 1, // 添加数量的默认值
        isClicked: false, // 用来控制按钮点击后的动画
      };
    },
    mounted() {
      console.log("ProductDetails 页面已加载");
      this.fetchProductDetails();
    },
    methods: {
      fetchProductDetails() {
        const productId = this.$route.params.id;
        console.log("路由参数接收的商品ID:", productId);
  
        const products = [
          {
            id: 1,
            name: "商品A",
            price: "100",
            description: "这是商品A的描述",
            image: "https://via.placeholder.com/300",
            specs: "尺寸：30x30cm\n材质：100%棉\n颜色：蓝色\n其他：可机洗",
          },
          {
            id: 2,
            name: "商品B",
            price: "200",
            description: "这是商品B的描述",
            image: "https://via.placeholder.com/300",
            specs: "尺寸：40x40cm\n材质：100%涤纶\n颜色：绿色\n特点：防水",
          },
          {
            id: 3,
            name: "商品C",
            price: "300",
            description: "这是商品C的描述",
            image: "https://via.placeholder.com/300",
            specs: "尺寸：50x50cm\n材质：真皮\n颜色：黑色\n备注：限量版",
          },
        ];
        this.product = products.find((item) => item.id === parseInt(productId));
  
        if (this.product) {
          console.log("商品详情加载成功:", this.product);
        } else {
          console.error("未找到对应的商品详情，请检查ID匹配！");
        }
      },
      addToCart() {
        if (this.product.name && this.quantity > 0) {
          this.$emit("add-to-cart", this.product, this.quantity); // 将商品和数量添加到清单
  
          // 点击后触发按钮动画
          this.isClicked = true;
          setTimeout(() => {
            this.isClicked = false;
          }, 300);
        } else {
          alert("请输入有效的数量！");
        }
      },
      goBackHome() {
        this.$router.push({ name: "ProductList" }); // 跳转到主页
      },
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
    },
  };
  </script>
  
  <style>
  /* 商品详情容器样式 */
  .product-details {
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  /* 返回主页按钮样式 */
  .btn-close {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff5c5c;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
  }
  .btn-close:hover {
    background-color: #ff4040;
  }
  
  /* 图片样式 */
  .product-image {
    max-width: 100%;
    transition: transform 0.2s ease-in-out;
    border-radius: 8px;
  }
  .product-image:hover {
    transform: scale(1.1);
  }
  
  /* 价格样式 */
  .price {
    font-size: 1.8rem;
    font-weight: bold;
    color: #007bff;
  }
  
  /* 数量控制样式 */
  .quantity-control {
    display: flex;
    align-items: center;
  }
  .quantity-input {
    width: 60px;
    text-align: center;
    margin: 0 10px;
  }
  
  /* 规格内容样式 */
  .product-specs {
    margin-top: 30px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
  .specs-content {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    font-family: "Courier New", monospace;
    white-space: pre-wrap; /* 保留换行 */
    line-height: 1.5;
    color: #555;
  }
  
  /* 点击动画样式：“按下-放大-回弹” */
  .click-animation {
    animation: scaleButton 0.3s ease-in-out;
  }
  @keyframes scaleButton {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  