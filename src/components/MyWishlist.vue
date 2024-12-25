<template>
  <div class="wishlist">
    <div class="d-flex justify-content-between align-items-center p-3 bg-secondary text-white">
      <h4>我的清单</h4>
      <button class="btn btn-light btn-sm" @click="$emit('close')">关闭</button>
    </div>
    <div class="p-3">
      <div 
        class="card mb-3 d-flex" 
        v-for="item in wishlist" 
        :key="item.id"
        style="min-height: 100px; display: flex; flex-direction: row;">
        <div class="card-body d-flex justify-content-between align-items-center" style="flex: 1;">
          <div>
            <h5 class="card-title mb-2 text-truncate">{{ item.name }}</h5>
            <p class="card-text mb-1">单价：￥{{ parsePrice(item.price) }}</p>
            <p class="card-text mb-1">数量：{{ item.quantity }}</p>
            <p class="card-text mb-1">小计：￥{{ parsePrice(item.price) * item.quantity }}</p>
          </div>
          <div class="d-flex align-items-center">
            <button @click="decreaseItem(item.id)" class="btn btn-outline-secondary btn-sm mx-1">-</button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button @click="increaseItem(item.id)" class="btn btn-outline-secondary btn-sm mx-1">+</button>
            <button @click="$emit('remove-item', item.id)" class="btn btn-danger btn-sm mx-3">移除</button>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <h5>总价：￥{{ totalPrice }}</h5>
        <button 
          class="btn btn-success" 
          :disabled="isCooldown || isSubmitting" 
          @click="openForm">
          {{ isCooldown ? `再次提交需等待：${cooldownTime}s` : "提交清单" }}
        </button>
      </div>
    </div>

    <!-- 提交表单 -->
    <div v-if="showForm" class="submission-form">
      <h5>填写您的信息</h5>
      <div class="form-group mb-3">
        <label>名字</label>
        <input type="text" v-model="userInfo.name" class="form-control" placeholder="请输入名字" />
      </div>
      <div class="form-group mb-3">
        <label>手机号码</label>
        <input 
          type="text" 
          v-model="userInfo.phone" 
          class="form-control" 
          placeholder="请输入手机号（仅限数字）"
          @input="validatePhoneInput"
        />
      </div>
      <button 
        class="btn btn-primary" 
        :disabled="isSubmitting" 
        @click="submitForm">
        提交
      </button>
      <button class="btn btn-secondary ml-2" @click="closeForm">取消</button>
    </div>

    <!-- 下载按钮 -->
    <div v-if="fileReady" class="text-center mt-4">
      <a :href="fileUrl" :download="fileName" class="btn btn-info">下载清单</a>
    </div>
  </div>
</template>

<script>
import ExcelJS from "exceljs";

export default {
  props: ["wishlist"],
  data() {
    return {
      showForm: false,
      fileReady: false,
      fileUrl: null,
      fileName: "",
      userInfo: {
        name: "",
        phone: "",
      },
      isSubmitting: false, // 防止重复提交标志
      isCooldown: false, // 按钮冷却标志
      cooldownTime: 0, // 冷却倒计时
    };
  },
  computed: {
    // 计算总价
    totalPrice() {
      return this.wishlist.reduce(
        (total, item) => total + this.parsePrice(item.price) * item.quantity,
        0
      );
    },
  },
  methods: {
    parsePrice(price) {
      // 将价格转换为纯数字
      return parseFloat(price.replace(/[￥,]/g, "")) || 0;
    },
    validatePhoneInput() {
      // 保证输入框只接受数字
      this.userInfo.phone = this.userInfo.phone.replace(/\D/g, "");
    },
    increaseItem(productId) {
      const item = this.wishlist.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItem(productId) {
      const item = this.wishlist.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        this.$emit("remove-item", productId);
      }
    },
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    startCooldown(seconds) {
      this.isCooldown = true;
      this.cooldownTime = seconds;

      const interval = setInterval(() => {
        this.cooldownTime -= 1;
        if (this.cooldownTime <= 0) {
          clearInterval(interval);
          this.isCooldown = false;
        }
      }, 1000);
    },
    async submitForm() {
      if (!this.userInfo.name || !this.userInfo.phone) {
        alert("请填写完整的信息！");
        return;
      }

      if (this.userInfo.phone.length < 7 || this.userInfo.phone.length > 11) {
        alert("请输入有效的手机号码！");
        return;
      }

      if (this.wishlist.length === 0) {
        alert("清单中没有商品，无法提交！");
        return;
      }

      this.isSubmitting = true;

      try {
        // 模拟延迟操作
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 获取当前时间
        const timestamp = new Date().toLocaleString().replace(/[/,:\s]/g, "-");
        this.fileName = `${this.userInfo.name}_${this.userInfo.phone}_${timestamp}.xlsx`;

        // 创建 Excel 文件
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("清单");

        // 添加客户信息
        worksheet.addRow(["姓名", this.userInfo.name]);
        worksheet.addRow(["手机号码", this.userInfo.phone]);
        worksheet.addRow(["提交时间", new Date().toLocaleString()]);
        worksheet.addRow(["总价", this.totalPrice]);

        // 添加样式（高亮客户信息和总价）
        for (let i = 1; i <= 4; i++) {
          worksheet.getRow(i).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "000000" } };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFF00" },
            };
          });
        }

        // 添加商品表头
        worksheet.addRow([]);
        worksheet.addRow(["商品名称", "数量", "单价", "小计"]);

        // 添加商品数据
        this.wishlist.forEach((item) => {
          worksheet.addRow([
            item.name,
            item.quantity,
            this.parsePrice(item.price),
            this.parsePrice(item.price) * item.quantity,
          ]);
        });

        // 生成 Excel 文件 Blob
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/octet-stream" });

        // 创建下载链接
        this.fileUrl = URL.createObjectURL(blob);
        this.fileReady = true;
        this.showForm = false;

        alert("清单提交成功！");
      } catch (error) {
        alert("提交失败，请稍后重试！");
      } finally {
        this.isSubmitting = false;
        this.startCooldown(120); // 启动冷却时间
      }
    },
  },
};
</script>

<style>
.wishlist {
  display: flex;
  flex-direction: column;
}
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-text {
  margin-bottom: 5px;
}
.submission-form {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.submission-form h5 {
  margin-bottom: 20px;
}
</style>
