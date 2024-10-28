const getters = {
  token: state => state.user.token,
  cookie: state => state.user.cookie,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  defaultTabName: state => state.tab.defaultTabName,
  permissions: state => state.user.permissions
}
export default getters
