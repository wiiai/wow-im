import { request } from '@/utils/request';

export const getUserListById = (params: {}) => {
  return request({
    url: `/group/get_user_list_by_id`,
    method: 'POST',
    data: params
  })
}