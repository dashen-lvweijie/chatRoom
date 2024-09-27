<template>
  <view class="container" :style="gradientStyle">
    <view class="header">
      <text class="title">加入聊天室</text>
    </view>
    
    <view class="input-container">
      <input class="nickname-input" type="text" v-model="nickname" @confirm="joinChatroom" placeholder="请输入真实昵称" />
      <input class="code-input" type="text" v-model="code" @confirm="joinChatroom" placeholder="请输入验证码" />
    </view>
    
    <view class="button-container">
      <button class="join-button" @click="joinChatroom">点击加入</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nickname: '', // 用户输入的昵称
      code: '', // 验证码输入
      colorIndex: 0, // 用于记录当前颜色索引
      gradientInterval: null // 定时器引用
    };
  },
  computed: {
    gradientStyle() {
      return {
        background: this.getDynamicGradient()
      };
    }
  },
  methods: {
    getDynamicGradient() {
      const colors = [
        '#ff7e5f',
        '#feb47b',
        '#ff6a6a',
        '#ffba6a',
        '#fffb6a',
        '#6aff6a',
        '#6afffb',
        '#6a6aff',
        '#ba6aff',
        '#ff6aff'
      ];
      // 计算背景颜色
      return `linear-gradient(135deg, ${colors[this.colorIndex]}, ${colors[(this.colorIndex + 1) % colors.length]})`;
    },
    joinChatroom() {
      if (this.nickname.trim() === '') {
        uni.showToast({
          title: '你必须给老子输入你的昵称',
          icon: 'error'
        });
        return;
      }
      if (this.code.trim() !== '1210') {
        uni.showToast({
          title: '验证码错误！请输入',
          icon: 'error'
        });
        return;
      }
      // 将用户的昵称保存到全局或跳转到聊天页面
      uni.navigateTo({
        url: `/pages/list/list?nickname=${this.nickname}&password=${this.code}`
      });
    }
  },
  created() {
    // 创建定时器以更新背景颜色
    this.gradientInterval = setInterval(() => {
      this.colorIndex = (this.colorIndex + 1) % 10; // 每秒改变颜色索引
      this.$forceUpdate(); // 强制更新以应用新的背景色
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.gradientInterval); // 清除定时器
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transition: background 1s ease; /* 背景渐变的过渡效果 */
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff; /* 修改标题颜色为白色 */
}

.input-container {
  margin-bottom: 20px;
  width: 80%;
}

.nickname-input, .code-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  font-size: 32rpx;
  background-color: #fff;
  margin-bottom: 10px; /* 为验证码输入框增加底部间距 */
}

.button-container {
  width: 80%;
}

.join-button {
  width: 100%;
  height: 80rpx;
  background-color: #007aff;
  color: #fff;
  font-size: 32rpx;
  border: none;
  border-radius: 10rpx;
  text-align: center;
  line-height: 80rpx;
}

.join-button:active {
  background-color: #005bb5;
}
</style>
