import type { Metadata } from "next"

import { WorkPage } from "@/features/work/page"

export const metadata: Metadata = {
  title: "Work",
}

export default function Page() {
  return <WorkPage />
}
