import { IsString } from 'class-validator';
import { request } from '@/utils/request';

export class LoginDto {
  @IsString()
  account?: string;

  @IsString()
  password?: string;
}

export const login = (params: LoginDto) => {
  return request({
    url: `/user/login`,
    method: 'POST',
    data: params
  })
}

export const checkLogin = () => {
  return request({
    url: `/user/check_login`,
    method: 'POST',
  })
}

export const register = () => {}
export const getUserInfo = () => {}