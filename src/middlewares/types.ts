import { type NextResponse, type NextRequest } from "next/server";
import { type NextFn } from "@poppinss/middleware/build/src/types";

export type MiddlewareCtx = {
  req: NextRequest;
  res: NextResponse;
};

export type MiddlewareFn = (ctx: MiddlewareCtx, next: NextFn) => Promise<void>;
