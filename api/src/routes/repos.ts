import { Router, Request, Response } from 'express';

export const repos = Router();

var data = require('../../data/repos.json');

const underscore = require("underscore");

repos.get('/', async (_: Request, res: Response) => {
  res.header({
    'Cache-Control' : 'no-store',
    'Content-Type' : 'application/json'
  });

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  var filteredData = underscore.where(data, {"fork" : false});

  res.send(JSON.stringify(filteredData, null, 4));
});
