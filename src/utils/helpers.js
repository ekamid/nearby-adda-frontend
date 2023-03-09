export const getPathQueryParams = ({
  limit,
  page,
  search,
  radius,
  latitude,
  longitude,
}) => {
  let pathQueryParams = "";

  if (limit) {
    pathQueryParams += `limit=${limit}&`;
  }

  if (page) {
    pathQueryParams += `page=${page}&`;
  }

  if (search) {
    pathQueryParams += `search=${search}&`;
  }

  if (radius && latitude && longitude) {
    pathQueryParams += `radius=${radius}&latitude=${latitude}&longitude=${longitude}&`;
  }

  // Remove the trailing ampersand
  pathQueryParams = pathQueryParams.slice(0, -1);

  return pathQueryParams;
};
