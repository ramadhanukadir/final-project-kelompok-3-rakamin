const db = require('../models');
const { Suppliers } = db;

const postSupplier = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const Addsuppliers = await Suppliers.create({
      users_id: id,
      name: req.body.name,
      address: req.body.address,
      telephone: req.body.telephone,
    });
    if (!Addsuppliers) {
      return res.status(400).json({
        succes: false,
        message: 'Failed Create Data Suppliers',
      });
    }
    return res.status(201).json({
      succes: true,
      message: 'Create Data Suppliers Successfully',
      dataSuppliers: Addsuppliers,
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Failed Created Supplier',
      err,
    });
  }
};

const getAllSupplier = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { page, limit, sort, order } = req.query;

    const { rows, count } = await Suppliers.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      offset: page && limit ? (page - 1) * limit : 0,
      limit: limit ? parseInt(limit) : null,
      order: sort && order ? [[order, sort]] : [['name', sort || 'ASC']],
      where: {
        users_id: id,
      },
    });
    if (!rows) {
      return res.status(404).json({
        succes: false,
        message: 'Data Suppliers Not Found',
      });
    }
    const totalItems = count;
    const totalPages = limit ? Math.ceil(count / limit) : 1;

    return res.status(200).json({
      succes: true,
      msg: 'Data Supplliers Retrieved',
      page: page ? parseInt(page) : 1,
      totalItems,
      totalPages,
      dataSuppliers: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIdSuppliers = async (req, res) => {
  try {
    const id = req.params.id;
    const findIdSuppliers = await Suppliers.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updateAt'] },
    });

    if (!findIdSuppliers) {
      return res.status(404).json({
        succes: false,
        message: 'Data Suppliers Not Found',
      });
    }
    return res.status(201).json({
      succes: true,
      message: 'Data Supplliers Retrieved',
      dataSuppliers: findIdSuppliers,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Failed To get Data Supplies',
      error,
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    // const { id } = req.loggedUser;
    const id = req.params.id;

    const putSupplier = await Suppliers.findByPk(id);
    if (!putSupplier) {
      return res.status(404).json({
        success: false,
        messagge: 'Data Suppliers Not Found',
      });
    }

    await Suppliers.update(
      {
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
      },
      { where: { id: req.params.id } }
    );

    return res.status(200).send({
      succes: true,
      message: 'Update Data Suppliers Sucessfully',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      messsage: 'Failed Update Data Suppliers',
      error,
    });
  }
};

const deleteSuppliers = async (req, res) => {
  try {
    const id = req.params.id;

    const destroySuppliers = await Suppliers.findByPk(id);

    if (!destroySuppliers) {
      return res.status(404).json({
        succes: false,
        message: 'Data Suppliers Not Found',
      });
    }
    await Suppliers.destroy({
      where: { id: id },
    });
    return res.status(200).json({
      succes: true,
      message: 'Deleted Suppliers Successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Delete Suppliers Failed',
    });
  }
};

module.exports = {
  postSupplier,
  getAllSupplier,
  getIdSuppliers,
  updateSupplier,
  deleteSuppliers,
};
