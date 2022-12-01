// 이메일 조건 확인
export default function EmailValidator(email) {
  if (email.length < 5 || email.length > 30) {
    return false;
  }
  const emailRegex = /^[a-z0-9]+(?:[a-z0-9-_]*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.){1,2}[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const ExecRegex = emailRegex.exec(email);
  if (ExecRegex == null || ExecRegex == undefined) {
    return false;
  }

  const result = ExecRegex[0] == ExecRegex['input'] ? true : false;
  return result;
}
