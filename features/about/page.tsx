import { EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { ButtonLink } from "@/components/button-link"
import { Container } from "@/components/container"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/item"
import { Kicker } from "@/components/kicker"
import { MaskText } from "@/components/motion/mask-text"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { ScrollRail } from "@/components/motion/scroll-rail"
import { Typewriter } from "@/components/motion/typewriter"
import { Section } from "@/components/section"
import { SplitSection } from "@/components/split-section"
import { StackTags } from "@/components/stack-tags"

import { pages, profile } from "@/lib/content"

function AboutPage() {
  const copy = pages.about

  return (
    <div>
      <Section className="pt-16 pb-16">
        <Container>
          <RevealGroup>
            <RevealItem>
              <Kicker className="mb-4.5">
                <Typewriter text="// about" />
              </Kicker>
            </RevealItem>

            <RevealItem className="flex flex-wrap items-start gap-7">
              <Avatar className="size-24 rounded-lg after:rounded-lg">
                {profile.avatar ? (
                  <AvatarImage
                    src={profile.avatar}
                    alt={profile.name}
                    className="rounded-lg"
                  />
                ) : null}
                <AvatarFallback className="rounded-lg bg-foreground font-mono text-3xl font-bold text-background">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-65 flex-1">
                <h1 className="font-heading text-3xl font-medium tracking-tighter">
                  <MaskText text={profile.name} />
                </h1>
                <p className="mt-2 font-mono text-sm text-muted-foreground">
                  {profile.role} · {profile.location}
                </p>
              </div>
            </RevealItem>

            <RevealItem className="mt-8 grid max-w-prose gap-4.5 text-md leading-relaxed text-muted-foreground">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </RevealItem>

            <RevealItem className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`}>
                <EnvelopeSimpleIcon data-icon="inline-start" />
                Get in touch
              </ButtonLink>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="01"
            title={copy.toolbox.title}
            description={copy.toolbox.description}
          >
            <div className="grid gap-7 sm:grid-cols-2">
              {profile.toolbox.map((group) => (
                <div key={group.label}>
                  <Kicker className="mb-3">{group.label}</Kicker>
                  <StackTags items={group.items} animated />
                </div>
              ))}
            </div>
          </SplitSection>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="02"
            title={copy.experience.title}
            description={copy.experience.description}
          >
            <ScrollRail>
              <ItemGroup className="gap-0 pl-7">
                {profile.experience.map((entry) => (
                  <Reveal key={`${entry.org}-${entry.role}-${entry.period}`}>
                    <Item className="group items-start gap-5 rounded-none px-0 py-5">
                      <ItemMedia className="w-28 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                        {entry.period}
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
                  </Reveal>
                ))}
              </ItemGroup>
            </ScrollRail>
          </SplitSection>
        </Container>
      </Section>
    </div>
  )
}

export { AboutPage }
