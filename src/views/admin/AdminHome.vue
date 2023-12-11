<template>
    <div>
      <!-- Top Navbar -->
      <NavBar > </NavBar> 
      <div class="dashboard">
       
    <div class="main-box">
        <div>
        <h2 style="text-align: center;"> Admin Dashboard</h2>
        </div>

      <div class="top-row">
        <div class="box">
          <!-- Image 1 -->
          <img :src="require('../../../public/images/users.png')" class ="image" alt="Image 1" />
          <p> {{ data.user }}</p>
          <p> Total Users</p>
        </div>
        <div class="box">
          <!-- Image 2 -->
          <img :src="require('../../../public/images/stores.jpeg')" class ="image" alt="Image 1" />
          <p> {{  data.stores }}</p>
          <p> Total Stores</p>
        </div>
        <div class="box">
          <!-- Image 3 -->
          <img :src="require('../../../public/images/products.png')" class ="image"  alt="Image 1" />
          <p> {{ data.products }}</p>
          <p> Total Products</p>
        </div>
      </div>
      <div class="bottom-row">
        <div class="box">
            <img :src="require('../../../public/images/categories.png')" class ="image" alt="Image 1" />
          <p> {{ data.categories }}</p>
          <p> Total Categories</p>
        </div>
        <div class="box">
          <!-- Image 5 -->
          <!-- <img src="path_to_your_image" alt="Image 5" /> -->
          <p>Description 5</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  </template>

  <script>
  import axios from 'axios';
  import NavBar from '@/views/admin/NavBar.vue'; // Import the Navbar component
  export default {
  data() {
    return {
      data: '',
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/admin/dashboard');
         this.data = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  components: {
    NavBar // Register the Navbar component
  }
};
</script>
  <style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-box {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 800px;
}

.top-row,
.bottom-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.box {
  width: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
  /* Add your CSS styles for the navbar */
 

  .image {
  max-width: 150px; /* Set your maximum width */
  max-height:100px; /* Set your maximum height */
}
  </style>