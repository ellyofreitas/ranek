export default queryParams => {
  let queryString = '';

  Object.keys(queryParams).forEach(key => {
    queryString += `&${key}=${queryParams[key]}`;
  });

  return queryString;
};
