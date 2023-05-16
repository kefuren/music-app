import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getPersonalizedMVService(params) {
  return httpGet('/personalized/mv');
}