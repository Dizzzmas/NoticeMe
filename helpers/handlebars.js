module.exports = {
  if_eq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
    if_not_eq: function(a, b, options){
    if (a !== b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
};