// 만 나이 계산
function AgeCalculator(YY, MM, DD) {
  let age = new Date().getFullYear() - Number(YY);
  const m = new Date().getMonth() + 1 - Number(MM);
  const d = new Date().getDate() - Number(DD);
  if (m < 0) {
    age -= 1;
  } else if (m == 0) {
    d < 0 ? (age -= 1) : null;
  }
  return age;
}

// 입력한 생년월일이 미래인지 확인
function CheckTimeIsFuture(YY, MM, DD) {
  let CurrentYY = String(new Date().getFullYear());
  let CurrentMM = String(new Date().getMonth() + 1).padStart(2, '0');
  let CurrentDD = String(new Date().getDate()).padStart(2, '0');

  MM = String(MM).padStart(2, '0');
  DD = String(DD).padStart(2, '0');

  const BirthTime = Number(YY + MM + DD);
  const CurrentTime = Number(CurrentYY + CurrentMM + CurrentDD);
  return BirthTime > CurrentTime ? true : false;
}

// 존재하는 날짜인지 확인 (이 방식은 윤년 계산이 따로 필요 없다.)
function CheckExistDay(YY, MM, DD) {
  const day = new Date(YY, MM, 0).getDate();
  return DD <= day;
}

export { AgeCalculator, CheckTimeIsFuture, CheckExistDay };
