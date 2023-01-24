const Product  = require("../models/product");

const getAllProducts = async (req,res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if(company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i"};
    }

    if(featured) {
        queryObject.featured = featured;
    }
 
    let apiData = Product.find(queryObject);
   // Sorting  functionality
    if(sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    // Return specific document field using select 
      if(select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }
    // Pagination

    let page = Number (req.query.page) || 1;
    let limit = Number (req.query.limit) || 3;

    let skip = (page-1)*limit;
    
    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({myData, nbHits: myData.length});
};

const getAllProductsTesting = async (req,res) => {
    res.status(200).json({msg:"I am getAllProductsTesting"});
};

module.exports = {getAllProducts, getAllProductsTesting}
