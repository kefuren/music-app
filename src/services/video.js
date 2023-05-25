import { httpGet, httpPost } from "@/lib/http";
import { obj2StrParams } from '../utils/api'


export function getVideoGroupListService() {
  return httpGet('/video/group/list');
}

export function getVideoService(groupId) {
  let id = groupId || 58100;
  return httpGet('/video/group?id=' + id);
}

export function getVideoCategoryService() {
  return httpGet('/video/category/list');
}

export function getVideoTimelineAllService() {
  return httpGet('/video/timeline/all');
}