import React, { useEffect, useRef, useState } from 'react';
import { CategoryBooks } from '../../../StaticsData/data';
import { IoAddCircleSharp } from 'react-icons/io5';
import NoImage from '../../../../public/NoImage.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import './AddNewProduct.css';
import { ApiCreateProduct, ApiGetProduct, ApiUpdateProduct, ApiUploadImage } from '../../../redux/api/ApiProduct';
const AddNewProduct = () => {
   const inputRef = useRef();
   const [idCategory, setIdCategory] = useState(0);
   const [image, setImage] = useState(null);
   const [listBase64, setListBase64] = useState([null, null, null, null, null]);
   const [previews, setPreviews] = useState([null, null, null, null, null]);

   const [product, setProduct] = useState({
      name_product: null,
      price_product: null,
      arist_product: null,
      brand_product: null,
      stores_product: null,
      number_product: null,
      discount: null,
      description_product: null,
      image: null,
      image_2: null,
      image_3: null,
      image_4: null,
      image_5: null,
      category_product: 'Sách Tiếng Việt',
      type_product: 'Thiếu Nhi',
   });

   useEffect(() => {
      const id = window.location.href.split('/')[6];
      if (id) {
         ApiGetProduct({ id_product: id }).then((data) => {
            setProduct(data?.product);
            setImage(data?.product.image);
            setPreviews([data?.product.image, data?.product.image_2, data?.product.image_3, data?.product.image_4, data?.product.image_5]);
            setListBase64([data?.product.image, data?.product.image_2, data?.product.image_3, data?.product.image_4, data?.product.image_5]);
         });
      }
   }, []);

   const handleCreateProduct = () => {
      function removeNullElements(array) {
         const filteredArray = array.filter((element) => element !== null);
         return filteredArray;
      }
      const listFile = removeNullElements(listBase64);
      ApiUploadImage(listFile).then((data) => {
         console.log(data.data.listImages);
         const res = {
            ...product,
            image: data.data.listImages[0] || null,
            image_2: data.data.listImages[1] || null,
            image_3: data.data.listImages[2] || null,
            image_4: data.data.listImages[3] || null,
            image_5: data.data.listImages[4] || null,
         };

         ApiCreateProduct(res).then((result) => {
            window.location.href = '/admin/products';
         });
      });
   };

   const handleChooseImages = (e, index) => {
      const file = e.target.files[0];
      if (file) {
         const image = URL.createObjectURL(file);
         console.log(index);
         setPreviews((prev) => {
            let newPreview = [...prev];
            const nestValueNull = previews.indexOf(null);
            if (nestValueNull !== -1) {
               newPreview[nestValueNull] = image;
            }
            return newPreview;
         });
         const reader = new FileReader();
         reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            console.log(reader.result);
            setListBase64((prev) => {
               let newPreview = [...prev];
               const nestValueNull = newPreview.indexOf(null);
               if (nestValueNull !== -1) {
                  newPreview[nestValueNull] = reader.result;
               }
               return newPreview;
            });
         };
         reader.readAsDataURL(file);
      }
   };

   const handleDeleteImage = (index) => {
      console.log(index);
      setListBase64((base) => {
         let newBase = [...base];
         newBase[index] = null;
         return newBase;
      });
      setPreviews((prev) => {
         let newPreview = [...prev];
         newPreview[index] = null;
         return newPreview;
      });
   };

   const handleUpdateProduct = () => {
      function removeNullElements(array) {
         const filteredArray = array.filter((element) => element !== null);
         return filteredArray;
      }
      const listFile = removeNullElements(listBase64);
      console.log(listBase64);
      ApiUploadImage(listFile).then((data) => {
         console.log(data.data.listImages);
         const res = {
            ...product,
            id_products: window.location.href.split('/')[6],
            image: data.data.listImages[0] || null,
            image_2: data.data.listImages[1] || null,
            image_3: data.data.listImages[2] || null,
            image_4: data.data.listImages[3] || null,
            image_5: data.data.listImages[4] || null,
         };

         ApiUpdateProduct(res).then((result) => {
            window.location.href = '/admin/products';
         });
      });
   };
   return (
      <div className="w-full h-[550px] bg-main-bg grid grid-cols-10 gap-4 p-8 text-white overflow-y-auto">
         <div className="col-span-7 p-4">
            <h2 className="text-18 text-white">Thêm sản phẩm mới</h2>
            <div className="w-full mt-4 p-6 flex flex-col gap-3 bg-[#64748b] h-max rounded-lg">
               <h2 className="text-16">Thông tin sản phẩm</h2>
               <div className="flex flex-col gap-2 w-full h-max">
                  <span className="ml-2 text-14">Tên sản phẩm :</span>
                  <input
                     type="text"
                     className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                     value={product?.name_product}
                     onChange={(e) =>
                        setProduct({
                           ...product,
                           name_product: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="flex flex-col gap-2 w-full h-max">
                  <span className="ml-2 text-14">Tên tác giả :</span>
                  <input
                     type="text"
                     value={product?.arist_product}
                     className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                     onChange={(e) =>
                        setProduct({
                           ...product,
                           arist_product: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="flex flex-col gap-2 w-full h-max">
                  <span className="ml-2 text-14">Mô tả sản phẩm :</span>
                  <textarea
                     type="text"
                     value={product?.description_product}
                     className="w-full outline-none p-4 h-28 rounded-[4px] bg-[#546277]"
                     onChange={(e) => setProduct({ ...product, description_product: e.target.value })}
                  ></textarea>
               </div>
            </div>

            <div className="w-full mt-4 p-6 flex flex-col gap-3 bg-[#64748b] h-max rounded-lg">
               <h2 className="text-16 text-white">Thông tin về giá và nhà cung cấp</h2>
               <div className="gap-3 grid grid-cols-2 grid-rows-2">
                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Giá bán :</span>
                     <input
                        value={Math.floor(product?.price_product).toFixed(0)}
                        type="text"
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                        onChange={(e) =>
                           setProduct({
                              ...product,
                              price_product: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Giảm giá :</span>
                     <input
                        type="text"
                        value={product?.discount}
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                        onChange={(e) =>
                           setProduct({
                              ...product,
                              discount: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Số lượng :</span>
                     <input
                        type="text"
                        value={product?.number_product}
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                        onChange={(e) =>
                           setProduct({
                              ...product,
                              number_product: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Giá sau giảm :</span>
                     <input
                        type="text"
                        value={Math.round((product?.price_product * (100 - product?.discount)) / 100)}
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                     />
                  </div>
               </div>
            </div>

            <div className="w-full mt-4 p-6 flex flex-col gap-3 bg-[#64748b] h-max rounded-lg">
               <h2 className="text-16 text-white">Phân loại sản phẩm</h2>
               <div className="w-full gap-6 grid grid-cols-2">
                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Loại sản phẩm :</span>
                     <select
                        value={product?.category_product}
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                        onChange={(e) => {
                           const id = CategoryBooks.filter((item) => item.title === e.target.value);
                           console.log(CategoryBooks[id[0].id - 1].items[0].title);
                           setProduct({
                              ...product,
                              category_product: e.target.value,
                              type_product: CategoryBooks[id[0].id - 1].items[0].title,
                           });
                           setIdCategory(id[0].id - 1);
                        }}
                     >
                        {CategoryBooks.map((category, index) => {
                           return (
                              <option key={index} value={category.title}>
                                 {category.title}
                              </option>
                           );
                        })}
                     </select>
                  </div>

                  <div className="flex flex-col gap-2 w-full h-max">
                     <span className="ml-2 text-14">Phân loại sản phẩm :</span>
                     <select
                        value={product?.type_product}
                        className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                        onChange={(e) =>
                           setProduct({
                              ...product,
                              type_product: e.target.value,
                           })
                        }
                     >
                        {CategoryBooks[idCategory]?.items?.map((type, index) => {
                           return (
                              <option key={index} value={type.title}>
                                 {type.title}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
            </div>
         </div>
         <div className="col-span-3 rounded-lg py-6 px-4">
            <h2 className="text-18 text-white">Thêm hình ảnh mình họa</h2>
            <div className="mt-5 w-full p-4 h-[255px] rounded-lg">
               <img src={image ? image : NoImage} alt="" className="w-full h-full" />
            </div>
            <div className="w-full mt-4 h-12 flex justify-between items-center">
               {[0, 1, 2, 3, 4].map((item) => {
                  return (
                     <div
                        key={item}
                        className="cursor-pointer w-12 h-12 rounded-[4px] border-dashed border-1 border-[#64748b] flex items-center justify-center"
                     >
                        {!previews[item] ? (
                           <IoAddCircleSharp className="w-5 h-5" style={{ WebkitFilter: 'invert(30%)' }} onClick={() => inputRef.current.click()} />
                        ) : (
                           <div
                              className="group w-full h-full relative flex items-center justify-center"
                              style={image === previews[item] && window.location.href.split('/')[6] ? { border: '2px solid #0a68ff' } : null}
                              onClick={() => setImage(previews[item])}
                           >
                              <IoMdCloseCircleOutline
                                 className="close hidden group-hover:block absolute w-5 h-5 z-10"
                                 style={{ WebkitFilter: 'invert(100%)' }}
                                 onClick={() => handleDeleteImage(item)}
                              />
                              <img src={previews[item]} alt="" className="absolute top-0 left-0 w-full h-full" />
                           </div>
                        )}
                        <input type="file" onChange={(e) => handleChooseImages(e, item)} className="hidden" ref={inputRef} />
                     </div>
                  );
               })}
            </div>

            <div className="mt-5 flex flex-col gap-2 w-full h-max">
               <span className="ml-2 text-14">Nhà cung cấp :</span>
               <input
                  type="text"
                  value={product?.brand_product || product?.stores_product}
                  className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                  onChange={(e) => {
                     if (
                        product?.category_product === 'Đồ chơi' ||
                        product?.category_product === 'Văn phòng phẩm' ||
                        product?.category_product === 'Lưu niệm'
                     ) {
                        setProduct({
                           ...product,
                           brand_product: e.target.value,
                        });
                     } else {
                        setProduct({
                           ...product,
                           stores_product: e.target.value,
                        });
                     }
                  }}
               />
            </div>

            {window.location.href.split('/')[6] ? (
               <button className="mt-8 ml-3 w-[180px] h-9 rounded-[8px] bg-[#64748b]" onClick={handleUpdateProduct}>
                  Cập nhật sản phẩm
               </button>
            ) : (
               <button className="mt-8 ml-3 w-[180px] h-9 rounded-[8px] bg-[#64748b]" onClick={handleCreateProduct}>
                  Tạo sản phẩm mới
               </button>
            )}
         </div>
      </div>
   );
};

export default AddNewProduct;
