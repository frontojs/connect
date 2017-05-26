const preProcess = (args) => 
  Object.keys(args)
  // automatically drops keys with undefined as value
  .filter(key => args[key] !== undefined)
  .map(key => key.split("_"));

const segmentize = (args, key) => {
  const resourceKey = `${key}_id`;

  if (args[key] === false || args[key] === "")
    return undefined;
  if (args[key] === true) 
    return `${key}`;
  if (args[key] !== undefined) 
    return [key, args[key]].join("/");
  if (args[resourceKey] !== undefined) 
    return [key + "s", args[resourceKey]].join("/");

  return undefined;
}

const parameterize = (args) =>
  [].concat.apply([], preProcess(args))
  .filter(key => key !== "id")
  .map(key => (segmentize(args, key)));

const postProcess = array => 
  array.filter(item => (item !== undefined || item !== null)).join("/");

const finder = (namespace, resource, args, options = { query: false }) => {
  // args = { channel_id: 'blah', id: 'blah' }
  if (args) {
    const cleaned = parameterize(args);

    if (options.query) return postProcess([
      namespace, resource, postProcess(cleaned)
    ]);

    return postProcess([
      namespace, postProcess(cleaned.concat([resource, args.id]))
    ]);
    
  } else return namespace + "/" + resource;
};

export default finder;
