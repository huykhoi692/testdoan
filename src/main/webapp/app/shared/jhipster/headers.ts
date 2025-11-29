import { AxiosResponse } from 'axios';

export const getMessageFromHeaders = (
  headers: AxiosResponse['headers'],
): { alert: string | null; param: string | null; error: string | null } => {
  const alert = headers['x-langleague-alert'];
  const param = headers['x-langleague-params'];
  const error = headers['x-langleague-error'];
  return { alert, param, error };
};
