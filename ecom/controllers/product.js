const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { stringify } = require('querystring');
const { filter } = require('lodash');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: 'Product not Found',
      });
    }

    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  // req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ deletedProduct, message: 'Product deleted successfully' });
  });
};

// exports.create = (req, res) => {
//   console.log(req.body);
//   const product = new Product(req.body);
//   product.save((error, data) => {
//     if (error) {
//       return res.status(400).json({
//         error: errorHandler(error),
//       });
//     }
//     res.json({ data });
//   });
// };

exports.create = (req, res) => {
  // check for all fields
  const {
    name,
    description,
    price,
    category,
    subcategory,
    quantity,
    shipping,
    photo,
  } = req.body;

  let product = new Product(req.body);

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !quantity ||
    !shipping ||
    !subcategory
  ) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  if (photo) {
    // if (photo.size > 100000) {
    //   return res.status(400).json({
    //     error: 'Image should be less than 1mb',
    //   });
    // }
    product.photo.data = photo.data;
    // console.log(product.photo.data);
    product.photo.contentType = photo.contentType;
  }

  product.save((error, result) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(result);
  });

  // To Send Data from Form

  // let form = new formidable.IncomingForm();
  // formkeepExtensions = true;

  // form.parse(req, (error, fields, files) => {
  //   if (error) {
  //     return res.status(400).json({
  //       error: 'Image could not be uploaded',
  //     });
  //   }

  //   let product = new Product(req.body);
  //   console.log('Product :', product);
  //   // check for all fields
  //   const { name, description, price, category, quantity, shipping } = req.body;

  //   if (
  //     !name ||
  //     !description ||
  //     !price ||
  //     !category ||
  //     !quantity ||
  //     !shipping
  //   ) {
  //     return res.status(400).json({
  //       error: 'All fields are required',
  //     });
  //   }

  //   // 1mb = 1000000

  //   if (files.photo) {
  //     if (files.photo.size > 100000) {
  //       return res.status(400).json({
  //         error: 'Image should be less than 1mb',
  //       });
  //     }
  //     product.photo.data = fs.readFileSync(files.photo.path);
  //     product.photo.contentType = files.photo.type;
  //   }
  //   console.log('love');
  //   product.save((error, result) => {
  //     if (error) {
  //       return res.status(400).json({
  //         error: errorHandler(error),
  //       });
  //     }
  //     console.log(error);
  //     console.log(result);
  //     res.json({ result });
  //   });
  // });
};

exports.update = (req, res) => {
  let product = req.product;

  product = _.extend(product, req.body);

  product.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

// exports.update = (req, res) => {
//   let form = new formidable.IncomingForm();
//   formkeepExtensions = true;
//   form.parse(req, (error, fields, files) => {
//     if (error) {
//       return res.status(400).json({
//         error: 'Image could not be uploaded',
//       });
//     }

//     let product = req.product;
//     product = _.extend(product, fields);

//     // check for all fields
//     const { name, description, price, category, quantity, shipping } = fields;

//     if (
//       !name ||
//       !description ||
//       !price ||
//       !category ||
//       !quantity ||
//       !shipping
//     ) {
//       return res.status(400).json({
//         error: 'All fields are required',
//       });
//     }

//     // 1mb = 1000000

//     if (files.photo) {
//       if (files.photo.size > 100000) {
//         return res.status(400).json({
//           error: 'Image should be less than 1mb',
//         });
//       }
//       product.photo.data = fs.readFileSync(files.photo.path);
//       product.photo.contentType = files.photo.type;
//     }

//     product.save((error, result) => {
//       if (error) {
//         return res.status(400).json({
//           error: errorHandler(error),
//         });
//       }
//       res.json({ result });
//     });
//   });
// };

/** Sell / Arrival
 *
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, all products are returned
 *
 */

exports.list = (req, res) => {
  // For ascending '1';
  // For descending '-1';
  let order = req.query.order ? req.query.order : '1';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = 6; //req.query.limit ? parseInt(req.query.limit) : 6;
  let skip = 0;

  // let collection = filters.collections;

  let filters = { models: [] };
  if (req.query.filters) {
    filters = JSON.parse(req.query.filters);
    if (filters.skip !== 0) {
      skip = parseInt(filters.skip);
    }
    console.log(filters);
    if (filters.category === '') {
      delete filters.category;
    }
    if (filters.subcategory === '') {
      delete filters.subcategory;
    }

    limit = parseInt(filters.limit);
    console.log(filters);
    // Update models Key name
    filters['model'] = filters['models'];
    filters['collections'] = filters.collections['id'];
    filters['model'] = filters.model['id'];
    filters['cases'] = filters.cases['id'];

    // console.log(`Colections ${filters.collections}`);
    // Remove object data
    delete filters.showFilter;
    delete filters.customizes;
    delete filters.models;
    delete filters.skip;
    delete filters.limit;

    if (filters.collections.length == 0) {
      delete filters.collections;
    }
    if (filters.model.length == 0) {
      delete filters.model;
    }
    if (filters.cases.length == 0) {
      delete filters.cases;
    }
  } else {
    filters = {};
  }

  console.log(filters);
  Product.find(filters)
    .populate('category')
    .populate('subcategory')
    .populate('collections')
    .populate('cases')
    .populate('model')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(12)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }

      res.send(products);
    });
};

