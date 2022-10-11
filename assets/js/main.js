// data table
$(".DataTable").DataTable();



// get the field
//pd call
const pdList = document.querySelector("#pdList");
const productCreate = document.querySelector("#productCreate");
const smsPD = document.querySelector(".smsPD");
const displayProduct = document.querySelector("#displayProduct");
const productpudate = document.querySelector("#productpudate");
//tag call
const tagDisplay = document.querySelector('#tagDisplay');
const TagCreate = document.querySelector('#TagCreate');
const smstag = document.querySelector('.smstag');
const shopTagDisplay = document.querySelector('#shopTagDisplay');
const tagForm = document.querySelector('#tagForm');
const TagUpdate = document.querySelector('#TagUpdate');
//category call
const categoryList = document.querySelector('#categoryDisplay');
const shopCategory = document.querySelector('#shopCategory');
const categorySelect = document.querySelector('#categorySelect');
const CatCreate = document.querySelector('#CatCreate');
const smscat = document.querySelector('#smscat');
const CatUpdate = document.querySelector('#CatUpdate');
//brand call
const brandDisplay = document.getElementById("brandDisplay");
const brandForm = document.getElementById("brand_form");
const BrandForm = document.getElementById("BrandForm");
const BrandDisplay = document.getElementById("BrandDisplay");
const updateBrandForm = document.getElementById("update_brandForm");


/**
 * @desc Display product list on admin panel
 * @name GET https://online-shop-rest-api-app.herokuapp.com/api/v1/product
 * @access public
*/

const productDisplayList = async () => {

    try{
      await axios.get("https://online-shop-rest-api-app.herokuapp.com/api/v1/product")
      .then(res => {
       
        //admin list pd
        if(res.statusText == "OK"){
          let html = "";
          res?.data.forEach((pd, index) => {
           
            html += `<tr>
                  <td>${index + 1}</td>
                  <td>${pd?.name}</td>
                  <td>${pd?.regularPrice}</td>
                  <td>${pd?.salePrice}</td>
                  <td>${pd?.stock}</td>
                  <td>
                     <span class="badge ${
                       pd?.status == "published" ? `bg-success` : `bg-danger`
                     }">${pd?.status}</span>
                  </td>
                  <td>
                  ${(pd?.product_photo != "") ? `<img class="pdImage" src="https://online-shop-rest-api-app.herokuapp.com/product/${pd?.product_photo[0]}" alt="${pd?.product_photo[0]}">` : `<img class="pdImage" src="//i.ibb.co/vzzJm1V/Tshirt.jpg" alt="">`}  
                  </td>
                  <td>
                      <a edit_view="${pd?.id}" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_product"><i class="fas fa-edit"></i></a>
                      <a delete_item="${pd?.id}"  class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
                  </td>
              </tr>`;
          });

          //pdList set
          if(pdList){
            pdList.innerHTML = html;
          }
          
          //shop page
          const shopData = res?.data.filter(item => item.status == "published");

          let shopPD = "";
          shopData.forEach((pd, index) => {
           
            shopPD += `<div class="col-md-4 mb-3">
                          <div class="product-item">
                              <div class="card">
                              ${(pd?.product_photo != "") ? `<img class="card-img" src="https://online-shop-rest-api-app.herokuapp.com/product/${pd?.product_photo[0]}" alt="${pd?.product_photo[0]}">` : `<img class="card-img" src="//i.ibb.co/vzzJm1V/Tshirt.jpg" alt="">`} 
                                 
                                  <div class="card-body">
                                      <h6>${pd?.name}</h6>
                                      <p>Price : <del>${pd?.regularPrice}</del> ${pd?.salePrice} BDT</p>
                                  </div>
                                  <div class="card-footer">
                                      <div class="my-button text-center">
                                          <a class="btn btn-info btn-sm" href="#single_product" data-bs-toggle="modal">View Product</a>
                                          <a class="btn btn-warning btn-sm" href="#">Buy Now</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      `;
                });
          //show product data
          if(displayProduct){
            displayProduct.innerHTML = shopPD;
          }
         

        }

      })
      .catch(err => {
        console.log(err);
      })
    }catch(err){
      console.log(err);
    }

}

productDisplayList();

