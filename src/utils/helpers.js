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

const findScrollableParent = (element) => {
  let parent = element.parentNode;
  while (parent !== null) {
    if (parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return document.documentElement;
};

export const scrollToTop = (element) => {
  const CARD_SCROLL_PADDING = 40;

  const cardRect = element.getBoundingClientRect();
  const parent = findScrollableParent(element);

  if (cardRect.top <= parent.offsetTop) {
    parent.scrollTo({
      top:
        parent.scrollTop +
        cardRect.top -
        parent.offsetTop -
        CARD_SCROLL_PADDING,
      behavior: "smooth",
    });
  } else if (cardRect.bottom >= parent.offsetTop + parent.clientHeight) {
    parent.scrollTo({
      top:
        parent.scrollTop +
        cardRect.bottom -
        (parent.offsetTop + parent.clientHeight) +
        CARD_SCROLL_PADDING,
      behavior: "smooth",
    });
  }
};
