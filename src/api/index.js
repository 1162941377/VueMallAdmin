import Axios from 'axios';
import baseURL, { urls } from './urls';

const appkey = '1162941377_1615861016532';

const request = Axios.create({
  baseURL,
  params: { appkey },
});

request.interceptors.response.use((value) => value.data);

const login = (email, password) => request.post(
  urls.login,
  email,
  password,
);

const logon = (email, password, code, username, role) => request.post(
  urls.logon,
  email,
  password,
  code,
  username,
  role,
);

const getCode = (email) => request.post(
  urls.getCode,
  email,
);

const changePwd = (email, password, code) => request.post(
  urls.changePwd,
  email,
  password,
  code,
);

const changeInfo = (email, password, newPassword, code, username) => request.put(
  urls.changeInfo,
  email,
  password,
  newPassword,
  code,
  username,
);

const productAll = (params) => request.get(
  urls.productsAll,
  { params },
);

const category = (params) => request.get(
  urls.category,
  { params },
);

const deleteProduct = ({ id }) => request.delete(
  urls.deleteProduct.concat(id),
);

const add = (params) => request.post(
  urls.add,
  params,
);

const image = (params) => request.post(
  urls.image,
  { params },
);

const detail = ({ id }) => request.get(
  urls.detail.concat(id),
);

const edit = (params) => request.put(
  urls.edit,
  params,
);

const categoryAdd = (params) => request.post(
  urls.cateogryAdd,
  params,
);

const categoryEdit = (params) => request.put(
  console.log(params),
  urls.edit,
  params,
);

const categoryDelete = ({ id }) => request.delete(
  console.log(id),
  urls.categoryDelete.concat(id),
);

export default {
  login,
  logon,
  getCode,
  changePwd,
  changeInfo,
  productAll,
  category,
  deleteProduct,
  add,
  image,
  detail,
  edit,
  categoryAdd,
  categoryEdit,
  categoryDelete,
};
