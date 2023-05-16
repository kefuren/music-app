import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getProgramRecommendService() {
  return httpGet('/program/recommend?limit=6');
}