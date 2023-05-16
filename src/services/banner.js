import { httpGet } from "@/lib/http";

export function getBannerService () {
	return httpGet('/banner')
}