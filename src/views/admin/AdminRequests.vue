<template>
    <div>
      <Navbar />
      <div v-if="acc" class="overlay">
      

      <div class="profile">
        <button @click="closeProfile" class="close-button">&#10005;</button>
        <h2>Account Details : </h2>
        <p>UserId: {{ viewdata.userid }}</p>
        <p>Name: {{viewdata.name  }}</p>
        <p>Email: {{viewdata.email  }}</p>
        <p>Store Name: {{viewdata.storename  }}</p>
      </div>
    </div>



    <div v-if="edit" class="overlay">
      
      <div class="profile">
        <button @click="closeProfile" class="close-button">&#10005;</button>

        <h2>Category Request Details : </h2>
        <p v-if ="viewdata.id">Request ID: {{ viewdata.id }}</p>
        <p v-if ="viewdata.title">Title: {{ viewdata.title }}</p>
        <p v-if ="viewdata.description">Description: {{ viewdata.description }}</p>
        <p v-if ="viewdata.createdon">Requested On: {{ viewdata.createdon }}</p>
      </div>
    </div>


      <div class="request-section">
        <h2>Account Creation Requests</h2>
        <div class="request-scroll">
            <div class="request-box">
          <div v-for="(request, index) in accountCreationRequests" :key="index" class="individual-request-box">
            <!-- Individual request box for account creation request -->
            <img :src="require('../../../public/images/newacc.png')" alt="Request Image" />
            <p>Date : {{ request.requestedon }}</p>
            <div class="request-links">
              <a @click="approveRequest(request)">Approve</a>
              <a @click="rejectRequest(request)">Reject</a>
              <a @click="viewRequest(request)">View</a>
            </div>
          </div>
        </div>
      </div>
      </div>

  
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
    </div>
  </template>
  
  <script>
  import Navbar from '@/views/admin/NavBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      Navbar
    },
    data() {
      return {
        accountCreationRequests: [], 
        categoryRequests: [],
        acc: false,
        edit:false,
        viewdata:{}
      };
    },
    methods: {
        closeProfile()
        {
          this.acc= false;
          this.edit = false;
          this.viewdata ={}
        },
      async approveRequest(request) {
        // Handle approve action for the request
        const response = await axios.get('http://127.0.0.1:5000/api/admin/approve/'+request.id);
        console.log(response)
        location.reload();
      },
      async rejectRequest(request) {
        // Handle reject action for the request
        const response = await axios.get('http://127.0.0.1:5000/api/admin/reject/'+request.id);
        console.log(response)
        location.reload();
      },
      async viewRequest(request) {
        const response = await axios.get('http://127.0.0.1:5000/api/admin/view/'+request.id);
        if (response.status==200)
        {
          this.acc = response.data.data.acc;
          this.viewdata = response.data.data.data;
          console.log(this.viewdata);
          this.edit = response.data.data.edit;
          console.log(this.acc);
          console.log(this.edit);
        }
      },
      async fetchdata(){
        try {
        const response = await axios.get('http://127.0.0.1:5000/api/admin/viewrequests');
        this.accountCreationRequests = response.data.data.approval;
        this.categoryRequests =  response.data.data.others;
         this.data = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      }
    },
    created() {
        this.fetchdata()
        
    }
  }
  </script>
  
  <style scoped>
  /* Add styles for request sections, boxes, and individual request items */
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure it's above other content */
}

/* .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* z-index: 999; Ensure it's above other content */
/* }  */

/* Styles for the profile container */
.profile {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* Ensure visibility */
  visibility: visible;
}

/* Style for the close button */
.close-button {
  position: relative;
  top: 10px;
  flex : right;
  right: 10px;
  font-size: 24px;
  color: #ff0000; /* Red color for the close button */
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
}

/* .profile button {
  position: absolute;
  top: 10px;
  right: 10px;
} */

  </style>