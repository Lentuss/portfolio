export const getElementByDataType = (dataType, $el) => {
  if ($el) {
    return $el.querySelector(`[data-type="${dataType}"]`);
  }

  return document.querySelector(`[data-type="${dataType}"]`);
};
