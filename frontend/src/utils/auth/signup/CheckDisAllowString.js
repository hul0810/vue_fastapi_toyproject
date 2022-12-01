// 이름 입력 시 한글과 영문 대 소문자만 허용한다.
function DisAllowNameString(name) {
  const Regex = /[^가-힣a-zA-Z]/;
  const result = Regex.test(name);
  return result;
}

// 비밀번호 입력 시 공백과 키보드 외의 문자는 허용되지 않는다.
function DisAllowPwString(password) {
  const Regex = /[^a-zA-Z0-9~!@#$%^&*()_+|{}:"<>?`\-=\\[\];',.\\/]/;
  const result = Regex.test(password);
  return result;
}

export { DisAllowNameString, DisAllowPwString };
