export const getExpiresAt = (time: number) => {
  const now = new Date();
  const currentHour = now.getHours();
  const expiresAt = new Date(now);
  expiresAt.setHours(currentHour + time / 3600);

  return expiresAt.toUTCString();
};
