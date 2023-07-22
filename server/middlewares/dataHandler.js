const ownedData = async (tableName, dataID, usersId, options = {}) => {
  const data = await tableName.findOne({
    where: {
      id: dataID,
      users_id: usersId,
    },
    include: options.include || [],
  });

  if (!data) throw { name: 'ErrorNotFound' };

  return data;
};

module.exports = ownedData;
