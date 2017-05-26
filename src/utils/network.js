const isJSON = contentType =>
  contentType && contentType.indexOf('application/json') !== -1

const request = (api, type, pathname, body) => {
  if (type === 'post' || type === 'patch') {
    if (!body) throw 'missing body, pass in a body';
    return api[type](pathname, body);
  } else return api[type](pathname);
}

const reply = (response, contentType) => {
  if (isJSON(contentType)) return response.json();
  else                     return response.text();
}

export default { request, reply };
