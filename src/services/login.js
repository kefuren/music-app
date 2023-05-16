import { httpGet, httpPost } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

// 二维码 key 生成接口
export function getQrKeyService(params) {
  return httpGet(obj2StrParams('/login/qr/key', params));
}

// 二维码生成接口
export function createQrService(params) {
  return httpGet(obj2StrParams('/login/qr/create', params));
}

// 二维码检测扫码状态接口
export function checkQrService(params) {
  return httpGet(obj2StrParams('/login/qr/check', params));
}

// 登录状态
export function getLoginStateService(params, data) {
  return httpPost(obj2StrParams('/login/status', params), data);
}