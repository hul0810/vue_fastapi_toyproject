import { OrderedString } from './InspectConsecutiveCharacter';

// 비밀번호 조합 검사
function CheckPasswordCombination(password) {
  const Regex =
    /(^(?=.*\d)(?=.*[a-zA-Z]).{8,}$|^(?=.*\d)(?=.*[`~!@#$%^&*()\-_+=\\[\]{};:'"<>,./?]).{8,}$|^(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()\-_+=\\[\]{};:'"<>,./?]).{8,}$)/;
  const result = Regex.exec(password);
  if (result == null || result == undefined) {
    return false;
  }
  return result;
}

// 비밀번호 연속성 검사
function CheckConsecutiveCharacter(password) {
  const Regex = /(.)\1{2}/;
  const check1 = Regex.test(password); // 3글자 이상 동일한 문자
  const check2 = OrderedString(password); // 3글자 이상 연속적인 문자
  if (check1) {
    return true;
  } else if (check2) {
    return true;
  } else {
    return false;
  }
}

// 비밀번호에 Id를 포함하는지 검사
function CheckPasswordEqualId(Id, Pw) {
  const Regex = /^[a-z0-9]+(?:[a-z0-9-_]*)(?=@)/;
  const result = Regex.exec(Id);
  // 결과가 없을 때
  if (result == null || result == undefined) {
    return false;
    // 결과가 있을 때
  } else if (result) {
    return Pw.includes(result[0]) ? true : false;
  }
}

export { CheckPasswordCombination, CheckConsecutiveCharacter, CheckPasswordEqualId };
