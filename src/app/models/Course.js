const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Scheme = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Course = new Scheme(
  {
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    //unique: giúp phát hiện slug trùng,chỉ tồn tại 1 cái
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, require: true },
    level: { type: String },
    deleted: { type: Boolean },
  },
  { timestamps: true }
);
//add plugin
mongoose.plugin(slug);

Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });
module.exports = mongoose.model("Course", Course);
