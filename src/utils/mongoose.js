function configMultiMongooseToObject(mongooseArray) {
  return mongooseArray.map((mongoose) => mongoose.toObject());
}

function configMongooseToObject(mongooseArray) {
  return mongooseArray ? mongooseArray.toObject() : mongooseArray;
}

module.exports = { configMultiMongooseToObject, configMongooseToObject };
