<template>
  <Navbar/>
  <div class="request-section">
        <h2>Category Requests</h2>
        <div class="request-scroll">
        <div class="request-box">
          <!-- Box for category requests -->
          <div v-for="(request, index) in categoryRequests" :key="index" class="individual-request-box">
            
            <img :src="require('../../../public/images/request.png')" alt="Request Image" />
            <div class="request-links">
              <a @click="approveRequest(request)">Approve</a>
              <a @click="rejectRequest(request)">Reject</a>
              <a @click="viewRequest(request)">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Navbar from '@/views/staff/NavBar.vue';
// Import necessary components if needed

export default {

  components: {
      Navbar
    },
    data() {
    return {
      products: [
        {
          name: 'Product 1'
          // Add more properties if needed
        },
        {
          name: 'Product 2'
          // Add more properties if needed
        },
        // Add more product data objects as needed
      ]
    };
  }
};
</script>
<style scoped>
/* Add styles for the navbar, scroll container, product container, temp */
/* Navbar styles */

/* Horizontal scrollable container */
/* Vertical scrollable container */
.request-section {
  margin-bottom: 30px; /* Increased separation between request sections */
}

.request-box {
  display: flex;
  flex-wrap: nowrap;
}

.individual-request-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 30px; /* Increased separation between individual request boxes */
  margin-bottom: 30px; /* Increased separation between individual request boxes */
}

.individual-request-box img {
  max-width: 100px; /* Adjust the max-width of the image */
}

.request-links a {
  margin-right: 10px;
  text-decoration: underline;
  cursor: pointer;
}
.request-scroll {
  overflow-x: auto; 
  background-color: #f5f5f5; /* Light grey-pink background color */
  padding: 10px;
  border: 1px solid #ccc; 
}
</style>