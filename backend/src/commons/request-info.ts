import { Request } from 'express';
import { IdTokenInfo } from 'src/app/account/auth/passaport/iam.info';

export type RequestInfo = {
  //
  user: IdTokenInfo;
} & Request;
