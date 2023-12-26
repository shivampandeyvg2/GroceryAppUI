<template>
    <div v-if="showAlert" class="alert">{{ alertMessage }}</div>
    <div class="signup-container">
      <h2>User Sign Up</h2>
      <form @submit.prevent="submitForm" class="signup-form">
        <div class="form-group">
          <label for="userid">User ID:</label>
          <input type="text" id="userid" v-model="formData.userid" required>
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
    
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        formData: {
          userid: '',
          name: '',
          email: '',
          password: ''
        }, 
        showAlert:false,
        alertMessage:''
      };
    },
    methods: {
      async submitForm() {
        
        const response = await axios.post('http://127.0.0.1:5000/api/users/signup',  this.formData );
        console.log(response)
        if (response.status==201)
        {
            this.alertMessage = 'Account created ';
            this.$globals.token = response.data.token;
            this.$globals.userid = this.formData.userid;
            this.$router.push({ name: 'UserHome', params: { userid:  this.formData.userid } });
            
        }
        else 
        {
            this.alertMessage = 'User Already Exists';
            this.showAlert = true;
            setTimeout(() => {
                this.showAlert = false;
                this.alertMessage = '';
            }, 1000);
        }

      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  button {
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  
  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }

  .alert {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  text-align: center;
  display: inline-block;
  transition: opacity 5s ease;
}

/* Fade out effect for the alert */
.alert-enter-active,
.alert-leave-active {
  transition: opacity 5s;
}

.alert-enter,
.alert-leave-to {
  opacity: 0;
}
  </style>