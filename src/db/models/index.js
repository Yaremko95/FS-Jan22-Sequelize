import User from "./User.js";
import Blog from "./Blog.js";
import Review from "./Review.js";
import Category from "./Category.js";
import BlogCategory from "./BlogCategory.js";

//hasMany
//belongsTo

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Review);
Review.belongsTo(Blog);

User.hasMany(Review);
Review.belongsTo(User);

//Default way of many to many

// Blog.belongsToMany(Category, { through: "BlogCategory", timestamps: false });
// Category.belongsToMany(Blog, { through: "BlogCategory", timestamps: false });

Blog.belongsToMany(Category, {
  through: { model: BlogCategory, unique: false }, // remove defult composed primary key
});
Category.belongsToMany(Blog, {
  through: { model: BlogCategory, unique: false }, // remove defult composed primary key
});

// BlogCategory.sync({ force: true });

export default { Blog, User, Review, Category, BlogCategory };
