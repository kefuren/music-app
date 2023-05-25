import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getToplistService() {
  return httpGet('/toplist');
}