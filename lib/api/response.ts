import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: { status?: number }) {
  return NextResponse.json({ success: true, data }, { status: init?.status ?? 200 });
}

export function fail(code: string, message: string, httpStatus: number) {
  return NextResponse.json({ success: false, error: { code, message } }, { status: httpStatus });
}
