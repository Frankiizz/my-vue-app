<template>
  <div class="login-page">
    <div class="login-card">
      <!-- 返回主页标识 -->
      <div class="back-home" @click="goBackToHome">
        🏠 <!-- 使用房子图标表示返回主页 -->
      </div>
      <h1>管理员登录</h1>
      <p>请输入一次性密码 (OTP) 完成登录</p>
      <form @submit.prevent="submitOtp" class="login-form">
        <input
          type="text"
          v-model="otp"
          placeholder="请输入 OTP"
          class="otp-input"
        />
        <button type="submit" class="btn-submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: "", // 绑定输入框的 OTP 数据
    };
  },
  methods: {
    submitOtp() {
      // 打印用户输入的 OTP
      console.log("用户输入的 OTP:", this.otp);
      alert(`您输入的 OTP 是: ${this.otp}`);
    },
    goBackToHome() {
      // 使用 Vue Router 跳转到主页
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>


/* 登录页面容器 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

/* 登录卡片样式 */
.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px 30px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  position: relative; /* 为子元素提供定位基础 */
}

/* 返回主页标识样式 */
.back-home {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 24px;
  color: #555;
  cursor: pointer;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-home:hover {
  background: #e0e0e0;
  color: #000;
}

/* 标题样式 */
.login-card h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

/* 副标题文字 */
.login-card p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

/* 输入框样式 */
.otp-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

/* 提交按钮样式 */
.btn-submit {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #388e3c;
}
</style>
