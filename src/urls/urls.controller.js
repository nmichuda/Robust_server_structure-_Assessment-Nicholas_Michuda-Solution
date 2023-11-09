const urls = require("../data/urls-data");
var createUse = require("../uses/uses.controller").create;

function list(req, res) {
  res.json({ data: urls });
}

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0)



function bodyHasHrefProperty(req, res, next) {
  
    
    if (req.body.href) {
      next(); // Call `next()` without an error message if the result exists
    }
  
    next({
        status: 400,
        message: "A 'href' property is required."
    });
  }

function create(req,res,next){
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: ++lastUrlId, // Increment last id then assign as the current ID
    href
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}




function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find(url => url.id === Number(urlId));
  if (foundUrl){
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${urlId}`,
  });
};


function update(req, res, next) {
    const url = res.locals.url;
    const { data: { href} = {} } = req.body;
  
    // Update the url
    url.href = href;
    
  
    res.status(200).json({ data: url });
  
  }

function read(req, res, next) {
  res.json({ data: res.locals.url });
};


module.exports = {
  create: [bodyHasHrefProperty, create],
  list,
  read: [urlExists, read, createUse],
  update: [urlExists, update],
  urlExists,
  
};