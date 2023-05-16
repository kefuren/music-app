<template>
  <div class="phone-login">
    <div class="back-qrcode" @click="toQrcodeLogin">
      <i class="iconfont icon-erweima2 absolute"></i>
    </div>
    <span class="tip">扫码登录更安全</span>
    <div class="title">
			<i class="iconfont icon-yinle"></i>
		</div>
    <div class="content column justify-center items-center">
      <form class="form">
        <div class="input-container colume">
          <div class="inputbox flex">
            <div class="mobile-country flag flex justify-around items-center">
              <i class="iconfont icon-shouji"></i>
              <span>+86</span>
              <i class="iconfont icon-caret-down"></i>
            </div>
            <div class="mb-input">
              <input type="text" placeholder="请输入手机号">
            </div>
          </div>
          <div v-if="!isPhoneCode" class="inputbox pwd-box flex items-center">
            <i class="iconfont icon-jiesuo"></i>
            <input type="password" placeholder="请输入密码">
          </div>
          <div v-else class="inputbox phonecode-box flex items-center">
            <i class="iconfont icon-yuechi_o"></i>
            <input type="text" placeholder="请输入验证码">
            <span class="separator">|</span>
            <button type="button" class="">发送验证码</button>
          </div>
        </div>
        <div class="tipText" v-if="tipText">
          <p>手机号或密码错误</p>
        </div>

        <div class="flex justify-between" style="padding-top: 10px;">
          <div>
            <input type="checkbox" id="autologin">
            <label for="autologin">自动登录</label>
          </div>
          <div class="flex">
            <div v-if="!isPhoneCode">
              <a href="javascript:;" style="color: #3371bc">忘记密码</a>
              <span class="separator" style="margin:0 10px">|</span>
            </div>
            <a href="javascript:;" style="color: #3371bc" @click="isPhoneCode = !isPhoneCode">验证码登录</a>
          </div>
        </div>

        <div class="btns">
          <div class="login-btn">登录</div>
          <span class="register-btn"><a href="javascript:;">注册</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter();

const isPhoneCode = ref(false);
const tipText = ref("");

const toQrcodeLogin = () => {
  router.replace({ path: '/qrcodeLogin' })
}
</script>

<style lang="scss" scoped>
.back {
  width: 50px;
  height: 50px;
}
.back-qrcode {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  border-top: solid 50px rgba(0,0,0,0.1);
  border-left: solid 50px transparent;
  cursor: pointer;
  
  .icon-erweima2 {
    right: 5px;
    top: -48px;
    color: #fff;
    font-size: 40px;
  }
}
.tip {
  position: absolute;
  right: 48px;
  top: 15px;
  display: inline-block;
  font-size: 14px;
  color: #fff;
  padding: 3px 5px;
  border-radius: 2px;
  background: #999;
  &::after {
    content: "";
    position: absolute;
    right: -5px;
    top: 0px;
    border-top: solid 6px #999;
    border-right: solid 6px transparent;
  }
}
.title {
	text-align: center;
  margin: 15px 0;
  i {
    font-size: 3.6rem;
    font-weight: 600;
    color: red;
  }
}
.form {
  width: 75%;
  font-size: 12px;
}
.input-container {
  margin-top: 20px;
  border: solid 1px #ccc;
  border-radius: 5px;
  overflow: hidden;
  .inputbox {
    height: 40px;
    overflow: hidden;
  }
  .pwd-box,
  .phonecode-box {
    padding: 12px 5px;
    border-top: solid 1px #ccc;
    i {
      margin-right: 5px;
    }
    input {
      // width: 80%;
      height: 100%;
    }
  }
  .phonecode-box input {
    width: 140px;
  }
  
  .phonecode-box button {
    border: none;
    font-size: 12px;
    color: #666;
    background: #fff;
    cursor: pointer;
  }
  .mb-input {
    flex: 1;
    height: 100%;
    padding: 10px;
    font-size: 14px;
  }
  .mobile-country {
    width: 85px;
    height: 100%;
    border-right: solid 1px #ccc;
    .icon-caret-down {
      color: #999;
      font-size: 14px;
    }
  }
}
.tipText {
  padding-top: 10px;
}

#autologin {
  width: 15px;
  height: 15px;
  margin: 0 8px 0 0;
  vertical-align: -4px;
}
.btns {
  margin-top: 45px;
  text-align: center;
  height: 38px;
  line-height: 38px;
  .login-btn {
    font-size: 16px;
    color: #fff;
    background: #D3453D;
    border-radius: 5px;
  }
  .register-btn {
    display: inline-block;
    margin-top: 10px;
    font-size: 14px;
    a {
      text-decoration: revert;
    }
  }
}

input {
  outline: none;
  border: none;
  font-size: 12px;
}

.separator {
  font-size: 10px;
  color: #999;
}
</style>