/* eslint-disable node/no-unsupported-features/es-syntax */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Basic filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // Limiting Fields
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skipCount = (page - 1) * this.queryString.limit;

    this.query = this.query.skip(skipCount).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
