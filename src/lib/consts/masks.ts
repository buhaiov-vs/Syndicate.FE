export const Masks = {
  price: {
      mask: Number,
      scale: 2,  // Digits after point
      thousandsSeparator: ',',  // Thousands separator
      padFractionalZeros: true,  // Pad with trailing zeros
      normalizeZeros: true,  // Trim leading zeros
      radix: '.',  // Decimal mark
      mapToRadix: ['.'],  // Characters to be treated as radix
      min: 0,  // Minimum value
      max: 10000  // Maximum value
  }
};