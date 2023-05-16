import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

// 热搜列表
export function getSearchHotService() {
  return httpGet('/search/hot/detail');
}

// 搜索建议
export function getSearchSuggestService(keywords) {
  return httpGet('/search/suggest?keywords=' + keywords);
}