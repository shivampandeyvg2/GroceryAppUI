

<template >
<Navbar/>
 <div v-if="showalert" class="alert">
      {{ alertmessage }}
    </div>
    <div class="request-section">
      <div v-if="iseditcategory" class="overlay">
        <div class="profile">
            <button @click="closeoverlay()" class="close-button">&#10005;</button>
            <h2> Edit {{ categorytemplate.title  }}</h2>
            <form @submit.prevent="editcategorysubmit()">
              <div>
                  <label for="title">Title: </label>
                  <input type="text" id="title" v-model="categorytemplate.title" required >
              </div>
              <div>
                <label for="description">Description: </label>
                <textarea id="description" v-model="categorytemplate.description" ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
        </div>
      </div>
  </div>

  <div v-if="iscreateproduct" class="overlay">
    <div class="profile">
      <button @click="closeoverlay()" class="close-button">&#10005;</button>
      <h2> Add a new Product</h2>
      <form @submit.prevent="submitcreateproduct">
        <div>
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="product.name" required>
        </div>
        <div>
          <label for="rate">Product Price:</label>
          <input type="number" id="rate" v-model="product.rate" required>
        </div>
        <div>
          <label for="qty">Stock Quantity:</label>
          <input type="number" id="qty" v-model="product.qty" required>
        </div>
        <div>
          <label for="unit">Unit:</label>
          <select id="unit" v-model="product.unit" required>
            <option value="Rs./unit">Rs./unit</option>
            <option value="Rs./kg">Rs./kg</option>
            <option value="Rs./Litre">Rs./Litre</option>
            <option value="Rs./dozen">Rs./dozen</option>
            <option value="Rs./gram">Rs./gram</option>
          </select>
        </div>
        <div>
          <label for="image">Product Image:</label>
          <input type="file" id="img" @change="handleFileUpload">
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  <div v-if="iseditproduct" class="overlay">
    <div class="profile">
      <button @click="closeoverlay()" class="close-button">&#10005;</button>
      <h2> Edit Product {{ product.name }} </h2>
      <form @submit.prevent="submiteditproduct">
        <div>
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="product.name" required>
        </div>
        <div>
          <label for="rate">Product Price:</label>
          <input type="number" id="rate" v-model="product.rate" required>
        </div>
        <div>
          <label for="qty">Stock Quantity:</label>
          <input type="number" id="qty" v-model="product.qty" required>
        </div>
        <div>
          <label for="unit">Unit:</label>
          <select id="unit" v-model="product.unit" required>
            <option value="Rs./unit">Rs./unit</option>
            <option value="Rs./kg">Rs./kg</option>
            <option value="Rs./Litre">Rs./Litre</option>
            <option value="Rs./dozen">Rs./dozen</option>
            <option value="Rs./gram">Rs./gram</option>
          </select>
        </div>
        <div>
          <label for="image">Want to change  Image?</label>
          <input type="file" id="img" @change="handleFileUpload">
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  <div class="request-section">
      <div v-if="iscreatecategory" class="overlay">
        <div class="profile">
            <button @click="closeoverlay()" class="close-button">&#10005;</button>
            <h2> Request New Category {{ categorytemplate.title  }}</h2>
            <form @submit.prevent="createcategorysubmit()">
              <div>
                  <label for="title">Title: </label>
                  <input type="text" id="title" v-model="categorytemplate.title" required >
              </div>
              <div>
                <label for="description">Description: </label>
                <textarea id="description" v-model="categorytemplate.description" ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
        </div>
      </div>
  </div>



  <div class="request-section">
    <h2 style="text-align: center;">View Categories and Products</h2>
    <div class="request-scroll">
      <div class="request-box">
        <div v-for="(value, index) in categories" :key="index" >
          <div class ="categorydesc">
            <div class ="header">
              <h3 style="text-align: center;">{{ value.title }}</h3>
              <div class ="links">
              <a @click="editcategory(value.id)"> Edit </a>
              <a @click="deletecategory(value.id)"> Delete </a>
              </div>
            </div>
          </div>
          <div class="individual-request-box">
              <div class ="newpeoduct">
                <div class="circle">
                  <a @click="addproduct(value.id)" class="plus">+</a>
                </div>
                <h3 style="color: white;">Add </h3>
              </div>
              <div  v-for="(pair, index) in products[value.id]" :key="index" class ="eachproduct" >
                <img src= "getimgsrc(pair.img)" alt="Request Image" />
                <h2 style="text-align: center;"> {{ pair.name }}</h2>
                <h3 style="text-justify: auto;">Price : {{ pair.rate }} {{ pair.unit }}</h3>
                <h3 style="text-justify: auto;">Stock : {{ pair.qty }} </h3>
                <div class="request-links">
                  <a @click="editproduct(pair.id)">Edit</a>
                  <a @click="deleteproduct(pair.id)">Delete</a>
                </div>
              </div>
          </div>
          
        </div>
        <div class = "newcategory">
          <div class ="newcateg">
                <div class="circle">
                  <a @click="addcategory" class="plus">+</a>
                </div>
                <h3 style="color: white;">Request A new Category </h3>
              </div>
        </div>
      </div>
    </div>
  </div>
            


