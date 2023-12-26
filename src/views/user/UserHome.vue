<template>
  <div>
    <Navbar />

    <div class="request-section">


<div v-if="iscart" class="overlay">
<div class="profile">
    <button @click="closeoverlay()" class="close-button">&#10005;</button>
    <h2> Add {{ viewproduct.name }} to your  cart:</h2>
    <form @submit.prevent="addtocartsubmit()">
      <div>
<label for="qty">Quantity:</label>
<input type="number" id="qty" v-model="addedproductdetail.qty" required> 
</div>

<button type="submit">Submit</button>
    </form>
    <h2> Price :   {{ viewproduct.price }}  {{ viewproduct.unit }}</h2>
    <h2> Total Price : {{ viewproduct.price * addedproductdetail.qty }}</h2>
</div>
</div>
</div>




    <h2 style="text-align: center;">Explore Products</h2>
    <div class="request-section">
      <div v-for="(value, index) in categories" :key="index" class="request-scroll">
        <div v-if ="products[value.id]!=0">
        <div style="background-color: gold;">
        <h2 style="text-align: center;">{{ value.title }}</h2>
          <div class="request-box">
            
           
        <div  v-for="(request, index) in products[value.id]" :key="index" class="individual-request-box">
          <img src= "" alt="Request Image" />
                <h2 style="text-align: center;"> {{ request.name }}</h2>
                <h3 style="text-justify: auto;">Price : {{ request.rate }} {{ request.unit }}</h3>
                <h3 v-if ="request.qty==0">Out of Stock</h3>
                <div v-else>
                  <div class="request-links">
                <a @click="addtocart(request)">Add to Cart</a>
                </div>
             
              </div>
        </div>
      </div>
      </div>
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
      categories :[],
      products:[],
      viewproduct:
      {
        name:'',
        price:'',
        unit:''

      },
      addedproductdetail:{
        qty:0,
        price:null,
        total:null,
        productid : null
      },
      iscart : false,
   
    };
  },
  methods:{
    
   
      async fetchdata()
      {
      
        const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view');
        if (response.status==200)
        {
          this.categories = response.data.data.category;
        }
        for (let i =0;i<this.categories.length;i++ )
        {
          let category = this.categories[i];
        console.log (category);
        this.products[category.id] =[]
        const product = await axios.get('http://127.0.0.1:5000/api/users/getproducts/'+category.id);
        console.log(product)
        if (product.status ==200)
        {
          this.products[category.id] = product.data.data;
    
        }
          
        }
       
       
    },

    addtocart(request)
    {
      this.viewproduct.name = request.name;
      this.viewproduct.price = request.rate;
      this.viewproduct.unit = request.unit;
      this.addedproductdetail.productid =request.id
      this.iscart =  true;
    },

    async addtocartsubmit()
    {
      this.addedproductdetail.total = this.viewproduct.price * this.addedproductdetail.qty;
       await axios.post('http://127.0.0.1:5000/api/users/addtocart/'+this.$route.params.userid , this.addedproductdetail);
       this.closeoverlay();
      
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
margin-bottom: 30px; /* Increased separation between request sections */
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