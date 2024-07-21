const database = require("../database/index");

const ProductsModels = {
  createProductModels: async ({
    id_product,
    name_product,
    description_product,
    price_product,
    image,
    image_2,
    image_3,
    image_4,
    image_5,
    solded,
    brand_product,
    stores_product,
    category_product,
    discount,
    type_product,
    number_product,
  }) => {
    const result = await database.query(
      `INSERT INTO Products (id_product, name_product,description_product,brand_product, price_product, image,image_2,image_3,image_4,image_5,solded,category_product,stores_product,discount,type_product,number_product) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id_product,
        name_product,
        description_product,
        brand_product,
        price_product,
        image,
        image_2,
        image_3,
        image_4,
        image_5,
        solded,
        category_product,
        stores_product,
        discount,
        type_product,
        number_product,
      ]
    );
    return result;
  },
  getProductModels: async ({ id_product }) => {
    const result = await database.query(
      `SELECT * FROM Products WHERE id_product =?`,
      [id_product]
    );
    return result[0][0];
  },
  getAllProductModels: async () => {
    const result = await database.query(`SELECT * FROM Products`);
    return result[0];
  },
  deleteProductModels: async ({ id_product }) => {
    const result = await database.query(
      `DELETE FROM Products WHERE id_product =?`,
      [id_product]
    );
    return result;
  },
  updateProductModels: async ({
    name_product,
    description,
    price_product,
    new_price_product,
    image,
    number_product,
    solded,
    category_product,
    discount,
    type_product,
    id_products,
  }) => {
    const result = await database.query(
      `UPDATE Products SET name_product =?, description =?, price_product =?, new_price_product =?, image =?, number_product =?, solded =?, category_product =?, discount =?, type_product =? WHERE id_products =?`,
      [
        name_product,
        description,
        price_product,
        new_price_product,
        image,
        number_product,
        solded,
        category_product,
        discount,
        type_product,
        id_products,
      ]
    );
    return result;
  },
  getBrandModels: async () => {
    const result = await database.query(
      `SELECT DISTINCT brand_product FROM Products`
    );
    return result;
  },
  getStoresModels: async () => {
    const result = await database.query(
      `SELECT DISTINCT stores_product FROM Products`
    );
    return result;
  },
  getDataFilterModels: async ({
    service_product,
    stars,
    maxPrice,
    minPrice,
    brand_product,
    stores_product,
    category_product,
    type_product,
  }) => {
    console.log(
      service_product,
      stars,
      maxPrice,
      minPrice,
      brand_product,
      stores_product,
      category_product,
      type_product
    );
    let queryStores;
    if (stores_product?.length > 0) {
      queryStores = `AND stores_product IN (${stores_product
        .map((store) => `"${store}"`)
        .join(", ")})`;
    } else {
      queryStores = ``;
    }
    let queryBrand;
    if (brand_product?.length > 0) {
      queryBrand = `AND brand_product IN (${brand_product
        .map((brand) => `"${brand}"`)
        .join(", ")})`;
    } else {
      queryBrand = ``;
    }
    let queryMinPrice;
    if (minPrice) {
      queryMinPrice = `AND price_product >= ${minPrice}`;
    } else {
      queryMinPrice = ``;
    }
    let queryMaxPrice;
    if (maxPrice) {
      queryMaxPrice = `AND price_product <= ${maxPrice}`;
    } else {
      queryMaxPrice = ``;
    }
    let queryTypeProduct;
    if (type_product) {
      queryTypeProduct = `AND type_product = "${type_product}"`;
    } else {
      queryTypeProduct = ``;
    }
    let queryCategoryProduct;
    if (category_product) {
      queryCategoryProduct = `AND category_product = "${category_product}"`;
    } else {
      queryCategoryProduct = ``;
    }
    // return `SELECT * FROM Products WHERE service_product = true  ${queryStores}  ${queryBrand}  ${queryMinPrice}  ${queryMaxPrice} ${queryTypeProduct} ${queryCategoryProduct}`;
    const result = await database.query(
      `SELECT * FROM Products WHERE service_product = true  ${queryStores}  ${queryBrand}  ${queryMinPrice}  ${queryMaxPrice} ${queryTypeProduct} ${queryCategoryProduct}`
    );
    return result;
  },

  updateProductModels: async ({
    id_product,
    price_product,
    arist_product,
    brand_product,
    stores_product,
    number_product,
    discount,
    description_product,
    image,
    image_2,
    image_3,
    image_4,
    image_5,
  }) => {
    const result = await database.query(
      `UPDATE Products SET price_product =?, arist_product =?, brand_product =?, stores_product =?, number_product =?, discount =?, description_product =?, image =?, image_2 =?, image_3 =?, image_4 =?, image_5 =? WHERE id_product =?`,
      [
        price_product,
        arist_product,
        brand_product,
        stores_product,
        number_product,
        discount,
        description_product,
        image,
        image_2,
        image_3,
        image_4,
        image_5,
        id_product,
      ]
    );
    return result;
  },
  searchProductModels: async ({ search }) => {
    try {
      const result = await database.query(
        `SELECT * FROM Products WHERE name_product LIKE '%${search}%' OR brand_product LIKE '%${search}%' OR stores_product LIKE '%${search}%'`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ProductsModels;
