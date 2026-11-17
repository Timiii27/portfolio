import Hero from "@/components/Hero";
import ChapterIndex from "@/components/ChapterIndex";
import Chapter from "@/components/Chapter";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Hud from "@/components/Hud";
import { chapters } from "@/data/profile";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ChapterIndex />
        {chapters.map((chapter, i) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            index={i}
            total={chapters.length}
            next={chapters[i + 1]}
          />
        ))}
        <Projects />
        <Stack />
        <Contact />
      </main>
      {/* El HUD va al final para que sus ScrollTriggers se creen después de los pins. */}
      <Hud />
    </>
  );
}
