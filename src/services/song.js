import { httpGet } from "@/lib/http";
import { obj2StrParams } from '../utils/api'

export function getNewSongService() {
  return httpGet('/personalized/newsong');
}