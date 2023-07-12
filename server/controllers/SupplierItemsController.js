const db = require('../models');
const {Suppliers_Items, Items} = db;

const postSupplierItems = async(req, res) => {

    try {
        
        const addsuppliersItems = await Suppliers_Items.create(req.body)
    
        if(!addsuppliersItems) {
            return res.status(404).json({
                message: "Data Suppliers Items Not Found"
            })
        }

        return res.status(200).json({
            message: "Created Data Suppliers Items Successfully",
            dataSuppliersItems: addsuppliersItems
        })
    } catch (error) {
        return res.status(400).json({
            message: "Created Data Suppliers Items Failed"
        })
    }
}


const updateSupplierItems = async(req, res) => {
    try {
        const id = req.params.id

        const putSuppliersItems = await Suppliers_Items.findByPk(id);

        if(!putSuppliersItems){
            return res.status(404).json({
                success: false,
                message: "Data Suppliers Items Not Found"
            })
        }

      
        await Suppliers_Items.update({
            items_id: req.body.items_id,
            suppliers_id: req.body.suppliers_id},
            { where: {id: req.params.id}}
        )

        return res.status(200).json({
            success: true,
            message: "Update Data Suppliers Items Successfully "
        })
    } catch (error) {
        res.status(404).json({
            msg: "Update Data Suppliers Items Failed",
            error
        })   
    }
}

const getIdSuppliersItems = async(req, res) => {
    try {
        const id = req.params.id

        const findOneSuppliersItems = await Suppliers_Items.findByPk(id,  {
            attributes: { exclude: ['createdAt', 'updatedAt']},
            include: [
              {
                model: Items,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            ] 
        })

        if(!findOneSuppliersItems) {
            return res.status(404).json({
                succes: false,
                message: "Data Suppliers Items Not Found"
            })
        }
        return res.status(200).json({
            succes: true,
            message: "Data Suppliers Items Retrieved",
            dataSuppiersItems: findOneSuppliersItems
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed Get Data Suplliers Items"
        })
    }
}

const getAllSupplierItems = async(req, res) => {
    try {
        const findAllSuppliersItems = await Suppliers_Items.findAll(  {
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                  model: Items,
                  attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
              ] 
        })

        if(!findAllSuppliersItems) {
           res.status(404).json({
                success: false,
                message: "Data Suppliers Items Not Found",
            })
        }

        return res.status(200).json({
            succes: true,
            message: "Data Suppliers Items Found",
            data:findAllSuppliersItems,
        })
    } catch (error) {
        return res.send(400).json({
            success: false,
            message: "Data Suppliers Not Found",
            error
        })
    }
}

const deleteSuppliersItems = async (req, res) => {
    try {            
        const id = req.params.id
        const destroySuppliersItems = await Suppliers_Items.findByPk(id)

        if(!destroySuppliersItems) {
            return res.status(404).json({
                succes: false,
                message: "Data Suppliers Items Not Found"
            })
        }
       await Suppliers_Items.destroy({
            where: {id: req.params.id}
        })
        return res.status(200).json({
            succes: true,
            message: "Deleted Data Suppliers Successfully"
        })

    } catch (error) {   
        return res.status(400).json({
            message: "Delete Data Suppliers Failed"
        })
        
    }
}


module.exports = {
    postSupplierItems,
    updateSupplierItems,
    getIdSuppliersItems,
    getAllSupplierItems,
    deleteSuppliersItems,
}