<template>
  <div class="Form">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
      class="login_register-form"
    >
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input v-model="loginForm.email" type="email" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input v-model.number="loginForm.password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          Login
        </a-button>
        <a-button style="margin-left: 10px" @click="registerForm">
          Register
        </a-button>
        <a-button style="margin-left: 10px" @click="changePwd">
          Change
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the Password'));
      }
      if (!emailReg.test(value)) {
        return callback(new Error('Please check email'));
      }
      return true;
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the Email'));
      }
      return true;
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.login({
          email: this.loginForm.email,
          password: this.loginForm.password,
        });
        if (valid) {
          this.$message.info(res.msg);
          if (res.msg === '用户名或者密码错误') {
            this.loginForm.password = '';
            return false;
          }
          this.$cookie.set('username', res.data.username);
          this.$cookie.set('role', res.data.role);
          this.$router.push({ name: 'Index' });
        } else {
          this.$message.info(res.msg);
          return false;
        }
        return true;
      });
    },
    registerForm() {
      this.$router.push({ name: 'Register' });
    },
    changePwd() {
      this.$router.push({ name: 'ChangePwd' });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login_register.less");
</style>
