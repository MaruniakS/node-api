import ItemService from '../services/item.service';
import Util from '../utils/util';

const util = new Util();

class ItemController {
  static async getAllItems(req, res) {
    try {
      const allItems = await ItemService.getAllItems();
      if (allItems.length > 0) {
        util.setSuccess(200, 'Items retrieved', allItems);
      } else {
        util.setSuccess(200, 'No Item found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addItem(req, res) {
    if (!req.body.title || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newItem = req.body;
    try {
      const createdItem = await ItemService.addItem(newItem);
      util.setSuccess(201, 'Item Added!', createdItem);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedItem(req, res) {
    const alteredItem = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateItem = await ItemService.updateItem(id, alteredItem);
      if (!updateItem) {
        util.setError(404, `Cannot find Item with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Item updated', updateItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getItem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theItem = await ItemService.getItem(id);

      if (!theItem) {
        util.setError(404, `Cannot find Item with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Item', theItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteItem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const ItemToDelete = await ItemService.deleteItem(id);

      if (ItemToDelete) {
        util.setSuccess(200, 'Item deleted');
      } else {
        util.setError(404, `Item with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default ItemController;
