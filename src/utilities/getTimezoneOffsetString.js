export function getTimezoneOffsetString(timezone) {
  const offsetMap = {
    "Asia/Kolkata": "+05:30",
  };
  return offsetMap[timezone] || "+05:30"; 
}