<template>
  <div>
    <h1 class="text-center m-3">
      <a href="/main">
        <img src="../assets/images/logo.png" alt="signin title" width="40px" height="40px" />
      </a>
    </h1>
    <div class="col-lg-4 col-md-6 col-12 mx-auto my-3">
      <form @submit.prevent>
        <div class="mb-3">
          <label for="id" class="form-label">이메일</label>
          <span class="id_box d-flex form-control" :class="{ focus: FocusId }">
            <input
              id="id"
              type="email"
              maxlength="30"
              class="w-100 me-1"
              @input="CheckIdEqPw()"
              @focus="CheckFocusId()"
              @blur="[CheckFocusId(), ValidateId()]"
              v-model="Id"
            />
          </span>
          <span class="error-message" v-if="EmptyId">필수 정보입니다.</span>
          <span class="error-message" v-else-if="DuplicateId">이미 사용중이거나 탈퇴한 아이디입니다.</span>
          <span class="error-message" v-else-if="IdNotValid">5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
          <span class="error-message green" v-else-if="AvailableId">멋진 아이디네요!</span>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">비밀번호</label>
          <span class="pwd-box form-control d-flex" :class="{ focus: FocusPw }">
            <input
              id="password"
              type="password"
              maxlength="16"
              class="w-100"
              @input="[ValidatePw(), CheckPwConfirm()]"
              @focus="CheckFocusPw(), PwGuide()"
              @blur="[CheckFocusPw()]"
              v-model="Pw"
            />
            <span>
              <font-awesome-icon icon="fa-solid fa-lock" :class="{ green: AvailablePw }" />
            </span>
          </span>
          <!-- <span class="error-message" v-if="EmptyPw">필수 정보입니다.</span> -->
          <div class="input-guide-area" v-if="ShowPwGuide == true">
            <div v-if="DisAllowPwString">
              <span class="input-guide-error">비밀번호에 사용할 수 없는 문자가 포함되어 있습니다. </span>
            </div>
            <template v-else-if="!AvailablePw">
              <div>
                <span v-if="NotSatisfyPwCombination == false"><font-awesome-icon icon="fa-solid fa-check" class="icon-check-green" /></span>
                <span v-else
                  ><font-awesome-icon
                    icon="fa-solid fa-xmark"
                    :class="{
                      'icon-cross-gray': NotSatisfyPwCombination == null,
                      'icon-cross-red': NotSatisfyPwCombination == true,
                    }"
                /></span>
                <span
                  class="input-guide"
                  :class="{
                    'input-guide-error': NotSatisfyPwCombination == true,
                    'input-guide-success': NotSatisfyPwCombination == false,
                  }"
                  >8~16자 영문/숫자/특수문자 2가지 이상 조합</span
                >
              </div>
              <div>
                <span v-if="SameConsecutivePwCharacter == false && EmptyPw == false"
                  ><font-awesome-icon icon="fa-solid fa-check" class="icon-check-green"
                /></span>
                <span v-else
                  ><font-awesome-icon
                    icon="fa-solid fa-xmark"
                    :class="{
                      'icon-cross-gray': SameConsecutivePwCharacter == null,
                      'icon-cross-red': SameConsecutivePwCharacter == true || EmptyPw == true,
                    }"
                /></span>
                <span
                  class="input-guide"
                  :class="{
                    'input-guide': SameConsecutivePwCharacter == null,
                    'input-guide-error': SameConsecutivePwCharacter == true || EmptyPw == true,
                    'input-guide-success': SameConsecutivePwCharacter == false && EmptyPw == false,
                  }"
                  >3개 이상 연속되거나 동일한 문자/숫자 제외
                </span>
              </div>
              <div>
                <span v-if="PwEqualId == false && EmptyPw == false"><font-awesome-icon icon="fa-solid fa-check" class="icon-check-green" /></span>
                <span v-else
                  ><font-awesome-icon
                    icon="fa-solid fa-xmark"
                    :class="{
                      'icon-cross-gray': PwEqualId == null,
                      'icon-cross-red': PwEqualId == true || EmptyPw,
                    }"
                /></span>
                <span
                  :class="{
                    'input-guide': PwEqualId == null,
                    'input-guide-error': PwEqualId == true || EmptyPw == true,
                    'input-guide-success': PwEqualId == false && EmptyPw == false,
                  }"
                  >아이디(이메일) 제외</span
                >
              </div>
            </template>
            <div v-else>
              <span><font-awesome-icon icon="fa-solid fa-check" class="icon-check-green" /></span>
              <span class="input-guide input-guide-success">사용 가능한 비밀번호입니다.</span>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="password-check" class="form-label">비밀번호 확인</label>
          <span class="pwd-check-box form-control d-flex" :class="{ focus: FocusPwConfirm }">
            <input
              id="password-check"
              type="password"
              maxlength="16"
              class="w-100"
              @input="CheckPwConfirm()"
              @focus="[CheckFocusPwConfirm()]"
              @blur="[CheckFocusPwConfirm()]"
              v-model="PwConfirm"
            />
            <span>
              <font-awesome-icon icon="fa-regular fa-circle-check" :class="{ green: !PwNotEqual && PwConfirm }" />
            </span>
          </span>
          <span class="error-message" v-if="EmptyPwConfirm">필수 정보입니다.</span>
          <span class="error-message" v-else-if="PwNotEqual">비밀번호가 일치하지 않습니다.</span>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">이름</label>
          <input id="name" type="text" maxlength="40" class="form-control" v-model="Name" @blur="[ValidateName()]" />
          <span class="error-message" v-if="EmptyName">필수 정보입니다.</span>
          <span class="error-message" v-else-if="DisAllowNameString">한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)</span>
        </div>
        <div class="mb-3">
          <label for="yy" class="form-label">생년월일</label>
          <div class="bir_wrap d-table">
            <div class="d-table-cell bir-yy">
              <input type="text" class="form-control" placeholder="년(4자)" id="yy" maxlength="4" v-model="YY" @blur="[ValidateBirth()]" />
            </div>
            <div class="mb-3 ps-2 d-table-cell bir-mm">
              <select class="form-select" id="mm" v-model="MM" @blur="[ValidateBirth()]">
                <option value>월</option>
                <option v-for="(month, index) in 12" :key="index" :value="month | DoubleDigit">
                  {{ month }}
                </option>
              </select>
            </div>
            <div class="mb-3 ps-2 d-table-cell bir-dd">
              <input type="text" class="form-control" placeholder="일" id="dd" maxlength="2" v-model="DD" @blur="[ValidateBirth()]" />
            </div>
          </div>
          <span class="error-message" v-if="EmptyYY || LengthNotMeetYY">태어난 년도 4자리를 정확하게 입력하세요.</span>
          <span class="error-message" v-else-if="EmptyMM">태어난 월을 선택하세요.</span>
          <span class="error-message" v-else-if="EmptyDD">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>
          <span class="error-message" v-else-if="NoExistDay">생년월일을 다시 확인해주세요.</span>
          <span class="error-message" v-else-if="BirthIsFuture">미래에서 오셨군요. ^^</span>
          <span class="error-message" v-else-if="UnderFourteen">만 14세 미만의 어린이는 보호자 동의가 필요합니다.</span>
          <span class="error-message" v-else-if="TooOldYY">정말이세요?</span>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">성별</label>
          <select id="gender" class="form-control" v-model="Gender" @blur="[CheckEmptyGender()]">
            <option value>성별</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="U">선택안함</option>
          </select>
          <span class="error-message" v-if="EmptyGender">필수 정보입니다.</span>
        </div>
        <!-- 법정대리인 정보 -->
        <div v-if="UnderFourteen">
          <div class="mb-3">
            <label for="pname" class="form-label">보호자 이름</label>
            <input id="pname" type="text" maxlength="40" class="form-control" v-model="PName" @blur="[ValidatePName()]" />
            <span class="error-message" v-if="EmptyPName">필수 정보입니다.</span>
            <span class="error-message" v-else-if="DisAllowPNameString">한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)</span>
          </div>
          <div class="mb-3">
            <label for="pyy" class="form-label">보호자 생년월일</label>
            <div class="bir_wrap d-table">
              <div class="d-table-cell bir-yy">
                <input type="text" class="form-control" placeholder="년(4자)" id="pyy" maxlength="4" v-model="PYY" @blur="[ValidatePbirth()]" />
              </div>
              <div class="mb-3 ps-2 d-table-cell bir-mm">
                <select class="form-select" id="pmm" v-model="PMM" @blur="[ValidatePbirth()]">
                  <option value>월</option>
                  <option v-for="(month, index) in 12" :key="index" :value="month | DoubleDigit">
                    {{ month }}
                  </option>
                </select>
              </div>
              <div class="mb-3 ps-2 d-table-cell bir-dd">
                <input type="text" class="form-control" placeholder="일" id="pdd" maxlength="2" v-model="PDD" @blur="[ValidatePbirth()]" />
              </div>
            </div>
            <span class="error-message" v-if="EmptyPYY || LengthNotMeetPYY">태어난 년도 4자리를 정확하게 입력하세요.</span>
            <span class="error-message" v-else-if="EmptyPMM">태어난 월을 선택하세요.</span>
            <span class="error-message" v-else-if="EmptyPDD">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>
            <span class="error-message" v-else-if="NoExistPDay">생년월일을 다시 확인해주세요.</span>
            <span class="error-message" v-else-if="PBirthIsFuture">미래에서 오셨군요. ^^</span>
            <span class="error-message" v-else-if="NotLegalAgent">보호자(법정대리인) 동의 기준이 맞지 않습니다.</span>
            <span class="error-message" v-else-if="TooOldPYY">정말이세요?</span>
          </div>
          <div class="mb-3">
            <label for="pgender" class="form-label">보호자 성별/국적</label>
            <div class="d-flex">
              <select class="form-select" name="pgender" id="pgender" v-model="PGender" @blur="CheckEmptyPGender()">
                <option value>성별</option>
                <option value="0">남자</option>
                <option value="1">여자</option>
              </select>
              <select class="form-select ms-2" name="pforeign" id="pforeign" v-model="PForeign">
                <option value="0">내국인</option>
                <option value="1">외국인</option>
              </select>
            </div>
            <span class="error-message" v-if="EmptyPGender">필수 정보입니다.</span>
          </div>
        </div>
        <button
          class="btn w-100 p-2 mt-3"
          @click="
            if (!UnderFourteen) {
              ValidateId(), PwGuide(), CheckPwConfirm(), ValidatePw(), ValidateName(), ValidateBirth(), CheckEmptyGender();
            } else {
              ValidateId(),
                PwGuide(),
                CheckPwConfirm(),
                ValidatePw(),
                ValidateName(),
                ValidateBirth(),
                CheckEmptyGender(),
                ValidatePName(),
                ValidatePbirth(),
                CheckEmptyPGender();
            }
          "
        >
          가입하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { CheckUserExist } from '@/api/index.js';
