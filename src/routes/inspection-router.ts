import { Router } from 'express';
import { inspectionController } from '../controllers';

export const inspectionRouter = Router();

inspectionRouter.get('/', inspectionController.getInspectionList);
inspectionRouter.get(
  '/byTankNumber/:tankNumber',
  inspectionController.getInspectionByTankNumber
);
inspectionRouter.post('/', inspectionController.createInspection);
