import io

base = r'C:\Users\Gabe.guzman\.local\gclaude\incidents-tedfinal\Presentation\launch-kickoff\index.html'
out = r'C:\Users\Gabe.guzman\.local\gclaude\incidents-tedfinal\Presentation\launch-kickoff\_template.html'

s = io.open(base, encoding='utf-8').read()
head = s[:s.index('<div id="stage">')]
tail = s[s.index('</div></div>\n<div id="progress">'):]
head = head.replace('<title>Incidents Launch: Weekly Working Session #1</title>',
                    '<title>Incidents Launch: Weekly Working Session #N</title>')

body = '''<div id="stage"><div id="deck">
<!--
  WEEKLY SESSION TEMPLATE. Copy this file, fill in the slides, never touch the CSS above.

  FIXED SKELETON
    1. Title                .slide.title
    2. Today's plan         numbered rows, subjects only
    3. Background / recap   .para paragraphs, when context is needed
    4..n Topic slides       numbered rows, with or without a screenshot
    x. Live demo            .slide.divider, only when there is a demo
    y. The plan             numbered rows, one per workstream
    z. Next steps           numbered rows, then the .links block

  ONE CONTENT PATTERN, EVERY SLIDE
    number (olive) | title (blue, bold) | description (grey), thin rule between rows.
      .agenda           3 to 4 rows, full width
      .agenda.mid       4 to 7 rows, full width
      .agenda.compact   in the 388px column beside a screenshot
      .ag.appr          amber row, for an approval or exception step

  RULES
    - No separator line under the headline, no subtitle block, no vertical accent bar.
      The kicker plus headline is enough, and never two intro lines stacked.
    - Kicker names the category. Headline states the point, not the topic.
    - A line worth saying out loud goes in the presenter notes, not on the slide.
    - The grey .callout strip is one line at the bottom, and only when there is a
      real ask, decision, or a statement worth isolating. No summaries, no filler.
    - Never more than 3 items in a bottom row of chips or cards. More than 3 gets
      cluttered: use numbered rows instead.
    - Screenshots take 65% of the slide via .shot-row. Bullets go in the 388px column.
    - Captions under screenshots are 16px body grey. No faint grey micro-copy anywhere.
    - No em dashes or en dashes. Use a period, colon, comma, or parentheses.
    - These sessions inform. State what is true; do not solicit design feedback.
    - Keep all content above y=841px so nothing collides with the footer.
-->

<!-- 1. TITLE. Three chips maximum. -->
<section class="slide title active">
  <div class="titlebar"></div>
  <h1>Incidents Launch</h1>
  <div class="sub">Session N &middot; Friday, MONTH D, YYYY</div>
  <div class="chips">
    <div class="chip"><b>Today:</b> headline subject</div>
    <div class="chip"><b>Cadence:</b> 30 minutes, every Friday</div>
    <div class="chip"><b>Release:</b> November 25, 2026</div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>Session N</span></footer>
</section>

<!-- 2. TODAY'S PLAN. Subjects only, never times. No callout. -->
<section class="slide">
  <div class="kicker">Session N</div>
  <h2>Today&rsquo;s plan</h2>
  <div class="agenda mid">
    <div class="ag"><span class="t">01</span><span class="d"><b>Subject</b><i>One line on what this covers</i></span></div>
    <div class="ag"><span class="t">02</span><span class="d"><b>Subject</b><i>One line on what this covers</i></span></div>
    <div class="ag"><span class="t">03</span><span class="d"><b>Subject</b><i>One line on what this covers</i></span></div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>02</span></footer>
</section>

<!-- 3. BACKGROUND or RECAP. Prose, two short paragraphs at most. -->
<section class="slide">
  <div class="kicker">Background</div>
  <h2>The point of the context, stated plainly</h2>
  <div class="para">First paragraph. The situation, and why it matters. Bold <b>the one phrase</b> that carries the point.</div>
  <div class="para">Second paragraph. Where things stand now, and the date that matters.</div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>03</span></footer>
</section>

<!-- 4. TOPIC SLIDE, rows only. Add the callout only if it earns its place. -->
<section class="slide">
  <div class="kicker">Category</div>
  <h2>What this slide establishes</h2>
  <div class="agenda mid">
    <div class="ag"><span class="t">01</span><span class="d"><b>Term or point</b><i>The explanation in one line</i></span></div>
    <div class="ag"><span class="t">02</span><span class="d"><b>Term or point</b><i>The explanation in one line</i></span></div>
    <div class="ag"><span class="t">03</span><span class="d"><b>Term or point</b><i>The explanation in one line</i></span></div>
    <div class="ag appr"><span class="t">04</span><span class="d"><b>Exception or approval</b><i>Amber row for the one that behaves differently</i></span></div>
  </div>
  <div class="callout">A statement worth isolating. Delete this strip if there is not one.</div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>04</span></footer>
</section>

<!-- 5. TOPIC SLIDE with a screenshot at 65%. -->
<section class="slide">
  <div class="kicker">Category</div>
  <h2>What the screenshot proves</h2>
  <div class="shot-row">
    <div>
      <div class="agenda compact">
        <div class="ag"><span class="t">01</span><span class="d"><b>Short title</b><i>Short description, this column is 388px</i></span></div>
        <div class="ag"><span class="t">02</span><span class="d"><b>Short title</b><i>Short description</i></span></div>
        <div class="ag"><span class="t">03</span><span class="d"><b>Short title</b><i>Short description</i></span></div>
      </div>
    </div>
    <div>
      <img class="shot" src="assets/FILE.jpg" alt="describe the screen">
      <div class="shot-cap">Screen name. What to notice in it.</div>
    </div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>05</span></footer>
</section>

<!-- 6. LIVE DEMO divider, dark. Only when there is a demo. -->
<section class="slide divider">
  <div class="kicker">Switching to the live site</div>
  <h2>Live demo</h2>
  <div class="agenda mid">
    <div class="ag"><span class="t">01</span><span class="d"><b>Beat</b><i>What they will see</i></span></div>
    <div class="ag"><span class="t">02</span><span class="d"><b>Beat</b><i>What they will see</i></span></div>
    <div class="ag"><span class="t">03</span><span class="d"><b>Beat</b><i>What they will see</i></span></div>
  </div>
  <div class="callout">Everything here runs in the prototype. The data is realistic but simulated, so no real notifications go out.
    <span class="link">captwildguns.github.io/incident-tracker</span></div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>06</span></footer>
</section>

<!-- 7. THE PLAN. One row per workstream. -->
<section class="slide">
  <div class="kicker">The plan, briefly</div>
  <h2>Where the launch plan stands</h2>
  <div class="agenda mid">
    <div class="ag"><span class="t">01</span><span class="d"><b>Workstream</b><i>What sits in it right now</i></span></div>
    <div class="ag"><span class="t">02</span><span class="d"><b>Workstream</b><i>What sits in it right now</i></span></div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>07</span></footer>
</section>

<!-- 8. NEXT STEPS. Always last. Rows, then the links block. -->
<section class="slide">
  <div class="kicker">Next steps</div>
  <h2>What happens from here</h2>
  <div class="agenda mid">
    <div class="ag"><span class="t">01</span><span class="d"><b>This week</b><i>The specific ask</i></span></div>
    <div class="ag"><span class="t">02</span><span class="d"><b>Next Friday</b><i>What we will do in the room</i></span></div>
    <div class="ag"><span class="t">03</span><span class="d"><b>Every Friday after that</b><i>Thirty minutes, tracking to the November 25 release</i></span></div>
  </div>
  <div class="links">
    <div class="linkline"><b>Prototype:</b> captwildguns.github.io/incident-tracker</div>
    <div class="linkline"><b>Board:</b> traversa-student-transportation.monday.com/boards/18416191331</div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>08</span></footer>
</section>

'''

io.open(out, 'w', encoding='utf-8', newline='').write(head + body + tail)
t = io.open(out, encoding='utf-8').read()
print('template slides:', t.count('<section class="slide'))
print('dashes:', ('mdash' in t) or ('\u2014' in t) or ('\u2013' in t))