/**
 * @desc product Create on admin panel
 * @name POST https://online-shop-rest-api-app.herokuapp.com/api/v1/product
 * @access public
*/
if(productCreate){
productCreate.onsubmit = (e) => {
    //preventDefault
    e.preventDefault();

    //Get Form Data
    const getFormData = new FormData(e.target);

    //error handling
    try{

      axios.post("https://online-shop-rest-api-app.herokuapp.com/api/v1/product",getFormData)
      .then(res => {
         
        productDisplayList();

        //form reset
        e.target.reset(); 

        //show massage
        smsPD.innerHTML = `<div class="alert alert-success" role="alert">
            Product has been Create success!
          </div>`;

      })
      .catch(err => {
        console.log(err);
      });

    }catch(err){
       console.log(err);
    }


}

}

/**
 * @desc Product Single data Update
 * @name put https://online-shop-rest-api-app.herokuapp.com/api/v1/product/id
 * @access public
*/

if(pdList){
  pdList.onclick = async (e) => {
    e.preventDefault()

    //get id
    const SingleId = e.target.getAttribute("edit_view");
    if(SingleId){
      //error handling
      try{
         axios.get('https://online-shop-rest-api-app.herokuapp.com/api/v1/product')
         .then(res => {
          const singleData = res.data.find(pd => pd.id == SingleId);
          
          const formData = `<div class="my-3">
                    <label for="Name">Name</label>
                    <input
                    value="${singleData.name}"
                      required
                      name="name"
                      id="Name"
                      type="text"
                      class="form-control"
                    />
                    <input
                    value="${singleData.id}"
                      name="id"
                      type="hidden"
                    />
                  </div>
                  <div class="my-3">
                    <label for="regularPrice">regular price</label>
                    <input
                    value="${singleData.regularPrice}"
                      name="regularPrice"
                      id="regularPrice"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="my-3">
                    <label for="salePrice">Sale Price</label>
                    <input
                      required
                      value="${singleData.salePrice}"
                      name="salePrice"
                      type="text"
                      id="salePrice"
                      class="form-control"
                    />
                  </div>
                  <div class="my-3">
                    <label for="Stock">Stock</label>
                    <input
                    value="${singleData.stock}"
                      required
                      name="stock"
                      type="text"
                      id="Stock"
                      class="form-control"
                    />
                  </div>
                  <div class="my-3">
                    <label for="category">Category</label>
                    <select class="form-control" name="category" id="category">
                      <option value="">-SELECT-</option>
                    </select>
                  </div>
                  <div class="my-3">
                    <label for="Brand">Brand</label>
                    <select class="form-control" name="brand" id="Brand">
                      <option value="">-SELECT-</option>
                    </select>
                  </div>
                  <div class="my-3">
                    <label for="tag">Tag</label>
                    <select class="form-control" name="tag" id="tag">
                      <option value="">-SELECT-</option>
                    </select>
                  </div>
                  <div class="my-3">
                    <label for="Photo">Photo</label>
                    <input
                      type="file"
                      id="product_photo"
                      name="product_photo"
                      multiple
                      class="form-control"
                    />
                  </div>
                  <div class="my-3">
                    <label for="Status">Status</label>
                    <select required class="form-control" name="status" id="Status">
                      <option ${(singleData?.status == "published") ? "selected" : ""} value="published">Published</option>
                      <option ${(singleData?.status == "unPublished") ? "selected" : ""} value="unPublished">UnPublished</option>
                    </select>
                  </div>
                  <div class="my-3">
                    <label for="Description">Description</label>
                    <textarea
                      name="desc"
                      class="form-control"
                      id="Description"
                      cols="30"
                      rows="10"
                    >${singleData.desc}</textarea>
                  </div>
                
              <div class="my-3">
                <input type="submit" class="btn btn-primary w-100" />
              </div>`;

              if(productpudate){
                  productpudate.innerHTML = formData;
                }

         })
         .catch(err => console.log(err));
      }catch(err){
         console.log(err);
      }

    }

    //delete get id
    const deleteId = e.target.getAttribute("delete_item");

    if(deleteId){
      try{
        if(confirm("Are you sure? you want to delete this product!!")){
            axios.delete(`https://online-shop-rest-api-app.herokuapp.com/api/v1/product/${deleteId}`)
            .then(res => {
              productDisplayList();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }catch(err){
        console.log(err);
      }
    }
   
  }
}


//product update
if(productpudate){
    productpudate.onsubmit = async(e) => {
        //preventDefault
        e.preventDefault();
      
        //Get Form Data
        const getFormData = new FormData(e.target);

        const formData = Object.fromEntries(getFormData.entries());
        //error handling
        try {
          //fetch product api
         await axios.put(`https://online-shop-rest-api-app.herokuapp.com/api/v1/product/${formData.id}`,getFormData)
          .then((res) => {
              alert("product update successfully")
              productDisplayList();
            })
            .catch((err) => {
              console.log(err.message);
            });

        } catch (err) {
          console.log(err.message);
        }
    };
    
}


/**
 * @desc Get All Tag 
 * @name GET api/v1/tag
 * @access public 
 */

const TagDisplay = async () => {
    
   //error handling
   try {
    //fetch product api
   await axios.get(`https://online-shop-rest-api-app.herokuapp.com/api/v1/tag/`)
    .then((res) => {
       let TagHTML = '';
        res?.data?.forEach((tag,index) => {
          TagHTML += `<tr>
                <td>${index + 1}</td>
                <td>${tag.name}</td>
                <td>${tag.slug}</td>
                <td>
                <span class="badge ${
                  tag?.status == "published" ? `bg-success` : `bg-danger`
                }">${tag?.status}</span>
                </td>
                <td>
                    <a edit_tag="${tag.id}" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_tag"><i class="fas fa-edit"></i></a>

                    <a delete_tag="${tag.id}" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
                </td>
            </tr>`;
        });

        if(tagDisplay){
          tagDisplay.innerHTML = TagHTML
        }

        //tag display
        let shopTag = "";
        res?.data?.forEach(tag => {
          shopTag += `<a href="?${tag.slug}">${tag.name}</a>`;
        })
        if(shopTagDisplay){
          shopTagDisplay.innerHTML = shopTag;
        }

        //tag show Form
        let pdFormTag = '<option value="">-SELECT-</option>';
        res?.data?.forEach(tag => {
          pdFormTag += `<option value="${tag.slug}">${tag.name}</option>`;
        });

        if(tagForm){
          tagForm.innerHTML = pdFormTag;
        }

      })
      .catch((err) => {
        console.log(err.message);
      });

  } catch (err) {
    console.log(err.message);
  }

}

TagDisplay();


/**
 * @desc Create Tag 
 * @name POST api/v1/tag
 * @access public
 */

if(TagCreate){
  TagCreate.onsubmit = async (e) => {
    //preventDefault
     e.preventDefault();

     //get form data
    const tagForm = new FormData(e.target);
    const TagData = Object.fromEntries(tagForm.entries());
  
    //error handling
     try {
        //api call
        await axios.post(`https://online-shop-rest-api-app.herokuapp.com/api/v1/tag/`,TagData)
        .then(res => {
           if(res.statusText == "Created"){
            TagDisplay();
          
            //form reset
            e.target.reset(); 

            //show massage
            smstag.innerHTML = `<div class="alert alert-success" role="alert">
                Tag has been Create success!
              </div>`;

           }
        })
        .catch(err => {
          console.log(err.message);
        });
     }catch(err){
      console.log(err.message);
     }
  }
}

/**
 * @desc Tag Single data Update and Delete
 * @name PUT  and DELETE api/v1/tag/id
 * @access public
 */

if(tagDisplay){

  tagDisplay.onclick = async (e) => {
    e.preventDefault()
  
    //get id
    const tagEditId = e.target.getAttribute("edit_tag");
    const tagDeleteId = e.target.getAttribute("delete_tag");
   
    //edit tag data
    if(tagEditId){
     
      try{
        await axios.get(`https://online-shop-rest-api-app.herokuapp.com/api/v1/tag/`)
        .then(res => {
          
           const singleEditTag = res?.data?.find(item => item.id == tagEditId);

           let tagUpdateHtml = `<div class="my-3">
                  <label for="Name">TAG Name</label>
                  <input
                    required
                    name="name"
                    id="Name"
                    type="text"
                    class="form-control"
                    value="${singleEditTag?.name}"
                  />
                  <input
                    required
                    name="id"
                    id="Name"
                    type="hidden"
                    class="form-control"
                    value="${singleEditTag?.id}"
                  />
                </div>
                <div class="my-3">
                  <label for="Status">Status</label>
                  <select required class="form-control" name="status" id="Status">
                  <option ${(singleEditTag?.status == "published") ? "selected" : ""} value="published">Published</option>
                  <option ${(singleEditTag?.status == "UNPublished") ? "selected" : ""} value="unPublished">UNPublished</option>
                  </select>
                </div>
                <div class="my-3">
                  <input type="submit" class="btn btn-primary w-100" />
                </div>`;

                if(TagUpdate){
                  TagUpdate.innerHTML = tagUpdateHtml;
                }

          })
        .catch(err => {
          console.log(err.message);
        })

      }catch(err){
        console.log(err.message);
      }

    }

    //delete tag data
if(tagDeleteId){

    try{
          if(confirm("Are you sure? you want to delete this Tag!!")){
            axios.delete(`https://online-shop-rest-api-app.herokuapp.com/api/v1/tag/${tagDeleteId}`)
            .then(res => {
              TagDisplay();
            })
            .catch(err => {
              console.log(err);
            });
         }
      }catch(err){
        console.log(err);
      }

    }

  }

}



//Tag update
if(TagUpdate){
  TagUpdate.onsubmit = async(e) => {
      //preventDefault
      e.preventDefault();
    
      //Get Form Data
      const getFormTag = new FormData(e.target);

      const TagformData = Object.fromEntries(getFormTag.entries());
      //error handling
      try {
        //fetch product api
       await axios.put(`https://online-shop-rest-api-app.herokuapp.com/api/v1/tag/${TagformData.id}`,TagformData)
        .then((res) => {
          alert("Tag update successfully")
             TagDisplay();
          })
          .catch((err) => {
            console.log(err.message);
          });

      } catch (err) {
        console.log(err.message);
      }
  };
  
}

/**
 * @desc All Category info display
 * @name GET api/v1/category
 * @access public
 */
 const categoryDisplay = async () => {
    
  //error handling
  try {
   //fetch product api
  await axios.get(`https://online-shop-rest-api-app.herokuapp.com/api/v1/category/`)
   .then((res) => {
      let catHTML = '';
       res?.data?.forEach((cat,index) => {
        catHTML += ` <tr>
                    <td>${index + 1}</td>
                    <td>${cat.name}</td>
                    <td>${cat.slug}</td>
                    <td>
                    ${(cat?.category_photo != "") ? `<img class="pdImage" src="https://online-shop-rest-api-app.herokuapp.com/category/${cat?.category_photo}" alt="${cat.name}">` : `<img class="pdImage" src="//i.ibb.co/vzzJm1V/Tshirt.jpg" alt="">`} 
                    </td>
                    <td>
                      <span class="badge ${
                        cat?.status == "published" ? `bg-success` : `bg-danger`
                      }">${cat?.status}</span>
                    </td>
                    <td>
                    <a edit_cat="${cat?.id}" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_cat"><i class="fas fa-edit"></i></a>
                    <a delete_cat="${cat?.id}"  class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>`;
       });

       if(categoryList){
        categoryList.innerHTML = catHTML;
       }

       //Category display
       let shopCat = "";
       res?.data?.forEach(cat => {
        shopCat += `<li><a href="?${cat.slug}">${cat.name}</a></li>`;
       })
       if(shopCategory){
        shopCategory.innerHTML = shopCat;
       }

       //Category show Form
       let pdFormCat = '<option value="">-SELECT-</option>';
       res?.data?.forEach(tag => {
        pdFormCat += `<option value="${tag.slug}">${tag.name}</option>`;
       });

       if(categorySelect){
        categorySelect.innerHTML = pdFormCat;
       }

     })
     .catch((err) => {
       console.log(err.message);
     });

 } catch (err) {
   console.log(err.message);
 }

}

categoryDisplay();


/**
 * @desc Create Category info
 * @name POST api/v1/category
 * @access public
 */
if(CatCreate){
  //category create
  CatCreate.onsubmit = (e) => {
    //preventDefault
    e.preventDefault();

     //Get Form Data
     const getFormData = new FormData(e.target);

     //error handling
     try{
 
       axios.post("https://online-shop-rest-api-app.herokuapp.com/api/v1/category/",getFormData)
       .then(res => {
          
        categoryDisplay();
 
        //form reset
        e.target.reset(); 
 
        //show massage
        if(smscat){
          smscat.innerHTML = `<div class="alert alert-success" role="alert">
             Product has been Create success!
           </div>`;
        }

       })
       .catch(err => {
         console.log(err);
       });
 
     }catch(err){
        console.log(err);
     }
 
 
 }

}

/**
 * @desc Category Single data Update and delate
 * @name PUT api/v1/category/id / DELETE api/v1/category/id
 * @access public
 */
if(categoryList){
  categoryList.onclick = async (e) =>{
    e.preventDefault();

    //get id
    const catEditId = e.target.getAttribute("edit_cat");
    const catDeleteId = e.target.getAttribute("delete_cat");

    //Edit cat
    if(catEditId){
      try{
        await axios.get(`https://online-shop-rest-api-app.herokuapp.com/api/v1/category/`)
        .then(res => {
          
           const singleEditCat = res?.data?.find(item => item.id == catEditId);

           let catUpdateHtml = `
              <div class="my-3">
                      <label for="Name">Category Name</label>
                      <input
                        required
                        name="name"
                        id="Name"
                        type="text"
                        class="form-control"
                        value="${singleEditCat.name}"
                      />
                      <input name="id" type="hidden" value="${singleEditCat.id}" />
                    </div>
                    <div class="my-3">
                        <label for="Photo">Photo</label>
                        <input
                          type="file"
                          id="product_photo"
                          name="category_photo"
                          class="form-control"
                        />
                    </div>
                <div class="my-3">
                  <label for="Status">Status</label>
                  <select required class="form-control" name="status" id="Status">
                  <option ${(singleEditCat?.status == "published") ? "selected" : ""} value="published">Published</option>
                  <option ${(singleEditCat?.status == "UNPublished") ? "selected" : ""} value="UNPublished">UNPublished</option>
                  </select>
                </div>
                <div class="my-3">
                  <input type="submit" class="btn btn-primary w-100" />
                </div>`;

                if(CatUpdate){
                  CatUpdate.innerHTML = catUpdateHtml;
                }

          })
        .catch(err => {
          console.log(err.message);
        })

      }catch(err){
        console.log(err.message);
      }
    }

    //DElete cat
    if(catDeleteId){
        try{
          if(confirm("Are you sure? you want to delete this Tag!!")){
            axios.delete(`https://online-shop-rest-api-app.herokuapp.com/api/v1/category/${catDeleteId}`)
            .then(res => {
              categoryDisplay();
            })
            .catch(err => {
              console.log(err);
            });
          }
        }catch(err){
          console.log(err);
        }

    }


  }
}


/**
 * @desc Category Single data Update 
 * @name PUT api/v1/category/id
 * @access public
 */


//Tag update
if(CatUpdate){
  CatUpdate.onsubmit = async(e) => {
      //preventDefault
      e.preventDefault();
    
      //Get Form Data
      const getFormCat = new FormData(e.target);

      const catFormData = Object.fromEntries(getFormCat.entries());
      //error handling
      try {
        //fetch product api
       await axios.put(`https://online-shop-rest-api-app.herokuapp.com/api/v1/category/${catFormData.id}`,getFormCat)
        .then((res) => {
          alert("category update successfully")
            categoryDisplay();
          })
          .catch((err) => {
            console.log(err.message);
          });

      } catch (err) {
        console.log(err.message);
      }
  };
  
}

/**
 * @desc get all  brand
 * @name GET api/v1/brand
 * @access public
*/

 const getAllBrand = async () => {
  // error handling

  try {
    await axios.get("https://online-shop-rest-api-app.herokuapp.com/api/v1/brand")

      .then((res) => {
        let brandList = "";

        res?.data?.forEach((item, index) => {
          brandList += `

                <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.slug}</td>
                <td>
            <span class="badge  ${
              item?.status == "published" ? 'bg-success' : 'bg-danger'
            }">${item?.status}</span>

            </td>
            <td>
            <a edit_brand="${
              item?.id
            }" data-bs-toggle="modal" class="btn btn-sm btn-warning" href="#update_brand"><i class="fas fa-edit"></i></a>

            <a delete_brand="${
              item?.id
            }" class="btn btn-sm btn-danger" href="#"><i class="fas fa-trash"></i></a>
            </td>
            </tr>
            
                `;
        });

        if (brandDisplay) {
          brandDisplay.innerHTML = brandList;
        }

        // brand display

        const brandPublish = res.data.filter(
          (data) => data?.status == "published"
        );
        let brandTag = "";

        brandPublish?.forEach((brand) => {
          brandTag +=  `<a href="?/${brand.name}">${brand.name}</a> `;
        });

        if (BrandDisplay) {
          BrandDisplay.innerHTML = brandTag;
        }

        // brand form
        let shopFormBrand = '<option value="">-SELECT-</option>';

        let publishBrand = res?.data?.filter(item => item.status == "published")

        publishBrand.forEach((brand) => {
          shopFormBrand += `<option value="${brand.slug}">${brand.name}</option> `;
        });

        if (BrandForm) {
          BrandForm.innerHTML = shopFormBrand;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

getAllBrand();

/**
 * @desc create a new brand
 * @name POST api/v1/brand
 * @access public
 */

if (brandForm) {
  brandForm.onsubmit = async (e) => {
    e.preventDefault();

    const branFormData = new FormData(e.target);

    const branData = Object.fromEntries(branFormData.entries());

    // error handling

    try {
      await axios.post("https://online-shop-rest-api-app.herokuapp.com/api/v1/brand", branData)

        .then((res) => {
          getAllBrand();
          e.target.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

// edit delete update

if (brandDisplay) {
  brandDisplay.onclick = async (e) => {
    e.preventDefault();

    // get id

    const brandEdit = e.target.getAttribute("edit_brand");
    const brandDelete = e.target.getAttribute("delete_brand");

    // edit brand

    if (brandEdit) {
      try {
        await axios
          .get(`https://online-shop-rest-api-app.herokuapp.com/api/v1/brand`)
          .then((res) => {
            const singlesEdit = res?.data?.find((item) => item.id == brandEdit);

            let brandEditD = `
                    
                    <div class="my-3">
                        <label for="name">Brand Name</label>
                        <input required name="name" id="Name" value="${
                          singlesEdit?.name
                        }" type="text" class="form-control" />
                        <input  name="id" value="${
                          singlesEdit?.id
                        }" type="hidden"/>
                    </div>
                        <label for="status">Status</label>
                        <select required class="form-control" name="status" id="status">
                            < <option ${
                              singlesEdit?.status == "published"
                                ? "selected"
                                : ""
                            } value="published">published</option>
                            <option ${
                              singlesEdit?.status == "unPublished"
                                ? "selected"
                                : ""
                            }  value="unPublished">unPublished</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <input type="submit" class="btn btn-primary w-100" />
                    </div>
                    
                    `;

            if (updateBrandForm) {
              updateBrandForm.innerHTML = brandEditD;
            }
          })
          .catch((err) => {
            console.log(err.massage);
          });
      } catch (error) {
        console.log(error.massage);
      }
    }

    // delete brand

    if (brandDelete) {
      try {
        if (confirm("Are You Sure ? You Want To Delete This Tag !!")) {
          await axios.delete(`https://online-shop-rest-api-app.herokuapp.com/api/v1/brand/${brandDelete}`)

            .then((res) => {
              getAllBrand();
            })

            .catch((err) => {
              console.log(err.massage);
            });
        }
      } catch (error) {
        console.log(error.massage);
      }
    }
  };
}

// update brand

if (updateBrandForm) {
  updateBrandForm.onsubmit = async (e) => {
    // prevent default
    e.preventDefault();

    // get form data

    const getFormBrand = new FormData(e.target);

    const formDataB = Object.fromEntries(getFormBrand.entries());

    // error handling

    try {
      await axios.put(`https://online-shop-rest-api-app.herokuapp.com/api/v1/brand/${formDataB.id}`, formDataB)

        .then((res) => {
          getAllBrand();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
}





