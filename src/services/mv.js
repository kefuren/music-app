import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getPersonalizedMVService(params) {
  return httpGet('/personalized/mv');
}

export function getFirstMVService(params) {
  return httpGet(obj2StrParams('/mv/first', params));
}

export function getExclusiveMVService(limit) {
  return httpGet('/mv/exclusive/rcmd?limit=' + limit);
}


/**
 * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 
 * type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export function getMvAllService(params) {
  return httpGet(obj2StrParams('/mv/all', params));
}