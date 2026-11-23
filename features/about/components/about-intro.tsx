import { EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr"
import Image from "next/image"
import { ButtonLink } from "@/components/button-link"
import { Kicker } from "@/components/kicker"
import { MaskText } from "@/components/motion/mask-text"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Typewriter } from "@/components/motion/typewriter"

import type { Profile } from "@/lib/content"

const PHOTO_PX = 512

function AboutIntro({ profile }: { profile: Profile }) {
  return (
    <RevealGroup className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-x-4 [grid-template-areas:'kicker_kicker'_'photo_name'_'details_details'_'body_body'] sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-x-16 lg:[grid-template-areas:'kicker_photo'_'name_photo'_'details_photo'_'body_photo']">
      <RevealItem className="[grid-area:kicker]">
        <Kicker className="mb-4">
          <Typewriter text="// about" />
        </Kicker>
      </RevealItem>

      <RevealItem className="[grid-area:photo] lg:mt-9">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={PHOTO_PX}
            height={PHOTO_PX}
            sizes="(min-width: 1024px) 256px, 96px"
            priority
            className="aspect-square w-full rounded-xl border border-border object-cover"
          />
        ) : (
          <span className="grid aspect-square w-full place-items-center rounded-xl bg-foreground font-mono text-xl font-bold text-background lg:text-5xl">
            {profile.initials}
          </span>
        )}
      </RevealItem>

      <h1 className="font-heading text-2xl font-medium tracking-tighter [grid-area:name] sm:text-3xl lg:text-4xl">
        <MaskText text={profile.name} />
      </h1>

      <RevealItem className="[grid-area:details]">
        <p className="mt-4 font-mono text-sm text-muted-foreground lg:mt-3">
          {profile.role} · {profile.location}
        </p>
      </RevealItem>

      <div className="[grid-area:body]">
        <RevealItem className="mt-6 grid max-w-prose gap-3.5 text-base leading-relaxed text-muted-foreground">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </RevealItem>
        <RevealItem className="mt-6">
          <ButtonLink href={`mailto:${profile.email}`}>
            <EnvelopeSimpleIcon data-icon="inline-start" />
            Get in touch
          </ButtonLink>
        </RevealItem>
      </div>
    </RevealGroup>
  )
}

export { AboutIntro }
