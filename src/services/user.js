import { httpGet, httpPost } from "@/lib/http";
import { obj2StrParams } from '../utils/api'


export function getUserDetailService(uid) {
  return httpGet('/user/detail?uid=' + uid);
}