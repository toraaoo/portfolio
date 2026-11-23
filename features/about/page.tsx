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
import { AmbientGlow } from "@/components/motion/ambient-glow"
import { Reveal } from "@/components/motion/reveal"
import { ScrollRail } from "@/components/motion/scroll-rail"
import { Section } from "@/components/section"
import { SplitSection } from "@/components/split-section"
import { StackTags } from "@/components/stack-tags"
import { AboutIntro } from "@/features/about/components/about-intro"

import { pages, profile } from "@/lib/content"

function AboutPage() {
  const copy = pages.about

  return (
    <div>
      <Section className="min-h-[calc(100svh-3.75rem)] py-12 short:py-8">
        <AmbientGlow />
        <Container>
          <AboutIntro profile={profile} />
        </Container>
      </Section>

      <Section tone="tint" className="border-t border-border">
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
                  <Reveal
                    key={`${entry.org}-${entry.role}-${entry.period}`}
                    className="group relative"
                  >
                    <span
                      aria-hidden
                      className="absolute top-7 left-[calc(-1.75rem+0.5px)] size-2 -translate-x-1/2 rounded-full border border-brand bg-background transition-colors duration-300 group-hover:bg-brand"
                    />
                    <Item className="flex-nowrap items-start gap-5 rounded-none px-0 py-5 max-sm:flex-col max-sm:gap-1.5">
                      <ItemMedia className="shrink-0 pt-0.5 font-mono text-sm sm:w-28 text-muted-foreground transition-colors group-hover:text-foreground">
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
                        <ItemDescription className="line-clamp-none">
                          {entry.note}
                        </ItemDescription>
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
