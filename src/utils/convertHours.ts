export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":");

  const minutesAmount = Number(hours) * 60 + Number(minutes);

  return minutesAmount;
}