</template>

<script>
import Navbar from '@/views/staff/NavBar.vue';
import axios from 'axios';

export default {

  components: 
  {
      Navbar
  },
    data() {
    return {
      categories:[],
      showalert: false,
      alertmessage:'',
      categorytemplate:
        {
          title:'',
          description:'',
          id:''
        },
        iseditcategory:false,
        iscreateproduct:false,
        product: {
          name: '',
          rate: '',
          qty: '',
          unit: '',
          img: null ,
          createdby:'',
          category:'',
          id:''
        },
        products :{},
        iseditproduct: false,
        iscreatecategory: false

    
      
    };
  },
  methods:{
   async  fetchdata(){
      const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view');
      if (response.status==200)
      {
        this.categories = response.data.data.category;
      }

      for (let i =0;i<this.categories.length;i++ )
          {
            let category = this.categories[i];
          this.products[category.id] =[]
          const product = await axios.get('http://127.0.0.1:5000/api/staff/product/get/'+category.id+'/'+this.$route.params.userid);
          if (product.status ==200)
          {
            this.products[category.id] = product.data.data;
      
          }
            
          }

    },

    async deletecategory(id)
    {
      const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view/'+id);
        if (response.status==200)
        {
          let body = {
          id: id,
          title: response.data.data.category.title,
          description: response.data.data.category.description,
          };
          body['requestedby'] = this.$route.params.userid;
          body['type'] =4;
          const res =await axios.post('http://127.0.0.1:5000/api/staff/request' , body);
          if (res.status ==200)
          {
            this.alertmessage = "Category deletion request has been logged with admin";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert=false;
            },5000)
          }
          else {
            this.alertmessage = "Could not lodge your request for deletion . Try again";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
            },5000)
          }
          
        }

        else 
        {
          this.alertmessage = "Unable to load page try again";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
            },5000)
        }
  
    },


    async editcategory(id){

      const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view/'+id);
        if (response.status==200)
        {
          this.categorytemplate.id = id;
          this.categorytemplate.title = response.data.data.category.title;
          this.categorytemplate.description = response.data.data.category.description;
          this.iseditcategory = true;
        }
        else 
        {
          this.alertmessage = "Unable to load page try again";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              location.reload();
            },5000)
        }

    },

    closeoverlay()
        {
          this.showalert = false;
          this.alertmessage ='';
          this .categorytemplate = {
            title:'',
          description:'',
          id:''
          },
          this.iseditcategory = false;
          location.reload();
          
        },


    async editcategorysubmit()
    {
          let body = this.categorytemplate;
            body['requestedby'] = this.$route.params.userid;
            body['type'] =2;
  
          const response = await axios.post('http://127.0.0.1:5000/api/staff/request' , body);
          this.iseditcategory=false;
          if (response.status ==200)
          {
            this.alertmessage = "Category edit request has been logged with admin";
            this.showalert = true;
            
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert=false;
              this.closeoverlay();
            },5000)
          }
          else {
            this.alertmessage = "Could not lodge your request for edit . Try again";
            this.showalert = true;
            
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              this.closeoverlay();
            },5000)
          }
          
    },
    handleFileUpload(event) {
        console.log(event.target)
        this.product.img = event.target.files[0];
      },



    async submitcreateproduct()
    {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('rate', this.product.rate);
      formData.append('qty', this.product.qty);
      formData.append('unit', this.product.unit);
      formData.append('img', this.product.img);
      formData.append('category' , this.product.category);
      formData.append('createdby' ,this.$route.params.userid );
      const response = await axios.post('http://127.0.0.1:5000/api/staff/product/create', formData, {headers: {
              'Content-Type': 'multipart/form-data'
            }});
            this.iscreateproduct = false;
      if (response.status==200)
        {
         
          this.alertmessage = "Product added successfully";
          this.showalert = true;
          
          setTimeout(()=>{
            this.alertmessage='';
            this.showalert = false;
            this.closeoverlay();
          },5000)
        }

        else 
        {
          // this.closeoverlay();
          this.alertmessage = "Unable to load page try again";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              this.closeoverlay();
            },5000)
        }
    },

    addproduct(id)
      {
        this.product.category = id;
        this.iscreateproduct = true;
  
      },

      async editproduct(id)
      {
        const response = await axios.get('http://127.0.0.1:5000/api/staff/product/get/' + id);
        if (response.status==200)
        {
          this.product.name= response.data.data.name;
          this.product.rate= response.data.data.rate;
          this.product.qty= response.data.data.qty;
          this.product.createdby= response.data.data.createdby;
          this.product.id = id;
          this.product.unit = response.data.unit;
          this.iseditproduct = true;
         
        }
        else
        {
          this.alertmessage = "Unable to load page try again";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              this.closeoverlay();
            },5000)
        }
      },
      async submiteditproduct()
      {
        const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('rate', this.product.rate);
      formData.append('qty', this.product.qty);
      formData.append('unit', this.product.unit);
      formData.append('createdby' ,this.$route.params.userid );
      if (this.product.img !=null)
      {
        formData.append('img', this.product.img);
      }
      const response = await axios.post('http://127.0.0.1:5000/api/staff/product/edit/'+this.product.id, formData, {headers: {
              'Content-Type': 'multipart/form-data'
            }});
            this.iseditproduct = false;
      if (response.status==200)
        {
         
          this.alertmessage = "Product Edited successfully";
          this.showalert = true;
          
          setTimeout(()=>{
            this.alertmessage='';
            this.showalert = false;
            this.closeoverlay();
          },5000)
        }

        else 
        {
          // this.closeoverlay();
          this.alertmessage = "Error editing the product";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              this.closeoverlay();
            },5000)
        }
      },
      async deleteproduct(id)
      {
        const response = await axios.get('http://127.0.0.1:5000/api/staff/product/remove/' + id);
        if (response.status==200)
        {
          this.alertmessage = "Product Deleted ";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              location.reload();
            },5000)
        }
        else {
          this.alertmessage = "Error Deleting product ";
            this.showalert = true;
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
            },5000)
        }
      },

      addcategory()
      {
        this.iscreatecategory = true;
        this.categorytemplate=
        {
          title:'',
          description:'',
          id:''
        };

      },

     async  createcategorysubmit()
      {
        let body ={
          title:this.categorytemplate.title,
          description:this.categorytemplate.description,
          requestedby:this.$route.params.userid,
          'type' :2
        } 
  
          const response = await axios.post('http://127.0.0.1:5000/api/staff/request' , body);
          this.iseditcategory=false;
          if (response.status ==200)
          {
            this.alertmessage = "Category add request has been logged with admin";
            this.showalert = true;
            
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert=false;
              this.closeoverlay();
            },5000)
          }
          else {
            this.alertmessage = "Could not lodge your request for edit . Try again";
            this.showalert = true;
            
            setTimeout(()=>{
              this.alertmessage='';
              this.showalert = false;
              this.closeoverlay();
            },5000)
          }
      }

  },

  


  
  created() 
  {
    this.fetchdata();    
  }
}

  </script>

  <style scoped>
