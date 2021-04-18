/* eslint-disable no-param-reassign */
const roleToRoute = {
  coustomer: [
    { name: 'Product' },
    { name: 'ProductAdd' },
    { name: 'ProductList' },
    { name: 'ProductEdit' },
    { name: 'CategoryAdd' },
  ],
  admin: [
    { name: 'Product' },
    { name: 'ProductAdd' },
    { name: 'ProductList' },
    { name: 'CategoryAdd' },
    { name: 'ProductEdit' },
  ],
};

/**
 * 根据传入的权限，过滤对应的路由，并返回
 * @param {String} role 权限
 * @param {Array} routes 路由
 */
export default function (role, routes) {
  const allowRoutes = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    if (allowRoutes.indexOf(r.name) !== -1) {
      const { children } = r;
      r.children = children.filter((c) => allowRoutes.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
