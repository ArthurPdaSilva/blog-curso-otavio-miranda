"use client";

import {
  formatDateTime,
  formatRelativeDateTime,
} from "@/utils/format-datetime";

export function PostDate({ dateTime }: { dateTime: string }) {
  return (
    <time
      className="text-slate-600 text-sm/tight"
      dateTime={dateTime}
      title={formatRelativeDateTime(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
