const database = require('../database/index');

const UserModels = {
   checkUserModels: async ({ email }) => {
      const result = await database.query(`SELECT * FROM Customers WHERE email = ?`, [email]);
      return result[0];
   },

   loginModels: async ({ email, password }) => {
      const result = await database.query(`SELECT * FROM Customers WHERE email =? AND password =?`, [email, password]);
      return result;
   },

   registerModels: async ({ id_user, email, password, full_name, username }) => {
      console.log({ id_user, email, password, full_name, username });
      const result = await database.query(`INSERT INTO Customers (id_user,email, passwordCode,full_name,username) VALUES (?,?,?,?,?)`, [
         id_user,
         email,
         password,
         full_name,
         username,
      ]);
      if (result) {
         return result;
      }
   },
   getUserModels: async ({ id_user }) => {
      const result = await database.query(`SELECT * FROM Customers WHERE id_user = ?`, [id_user]);
      return result[0][0];
   },

   createUserAdminModels: async ({ id_user, full_name, username, birthday, email, avatar, passwordCode, phone, sex, verified }) => {
      const result = await database.query(
         `insert into Customers (id_user,full_name, username, birthday, email, avatar, passwordCode,phone, sex, verified) values (?,?,?,?,?,?,?,?,?,?)`,
         [id_user, full_name, username, birthday, email, avatar, passwordCode, phone, sex, verified],
      );
      return result;
   },
   getAllUserModels: async () => {
      const result = await database.query(`SELECT * FROM Customers order by create_at desc`);
      return result[0];
   },
   deleteUserModels: async ({ id_user }) => {
      const result = await database.query(`DELETE FROM Customers WHERE id_user =?`, [id_user]);
      return result;
   },
   createUserModels: async ({ id_user, full_name, username, countries, sex, verified, avatar, phone, email, birthday }) => {
      const query = `INSERT INTO Customers (id_user,full_name,username,countries,sex,verified, avatar ,phone,email,birthday) 
      VALUES (
        '${id_user}','${full_name}','${username}','${countries}','${sex}', '${verified}','${avatar}','${phone}','${email}',${birthday}
        )`;
      console.log(query);
      const result = await database.query(query);
      if (result) {
         return result;
      } else {
         return false;
      }
   },

   updateUserModels: async ({ id_user, full_name, username, address, countries, sex, verified, avatar, phone, email, birthday }) => {
      let fileds = [];
      if (id_user === undefined) {
         return {
            message: 'Unknown id_user',
         };
      } else {
         if (full_name !== undefined) {
            fileds.push(`full_name = '${full_name}'`);
         }
         if (username !== undefined) {
            fileds.push(`username = '${username}'`);
         }
         if (address !== undefined) {
            fileds.push(`address = '${address}'`);
         }
         if (countries !== undefined) {
            fileds.push(`countries = '${countries}'`);
         }
         if (sex != undefined) {
            fileds.push(`sex = '${sex}'`);
         }
         if (verified !== undefined) {
            fileds.push(`verified = '${verified}'`);
         }
         if (avatar !== undefined) {
            fileds.push(`avatar = '${avatar}'`);
         }
         if (phone !== undefined) {
            fileds.push(`phone = '${phone}'`);
         }
         if (email !== undefined) {
            fileds.push(`email = '${email}'`);
         }
         if (birthday !== undefined) {
            fileds.push(`birthday = '${birthday}'`);
         }

         console.log(fileds);
         const query = `UPDATE Customers SET  ${fileds.join(', ')} WHERE id_user = '${id_user}'`;
         console.log(query);
         const result = await database.query(query);
         if (result) {
            return {
               message: 'User Update Successfully',
            };
         } else {
            return {
               message: 'User Update Failed',
            };
         }
      }
   },
   getListAddressModels: async ({ id_user }) => {
      const result = await database.query(
         `SELECT address_1,phone_1,wards_1,district_1,province_1,default_address_1,customer_1,address_2,phone_2,wards_2,district_2,province_2,default_address_2,customer_2,address_3,phone_3,wards_3,district_3,province_3,default_address_3,customer_3 FROM Customers WHERE id_user = '${id_user}'`,
      );
      return result[0];
   },
   createNewAddressModels: async ({ id_user, customer, company, phone, province, district, ward, address, type_address, default_address, id }) => {
      const result = await database.query(
         `update Customers set customer_${id} = ?,company_${id} = ?,phone_${id} =?,province_${id} =?,district_${id} =?,wards_${id} =?,address_${id} =?,type_address_${id} =?,default_address_${id} =? where id_user = ?`,
         [customer, company, phone, province, district, ward, address, type_address, default_address, id_user],
      );
      return result;
   },

   setDefaultAddressModels: async ({ id_user, id }) => {
      for (let i = 1; i < 4; i++) {
         if (i === id) {
            await database.query(`update Customers set default_address_${i} = true where id_user =?`, [id_user]);
         } else {
            await database.query(`update Customers set default_address_${i} = false where id_user =?`, [id_user]);
         }
      }
      return {
         message: 'Set default address successfully',
      };
   },
   updatePhoneModels: async ({ id_user, phone }) => {
      const result = await database.query(`UPDATE Customers SET phone =? WHERE id_user =?`, [phone, id_user]);
      if (result) {
         return {
            message: 'Update phone successfully',
         };
      } else {
         return {
            message: 'Update phone failed',
         };
      }
   },
   updatePasswordModels: async ({ id_user, newPassword }) => {
      const result = await database.query(`UPDATE Customers SET passwordCode =? WHERE id_user =?`, [newPassword, id_user]);
      return result;
   },
   updatePasswordByEmailModels: async ({ email, passwordCode }) => {
      const result = await database.query(`UPDATE Customers SET passwordCode =? WHERE email =?`, [passwordCode, email]);
      return result;
   },
};

module.exports = UserModels;
