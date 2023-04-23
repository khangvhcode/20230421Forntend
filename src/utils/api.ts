import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  ListGssEmployeeWeebudget,
  UpdateGssEmployeeWeebudget,
  DeleteGssEmployeeWeebudget
} from '@app/system/request/gssEmployeeWeebudget.request';

import {ListOrderElement} from '@app/system/request/orderElement.request';
// axios.defaults.baseURL = 'http://localhost/api';
const URL_API = 'http://localhost:8080/api';

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const gssEmployeeWeebudgetAPI = {
  list: (req: ListGssEmployeeWeebudget) =>
    axios.get(URL_API + '/gss_weekly/getAllData', req).then(responseBody),
  update: (req: UpdateGssEmployeeWeebudget) =>
    axios.post(URL_API + '/gss_weekly/updateData', req).then(responseBody),
  add: (req: UpdateGssEmployeeWeebudget) =>
    axios.post(URL_API + '/gss_weekly/addData', req).then(responseBody),
  del: (req: DeleteGssEmployeeWeebudget) =>
    axios.post(URL_API + '/gss_weekly/deleteGssEmploy', req).then(responseBody)
};

const orderElementAPI = {
  list: (req: ListOrderElement) =>
    axios.get(URL_API + '/order-element/getAllData', req).then(responseBody)
};

const api = {gssEmployeeWeebudgetAPI, orderElementAPI};

export default api;
