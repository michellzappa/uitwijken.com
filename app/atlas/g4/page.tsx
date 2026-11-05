import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { TopBar, PageHeader } from "../../components/Nav";
import { T } from "../../lib/i18n";
import { ConfidencePill, ModelChip } from "../AtlasUI";
import {
  G4_CITIES,
  G4_FINDINGS,
  G4_OPEN_QUESTIONS,
  G4_SYSTEMS,
  type G4CityProfile,
} from "../g4";
import type { Bi, Note } from "../platforms";

const ROWS: { key: string; label: Bi; note: (c: G4CityProfile) => Note }[] = [
  {
    key: "cityPlatform",
    label: { nl: "Stedelijk platform", en: "Citywide platform" },
    note: (c) => c.cityPlatform,
  },
  {
    key: "neighbourhoodLayer",
    label: { nl: "Buurtlaag", en: "Neighbourhood layer" },
    note: (c) => c.neighbourhoodLayer,
  },
  { key: "openData", label: { nl: "Open data", en: "Open data" }, note: (c) => c.openData },
  { key: "events", label: { nl: "Evenementen", en: "Events" }, note: (c) => c.events },
  { key: "areas", label: { nl: "Gebieden", en: "Areas" }, note: (c) => c.areas },
];

function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-1 inline-flex items-center gap-1 text-[11px] text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
    >
      <T nl="Bron" en="Source" />
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  );
}

function NoteCell({ note }: { note: Note }) {
  const open = note.confidence === "to-validate";
  return (
    <>
      <div className="mb-1.5">
        <ConfidencePill confidence={note.confidence} />
      </div>
      <p
        className={`text-[12.5px] leading-relaxed ${
          open ? "italic text-[var(--color-secondary)]" : "text-[#2a2926]"
        }`}
      >
        <T {...note.value} />
      </p>
      {note.source && <SourceLink href={note.source} />}
    </>
  );
}

