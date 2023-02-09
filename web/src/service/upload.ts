import { IsString } from 'class-validator';
import { request } from '@/utils/request';


export const upload = (data: FormData) => {
  return request({
    url: `/upload/file`,
    method: 'POST',
    data: data
  })
}