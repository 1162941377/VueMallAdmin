<template>
  <div class="Form">
    <a-form-model
      ref="changeForm"
      :model="changeForm"
      :rules="rules"
      v-bind="layout"
      class="login_register-form"
    >
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input
          v-model="changeForm.email"
          autocomplete="off"
          placeholder="Email (required)"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input
          v-model="changeForm.password"
          placeholder="Password (required)"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="newPwd">
        <a-input
          v-model="changeForm.newPassword"
          placeholder="Password (not required)"
        />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="Code"
        prop="code"
        class="checkCode"
      >
        <a-input v-model="changeForm.code" placeholder="Code (required)" />
        <a-button
          type="primary"
          size="small"
          class="postBtn"
          @click="postMessage('changeForm')"
        >
          发送验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item has-feedback label="Username" prop="username">
        <a-input
          v-model="changeForm.username"
          placeholder="Username (required)"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="registerForm('changeForm')">
          Modify
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('changeForm')">
          Reset
        </a-button>
        <a-button style="margin-left: 10px" @click="loginForm">
          Login
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
    const checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the Username'));
      }
      return true;
    };
    return {
      changeForm: {
        email: '',
        password: '',
        code: '',
        username: '',
        newPassword: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
        username: [{ validator: checkUsername, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    async registerForm(formName) {
      if (this.changeForm.newPassword === '') {
        this.changeForm.newPassword = this.changeForm.password;
      }
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.changeInfo({
          email: this.changeForm.email,
          password: this.changeForm.password,
          newPassword: this.changeForm.newPassword,
          code: this.changeForm.code,
          username: this.changeForm.username,
        });
        if (valid) {
          this.$message.info(res.msg);
          if (res.msg === '该用户未注册') {
            this.$router.push({ name: 'Register' });
            return false;
          }
          if (res.msg === '原密码不正确') {
            this.changeForm.password = '';
            this.changeForm.newPassword = '';
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
      if (this.changeForm.email === '') {
        this.$message.info('please input the email');
        return;
      }
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.getCode({
          email: this.changeForm.email,
        });
        if (!valid) {
          this.$message.info(res.msg);
          return false;
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginForm() {
      this.$router.push({ name: 'Login' });
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
