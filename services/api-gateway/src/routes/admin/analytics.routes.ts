import { Router } from 'express';
import { commerceAdminProxy } from '../../proxies/commerce.proxy';
import { authenticateJWT } from '../../middlewares/auth';

const router = Router();

router.use('/', authenticateJWT, commerceAdminProxy);

export default router;
