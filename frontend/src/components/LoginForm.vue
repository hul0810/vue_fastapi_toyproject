<template>
  <div class="row justify-content-center">
    <h1 class="text-center my-3">
      <a href="/main">
        <img src="../assets/images/logo.png" alt="login title" width="40px" height="40px" />
      </a>
    </h1>
    <div class="col-lg-4 col-md-6 col-12">
      <!-- Menu tab -->
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="login-tab"
            data-bs-toggle="tab"
            data-bs-target="#login"
            type="button"
            role="tab"
            aria-controls="login"
            aria-selected="false"
          >
            ID 로그인
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="test1-tab"
            data-bs-toggle="tab"
            data-bs-target="#test1"
            type="button"
            role="tab"
            aria-controls="test"
            aria-selected="false"
          >
            test1
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="test2-tab"
            data-bs-toggle="tab"
            data-bs-target="#test2"
            type="button"
            role="tab"
            aria-controls="test2"
            aria-selected="false"
          >
            test2
          </button>
        </li>
      </ul>

      <!-- Tab content -->
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="login" role="tabpanel" aria-labelledby="home-tab">
          <div class="p-4 border pannel">
            <form @submit.prevent="submitForm">
              <!-- id_pw_wrap -->
              <div class="id_pw_wrap mb-1">
                <!-- id input -->
                <div class="form-control d-table" id="id-line" :class="{ focus: FocusId }">
                  <div class="d-table-cell icon-cell">
                    <font-awesome-icon icon="fa-regular fa-user" class="mx-2" :class="FocusId ? '' : 'text-muted'" />
                  </div>
                  <input
                    type="text"
                    id="id"
                    placeholder="아이디"
                    maxlength="41"
                    class="input-text d-table-cell pe-3"
                    autofocus
                    @focus="CheckFocusId"
                    @blur="CheckFocusId"
                    v-model="id"
                  />
                </div>
                <!-- pw input -->
                <div class="form-control d-table" id="pw-line" :class="{ focus: FocusPw }">
                  <div class="d-table-cell icon-cell">
                    <font-awesome-icon icon="fa-solid fa-lock" class="mx-2" :class="FocusPw ? '' : 'text-muted'" />
                  </div>
                  <input
                    type="password"
                    id="pw"
                    placeholder="비밀번호"
                    maxlength="16"
                    class="input-text d-table-cell pe-3"
                    @focus="CheckFocusPw"
                    @blur="CheckFocusPw"
                    v-model="pw"
                  />
                </div>
              </div>
              <!-- login-keep-wrap -->
              <div class="login-keep-wrap d-flex justify-content-between mb-4">
                <div class="form-check justify-content-start">
                  <input class="form-check-input rounded-circle" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label text-muted" for="flexCheckDefault">로그인 상태 유지</label>
                </div>
                <div class="form-check form-switch justify-content-end">
                  <input class="form-check-input text-muted" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                  <label class="form-check-label" for="flexSwitchCheckDefault">IP 보안</label>
                </div>
              </div>
              <div class="text-danger error-message mb-3" :class="ShowIdErrMsg ? '' : 'd-none'"><strong>아이디</strong>를 입력해주세요.</div>
              <div class="text-danger error-message mb-3" :class="ShowPwErrMsg ? '' : 'd-none'"><strong>비밀번호</strong>를 입력해주세요.</div>
              <button type="submit" class="btn w-100 text-white fw-bold fs-5 py-2" @click="InputEmptyCheck">로그인</button>
            </form>
          </div>
        </div>
        <div class="tab-pane" id="test1" role="tabpanel" aria-labelledby="profile-tab">
          <div class="p-3 border">test1</div>
        </div>
        <div class="tab-pane" id="test2" role="tabpanel" aria-labelledby="contact-tab">
          <div class="p-3 border">test2</div>
        </div>
      </div>
    </div>
    <ul class="find_wrap list-unstyled text-center my-3 align-items-center">
      <li class="d-inline-block">
        <a href="#" class="text-muted text-decoration-none">비밀번호 찾기</a>
      </li>
      <li class="d-inline-block">
        <a href="#" class="text-muted text-decoration-none">아이디 찾기</a>
      </li>
      <li class="d-inline-block">
        <a href="/signup" class="text-muted text-decoration-none">회원 가입</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Login } from '@/api/index.js';

export default {
  data() {
    return {
      id: '',
      pw: '',
      FocusId: false,
      FocusPw: false,
      ShowIdErrMsg: false,
      ShowPwErrMsg: false,
    };
  },
  methods: {
    CheckFocusId() {
      this.FocusId = !this.FocusId;
    },
    CheckFocusPw() {
      this.FocusPw = !this.FocusPw;
    },
    InputEmptyCheck() {
      if (this.id == '' && this.pw == '') {
        this.ShowPwErrMsg = false;
        return (this.ShowIdErrMsg = true);
      }
      this.id ? (this.ShowIdErrMsg = false) : (this.ShowIdErrMsg = true);
      this.pw ? (this.ShowPwErrMsg = false) : (this.ShowPwErrMsg = true);
    },
    async submitForm() {
      const userData = {
        username: this.id,
        password: this.pw,
      };
      Login(userData);
      // Login 함수의 응답 값을 활용하여 경고창 띄우셈
    },
  },
};
</script>

<style scoped lang="scss">
// 태그
input {
  border: none;
  outline: 0;
  cursor: pointer;
  box-sizing: border-box;
}

// 클래스
.nav-tabs {
  border-bottom: 0;
}

.focus {
  border: solid 1px #03c75a;
  z-index: 5;
}

.pannel {
  border-radius: 0 5px 5px 5px;
}

.input-text {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: #222;
}

.btn {
  background-color: #03c75a;
}

.icon-cell {
  width: 24px;

  .text-muted {
    color: #dadada !important;
  }
}

.login-keep-wrap .form-check-input {
  border: solid 1px #777;

  &:checked {
    background-color: #03c75a;
    border-color: #03c75a;
  }

  &:focus {
    box-shadow: 0 0 0 0;
  }
}

.find_wrap li + li {
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 12px;
    width: 1px;
    height: 12px;
    background-color: #dadada;
  }
}

.error-message {
  font-size: 12px;
}

#id-line.form-control {
  position: relative;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 14px 17px 13px;

  &.focus {
    border: solid 1px #03c75a;
  }
}

#pw-line.form-control {
  position: relative;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 14px 17px 13px;
  margin-top: -1px;
}
</style>