import EmailValidator from '@/utils/auth/signup/EmailValidator';
import { AgeCalculator, CheckTimeIsFuture, CheckExistDay } from '@/utils/auth/signup/CheckBirthValidate';
import { DisAllowNameString, DisAllowPwString } from '@/utils/auth/signup/CheckDisAllowString';
import { CheckPasswordCombination, CheckConsecutiveCharacter, CheckPasswordEqualId } from '@/utils/auth/signup/CheckPasswordValidate';

export default {
  data() {
    return {
      Id: '',
      Pw: '',
      PwConfirm: '',
      Name: '',
      YY: '',
      MM: '',
      DD: '',
      PName: '',
      PYY: '',
      PMM: '',
      PDD: '',
      Gender: '',
      PGender: '',
      PForeign: '0',
      FocusId: false,
      FocusPw: false,
      FocusPwConfirm: false,
      EmptyId: false,
      EmptyPw: false,
      EmptyPwConfirm: false,
      EmptyName: false,
      EmptyYY: false,
      EmptyMM: false,
      EmptyDD: false,
      EmptyPName: false,
      EmptyPYY: false,
      EmptyPMM: false,
      EmptyPDD: false,
      TooOldYY: false,
      TooOldPYY: false,
      NoExistDay: false,
      NoExistPDay: false,
      BirthIsFuture: false,
      PBirthIsFuture: false,
      LengthNotMeetYY: false,
      LengthNotMeetPYY: false,
      EmptyGender: false,
      EmptyPGender: false,
      PwNotEqual: false,
      ShowPwGuide: false,
      NotSatisfyPwCombination: null,
      SameConsecutivePwCharacter: null,
      PwEqualId: null,
      DisAllowPwString: false,
      DisAllowNameString: false,
      DisAllowPNameString: false,
      DuplicateId: false,
      IdNotValid: false,
      AvailableId: false,
      AvailablePw: false,
      UnderFourteen: false,
      NotLegalAgent: false,
    };
  },
  filters: {
    DoubleDigit: function (value) {
      return String(value).padStart(2, '0');
    },
  },
  methods: {
    CheckFocusId() {
      this.FocusId = !this.FocusId;
    },
    CheckFocusPw() {
      this.FocusPw = !this.FocusPw;
    },
    CheckFocusPwConfirm() {
      this.FocusPwConfirm = !this.FocusPwConfirm;
    },
    // --- 회원가입 입력 값 검사 ---
    // * 아이디 체크
    async ValidateId() {
      const email = this.Id;
      if (email == '') {
        // 빈값 검사
        this.EmptyId = true;
        this.IdNotValid = false;
        this.DuplicateId = false;
        this.AvailableId = false;
      } else if (EmailValidator(email) == false) {
        // 유효성 검사
        this.EmptyId = false;
        this.IdNotValid = true;
        this.DuplicateId = false;
        this.AvailableId = false;
      } else if ((await CheckUserExist(email)) == 409) {
        // 이메일 존재 확인
        this.EmptyId = false;
        this.IdNotValid = false;
        this.DuplicateId = true;
        this.AvailableId = false;
      } else {
        // 아이디 사용 가능
        this.EmptyId = false;
        this.IdNotValid = false;
        this.DuplicateId = false;
        this.AvailableId = true;
      }
    },
    // * 비밀번호 체크
    PwGuide() {
      this.ShowPwGuide = true;
    },
    ValidatePw() {
      // 빈값 검사
      this.Pw ? (this.EmptyPw = false) : (this.EmptyPw = true);
      // 비밀번호 입력 시 아이디 패스워드 비교 ([패스워드의 조건] 아이디(이메일) 제외)
      this.PwEqualId = CheckPasswordEqualId(this.Id, this.Pw);
      // 비밀번호 조합 검사
      CheckPasswordCombination(this.Pw) ? (this.NotSatisfyPwCombination = false) : (this.NotSatisfyPwCombination = true);
      // 비밀번호 연속성 검사
      CheckConsecutiveCharacter(this.Pw) ? (this.SameConsecutivePwCharacter = true) : (this.SameConsecutivePwCharacter = false);
      // 비밀번호 허용되지 않은 문자 검사
      DisAllowPwString(this.Pw) ? (this.DisAllowPwString = true) : (this.DisAllowPwString = false);
      // 위 검사를 모두 마친 뒤 사용 가능한 패스워드인지 판별
      this.EmptyPw == false &&
      this.PwEqualId == false &&
      this.NotSatisfyPwCombination == false &&
      this.SameConsecutivePwCharacter == false &&
      this.DisAllowPwString == false
        ? (this.AvailablePw = true)
        : (this.AvailablePw = false);
    },
    CheckIdEqPw() {
      // 아이디 입력 시 아이디 패스워드 비교 ([패스워드의 조건] 아이디(이메일) 제외)
      if (this.PwEqualId == null) {
        return;
      }
      this.PwEqualId = CheckPasswordEqualId(this.Id, this.Pw);
    },
    // * 비밀번호 확인 체크
    CheckPwConfirm() {
      this.PwConfirm ? (this.EmptyPwConfirm = false) : (this.EmptyPwConfirm = true); // 빈값 검사
      this.Pw == this.PwConfirm && this.PwConfirm !== '' ? (this.PwNotEqual = false) : (this.PwNotEqual = true); // 비밀번호 확인 확인
    },
    // * 이름 체크
    ValidateName() {
      // 빈값 검사
      this.Name ? (this.EmptyName = false) : (this.EmptyName = true);
      // 허용하지 않은 문자 체크
      DisAllowNameString(this.Name) ? (this.DisAllowNameString = true) : (this.DisAllowNameString = false);
    },
    // * 생년월일 체크
    ValidateBirth() {
      this.YY ? (this.EmptyYY = false) : (this.EmptyYY = true); // 출생연도 빈값 검사
      this.MM ? (this.EmptyMM = false) : (this.EmptyMM = true); // 출생월 빈값 검사
      this.DD ? (this.EmptyDD = false) : (this.EmptyDD = true); // 출생일 빈값 검사
      this.YY.length == 4 ? (this.LengthNotMeetYY = false) : (this.LengthNotMeetYY = true); // 출생연도 4자리 확인
      this.YY > 1922 ? (this.TooOldYY = false) : (this.TooOldYY = true); // 너무 오래된 출생연도

      // 미래 시간인지 검사
      CheckTimeIsFuture(this.YY, this.MM, this.DD) ? (this.BirthIsFuture = true) : (this.BirthIsFuture = false);

      // 존재 하는 날짜인지 검사
      if (this.YY && this.MM && this.DD) {
        // 1. 날짜 입력값이 숫자인지
        if (!isNaN(Number(this.YY) && Number(this.DD))) {
          // 2. 존재하는 날짜인지
          CheckExistDay(this.YY, this.MM, this.DD) ? (this.NoExistDay = false) : (this.NoExistDay = true);
        } else {
          this.NoExistDay = true;
        }
      }

      // 나이 14세 미만 검사
      if (this.YY && this.MM && this.DD && this.BirthIsFuture == false) {
        const YY = this.YY;
        const MM = this.MM;
        const DD = this.DD;
        let age = AgeCalculator(YY, MM, DD);
        age >= 14 ? (this.UnderFourteen = false) : (this.UnderFourteen = true);
      }
    },
    // * 성별 체크
    CheckEmptyGender() {
      this.Gender ? (this.EmptyGender = false) : (this.EmptyGender = true);
    },
    // * 보호자 입력 값 체크
    // * 보호자 이름 체크
    ValidatePName() {
      this.PName ? (this.EmptyPName = false) : (this.EmptyPName = true);
      DisAllowNameString(this.PName) ? (this.DisAllowPNameString = true) : (this.DisAllowPNameString = false);
    },
    // * 보호자 생년월일 체크
    ValidatePbirth() {
      this.PYY ? (this.EmptyPYY = false) : (this.EmptyPYY = true); // 출생연도 빈값 검사
      this.PMM ? (this.EmptyPMM = false) : (this.EmptyPMM = true); // 출생월 빈값 검사
      this.PDD ? (this.EmptyPDD = false) : (this.EmptyPDD = true); // 출생일 빈값 검사
      this.PYY.length == 4 ? (this.LengthNotMeetPYY = false) : (this.LengthNotMeetPYY = true); // 출생연도 4자리 확인
      this.PYY > 1922 ? (this.TooOldPYY = false) : (this.TooOldPYY = true); // 너무 오래된 출생연도

      // 미래 시간인지 검사
      CheckTimeIsFuture(this.PYY, this.PMM, this.PDD) ? (this.PBirthIsFuture = true) : (this.PBirthIsFuture = false);

      // 존재 하는 날짜인지 검사
      if (this.PYY && this.PMM && this.PDD) {
        // 1. 날짜 입력값이 숫자인지
        if (!isNaN(Number(this.PYY) && Number(this.PDD))) {
          // 2. 존재하는 날짜인지
          CheckExistDay(this.PYY, this.PMM, this.PDD) ? (this.NoExistPDay = false) : (this.NoExistPDay = true);
        } else {
          this.NoExistPDay = true;
        }
      }
      // 법정대리인 조건 검사 (만 18세 이상 차이)
      if (this.PYY && this.PMM && this.PDD) {
        const age = AgeCalculator(this.YY, this.MM, this.DD);
        const page = AgeCalculator(this.PYY, this.PMM, this.PDD);
        page - age >= 18 ? (this.NotLegalAgent = false) : (this.NotLegalAgent = true);
      }
    },
    CheckEmptyPGender() {
      this.PGender ? (this.EmptyPGender = false) : (this.EmptyPGender = true);
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  background-color: #03c75a;
  border-radius: 0;
  color: white;
  font-weight: 700;
}

.id_box,
.pwd-box,
.pwd-check-box {
  input {
    border: none;
    outline: 0;
  }
}

.form-control,
.form-select {
  padding: 10px;
  font-size: 15px;
  border-radius: 0;
  font-weight: 300;

  &:focus {
    box-shadow: 0 0 0 0;
    border: solid 1px #03c75a;
  }
}

.form-label {
  font-weight: bold;
}

.bir-yy,
.bir-mm,
.bir-dd {
  width: 33%;
}

.focus {
  border: solid 1px #03c75a !important;
}

.error-message {
  color: red;
  display: block;
  font-size: 12px;
  margin-top: 9px;
}

.green {
  color: #08a600 !important;
}

@mixin icon_style() {
  font-size: 14px;
  margin-right: 4px;
}

.input-guide-area {
  margin-top: 9px;

  .icon-cross-gray {
    color: #888;
    @include icon_style;
  }

  .icon-cross-red {
    color: red;
    @include icon_style;
  }

  .icon-check-green {
    color: #08a600;
    @include icon_style;
  }

  .input-guide {
    color: #888;
    font-size: 12px;
  }
  .input-guide-error {
    color: red;
    font-size: 12px;
  }
  .input-guide-success {
    color: #08a600;
    font-size: 12px;
  }
}
</style>
