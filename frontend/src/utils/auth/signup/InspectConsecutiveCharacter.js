// 문자열 내에 동일한 3문자 있는지 검사 (사용 안함, 만들어만 놓음)
function SameConsecutiveString(pw) {
  let max = 0;
  let currentMax = 1;
  const password = pw;

  for (let i = 0; i < password.length; i++) {
    const current = password[i];
    const next = password[i + 1];

    if (current === next) {
      currentMax++;
    } else {
      max = Math.max(max, currentMax);
      currentMax = 1;
    }
    return max >= 3 ? false : true;
  }
}

// 문자열 내에 순서있는 3문자 있는지 검사
function OrderedString(password) {
  const target = ['0123456789', 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const reverseTarget = [...target.map(v => [...v].reverse().join(''))];
  const AllTarget = [...target, ...reverseTarget];

  for (let i = 0; i < password.length - 2; i++) {
    const sliceValue = password.substring(i, i + 3);

    if (AllTarget.some(target => target.includes(sliceValue))) {
      return true;
    }
  }
  return false;
}

export { SameConsecutiveString, OrderedString };
