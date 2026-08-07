import io

p = r'C:\Users\Gabe.guzman\.local\gclaude\incidents-tedfinal\Presentation\launch-kickoff\index.html'
s = io.open(p, encoding='utf-8').read()
head = s[:s.index('<div id="stage">')]
tail = s[s.index('</div></div>\n<div id="progress">'):]

head = head.replace(
    '  .rule{width:76px;height:3px;background:var(--blue-dark);margin:24px 0 28px}\n', '')

N = [1]  # running slide number


def rows(items, variant='', appr=None):
    v = (' ' + variant).rstrip()
    out = '  <div class="agenda%s">\n' % v
    for i, it in enumerate(items, start=1):
        title = it[0]
        desc = it[1] if len(it) > 1 else None
        d = '<b>%s</b>' % title + ('<i>%s</i>' % desc if desc else '')
        c = ' appr' if appr and i in appr else ''
        out += '    <div class="ag%s"><span class="t">%02d</span><span class="d">%s</span></div>\n' % (c, i, d)
    out += '  </div>\n'
    return out


def slide(kicker, h2, body, callout=None, divider=False):
    N[0] += 1
    num = N[0]
    cls = ' divider' if divider else ''
    o = '<!-- %d ................................................. -->\n' % num
    o += '<section class="slide%s">\n' % cls
    o += '  <div class="kicker">%s</div>\n  <h2>%s</h2>\n' % (kicker, h2)
    o += body
    if callout:
        o += '  %s\n' % callout
    o += '  <footer class="brand"><span>Incidents Launch Plan</span><span>%02d</span></footer>\n</section>\n\n' % num
    return o


def shot(col_rows, img, alt, cap, extra=''):
    b = '  <div class="shot-row">\n    <div>\n' + col_rows + extra
    b += '    </div>\n    <div>\n      <img class="shot" src="assets/%s" alt="%s">\n' % (img, alt)
    b += '      <div class="shot-cap">%s</div>\n    </div>\n  </div>\n' % cap
    return b


S = '<div id="stage"><div id="deck">\n\n'

S += '''<!-- 1 ................................................. -->
<section class="slide title active">
  <div class="titlebar"></div>
  <h1>Incidents Launch</h1>
  <div class="sub">Session 1 &middot; Friday, August 7, 2026</div>
  <div class="chips">
    <div class="chip"><b>Today:</b> Incident Tracker walkthrough</div>
    <div class="chip"><b>Release:</b> November 25, 2026</div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>Session 1</span></footer>
</section>

'''

S += slide('Session 1', 'Today&rsquo;s plan', rows([
    ('The launch plan', 'BK to share on the launch plan design and behavior'),
    ('Background', 'Where this project came from, and how it was built'),
    ('The system', 'What the Incident Tracker does, and the decisions built into it'),
    ('Live demo', 'A hands on look at our design prototype'),
    ('Production direction', 'Production design built with Forge'),
    ('Going forward', 'Let&rsquo;s ensure nothing falls through the cracks'),
], 'mid dense'))

S += slide('The launch plan', 'The plan belongs to this group', rows([
    ('Every item has a person', 'Items are assigned to the people in this room, not to a department'),
    ('You own status on your items', 'Each Friday you say where your items stand'),
    ('Add what is missing', 'If your area needs an item that is not on the board, put it on'),
    ('Remove what does not help', 'If an item does not move the launch forward from your side, say so'),
], 'mid'),
    callout='<div class="callout">If an item does not help you launch Incidents, it should not be on the board.</div>')

bg = '  <div class="para">Many of our clients track incidents in homegrown systems and one-off tools. The real conversation happens over email, where it never gets tied back to the record. <b>Incidents closes that gap.</b></div>\n'
bg += '  <div class="para">We started in Figma and turned it into a working prototype. <b>That prototype became our spec</b>, and work on the real site is underway in Forge for the <b>November 25 release</b>.</div>\n'
S += slide('Background', 'Why we built this', bg)

S += slide('How we built it', 'Designed and built with AI', rows([
    ('AI drove the design', 'Screen concepts, the workflow model, and the mockups were all developed with AI'),
    ('It started in Figma Make', 'The first design direction and prototype were built there'),
    ('It moved to Claude mid-project', 'Claude Code rebuilt it as a working Forge prototype, with design and build in one place'),
    ('What that changed', 'An idea could be built, published, and reviewed the same day instead of next sprint'),
], 'mid'))

S += slide('The system', 'What the Incident Tracker does', shot(rows([
    ('Response paths by type', 'Steps assigned automatically from type and severity'),
    ('Per-student records', 'One event becomes one tracked record per child'),
    ('Notifications and approvals', 'Each step names its owner and who gets notified'),
    ('Configurable by district', 'Steps, groups, and permissions are settings, not code'),
    ('Dashboard and reporting', 'Every metric is a doorway into a filtered view'),
], 'compact'), 'dashboard.jpg', 'Incident Tracker dashboard',
    'Dashboard. The coordinator view of every open incident.'))

S += slide('Switching to the live site', 'Live demo', rows([
    ('Dashboard', 'Click a metric, not a filter, and watch the view assemble'),
    ('Capture an incident', 'Two students, and the form grows to match the situation'),
    ('The queue', 'How a coordinator triages by severity first thing in the morning'),
    ('One event, many paths', 'INC-2025-0059, three students, three outcomes'),
    ('The guided response', 'One step at a time, and what happens when a step needs approval'),
], 'mid'), divider=True,
    callout='<div class="callout">Everything here runs in the prototype. The data is realistic but simulated, so no real notifications go out.\n    <span class="link">captwildguns.github.io/incident-tracker</span></div>')

S += slide('Production direction', 'The real build, on Tyler Forge', shot(rows([
    ('Built on Forge', 'Production uses the design system shared across Tyler products'),
    ('Already standing up', 'Live in vNext staging: Forge navigation, tables, and tokens'),
    ('Same architecture', 'What the prototype settles is what gets built there'),
], 'compact'), 'forge-prod.jpg', 'Incidents vNext build on Tyler Forge',
    'incidents-vnext.staging.student-transportation.tylerapp.com. Early build, real Forge components.'))

body = rows([
    ('This week', 'Open the board, find the items assigned to you, and review them'),
    ('Friday, August 14', 'We go person by person: filter the board to your name and give status'),
    ('Every Friday after that', 'Thirty minutes, same format, tracking to the November 25 release'),
], 'mid')
body += '''  <div class="links">
    <div class="linkline"><b>Prototype:</b> captwildguns.github.io/incident-tracker</div>
    <div class="linkline"><b>Board:</b> traversa-student-transportation.monday.com/boards/18416191331</div>
  </div>
'''
S += slide('Going forward', 'How we keep this on track', body)

io.open(p, 'w', encoding='utf-8', newline='').write(head + S + tail)
out = io.open(p, encoding='utf-8').read()
print('slides:', out.count('<section class="slide'))
print('dashes:', ('mdash' in out) or ('\u2014' in out) or ('\u2013' in out))
print('rules:', out.count('class="rule"'), '| type chips:', out.count('class="type"'))
