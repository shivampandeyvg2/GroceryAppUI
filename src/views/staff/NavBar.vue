<template>
    
      <!-- Top Navbar -->
      
      <nav class="navbar">
       
        <ul>
          <li><router-link :to="{ name: 'StaffHome', params: { userid:  this.$globals.userid }}">Dashboard</router-link></li>
        </ul>
      </nav>

      </template>

<script>
export default {

  data() {
      return {
        userid: this.$globals.userid
      };
    },
    methods:
    {

    }
   
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