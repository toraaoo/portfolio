import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/ssr"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { ButtonLink } from "@workspace/ui/components/button-link"
import { Container } from "@workspace/ui/components/container"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kicker } from "@workspace/ui/components/kicker"
import { MaskText } from "@workspace/ui/components/motion/mask-text"
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@workspace/ui/components/motion/reveal"
import { ScrollRail } from "@workspace/ui/components/motion/scroll-rail"
import { Typewriter } from "@workspace/ui/components/motion/typewriter"
import { Section } from "@workspace/ui/components/section"
import { SplitSection } from "@workspace/ui/components/split-section"
import { StackTags } from "@workspace/ui/components/stack-tags"

import { experience, profile, toolbox } from "@/lib/content"

function AboutPage() {
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
              <Avatar className="size-24 rounded-lg">
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
              <ButtonLink href="/resume.pdf" variant="outline">
                <DownloadSimpleIcon data-icon="inline-start" />
                Résumé
              </ButtonLink>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SplitSection
            index="01"
            title="Toolbox"
            description="What I reach for. The list is short on purpose — depth beats breadth."
          >
            <div className="grid gap-7 sm:grid-cols-2">
              {toolbox.map((group) => (
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
            title="Experience"
            description="Ten years of backend work, mostly on systems other engineers build on."
          >
            <ScrollRail>
              <ItemGroup className="gap-0 pl-7">
                {experience.map((entry) => (
                  <Reveal key={entry.org}>
                    <Item className="group items-start gap-5 rounded-none px-0 py-5">
                      <ItemMedia className="w-28 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
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
