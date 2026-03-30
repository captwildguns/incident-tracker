# Screen: Reports

| Property | Value |
|----------|-------|
| **Screen Name** | Reports |
| **Screen Slug / Path** | `reports` |
| **Purpose** | Quick report cards with preview dialog and export capabilities |
| **Primary User Roles** | Safety Coordinator, Supervisor, Administrator |
| **Status** | Enhanced |
| **Rationale** | 8 reports; Custom Report Builder not implemented; Weekly Trends now shows visual dashboard |

![Wireframe - Reports 1440x900](INSERT_IMAGE_HERE)

## Quick Reports

| Report ID | Title | Icon Color | View Type |
|-----------|-------|------------|-----------|
| monthly-summary | Monthly Summary | blue | Table |
| student-history | Student Incident History | purple | Table |
| driver-performance | Driver Report Summary | green | Table (Student column removed, Driver after Date) |
| high-severity | High Severity Incidents | red | Table |
| vehicle-report | Vehicle Incident Report | amber | Table (Student column removed, Driver after Date) |
| open-incidents | Open Incidents Report | cyan | Table |
| weekly-trends | Weekly Trends Analysis | indigo | **Dashboard with Charts** |
| repeat-offenders | Repeat Offender Report | violet | Table |

## Weekly Trends Analysis Dashboard

The Weekly Trends Analysis report provides a comprehensive visual dashboard instead of a table view:

### Summary Cards (4 KPI tiles)

| Card | Metric | Calculation |
|------|--------|-------------|
| This Week | Count with % change | Week-over-week percentage with up/down arrow |
| Last Week | Count with date | Previous week's incident count |
| High Severity Trend | Count with % change | High severity incidents week-over-week change |
| 4-Week Average | Average count | Total incidents / number of weeks |

### Charts

| Chart | Type | Data Displayed |
|-------|------|----------------|
| Weekly Incident Trend | Line Chart | Total incidents and high severity incidents over time |
| This Week by Type | Progress Bars | Top 5 incident types with counts and percentages |
| Severity Distribution by Week | Stacked Bar Chart | High/Medium/Low severity breakdown per week |

### Key Insights Section

Automated insights that appear based on data patterns:

| Insight | Trigger Condition | Display |
|---------|------------------|---------|
| Significant Increase | Week-over-week change > 10% | Red alert card with AlertTriangle icon |
| Positive Trend | Week-over-week change < -10% | Green success card with TrendingUp icon |
| Most Common Type | Any incident type > 2 occurrences | Gray info card with BarChart3 icon |

## Report Table Structure

### Standard Reports (Table View)

| Column | Reports Using This Structure |
|--------|------------------------------|
| Incident ID → Date → Student → Type → Vehicle → Driver → Severity → Status | Monthly Summary, Student History, High Severity, Open Incidents, Repeat Offenders |

### Driver/Vehicle Reports (Modified Table View)

| Column | Reports Using This Structure |
|--------|------------------------------|
| Incident ID → Date → **Driver** → Type → Vehicle → Severity → Status | Driver Report Summary, Vehicle Incident Report |

**Note:** Student column is removed; Driver column moved to position 3 (right after Date)

## Report Card Fields

| Field Name | Type | Example |
|------------|------|------------|
| title | read-only string | `Monthly Summary` |
| description | read-only string | `Incident statistics and trends...` |
| lastRun | read-only string | `1 day ago` |

## Buttons

| Button | Type | On Click |
|--------|------|----------|
| View Report | Primary | Opens preview dialog (table or dashboard depending on report type) |
| Download Report | Primary | Downloads report; displays toast notification |

## Preview Dialog Features

| Feature | Description |
|---------|-------------|
| Summary Stats | 4 metric tiles: Total Incidents, High Severity, Open/In Progress, Unique Students |
| Report Content | Table view or dashboard view (for Weekly Trends) |
| Footer | Record count and generation date |
| Download | Button in header for exporting report |

## Technical Implementation

### Charts Library
- Uses Recharts for all visualizations
- LineChart, BarChart components with responsive containers
- Custom styling using design system CSS variables

### Chart Styling
- All charts use `var(--forge-*)` CSS variables for colors, fonts, spacing
- CartesianGrid: `hsl(var(--border))`
- Axes: `hsl(var(--muted-foreground))`
- Primary line: `hsl(var(--primary))`
- High severity: `hsl(var(--destructive))`
- Success indicators: `hsl(var(--success))`
- Warning indicators: `hsl(var(--warning))`

### Data Keys
To prevent React duplicate key warnings, all chart data includes unique `id` fields:
- Line chart: `id: \`week-${index}\``
- Bar chart: `id: \`severity-week-${index}\``

## Not Implemented

- Custom Report Builder
- Analytics Dashboard (heat maps, comparisons)
- Scheduled Reports
- Compliance Report
- PDF export (Download button shows toast only)