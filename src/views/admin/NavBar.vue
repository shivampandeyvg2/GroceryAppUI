<template>
    
      <!-- Top Navbar -->
      <nav class="navbar">
        <ul>
          <li><router-link to="/admin/home">Dashboard</router-link></li>
          <li><router-link to="/admin/categories">Categories</router-link></li>
          <li><router-link to="/admin/requests">Requests</router-link></li>
          <li><router-link to ="/admin/login">Logout</router-link></li>
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