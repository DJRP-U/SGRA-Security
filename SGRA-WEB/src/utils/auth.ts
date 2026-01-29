export function setUserSession(user: {
  uuid: string;
  name: string;
  role: string;
}) {
  document.cookie = `user=${user.uuid}; path=/`;
  document.cookie = `name=${encodeURIComponent(user.name)}; path=/`;
  document.cookie = `role=${user.role}; path=/`;
}

export function clearUserSession() {
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
  document.cookie = "name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
}