/**
 *
 * It will find the products based on req product category
 * other products that has the same category will be return.
 *
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  console.log(req.product.category);
  // $ne = Not include the current product
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .populate('category', '_id name')
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      res.send(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {})
    .populate('category', '_id name')
    .exec((error, categories) => {
      if (error) {
        return res.status(400).json({
          error: 'Categories not found',
        });
      }
      res.send(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Search
exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    let q = req.query.search;
    //let n = (query.name = { $regex: req.query.search, $options: 'i' });
    let c = (query.cases = { $regex: req.query.search, $options: 'i' });
    // query.model = { $regex: req.query.search, $options: 'i' };

    //    Product.createIndex({ name: 'text' });
    Product.aggregate([
      // {
      //   $lookup: {
      //     from: 'cases',
      //     let: { case_id: '$cases' },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $eq: ['$_id', '$$case_id'] },
      //               {
      //                 $regexMatch: {
      //                   input: '$name',
      //                   regex: q,
      //                   options: 'i',
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       },
      //       { $project: { _id: 0 } },
      //     ],
      //     as: 'casedata',
      //   },
      // },
      {
        $lookup: {
          from: 'cases',
          localField: 'cases',
          foreignField: '_id',
          as: 'casesdata',
        },
      },
      {
        $lookup: {
          from: 'collections',
          localField: 'collections',
          foreignField: '_id',
          as: 'collectiondata',
        },
      },
      {
        $lookup: {
          from: 'phonemodels',
          localField: 'model',
          foreignField: '_id',
          as: 'modeldata',
        },
      },
      {
        $unwind: '$casesdata',
      },
      {
        $unwind: '$collectiondata',
      },
      {
        $unwind: '$modeldata',
      },
      {
        $match: {
          $expr: {
            $or: [
              {
                $regexMatch: {
                  input: '$name',
                  regex: q,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$casesdata.name',
                  regex: q,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$collectiondata.name',
                  regex: q,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$modeldata.name',
                  regex: q,
                  options: 'i',
                },
              },
            ],
          },
        },
      },
      { $limit: 6 },

      // {
      //   $project: {
      //     data: {
      //       $filter: {
      //         input: '$casesdata',
      //         as: 'pet',
      //         cond: {
      //           $regexFindAll: {
      //             input: '$$pet.name',
      //             regex: 'Cosmos',
      //             options: 'i',
      //           },
      //         },
      //       },
      //     },
      //     // name: 1,
      //     // casesdata: {
      //     //   $filter: {
      //     //     input: '$casesdata',
      //     //     as: 'pet',
      //     //     cond: {
      //     //       $regexMatch: {
      //     //         input: '$$pet.name',
      //     //         regex: 'Cosmos',
      //     //         options: 'i',
      //     //       },
      //     //     },
      //     //   },
      //     // },
      //   },
      // },
    ]).exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      } else {
        res.send(products);
      }
    });

    // Product.find()
    //   .populate({
    //     path: 'cases',
    //     model: 'Cases',
    //     match: { name: { $regex: q, $options: 'i' } },
    //   })
    //   .populate({
    //     path: 'collections',
    //     model: 'Collections',
    //     match: { name: { $regex: q, $options: 'i' } },
    //   })
    //   .populate({
    //     path: 'model',
    //     model: 'phoneModel',
    //     match: { name: { $regex: q, $options: 'i' } },
    //   })
    //   .find({ cases: { $ne: null } })
    //   .exec((error, products) => {
    //     if (error) {
    //       return res.status(400).json({
    //         error: errorHandler(error),
    //       });
    //     } else {
    //       const p = products.filter((product) => {
    //         return product.cases !== null;
    //       });
    //       res.send(products);
    //     }
    //   });
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update product',
      });
    }
    next();
  });
};
