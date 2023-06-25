const db = require('../models');
const Suppliers = db.Suppliers;

const postSupplier = async (req, res) => {
    try {      
        const Addsupplier = await Suppliers.create({
            users_id : req.body.users_id,
            name: req.body.name,
            address: req.body.address,
            telephone: req.body.telephone
        })
        if(!Addsupplier) {
            return res.status(404).json({message: "Suppliers not found"})
        }
        return res.status(201).json({
            message: "Succes Create Suppliers",
            data: Addsupplier 
        })
    } catch (err) {
        res.status(400).json({
            msg: "Failed Created Error",
            err
        })
    }
}

const getAllSupplier = async (req, res) => {
   try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * req.query.limit;

    const  findAllSupplier = await Suppliers.findAll({
        attributes: ['id', 'users_id', 'name', 'address', 'telephone'],
        limit: req.query.limit,
        offset
    });
    if(findAllSupplier.length === 0) {
        return res.status(404).json({
            message: "Data Supplier Not Found",
        })
    }
    const totalItems = await Suppliers.count();
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(201).json({
        msg: "Data Suppllier Retrieved",
        page,
        totalItems: findAllSupplier.length, 
        totalPages,
        data: findAllSupplier
    })
   } catch (error) {
        res.status(400).json({
            message: "Failed Data suppliers",
            error
        })
   }
}

    const getIdSuppliers = async (req, res) => {
        try {
            const id  = req.params.id;
            const findIdSupplier = await Suppliers.findByPk(id, 
            {
                attributes: ['users_id', 'name', 'address', 'telephone'],
            })

            if (!findIdSupplier) {
                return res.status(404).json({
                    message: "Data Supplier Not Found",
                })
            }
            return res.status(201).json({
                message: "Data Suppllier Found",
                data: findIdSupplier
            })

        } catch (error) {
            return res.status(401).json({
                message: "Failed to get supplier data",
                error
            })
        }
    }

    const updateSupplier = async (req, res) => {
        try {
          const id = req.params.id
    
          const putSupplier = await Suppliers.findByPk(id)
            if (!putSupplier) {
                
              return res.status(404).json({
                success: false,
                messagge: "Supplier Not Found"});
            
            } 
            

            await Suppliers.update({
                users_id : req.body.users_id,
                name: req.body.name,
                address: req.body.address,
                telephone: req.body.telephone,
            }, { where: {id: req.params.id}});

            return res.status(200).send({
                message: "Successfully update data suppliers",
            });
                
       } catch (error) {
            return res.status(400).json({
                success: false,
                messsage: "failed update data suppliers",
                error
            })
        }
    }

    const deleteSuppliers = async (req, res) => {
        try {            
            const id = req.params.id
            const destroySuppliers = await Suppliers.findByPk(id)
            if(!destroySuppliers) {
                return res.status(404).json({
                    succes: false,
                    message: "Data Suppliers Not Found"
                })
            }
            Suppliers.destroy({
                where: {id: req.params.id}
            })
            return res.status(200).json({
                succes: true,
                message: "Deleted Suppliers Successfully"
            })

        } catch (error) {   
            return res.status(400).json({
                message: "Delete Suppliers Failed"
            })
            
        }
    }

module.exports = {
    postSupplier,
    getAllSupplier,
    getIdSuppliers,
    updateSupplier,
    deleteSuppliers
}