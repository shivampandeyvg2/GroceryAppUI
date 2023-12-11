<template>
    <div class="login-container">
      <h2>Member Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="id">ID:</label>
          <input type="text" id="id" v-model="loginData.id" name="id" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginData.password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Display error message -->
      </form>
    </div>
  </template>
  
  
  
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        loginData: {
          id: '',
          password: ''
        },
        errorMessage:''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/staff/signin', {
            userid: this.loginData.id,
            password: this.loginData.password
          });
          console.log(response)
          if (response.status==200) {
            console.log("log in success")
            const token = response.data.token;
            this.$globals.token = token;
            this.$globals.userid = this.loginData.id;
            this.$router.push({ path: '/staff/home' });
            
          }
           else {
           
            this.errorMessage = "Error Occured Please Sign in Again";
                setTimeout(() => {
                this.alertMessage = '';
                location.reload()
                },1000);
                
          }
        } catch (error) {
            
            
            this.errorMessage = "Invalid Credentials";
                setTimeout(() => {
                this.alertMessage = '';
                location.reload()
                }, 1000);
          console.error('Error:', error);
        }
      }
    }
  };
  
  </script>
  
  <style>
  
  /* Styles for the login container and form */
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"],
  button {
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  .error-message {
    color: red;
    font-size: 14px;
  }
  </style>