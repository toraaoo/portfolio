import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/ssr"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import { Kicker } from "@/components/kicker"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { StackTags } from "@/components/stack-tags"
import { experience, profile, toolbox } from "@/lib/content"

function AboutPage() {
  return (
    <Container width="narrow" className="pt-16">
      <RevealGroup>
        <RevealItem>
          <Kicker className="mb-4.5">{"// about"}</Kicker>
        </RevealItem>

        <RevealItem className="flex flex-wrap items-start gap-7">
          <Avatar className="size-24 rounded-lg">
            <AvatarFallback className="rounded-lg bg-foreground font-mono text-3xl font-bold text-background">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-65 flex-1">
            <h1 className="font-heading text-3xl font-medium tracking-tighter">
              {profile.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
          </div>
        </RevealItem>

        <RevealItem className="mt-8 grid gap-4.5 text-md leading-relaxed text-muted-foreground">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </RevealItem>

        <RevealItem className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>
            <EnvelopeSimpleIcon data-icon="inline-start" />
            Get in touch
          </ButtonLink>
          <ButtonLink href="/resume.pdf" variant="outline">
            <DownloadSimpleIcon data-icon="inline-start" />
            Résumé
          </ButtonLink>
        </RevealItem>
      </RevealGroup>

      <Reveal>
        <h2 className="mt-14 mb-5 font-heading text-xl font-semibold tracking-tight">
          Toolbox
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {toolbox.map((group) => (
            <div key={group.label}>
              <Kicker className="mb-3">{group.label}</Kicker>
              <StackTags items={group.items} />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="mt-14 mb-2 font-heading text-xl font-semibold tracking-tight">
          Experience
        </h2>
      </Reveal>
      <ItemGroup className="gap-0">
        {experience.map((entry) => (
          <Item
            key={entry.org}
            className="items-start gap-5 rounded-none border-t-border px-0 py-5"
          >
            <ItemMedia className="w-32 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground">
              {entry.when}
            </ItemMedia>
            <ItemContent className="gap-1.5">
              <div className="flex flex-wrap items-baseline gap-2">
                <ItemTitle className="font-heading text-md font-semibold">
                  {entry.role}
                </ItemTitle>
                <span className="font-mono text-sm text-muted-foreground">
                  @ {entry.org}
                </span>
              </div>
              <ItemDescription>{entry.note}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Container>
  )
}

export { AboutPage }
