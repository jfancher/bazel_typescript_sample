import * as express from 'express';
import { Request, Response } from 'express';

import { add2 } from 'bazel_typescript_sample/src/lib/add';

const app = express();
app.get("/add/:num", (req: Request, res: Response) => {
  res.send(`result: ${add2(Number(req.params.num))}`);
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Listening at :${port}`);
});