export default function G4Page() {
  const regions = G4_CITIES.filter((c) => c.key !== "amsterdam");

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Atlas · G4-verkenning" en="Atlas · G4 scan" />}
        title={<T nl="Voorbij Amsterdam" en="Beyond Amsterdam" />}
        subtitle={
          <T
            nl={`Een eerste inventaris van ${G4_SYSTEMS.length} systemen in Rotterdam, Den Haag, Utrecht en de regio's eromheen, naast wat de atlas over Amsterdam weet. Dit zijn nog geen volledige profielen en de lijst is niet compleet.`}
            en={`A first inventory of ${G4_SYSTEMS.length} systems in Rotterdam, Den Haag, Utrecht, and the surrounding regions, next to what the atlas knows about Amsterdam. These are not full profiles yet and the list is not complete.`}
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-6">
        <p className="max-w-3xl border-l-2 border-[var(--color-uitwijken)] pl-4 text-[13.5px] leading-relaxed text-[var(--color-secondary)]">
          <T
            nl="Samengesteld op 5 november 2026 uit openbare bronnen en door de adressen zelf op te vragen. Niemand bij deze platformen of gemeenten is al gevraagd. Niet gevonden betekent niet dat het niet bestaat, en een gesloten groep op Facebook of WhatsApp is hier niet zichtbaar."
            en="Compiled on 5 November 2026 from public sources and by requesting the addresses directly. Nobody at these platforms or municipalities has been asked yet. Not found does not mean it does not exist, and a closed group on Facebook or WhatsApp is not visible here."
          />
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          <T nl="De vier steden naast elkaar" en="The four cities side by side" />
        </h2>
        <div className="overflow-x-auto border border-[var(--color-rule)] bg-white">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-[var(--color-ink)] px-3 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                  <T nl="Veld" en="Field" />
                </th>
                {G4_CITIES.map((c) => (
                  <th
                    key={c.key}
                    className="w-[22%] border-b-2 border-[var(--color-ink)] px-3 py-3 text-left text-[15px] font-bold tracking-tight"
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="align-top">
                  <th className="border-b border-[var(--color-rule)] px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                    <T {...row.label} />
                  </th>
                  {G4_CITIES.map((c) => {
                    const note = row.note(c);
                    return (
                      <td
                        key={c.key}
                        className={`border-b border-[var(--color-rule)] px-3 py-3 ${
                          note.confidence === "to-validate" ? "bg-[#f7f6f1]" : ""
                        }`}
                      >
                        <NoteCell note={note} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          <T nl="Wat de verkenning laat zien" en="What the scan shows" />
        </h2>
        <div className="grid gap-x-8 md:grid-cols-2">
          {G4_FINDINGS.map((f) => (
            <div key={f.title.en} className="border-t border-[var(--color-rule)] py-4">
              <h3 className="mb-1.5 text-[15.5px] font-bold">
                <T {...f.title} />
              </h3>
              <p className="text-[14px] leading-relaxed text-[#2a2926]">
                <T {...f.body} />
              </p>
              {f.source && <SourceLink href={f.source} />}
            </div>
          ))}
        </div>
      </section>

      {regions.map((city) => (
        <section key={city.key} className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="mb-1 text-2xl font-bold tracking-tight">{city.name}</h2>
          <p className="mb-4 text-[13px] text-[var(--color-secondary)]">
            <T nl="Inclusief " en="Including " />
            <T {...city.region} />
          </p>
          <div className="overflow-x-auto border border-[var(--color-rule)] bg-white">
            <table className="w-full min-w-[920px] border-collapse">
              <thead>
                <tr className="text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                  <th className="w-[20%] border-b-2 border-[var(--color-ink)] px-3 py-2">
                    <T nl="Systeem" en="System" />
                  </th>
                  <th className="w-[30%] border-b-2 border-[var(--color-ink)] px-3 py-2">
                    <T nl="Wat het is" en="What it is" />
                  </th>
                  <th className="w-[26%] border-b-2 border-[var(--color-ink)] px-3 py-2">
                    <T nl="Activiteit" en="Activity" />
                  </th>
                  <th className="w-[24%] border-b-2 border-[var(--color-ink)] px-3 py-2">
                    <T nl="Wat eruit komt" en="What comes out" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {G4_SYSTEMS.filter((s) => s.city === city.key).map((s) => (
                  <tr key={s.url} className="align-top">
                    <td className="border-b border-[var(--color-rule)] px-3 py-3">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--color-ink)] hover:text-[var(--color-link)] hover:underline"
                      >
                        {s.name}
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </a>
                      <div className="mt-0.5 text-[12px] text-[var(--color-secondary)]">
                        {s.area}
                      </div>
                      <div className="mt-0.5 text-[12px] text-[var(--color-secondary)]">
                        <T {...s.software} />
                      </div>
                      {s.models.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {s.models.map((m) => (
                            <ModelChip key={m} k={m} />
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="border-b border-[var(--color-rule)] px-3 py-3">
                      <NoteCell note={s.what} />
                    </td>
                    <td className="border-b border-[var(--color-rule)] px-3 py-3">
                      <NoteCell note={s.activity} />
                    </td>
                    <td className="border-b border-[var(--color-rule)] px-3 py-3 text-[12.5px] leading-relaxed text-[#2a2926]">
                      <T {...s.feed} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          <T nl="Wat we nog niet weten" en="What we do not know yet" />
        </h2>
        <ul className="max-w-3xl">
          {G4_OPEN_QUESTIONS.map((q) => (
            <li
              key={q.en}
              className="border-t border-[var(--color-rule)] py-2.5 text-[14px] leading-relaxed text-[#2a2926]"
            >
              <T {...q} />
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-5">
          <Link
            href="/atlas"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <T nl="Terug naar de directory" en="Back to the directory" />
          </Link>
          <Link
            href="/atlas/submit"
            className="text-[13.5px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="Klopt er iets niet? Voeg toe of corrigeer" en="Something wrong? Add or correct" />
          </Link>
        </div>
      </div>
    </div>
  );
}
