const uses = require("../data/uses-data");

function list(req, res) {
  res.json({ data: uses });
}

function useExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find(use => use.id === Number(useId));
  if (foundUse){
    res.locals.user = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `Use id not found: ${useId}`,
  });
};

function read(req, res, next) {
  res.json({ data: res.locals.user });
};

function destroy(req, res) {
    const { useId } = req.params;
    const index = uses.findIndex((use) => use.id === Number(useId));
    // `splice()` returns an array of the deleted elements, even if it is one element
    const deletedUses = uses.splice(index, 1);
    res.sendStatus(204);
  }

let lastUseId = uses.reduce((maxId, use) => Math.max(maxId, use.id), 0)

function create(req, res) {
  const { data: { urlId } = {} } = req.body;
  const newUse = {
    id: ++lastUseId, // Increment last id then assign as the current ID
    urlId,
    time: Date.now(),
   
  };
  uses.push(newUse);
  res.status(201).json({ data: newUse });
}


module.exports = {
  list,
  read: [useExists, read],
  useExists,
  delete: [useExists, destroy],
  create,
};