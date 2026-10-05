import React from 'react';

export const ArticlePostTabs: React.FC = () => {
  return (
    <div className="editorial-prose">
      <h2>What was actually announced</h2>
      <p>
        On September 1, 2026, Education Minister ANM Ehsanul Haque Milon told a University Day audience at Khulna University of Engineering & Technology that the government would give tablets to the roughly 116,000 students who scored GPA-5 in this year's SSC and equivalent exams, framing it as recognition for meritorious students and a push toward tech-enabled learning. Within hours, on his verified Facebook page the same night, the minister revised the plan: laptops, not tablets, and only for students who hit a "Golden GPA-5" — at least 80 marks in every single subject — a narrower group whose exact size the education boards haven't disclosed.
      </p>

      <p>
        That reversal, inside a single evening, is worth sitting with. It means the device, the eligibility bar, the recipient count, the brand, the specifications, the procurement method and the budget were all still unsettled at the moment the announcement made headlines. Nothing about a tender, a supplier, or a per-unit cost has been made public as of this writing.
      </p>

      <p>
        This year's SSC results also came in weaker than usual: the pass rate fell to 62.25% from roughly 68% the year before, and GPA-5 holders dropped from 139,032 in 2025 to 116,676 in 2026, per Business Standard's coverage of the results. Some context worth keeping in view as the country debates spending public money on a hardware giveaway.
      </p>

      <h2>Bangladesh has run this experiment before — and it didn't go well</h2>
      <p>
        The most direct precedent isn't a giveaway to SSC toppers specifically — no earlier scheme of that exact shape appears to be on record — but Bangladesh's broader history of state-driven, budget device programs offers a clear warning.
      </p>

      <p>
        The Doel laptop project, launched by Telephone Shilpa Sangstha (TSS) in 2011, was the government's flagship attempt to build an affordable, locally assembled computer and get it into schools, post offices, and the army. It collapsed. Academic case studies of the project found that its two main technical/investment partners abandoned the venture within about a year of launch, that by 2013 barely two-thirds of the laptops assembled had actually been sold, and that a large share of the buyers were the Ministry of Education itself. A university-published market study found that 83% of users who responded to surveys reported battery problems, alongside recurring complaints about Wi-Fi, webcams, RAM and screen resolution. The Daily Star later reported that the education ministry, the postal department and the army — the project's three big institutional buyers — all lodged complaints about build quality. Manufacturing was effectively wound down by 2016, and in 2026 the state minister for ICT was still on record asking for an inquiry into who should be held accountable for the project's failure, according to Bangla tech outlet Jagonews24.
      </p>

      <p>
        Separately, the government has repeatedly turned to domestic manufacturer Walton for large device procurements — 25,125 laptops for an ICT Division project, and a roughly Tk447 crore contract for 395,000 tablets for the 2021 digital census, among others. These were competitively tendered public purchases rather than free giveaways to students, and there's no comparable independent quality audit of them on the public record the way there is for Doel. But they establish that "buy Bangladeshi, buy cheap, buy at scale for a state program" is a familiar procurement instinct here — one that hasn't always been paired with a public accounting of how the devices performed once delivered.
      </p>

      <p>
        None of this means the 2026 device giveaway is destined to repeat Doel's fate. It means the country has direct, documented experience with exactly this failure mode, and that experience is the reasonable baseline against which to judge a new, still-unspecified program.
      </p>

      <h2>The part nobody's talking yet: what happens to these devices in three years</h2>
      <p>
        This is where the "e-waste" question stops being rhetorical. Bangladesh already has a serious, well-documented e-waste problem, and the enforcement mechanism meant to manage it is widely reported as barely functioning.
      </p>

      <p>A few figures worth knowing, drawn from recent research and a 2026 field assessment:</p>
      <ul>
        <li>Bangladesh generates an estimated 3 million tonnes of e-waste annually, and academic reviews describe the sector as growing roughly 20% a year.</li>
        <li>Less than 10% of that e-waste is formally recycled, according to a 2026 assessment by the digital-rights group VOICE (Voices for Interactive Choice and Empowerment), conducted with the Association for Progressive Communications.</li>
        <li>The same VOICE assessment found that of 15 surveyed entities, none were actually collecting end-of-life products as required.</li>
        <li>Bangladesh loses an estimated US$200–221 million a year in recoverable material value — gold, copper, and other components — because so little e-waste is properly processed, per that report.</li>
        <li>The country does have a legal framework: the Hazardous Waste (E-Waste) Management Rules, 2021, issued under the Bangladesh Environmental Protection Act, 1995, which sets escalating collection targets for manufacturers and importers and carries penalties of up to two years' imprisonment or a Tk200,000 fine for violations. But researchers reviewing its rollout have consistently found a wide gap between what the rules require on paper and what happens on the ground.</li>
      </ul>

      <p>
        Put those two facts side by side. A government that already has trouble getting the industry to take back and safely process ordinary consumer electronics is about to inject well over 100,000 new devices — tablets or laptops, whichever it settles on — into households across the country, with no public statement yet about warranty length, repair support, or what happens to the unit once it dies. A cheaply sourced device with a two- or three-year real-world lifespan, multiplied across six-figure recipient numbers, is not a hypothetical addition to that waste stream — it's an entirely foreseeable one, and foreseeable is exactly the point at which planning is supposed to happen, not after the fact.
      </p>

      <h2>Will the hardware actually be usable — or a repeat of the spec sheet that sank Doel?</h2>
      <p>
        There's a second, more basic question sitting underneath all the procurement and e-waste concerns above: even if a device does ship on time, will it be fast enough to actually be worth using?
      </p>

      <p>
        This isn't a hypothetical worry. Doel's own published spec sheets from 2011 are on record, and they're instructive. The entry "Primary" model — the one the education ministry itself bought in bulk — ran on a VIA 8650 processor clocked at 800MHz, paired with just 512MB of RAM and 16GB of flash storage in place of a hard drive. The step-up "Basic" model wasn't much better: an Intel Atom N455 at 1.66GHz, 1GB of RAM, and a 250GB HDD. Atom-class netbook chips like these were built for basic web browsing at launch and were already considered sluggish for everyday multitasking within a couple of years — a machine like that trying to run a modern browser with a dozen tabs, a video call, and a word processor open at once today would grind to a crawl. That's the real-world version of the "unusable, painful to use" scenario worth naming plainly: a free laptop that's too slow to actually do coursework, research, or exam prep on is not meaningfully different from no laptop at all — arguably worse, since it creates the appearance that the digital-divide problem has been solved when it hasn't.
      </p>

      <p>
        So what does "usable" actually mean by 2026 standards, and how does that compare to a low-spec device like Core 2 Duo-class processors, 4GB of RAM, and mechanical hard drives — the tier this kind of budget program has tended to land on historically?
      </p>

      <ul>
        <li><strong>Processor:</strong> Old dual-core chips from the Core 2 Duo era are more than a decade and a half old, lack modern power-efficiency and security features, and are no longer considered adequate for a current OS plus a browser doing real work. Even an entry-level 2026 laptop is expected to ship with a current-generation quad-core-or-better mobile chip.</li>
        <li><strong>RAM:</strong> Microsoft's official floor for Windows 11 is 4GB, but hardware guides and Microsoft's own engineers describe that as barely enough to boot, with 8GB as the practical minimum for smooth everyday use and 16GB increasingly treated as the sensible baseline for a machine expected to last several years, per HP's 2026 buying guidance and independent hardware coverage. A 4GB machine handed to a student today would struggle from day one, not just after a few years of wear.</li>
        <li><strong>Storage:</strong> A mechanical hard drive — 512GB or otherwise — is now considered the single biggest bottleneck in an otherwise decent machine; SSD storage is the baseline expectation on any laptop sold as new in 2026, because it affects boot time, app responsiveness and overall feel far more than capacity does.</li>
      </ul>

      <p>
        None of this requires an expensive machine. Genuinely usable, SSD-based, 8GB-RAM laptops exist at prices well within the range Doel itself charged for its worst-performing models in 2011 taka-adjusted terms. The risk isn't that a decent laptop is unaffordable — it's that "cheap" and "outdated" quietly get treated as the same purchasing decision, the way they were with Doel's bottom-tier models. That's exactly why the specifications need to be published before delivery, not discovered by students unboxing their prize: a processor and RAM figure on a tender document is a two-line disclosure, and it's the single fastest way to tell whether this program is a genuine tool or a repeat of a machine nobody could actually use.
      </p>

      <h2>The fair case for the program</h2>
      <p>
        It's worth stating plainly: the underlying idea isn't unreasonable, and dismissing it outright would be its own kind of unfairness. Rewarding academic merit is a normal thing for an education system to do, and putting a computer in the hands of a strong student from a low-income household can be a genuine, life-changing form of access — to research, to university applications, to the "AI era" skills the government has been publicly emphasizing since Prime Minister Tarique Rahman's inaugural address in February. A tablet or laptop is also a more modern, arguably more useful prize than the medals, certificates or cash stipends such programs have traditionally used. None of the concerns above are an argument against helping meritorious students. They're an argument for doing it with a plan.
      </p>

      <h2>What "doing it with a plan" would actually require</h2>
      <p>
        Before public money is committed, there's a fairly short list of things a transparent version of this program would need to disclose — and that journalists, opposition lawmakers, and civil-society watchdogs like Transparency International Bangladesh would be well within their normal, legitimate role to keep asking about:
      </p>

      <ul>
        <li>Procurement method — open competitive tender or single-source purchase, and from which supplier(s)</li>
        <li>Published technical specifications — not just "tablet" or "laptop," but the processor, RAM, storage type (SSD vs HDD) and build-quality standard being paid for, benchmarked against what a 2026 machine needs to actually run smoothly rather than merely boot</li>
        <li>Total budget and per-unit cost, so the public can judge value for money against comparable commercial devices</li>
        <li>Warranty and after-sales support terms, including who repairs a broken unit and for how long</li>
        <li>A stated device lifespan and a genuine end-of-life plan — ideally a manufacturer or government take-back commitment consistent with the 2021 e-waste rules, not a vague aspiration</li>
        <li>An independent quality audit at delivery, given that the last comparable domestic hardware push required a still-unresolved government inquiry into what went wrong</li>
      </ul>

      <h2>The bottom line</h2>
      <p>
        Bangladesh doesn't have to choose between rewarding its top students and avoiding another Doel. The choice the government actually faces is narrower and more boring: publish the specifications, publish the cost, and say — before the devices ship — what happens to them when they stop working. That's not a high bar, and it's also not one the country has consistently cleared before. Given that history, expecting the details up front isn't cynicism about this specific announcement. It's the ordinary due diligence a taxpayer-funded program of this size should get regardless of which party is in office.
      </p>

      <p className="text-sm italic mt-8 pt-4 border-t border-[var(--glass-border)] opacity-80">
        Sources: The Business Standard, Jagonews24, The Daily Star, an IEOM Society-published study and an Academia.edu-hosted paper on the Doel laptop project, archived Doel spec sheets from 2011 (StarTech.com.bd, Hasibul.info, and contemporaneous Bangladeshi tech blogs), ScienceDirect reviews of Bangladesh's e-waste policy, a 2026 VOICE/Association for Progressive Communications assessment reported by IndexBox, and 2026 hardware-standard guidance from HP and independent Windows 11 hardware coverage. This piece reflects publicly reported facts available as of September 3, 2026; procurement details for the SSC 2026 device program had not been published at time of writing and may change.
      </p>
    </div>
  );
};