.request-section {
    margin-bottom: 30px; /* Increased separation between request sections */

  }

  .request-section a {
    cursor: pointer;
    

  }

  .request-scroll {
    overflow-x: scroll; 
    background-color: #f5f5f5; /* Light grey-pink background color */
    padding: 10px;
    border: 1px solid #ccc; 
    margin: 10px;
  }

  .request-box {
    display: flex;
     overflow-x:scroll ;
  
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1px 0;
    margin-left: 10px;
    background-color: #f5f5f5;
    /* Adjust styles for header */
  }

  .categorydesc
  {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid black 5px;
    max-width: 300px;
    padding-right: 10px;
  }


  .links a {
    margin-right: 10px;
    cursor: pointer;
    color: blue;
  }


  .alert {
  padding: 20px;
  background-color: #f44336; /* Red color */
  color: white;
  margin-bottom: 15px;
  position: relative;
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

  .profile {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    /* Ensure visibility */
    visibility: visible;
  }
  
  .close-button {
    position: relative;
    top: 10px;
    flex : right;
    right: 10px;
    font-size: 24px;
    color: #ff0000; 
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
  }

  .individual-request-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin-right: 30px; /* Increased separation between individual request boxes */
    margin-bottom: 30px; /* Increased separation between individual request boxes */
    min-height: 400px;
   min-width: 300px;
   margin: 20px;
   margin-left: 0px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(243, 200, 232);
    max-width: 400px;
    max-height: 70vh;
    overflow-y: scroll;
    
  }

  .addproductsection
  {
    background-color: blanchedalmond;
    text-align: center;
    position: fixed;
  }
  .newpeoduct{
    width: 100px;
    height: 100px;
    align-items: center;
    margin-left: 25%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity (last value) as needed */
    z-index: 1; /* Ensure it's above other content */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .newcateg
  {
    width: 250px;
    height: 100px;
    align-items: center;
    margin-left: 25%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity (last value) as needed */
    z-index: 1; /* Ensure it's above other content */
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
  }

  .eachproduct
  {
    background: 
      linear-gradient(
        45deg, 
        rgba(255, 255, 255, 0.1) 25%, 
        transparent 25%, 
        transparent 75%, 
        rgba(255, 255, 255, 0.1) 75%, 
        rgba(255, 255, 255, 0.1)
      ),
      linear-gradient(
        -45deg, 
        rgba(255, 255, 255, 0.1) 25%, 
        transparent 25%, 
        transparent 75%, 
        rgba(255, 255, 255, 0.1) 75%, 
        rgba(255, 255, 255, 0.1)
      );
    background-size: 4px 4px; 
  background-color: rgb(226, 224, 224);
  margin : 5px;
  margin-bottom: 30px;
   
  
  }

  .request-links a {
   
   margin-right: 10px;
   text-decoration: underline;
   cursor: pointer;
   background-color: white;
   color: blue;
 }


 .newcategory
 {
  width : 100px;
  height: 100px;
  position: relative;
  margin-top: 25vh;
  
 }

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