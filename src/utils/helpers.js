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

export const scrollToTop = (element) => {
  if (element) {
    const cardRect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();

    if (cardRect.top <= parentRect.top) {
      window.scrollTo({ top: cardRect.top + window.pageYOffset });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};
