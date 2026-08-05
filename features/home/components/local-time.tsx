"use client"

import * as React from "react"

const PLACEHOLDER = "--:--:--"

function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = React.useState(PLACEHOLDER)

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    })

    function tick() {
      setNow(formatter.format(new Date()))
    }

    tick()
    const timer = window.setInterval(tick, 1000)

    return () => window.clearInterval(timer)
  }, [timeZone])

  return (
    <span suppressHydrationWarning className="font-mono tabular-nums">
      {now}
    </span>
  )
}

export { LocalTime }
