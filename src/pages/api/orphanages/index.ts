// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getRepository } from 'fireorm';
import { NextApiRequest, NextApiResponse } from 'next';
import { Orphanage } from '@models/orphanage';
import { errorHandler } from 'src/handlers/errorHandler';
import { orphanageValidation } from 'src/validations/orphanageValidations';

const repository = getRepository(Orphanage);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const orphanages = await repository.find();
      res.statusCode = 200;
      return res.json(orphanages);
    case 'POST':
      orphanageValidation
        .validate(req.body, {
          abortEarly: false,
        })
        .then(async () => {
          const orphanage = await repository.create(req.body);
          return res.status(201).json(orphanage);
        })
        .catch((err) => {
          return errorHandler(err, req, res);
        });
      break;
    case 'PUT':
      break;

    case 'DELETE':
      break;
    default:
      return (res.statusCode = 500);
  }
};
