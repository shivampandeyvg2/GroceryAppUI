<template>
    <div>
      <Navbar /> 
      <div class="request-section">
        <div v-if="iscreate" class="overlay">
        <div class="profile">
            <button @click="closeoverlay()" class="close-button">&#10005;</button>
            <form @submit.prevent="submitcreate">
                <div>
                    <label for="title">Title: </label>
                    <input type="text" id="title" v-model="formData.title" required>
                </div>
                <div>
                <label for="description">Description: </label>
                <textarea id="description" v-model="formData.description"></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>

        <div v-if="isview" class="overlay">
            <div class="profile">
                <button @click="closeoverlay()" class="close-button">&#10005;</button>
                <h2>Category Details : </h2>
                <p>Category Id: {{ viewdata.id }}</p>
                <p>Name: {{viewdata.title  }}</p>
                <p>Description: {{viewdata.description  }}</p>
                <p>Created On : {{viewdata.createdon  }}</p>
            </div>
        </div>

        <div v-if="isedit" class="overlay">
            <div class="profile">
                <button @click="closeoverlay()" class="close-button">&#10005;</button>
                <form @submit.prevent="submitcreate">
                <div>
                    <label for="title">Title: </label>
                    <input type="text" id="title" v-model="formData.title" required value = "{{ editdata.title }}">
                </div>
                <div>
                <label for="description">Description: </label>
                <textarea id="description" v-model="formData.description" value = "{{ editdata.description }}"></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>

    </div>
    </div>

   

     
        <div v-if="categories.length > 0">
            <div class ="navbar1">
                <ul>
                  <li>  <h2 style="text-align:  center; ">Existing Categories</h2></li>
                    <li><a @click="create()" >Create New Category</a></li>
                </ul>
               
            </div>
            
           
            
            <div class="request-scroll">
            <div class="request-box">
          <div v-for="(request, index) in categories" :key="index" class="individual-request-box">
            <!-- Individual request box for account creation request -->
            <img :src="require('../../../public/images/categ.png')" alt="Request Image" />
            <h3> {{ request.title }}</h3>
            <div class="request-links">
              <a @click="view(request)">View</a>
              <a @click="edit(request)">Edit</a>
              <a @click="delet(request)">Delete</a>
            </div>
          </div>
        </div>
      </div>

        </div>
        <div v-else>
            <div class="content-box">
      <h2>No Existing Categories . To Add Categories Click Below</h2>
      <div class="upload-icon">
        <a @click="create()">+</a>
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
        categories: [], 
        iscreate:false,
        isedit:false,
        isview:false,
        editdata:{},
        viewdata : {},
        formData: {
        title: '',
        description: '',
            }
      };
    },
    methods: {
      create(){
        this.iscreate = true;
        this.editdata = {}

      },
     async  view (request)
      {
        const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view/'+request.id);
        if (response.status==200)
        {
            this.isview = true;
            this.viewdata = response.data.data.category;
        }
      }, 
      async edit(request)
      {
        const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view/'+request.id);
        console.log(response)
        if (response.status==200)
        {
            this.isedit = true;
            this.formData.title = response.data.data.category.title;
            this.formData.description = response.data.data.category.description;
        }
      },
      async delet(request)
      {
        await axios.get('http://127.0.0.1:5000/api/category/admin/remove/'+request.id);
        location.reload();
      },
      async submitcreate()
      {
         await axios.post('http://127.0.0.1:5000/api/category/admin/create', this.formData);
        this.formData.title='';
        this.formData.description= '';
        this.isview = false;
        location.reload();
      },
      async submitedit()
      {
        await axios.post('http://127.0.0.1:5000/api/category/admin/edit'+this.editdata.id, this.formData);
        this.formData.title='';
        this.formData.description= '';
        this.isview = false;
        location.reload();
      },
    
     

      closeoverlay()
      {
        this.isview = false;
        this.isedit = false;
        this.iscreate = false;
        this.editdata ={};
        this.viewdata = {};
        this.formData ={title: '',
        description: '',
            };
      },

      async fetchdata(){
        try {
        const response = await axios.get('http://127.0.0.1:5000/api/category/admin/view');
        this.categories = response.data.data.category;
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
  max-width: 250px; /* Adjust the max-width of the image */
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
.upload-icon {
      display: block;
      margin: 20px auto;
      width: 60px;
      height: 60px;
      background-color: #333;
      color: white;
      border-radius: 50%;
      line-height: 60px;
      font-size: 36px;
      cursor: pointer;
    }

    .content-box {
      text-align: center;
      margin-top: 50px;
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
  color: #ff0000; 
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
}

a:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .navbar1 {
    background-color: white;
    color: black;   padding: 10px;
  }
  
  .navbar1 ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  
  .navbar1 ul li {
    margin: 0 10px;
  }
  
  .navbar1 ul li a {
    color: blue;
    text-decoration: none;
  }
  
  .navbar1 ul li a:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  </style>
