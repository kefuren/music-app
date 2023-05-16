<template>
  <div class="qr-code-login">
		<div class="title">
			<h2>扫码登录</h2>
		</div>
		<div class="content column justify-center items-center">
			<div class="qrcode-box relative-position">
				<img :src="qrimg" alt="">
				<div v-if="errorText" class="mask absolute-center column justify-center items-center">
					<span class="error-text">{{ errorText }}</span>
					<div class="refresh-btn" @click="login">点击刷新</div>
				</div>
			</div>
			<p class="login-text">使用<a href="javascript:;">网易云音乐APP</a>扫码登录</p>
			<p 
				class="other-text text-link"
				@click="toPhoneLogin"
			>选择其它登录模式 ></p>
		</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
  getQrKeyService,
  createQrService,
  checkQrService,
  getLoginStateService
} from '@/services/login'


const store = useStore();
const router = useRouter();

const qrimg = ref("");
const errorText = ref("");

watchEffect(login)

async function getLoginStatus(cookie = '') {
  let res = await getLoginStateService({ timestamp: Date.now() }, { cookie });
  if (res.profile) {
    store.commit('SET_USER_INFO', res.profile);
	  localStorage.setItem("loginState", true);
		electronAPI.closeLoginWin();
  }
}

function createQr () {
  return new Promise(async (resolve) => {
		// 获取key
    const res = await getQrKeyService({ timestamp: Date.now() });
    const key = res.data.unikey;
    // 生成二维码
    const res2 = await createQrService({ key, qrimg: true, timestamp: Date.now() });
    qrimg.value = res2.data.qrimg;
    errorText.value = "";

    resolve(key)
  })
}

async function login() {
  let timer = null;
  const cookie = localStorage.getItem('cookie');
  getLoginStatus(cookie);
  
  const key = await createQr();
  
	// 轮询检测扫码状态
  timer = setInterval(async () => {
    const statusRes = await checkQrService({ key, timestamp: Date.now() });
    if (statusRes.code === 800) {
      errorText.value = '二维码已失效';
      clearInterval(timer);
      timer = null;
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      timer = null;
      alert('授权登录成功');
      await getLoginStatus(statusRes.cookie);
      localStorage.setItem('cookie', statusRes.cookie);
    }
  }, 3000)
}

const toPhoneLogin = () => {
	router.replace({ path: '/phoneLogin' })
}



</script>

<style lang="scss" scoped>
.title {
	padding: 50px 0 10px 0;
	text-align: center;
	font-size: 18px;
}
.qrcode-box {
	width: 200px;
	height: 200px;
	.mask {
		width: 180px;
		height: 180px;
		color: #fff;
		font-size: 14px;
		background: rgba(0, 0, 0, .8);
		.refresh-btn {
			height: 30px;
			padding: 5px 15px;
			background: #c3473a;
			border-radius: 50px;
			margin-top: 15px;
		}
	}
}
.login-text {
	font-size: 14px;
	a {
		font-weight: bold;
		color: #3371bc;
	}
}
.other-text {
	position: absolute;
	bottom: 60px;
	font-size: 12px;
	color: #666;
}
</style>