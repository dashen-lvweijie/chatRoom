<template>
  <view class="container" :style="gradientStyle">
    <view class="header">
      <text class="user-count">当前用户数量: {{ userCount }}</text>
    </view>

    <view class="message-container">
      <view v-for="(message, index) in messages" :key="index"
        :class="{'my-message': message.data.name === name, 'other-message': message.data.name !== name}">
        <text>{{ message.data.name }}: {{ message.data.text }}</text>
        <text style="margin-left: 100px;font-weight: normal;font-size: 12px;">{{message.time}}</text>
      </view>
    </view>

    <view class="input-container">
      <input v-model="text" placeholder="输入您的消息" class="input" @confirm="sendMessage"/>
      <button @click="sendMessage" class="send-button">发送</button>
    </view>
  </view>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      name: '',
      text: '',
	  code:'',
      userCount: 0,
      messages: [],
      socket: null,
      colorIndex: 0, // 用于记录当前颜色索引
      gradientInterval: null // 定时器引用
    };
  },
  onLoad(e) {
    this.name = e.nickname; // 从传递的参数中获取昵称
	this.code=e.password
  },
  onShow() {
  	if (this.code !== '1210') {
  	      // 如果不符合条件，返回上一页
  	     uni.navigateTo({
  	     	url: '/pages/index/index'
  	     })
  	    }
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
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedUsers(message) {
      this.userCount = message;
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect(); // 断开 WebSocket 连接
        this.socket = null; // 清空 socket 对象
      }
    },
  },
  created() {
    this.socket = io('http://192.168.31.76:3000/chat');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
    this.socket.on('users', (message) => {
      this.receivedUsers(message);
    });

    // 创建定时器
    this.gradientInterval = setInterval(() => {
      this.colorIndex = (this.colorIndex + 1) % 10; // 每秒改变颜色索引
      this.$forceUpdate(); // 强制更新以应用新的背景色
    }, 1000);
  },
  beforeDestroy() {
    this.disconnectSocket(); // 在组件销毁前断开 WebSocket 连接
    clearInterval(this.gradientInterval); // 清除定时器
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.user-count {
  margin-right: 20px;
  color: #fff;
  font-weight: 700;
}

.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.my-message {
  text-align: right;
  background-color: #f0f0f0;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  max-width: 80%;
  align-self: flex-end;
  margin-left: auto;
  font-weight: 700;
}

.other-message {
  text-align: left;
  background-color: orange;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  max-width: 80%;
  align-self: flex-start;
  margin-right: auto;
  color: #fff;
  font-weight: 700;
}

.input-container {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明背景 */
}

.input {
  flex: .98;
  margin-right: 5px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.send-button {
  width: 100px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  height: 45px;
}
</style>
