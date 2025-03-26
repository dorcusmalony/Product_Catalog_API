class apiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            $or: [
              { name: { $regex: this.queryStr.keyword, $options: 'i' } },
              { description: { $regex: this.queryStr.keyword, $options: 'i' } }
            ]
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter() {
      const queryCopy = { ...this.queryStr };
  
      // Remove fields not related to filtering
      const removeFields = ['keyword', 'limit', 'page', 'sort'];
      removeFields.forEach(el => delete queryCopy[el]);
  
      // Convert MongoDB operators to proper format
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    paginate() {
      const page = Math.max(1, Number(this.queryStr.page) || 1);
      const limit = Math.max(1, Number(this.queryStr.limit) || 10);
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = apiFeatures;
  