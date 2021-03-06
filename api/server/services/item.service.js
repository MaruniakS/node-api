import database from '../src/models';

class ItemService {
  static async getAllItems() {
    try {
      return await database.Item.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addItem(newItem) {
    try {
      return await database.Item.create(newItem);
    } catch (error) {
      throw error;
    }
  }

  static async updateItem(id, updateItem) {
    try {
      const itemToUpdate = await database.Item.findOne({
        where: { id: Number(id) }
      });

      if (itemToUpdate) {
        await database.Item.update(updateItem, { where: { id: Number(id) } });

        return updateItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getItem(id) {
    try {
      const theItem = await database.Item.findOne({
        where: { id: Number(id) }
      });

      return theItem;
    } catch (error) {
      throw error;
    }
  }

  static async deleteItem(id) {
    try {
      const itemToDelete = await database.Item.findOne({ where: { id: Number(id) } });

      if (itemToDelete) {
        const deletedItem = await database.Item.destroy({
          where: { id: Number(id) }
        });
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ItemService;
