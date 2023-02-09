import { request } from '@/utils/request';

export const getFriends = (params: {}) => {
  return request({
    url: `/friend/query_friend_list`,
    method: 'POST',
    data: params
  })
}

export const queryProfile = (params: {}) => {
  return request({
    url: `/friend/queryProfile`,
    method: 'POST',
    data: params
  })
}