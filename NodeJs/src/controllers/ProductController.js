const ProductsModels = require("../models/ProductModels");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary");
const ProductController = {
  uploadImages: async (req, res) => {
    try {
      const listBase64 = req.body;
      let uploadedImages = [];

      for (const base64 of listBase64) {
        const result = await cloudinary.uploader.upload(base64);

        uploadedImages.push(result.secure_url);
      }

      return res.status(200).json({
        message: "Successfully uploaded images",
        listImages: uploadedImages,
      });
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (req, res) => {
    try {
      const product = {
        id_product: uuidv4(),
        name_product: req.body.name_product,
        arist_product: req.body.arist_product,
        price_product: req.body.price_product,
        solded: 0,
        brand_product: req.body.brand_product,
        stores_product: req.body.stores_product,
        discount: req.body.discount,
        description_product: req.body.description_product,
        image: req.body.image,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        image_4: req.body.image_4,
        image_5: req.body.image_5,
        category_product: req.body.category_product,
        type_product: req.body.type_product,
        number_product: req.body.number_product,
        service_product: true,
      };
      const result = await ProductsModels.createProductModels(product);
      if (result) {
        return res.status(200).json({
          message: "Product created successfully",
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
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
      } = req.body;
      const result = await ProductsModels.updateProductModels({
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
      });
      if (result) {
        return res.status(200).json({
          message: "Product updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getProduct: async (req, res) => {
    try {
      const result = await ProductsModels.getProductModels({
        id_product: req.body.id_product,
      });
      if (result) {
        res.status(200).json({
          product: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const result = await ProductsModels.getAllProductModels();
      if (result) {
        return res.status(200).json({
          message: "GetProduct successfully",
          products: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const result = await ProductsModels.updateProductModels(req.body);
      if (result) {
        return res.status(200).json({
          message: "Product updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const result = await ProductsModels.deleteProductModels({
        id_product: req.body.id_product,
      });
      if (result) {
        return res.status(200).json({
          message: "Product deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getBrand: async (req, res) => {
    try {
      const result = await ProductsModels.getBrandModels();
      const data = result[0]
        .map((item) => item.brand_product)
        .filter((brand) => brand !== null);
      return res.status(200).json({
        message: "GetBrand successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getStores: async (req, res) => {
    try {
      const result = await ProductsModels.getStoresModels();
      const data = result[0]
        .map((item) => item.stores_product)
        .filter((store) => store !== null);
      return res.status(200).json({
        message: "GetStores successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDataFilter: async (req, res) => {
    try {
      console.log(req.body.filter);
      const result = await ProductsModels.getDataFilterModels(req.body.filter);
      if (result) {
        return res.status(200).json({
          message: "Get data filter successfully",
          products: result[0],
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchProducts: async (req, res) => {
    try {
      const { search } = req.body;
      const result = await ProductsModels.searchProductModels({ search });
      if (result) {
        return res.status(200).json({
          message: "Search products successfully",
          products: result[0],
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductController;
