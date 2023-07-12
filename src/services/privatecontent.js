import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getPrivatecontentService() {
  return httpGet('personalized/privatecontent');
}

export function getPrivatecontentListService() {
  return httpGet('/personalized/privatecontent/list');
}