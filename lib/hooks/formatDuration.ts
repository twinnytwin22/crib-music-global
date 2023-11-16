export function formatDuration(inputTime: string) {
  const [hours, minutes] = inputTime.split(":");
  const formattedTime = parseInt(hours, 10) + ":" + minutes;
  return formattedTime;
}
