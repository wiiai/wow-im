import { request } from '@/utils/request';

export const getSession = (params: {}) => {
  return request({
    url: `/message/query_session_list`,
    method: 'POST',
    data: params
  })
}

export const pullUnreadList = (params: {}) => {
  return request({
    url: `/message/query_unread_list`,
    method: 'POST',
    data: params
  })
}

export const query_history_list = (params: {}) => {
  return request({
    url: `/message/query_history_list`,
    method: 'POST',
    data: params
  })
}