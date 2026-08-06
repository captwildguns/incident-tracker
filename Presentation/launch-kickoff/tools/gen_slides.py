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
    <div class="chip"><b>Cadence:</b> 30 minutes, every Friday</div>
    <div class="chip"><b>Release:</b> November 25, 2026</div>
  </div>
  <footer class="brand"><span>Incidents Launch Plan</span><span>Session 1</span></footer>
</section>

'''

S += slide('Session 1', 'Today&rsquo;s plan', rows([
    ('How we will run this', 'BK on the launch plan and how this group will work it'),
    ('Background', 'Where this project came from, and how it was built'),
    ('The system', 'What the Incident Tracker does, and the decisions built into it'),
    ('Live demo', 'File an incident, then follow it through its response path'),
    ('Production direction', 'The real build going up on Tyler Forge'),
    ('The launch plan', 'The seven workstreams, and the items assigned to you'),
], 'mid dense'))

S += slide('How we will run this', 'The plan belongs to this group', rows([
    ('Every item has a person', 'Items are assigned to the people in this room, not to a department'),
    ('You own status on your items', 'Each Friday you say where your items stand'),
    ('Add what is missing', 'If your area needs an item that is not on the board, put it on'),
    ('Remove what does not help', 'If an item does not move the launch forward from your side, say so'),
], 'mid'),
    callout='<div class="callout">If an item does not help you launch Incidents, it should not be on the board.</div>')

bg = '  <div class="para">Districts have run bus incidents on paper forms, phone calls, and email threads. Nothing in that chain records whether the right people were told, whether the district&rsquo;s own policy was followed, or how the case was finally closed. <b>Incidents is the module that closes that gap.</b></div>\n'
bg += '  <div class="para"><b>The design is settled.</b> The prototype is complete and clickable, and development is building production from it on Tyler Forge for the <b>November 25 release</b>.</div>\n'
S += slide('Background', 'Why we built this', bg)

S += slide('How we built it', 'Designed and built with AI', rows([
    ('AI drove the design', 'Screen concepts, the workflow model, and the mockups were all developed with AI'),
    ('And the documents', 'Process summaries, the permissions matrix, and the seed data catalog came the same way'),
    ('It started in Figma Make', 'The first design direction and prototype were built there'),
    ('It moved to Claude mid-project', 'Claude Code rebuilt it as a working Forge prototype, with design and build in one place'),
    ('What that changed', 'An idea could be built, published, and reviewed the same day instead of next sprint'),
], 'mid'))

S += slide('The problem we designed around',
           'An incident gets written up after the route, not during it', rows([
    ('The driver&rsquo;s job in the moment', 'Keep 50 kids safe and keep the bus moving, not write a report'),
    ('Filed from a tablet, later', 'At the school loop or back at the garage, while the details are fresh'),
    ('Every capture screen assumes that', 'The system is built for an after-the-fact report, not a live event'),
    ('Not the tablet today', 'The driver app is a separate Tyler Drive build running the same capture logic'),
], 'mid'))

S += slide('What we built', 'A working prototype, not a slide deck', shot(rows([
    ('Clickable, not static', 'A working incident system, branded like a Tyler product'),
    ('Simulated data', 'No backend, no real emails, no real approvals'),
    ('It is the spec', 'Development builds the real system from this reference'),
    ('Eleven pages', 'Dashboard and capture through workflows, reports, and admin'),
], 'compact'), 'dashboard.jpg', 'Incident Tracker dashboard',
    'Dashboard. Every metric on it is a doorway into a filtered view.'))

S += slide('The core idea', 'Every incident type carries a response path', rows([
    ('Response path', 'The district&rsquo;s policy for that incident type, written down as an ordered list of steps'),
    ('Step', 'One action, one owning role, a time expectation, and a notification when it becomes active'),
    ('Approval', 'Some steps hold the whole path until someone signs off'),
    ('Assignment', 'Type and severity choose the path automatically. Five types today, running 3 to 6 steps each'),
], 'mid'))

S += slide('Worked example', 'Physical Altercation Response, 5 steps', rows([
    ('Immediate Driver Response', 'Driver, within 15 minutes'),
    ('Submit Incident Report', 'Driver, within 15 minutes'),
    ('Parent Notification', 'Safety Coordinator, within 30 minutes'),
    ('Disciplinary Action Review', 'Administrator, within 1 hour. Approval required before the path continues'),
    ('Documentation and Close', 'Safety Coordinator, within 20 minutes'),
], 'mid', appr={4}),
    callout='<div class="callout">Every step names its owner, its time expectation, and who gets notified. Step 4 holds the path until an administrator signs off.</div>')

S += slide('Per-student handling', 'One event, many students', shot(rows([
    ('One event, many records', 'Add a second student and each child gets their own tracked record'),
    ('Roles', 'Instigator, victim, witness, bystander, severity overridable per student'),
    ('Different paths', 'Because the roles differ, the response path differs per child'),
    ('No busywork', 'A student who was only present gets no workflow at all'),
], 'compact'), 'incident-detail.jpg', 'Multi-student incident banner with student switcher',
    'INC-2025-0059: one altercation, three students. Switching student changes the banner, the severity, and the assigned workflow.'))

S += slide('Getting work done', 'The guided response', shot(rows([
    ('One step at a time', 'A coordinator sees the step that is theirs, not a five-step form'),
    ('Plain instructions', 'Each step carries a what to do next checklist'),
    ('Sign-off steps', 'Steps needing approval ask for it instead of completion'),
    ('The baton passes', 'Complete one and the next owner activates, with its own notification'),
], 'compact'), 'incident-workflow.jpg', 'Workflow progress and action card',
    'Workflow tab. The assigned path, the current step, and who owns it.'))

S += slide('Districts are not identical', 'Configurable, not hard-coded', shot(rows([
    ('Workflow builder', 'Add, reorder, and retire steps without a code change'),
    ('Step templates', 'Each carries its notified group and email template'),
    ('Roles and permissions', 'Managed in-district, five groups out of the box'),
], 'compact'), 'workflows.jpg', 'Workflow management and builder',
    'Workflow management. Six paths today, each editable step by step.',
    extra='      <div class="callout" style="margin-top:22px;font-size:18px;padding:16px 20px">Steps, notified groups, and permissions are all configuration. None of it is hard-coded per district.</div>\n'))

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

S += slide('The plan, briefly', 'Seven workstreams to November 25', rows([
    ('Strategy and Launch Governance', 'Goals and metrics, ICP, pricing, contract terms, go / no-go'),
    ('Product Readiness', 'Scope lock, onboarding, compliance, permissions, release checklist'),
    ('Marketing and Go-To-Market', 'Positioning, application sheet, STN and Connect, webinars'),
    ('Sales Enablement', 'Pitch and deck, demo environment, qualification, pricing guardrails, CRM'),
    ('Support and Implementation', 'Support workflows, knowledge base, escalation, UAT, training'),
    ('Launch Execution', 'Standups, customer comms, Connect unveil, beta access, soft launch, GA'),
    ('Post-Launch Measurement', 'KPI tracking, customer feedback, what comes after version 1'),
], 'mid dense'))

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
S += slide('Next steps', 'What happens from here', body)

io.open(p, 'w', encoding='utf-8', newline='').write(head + S + tail)
out = io.open(p, encoding='utf-8').read()
print('slides:', out.count('<section class="slide'))
print('dashes:', ('mdash' in out) or ('\u2014' in out) or ('\u2013' in out))
print('rules:', out.count('class="rule"'), '| type chips:', out.count('class="type"'))
