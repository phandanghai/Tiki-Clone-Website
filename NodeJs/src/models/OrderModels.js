const database = require('../database/index');

const OrderModels = {
   getAllOrderModels: async () => {
      const result = await database.query(`SELECT * FROM Orders`);
      return result[0];
   },
   getOrderByUserModels: async ({ id_user }) => {
      const result = await database.query(`SELECT * FROM Orders where id_user = ?`, [id_user]);
      return result[0];
   },
   createOrderModels: async ({ id_order, id_user, id_product, number_order, status_order }) => {
      const result = await database.query(`INSERT INTO Orders (id_order, id_user, id_product, number_order, status_order) VALUES (?,?,?,?,?)`, [
         id_order,
         id_user,
         id_product,
         number_order,
         status_order,
      ]);
      return result;
   },
   deleteOrderModels: async (id_order) => {
      console.log(`DELETE FROM Orders WHERE id_order = ${id_order}`);
      const result = await database.query(`DELETE FROM Orders WHERE id_order =?`, [id_order]);
      return result;
   },
   getListOrdersModels: async (listIds) => {
      console.log(`SELECT * FROM Orders WHERE id_order IN ([${listIds.map((order) => `"${order}"`).join(',')}])`);
      const result = await database.query(`SELECT * FROM Orders WHERE id_order IN (${listIds.map((order) => `"${order}"`).join(',')})`);
      return result[0];
   },
   checkIsOrderByUserModels: async ({ id_user, id_product }) => {
      const result = await database.query(`SELECT * FROM Orders WHERE id_user =? AND id_product =? AND status_order = 'Trong giỏ hàng'`, [
         id_user,
         id_product,
      ]);
      return result[0];
   },
   updateOrderByUserModels: async ({ id_order, number_order, status_order, address_order }) => {
      const result = await database.query(`UPDATE Orders SET number_order =?, address_order =?, status_order = ? WHERE id_order =?`, [
         number_order,
         address_order,
         status_order,
         id_order,
      ]);
      return result;
   },
   updateAddressForListOrderModels: async ({ address, listOrder }) => {
      const result = await database.query(
         `UPDATE Orders SET address_order = '${address}' WHERE id_order IN (${listOrder.map((order) => `'${order}'`).join(',')})`,
      );
      return result;
   },
   updateStatusForListOrderModels: async ({ status_order, listOrder }) => {
      const result = await database.query(
         `UPDATE Orders SET status_order = '${status_order}' WHERE id_order IN (${listOrder.map((order) => `'${order}'`).join(',')})`,
      );
      return result;
   },
};

module.exports = OrderModels;
