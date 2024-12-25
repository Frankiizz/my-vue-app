<template>
  <div id="app" class="container-fluid">
    <!-- 条件渲染 header -->
    <header 
      v-if="showHeader" 
      class="bg-primary text-white text-center py-3"
    >
      <h1>商品管理系统</h1>
      <button class="btn btn-light" @click="navigateToLogin">
        管理员登录
      </button>
      <button class="btn btn-secondary ml-3" @click="toggleWishlist">
        {{ isWishlistVisible ? "收起清单" : "展开清单" }}
      </button>
    </header>
    <main class="row mt-4">
      <section class="col-12">
        <!-- 使用 router-view 动态加载页面 -->
        <router-view 
          :role="role" 
          @add-to-cart="addToCart"
        />
      </section>
    </main>
    <div 
      class="wishlist-overlay" 
      :class="{ 'wishlist-visible': isWishlistVisible }">
      <MyWishlist 
        :wishlist="wishlist" 
        @remove-item="removeFromWishlist"
        @close="toggleWishlist"
      />
    </div>
  </div>
</template>

<script>
import MyWishlist from './components/MyWishlist.vue';

export default {
  name: "App",
  components: { MyWishlist },
  data() {
    return {
      role: "访客", // 当前身份
      wishlist: [], // 清单中的商品
      isWishlistVisible: false, // 清单是否可见
    };
  },
  computed: {
    showHeader() {
      // 根据路由名称判断是否显示 header，例如管理员页面不需要显示
      return this.$route.name !== 'LoginAdmin';
    },
  },
  methods: {
    navigateToLogin() {
      this.$router.push('/loginAdmin'); // 跳转到管理员登录页面
    },
    toggleWishlist() {
      this.isWishlistVisible = !this.isWishlistVisible;
    },
    addToCart(product, quantity) {
      const existingItem = this.wishlist.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity; // 如果商品已在清单中，增加数量
      } else {
        this.wishlist.push({ ...product, quantity }); // 新增商品时，使用输入的数量
      }
    },
    removeFromWishlist(productId) {
      const itemIndex = this.wishlist.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        this.wishlist.splice(itemIndex, 1); // 直接移除商品
      }
    },
  },
};
</script>

<style>
/* 悬浮清单样式 */
.wishlist-overlay {
  position: fixed;
  top: 0;
  right: -400px; /* 初始隐藏在右侧 */
  width: 400px;
  height: 100%;
  background: white;
  box-shadow: -2px 0px 6px rgba(0, 0, 0, 0.1);
  z-index: 1050;
  overflow-y: auto;
  transition: right 0.3s ease-in-out; /* 动画过渡 */
}
.wishlist-visible {
  right: 0; /* 展开时显示 */
}
</style>
