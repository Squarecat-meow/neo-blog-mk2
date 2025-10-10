export default function dateParser(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = ('0' + date.getHours().toString()).slice(-2);
  const minute = ('0' + date.getMinutes().toString()).slice(-2);

  return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
}
