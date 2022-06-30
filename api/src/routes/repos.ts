import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

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
  let url = 'https://api.github.com/users/silverorange/repos'

  fetch(url)
  .then(res => res.json())
  .then((out) => {
    res.send(JSON.stringify(out, null, 4));
  })

  // var filteredData = underscore.where(data, {"fork" : false});
  // res.send(JSON.stringify(filteredData, null, 4));
});
