const { v4: uuidv4 } = require("uuid");
const OrderModels = require("../models/OrderModels");

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const order = {
        id_order: uuidv4(),
        id_user: req.body.id_user,
        id_product: req.body.id_product,
        number_order: req.body.number_order,
        status_order: req.body.status_order,
      };
      const result = await OrderModels.createOrderModels(order);
      if (result) {
        const orders = await OrderModels.checkIsOrderByUserModels({
          id_user: req.body.id_user,
          id_product: req.body.id_product,
        });
        return res.status(200).json({
          message: "Successfully",
          order: orders,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const result = await OrderModels.getAllOrderModels();
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          orders: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOrderByUser: async (req, res) => {
    try {
      const result = await OrderModels.getOrderByUserModels({
        id_user: req.body.id_user,
      });
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          orders: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getListOrders: async (req, res) => {
    try {
      console.log(req.body);
      const result = await OrderModels.getListOrdersModels(req.body);
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          orders: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  checkIsOrderByUser: async (req, res) => {
    try {
      const { id_user, id_product } = req.body;
      const result = await OrderModels.checkIsOrderByUserModels({
        id_user,
        id_product,
      });
      if (result) {
        return res.status(200).json({
          message: "Order exist",
          result: result,
        });
      } else {
        return res.status(404).json({
          message: "Order not found",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateOrderByUser: async (req, res) => {
    try {
      const { id_order, number_order, status_order, address_order } = req.body;
      const result = await OrderModels.updateOrderByUserModels({
        id_order,
        number_order,
        status_order,
        address_order,
      });
      if (result) {
        return res.status(200).json({
          message: "Order updated successfully",
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      console.log(req.body.id_order);
      const result = await OrderModels.deleteOrderModels(req.body.id_order);
      if (result) {
        return res.status(200).json({
          message: "Order deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Order not deleted",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateAddressForListOrder: async (req, res) => {
    try {
      const { address, listOrder } = req.body;
      const result = await OrderModels.updateAddressForListOrderModels({
        address,
        listOrder,
      });
      if (result) {
        return res.status(200).json({
          message: "Address updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateStatusForListOrder: async (req, res) => {
    try {
      const { status_order, listOrder } = req.body;
      const result = await OrderModels.updateStatusForListOrderModels({
        status_order,
        listOrder,
      });
      if (result) {
        return res.status(200).json({
          message: "Address updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchOrdersByUser: async (req, res) => {
    try {
      const { id_user, search } = req.body;
      const result = await OrderModels.searchOrderModels({ id_user, search });
      if (result) {
        return res.status(200).json({
          message: "Successfully",
          orders: result,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = OrderController;
