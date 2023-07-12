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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * req.query.limit;
    const { id } = req.loggedUser;

    const findAllSuppliers = await Suppliers.findAll({
      where: {
        users_id: id,
      },
      attributes: { exclude: ['createdAt', 'updateAt'] },
      limit: req.query.limit,
      offset,
    });
    if (findAllSuppliers.length === 0) {
      return res.status(404).json({
        succes: false,
        message: 'Data Suppliers Not Found',
      });
    }
    const totalItems = await Suppliers.count();
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(201).json({
      succes: true,
      msg: 'Data Supplliers Retrieved',
      page,
      totalItems: findAllSuppliers.length,
      totalPages,
      dataSuppliers: findAllSuppliers,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed Data suppliers',
      error,
    });
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
