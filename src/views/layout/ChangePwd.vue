<template>
  <div class="Form">
    <a-form-model
      ref="findForm"
      :model="findForm"
      :rules="rules"
      v-bind="layout"
      class="login_register-form"
    >
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input
          v-model="findForm.email"
          autocomplete="off"
          placeholder="Email (required)"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input
          v-model="findForm.password"
          placeholder="Password (required)"
        />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="Code"
        prop="code"
        class="checkCode"
      >
        <a-input v-model="findForm.code" placeholder="Code (required)" />
        <a-button
          type="primary"
          size="small"
          class="postBtn"
          @click="postMessage('findForm')"
        >
          发送验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="registerForm('findForm')">
          Change
        </a-button>
        <a-button style="margin-left: 10px" @click="loginForm">
          Login
        </a-button>
        <a-button style="margin-left: 10px" @click="register">
          Register
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
        return callback(new Error('Please input the Email'));
      }
      if (!emailReg.test(value)) {
        return callback(new Error('Please check email'));
      }
      return true;
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the Password'));
      }
      return true;
    };
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the Code'));
      }
      return true;
    };
    return {
      findForm: {
        email: '',
        password: '',
        code: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    async registerForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.changePwd({
          email: this.findForm.email,
          password: this.findForm.password,
          code: this.findForm.code,
        });
        if (valid) {
          this.$message.info(res.msg);
          if (res.msg === '该用户未注册') {
            this.$router.push({ name: 'Register' });
            return false;
          }
          this.$router.push({ name: 'Login' });
        } else {
          this.$message.info(res.msg);
          return false;
        }
        return true;
      });
    },
    async postMessage(formName) {
      if (this.findForm.email === '') {
        this.$message.info('please input the email');
        return;
      }
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.getCode({
          email: this.findForm.email,
        });
        if (!valid) {
          this.$message.info(res.msg);
          return false;
        }
        return true;
      });
    },
    loginForm() {
      this.$router.push({ name: 'Login' });
    },
    register() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login_register.less");
.checkCode {
  position: relative;
  .postBtn {
    position: absolute;
    right: 30px;
    z-index: 1;
    font-size: 12px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #007bff;
  }
}
</style>
