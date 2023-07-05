const ownedData = async (table_name, data_id, users_id, options = {}) => {
  const data = await table_name.findOne({
    where: {
      id: data_id,
      users_id: users_id,
    },
    include: options.include || [],
  });

  if (!data) throw { name: 'ErrorNotFound' };

  return data;
};

module.exports = ownedData;
