<template>
    
      <!-- Top Navbar -->
      <nav class="navbar">
        <ul>
          <li><router-link :to="{ name: 'UserHome', params: { userid:  this.$globals.userid }}">Dashboard</router-link></li>
          <li><router-link :to="{ name: 'UserCart', params: { userid:  this.$globals.userid }}">Cart</router-link></li>
          <!-- <li><router-link to="/staff/summary">Profile</router-link></li>
          <li><router-link to ="/staff/login">Cart</router-link></li>
          <li><router-link to ="/staff/login">Logout</router-link></li> -->
        </ul>
      </nav>

      </template>

<script>
export default {
}
</script>

<style>
.navbar {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  .navbar ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  
  .navbar ul li {
    margin: 0 10px;
  }
  
  .navbar ul li a {
    color: white;
    text-decoration: none;
  }
  
  .navbar ul li a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  </style>