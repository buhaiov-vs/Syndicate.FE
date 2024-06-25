export function getDurationHumanFriendly(duration: number | null | undefined) {

  if(!duration)
  {
    return "";
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours} h. ${minutes} m.`;
}