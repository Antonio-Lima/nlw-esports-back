export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":");

  const minutesAmount = Number(hours) * 60 + Number(minutes);

  return minutesAmount;
}

export function convertMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);
  const minutes: number = Math.round((minutesAmount % 60) * 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padEnd(2, "0")}`;
}
