import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Helmet } from 'react-helmet';
import { StaticRouterContext } from 'react-router';
import { makeAxios } from '../src/context/api';
import ServerRenderer from './ServerRenderer';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', { index: false }));

app.get('/*', async (req: Request, res: Response) => {
  const context: StaticRouterContext = {};
  const axios = makeAxios();
  const app = await ServerRenderer.render(req, axios)
    .catch(err => console.error(err));
  const helmet = Helmet.renderStatic();

  if (context.url) {
    res.header({
      Location: context.url
    });
    return res.end();
  }

  const indexFile = path.resolve('./build/index.html');
  while (!fs.existsSync(indexFile));

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      res.status(503);
      return res.end();
    }
    res.send(
      data
        .replace('<helmet/>',
          helmet.meta.toString() +
          helmet.title.toString() +
          helmet.link.toString()
        )
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
    res.end();
  });
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
