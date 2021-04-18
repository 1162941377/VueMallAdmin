<template>
  <div class="Form">
    <a-form-model
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      v-bind="layout"
      class="login_register-form"
    >
      <a-form-model-item has-feedback label="Email" prop="email">
        <a-input
          v-model="registerForm.email"
          autocomplete="off"
          placeholder="Email (required)"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Password" prop="password">
        <a-input
          v-model="registerForm.password"
          placeholder="Password (required)"
        />
      </a-form-model-item>
      <a-form-model-item
        has-feedback
        label="Code"
        prop="code"
        class="checkCode"
      >
        <a-input v-model="registerForm.code" placeholder="Code (required)" />
        <a-button
          type="primary"
          size="small"
          class="postBtn"
          @click="postMessage('registerForm')"
        >
          发送验证码
        </a-button>
      </a-form-model-item>
      <a-form-model-item has-feedback label="Username" prop="username">
        <a-input
          v-model="registerForm.username"
          placeholder="Username (required)"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Role" prop="role">
        <a-input
          v-model="registerForm.role"
          placeholder="Role (not required customer or admin)"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="register('registerForm')">
          Register
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('registerForm')">
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
    const checkRole = (rule, value, callback) => {
      if (value === '') {
        this.registerForm.role = 'customer';
        return true;
      }
      if (value !== 'customer' && value !== 'admin') {
        return callback(new Error('Please select "customer or admin"'));
      }
      return true;
    };
    return {
      registerForm: {
        email: '',
        password: '',
        code: '',
        username: '',
        role: '',
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
        username: [{ validator: checkUsername, trigger: 'change' }],
        role: [{ validator: checkRole, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    async register(formName) {
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.logon({
          email: this.registerForm.email,
          password: this.registerForm.password,
          code: this.registerForm.code,
          username: this.registerForm.username,
          role: this.registerForm.role,
        });
        if (valid) {
          this.$message.info(res.msg);
          if (res.msg === '验证码无效，请重新获取') {
            this.registerForm.code = '';
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
      if (this.registerForm.email === '') {
        this.$message.info('please input the email');
        return;
      }
      this.$refs[formName].validate(async (valid) => {
        const res = await this.$api.getCode({
          email: this.registerForm.email,
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
