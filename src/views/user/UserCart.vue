<template>
    <div>
      <Navbar />
  
   
  
  
  
  
  
      <div class="request-section">
        <div v-for="(value, index) in cart" :key="index" class="request-scroll">
          <div style="background-color: grey; margin :10px ; padding : 10px">
            <span>

         
          <h2 style="text-align: left;">{{ value.productname }} &nbsp;&nbsp;</h2>
          <h2 style="text-align: left;"> Quantity{{ value.qty }}</h2>
        </span>
        
          

     
      </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import Navbar from '@/views/user/NavBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
      Navbar
    },
    data() {
      return {
        cart : ''
     
      };
    },
    methods:{
      
     
        async fetchdata()
        {
        
          const response = await axios.get('http://127.0.0.1:5000/api/users/viewcart/'+this.$route.params.userid );
          console.log(response);
          if (response.status==200)
          {
            this.cart = response.data.data;
          }
      },
  
   
      closeoverlay()
        {
          
        this.viewproduct ={name:'',
          price:'',
          unit:''};
          this.iscart = false;
          this.addedproductdetail={
          qty:0,
          price:null,
          total:null,
          productid : null
        }
        },
      
     
    },
    created() {
          this.fetchdata();
          
      }
  }
  </script>
  <style scoped>
  /* Add styles for request sections, boxes, and individual request items */
  .request-section {
    width: 300px;
    height: 200px;
    border: 1px solid #ddd;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .request-box {
  display: flex;
  flex-wrap: nowrap;
  }
  
  .individual-request-box {
  border: 2px solid black;
  
  
  background-color: pink;
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
    margin-left: 50%;
  /* overflow-x: auto; 
  background-color: #f5f5f5; */
  /* padding: 10px;
  border: 1px solid #ccc;  */
  /* width: 300px;
    height: 200px;
    border: 1px solid #ddd;
    margin-right: 10px;
    display: flex;
    flex-direction: column; */
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