<template>
	<div>
		<h3 class="text-center m-3">회원가입</h3>
		<form action="" class="col-12 col-md-6 mx-auto my-3">
			<div class="mb-3">
				<label for="id" class="form-label">아이디</label>
				<input id="id" type="text" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="name" class="form-label">성명</label>
				<input id="name" type="text" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="birth" class="form-label">생년원일</label>
				<input type="text" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="Number" class="form-label">학번</label>
				<input id="Number" type="text" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">비밀번호</label>
				<input id="password" type="password" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="password-check" class="form-label">비밀번호 확인</label>
				<input id="password-check" type="text" class="form-control" />
			</div>
			<button class="btn btn-primary w-100">가입하기</button>
		</form>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
