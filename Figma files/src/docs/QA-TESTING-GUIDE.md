# QA Testing Guide - Student Transportation Incident Tracker

## Document Information
- **Application**: Student Transportation Incident Tracker
- **Version**: 1.0
- **Design System**: Tyler Forge 3.x
- **Last Updated**: January 28, 2026
- **Purpose**: Comprehensive testing guide for QA team

---

## Table of Contents
1. [Testing Overview](#testing-overview)
2. [Test Environment Setup](#test-environment-setup)
3. [Feature Test Cases](#feature-test-cases)
4. [Design System Compliance Testing](#design-system-compliance-testing)
5. [Accessibility Testing](#accessibility-testing)
6. [Cross-Browser & Responsive Testing](#cross-browser--responsive-testing)
7. [Performance Testing](#performance-testing)
8. [Bug Reporting Guidelines](#bug-reporting-guidelines)

---

## Testing Overview

### Application Scope
The Student Transportation Incident Tracker is a comprehensive incident management system for school districts to capture, manage, and communicate student and driver incidents.

### Key Features to Test
- ✅ Dashboard with metrics and analytics
- ✅ Incident management (create, view, edit, track)
- ✅ Student management
- ✅ Driver management
- ✅ Vehicle management
- ✅ Communications system
- ✅ Reports generation
- ✅ Workflow automation
- ✅ Interactive location mapping

### Testing Priorities
- **P0 (Critical)**: Core incident reporting, data accuracy, workflow assignment
- **P1 (High)**: Navigation, search, filtering, communications
- **P2 (Medium)**: UI/UX polish, design system compliance, animations
- **P3 (Low)**: Edge cases, nice-to-have features

---

## Test Environment Setup

### Prerequisites
- [ ] Access to the application URL
- [ ] Test user accounts with different permission levels
- [ ] Sample data loaded (students, drivers, vehicles, incidents)
- [ ] Multiple browsers installed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices or browser dev tools for responsive testing
- [ ] Screen reader software for accessibility testing

### Test Data Requirements
- **Students**: At least 20 test student records across different grades and schools
- **Drivers**: At least 10 test driver records with different routes
- **Vehicles**: At least 15 test vehicles with varying statuses
- **Incidents**: Mix of student and driver incidents with varying severities
- **Routes**: Multiple routes assigned to different drivers and vehicles

### Browser Support Matrix
| Browser | Version | Desktop | Mobile | Priority |
|---------|---------|---------|---------|----------|
| Chrome | Latest | ✅ | ✅ | P0 |
| Firefox | Latest | ✅ | ✅ | P1 |
| Safari | Latest | ✅ | ✅ | P0 |
| Edge | Latest | ✅ | ✅ | P1 |

---

## Feature Test Cases

### 1. Navigation & Layout

#### TC-NAV-001: Sidebar Navigation
**Priority**: P0  
**Description**: Verify sidebar navigation functions correctly

**Test Steps**:
1. Load the application
2. Click on each navigation item:
   - Dashboard
   - Incidents
   - Students
   - Drivers
   - Vehicles
   - Communications
   - Reports
   - Workflows
   - Help

**Expected Results**:
- ✅ Each page loads without errors
- ✅ Active page is highlighted in sidebar
- ✅ Page title updates correctly
- ✅ URL updates to reflect current page
- ✅ Sidebar remains visible and functional on all pages

**Design System Check**:
- [ ] Navigation uses Roboto font
- [ ] Hover states use brand colors (#4A6FA5, #5B8BB8, #6B9BC5)
- [ ] Active state shows proper highlighting
- [ ] Spacing matches Forge spacing tokens

---

#### TC-NAV-002: Notifications Dropdown
**Priority**: P1  
**Description**: Verify notifications dropdown displays and functions correctly

**Test Steps**:
1. Click the bell icon in the top navigation
2. Verify notifications are displayed
3. Click on a notification
4. Click outside to close dropdown

**Expected Results**:
- ✅ Dropdown opens smoothly
- ✅ Notifications list is visible and scrollable
- ✅ Clicking a notification performs expected action
- ✅ Dropdown closes when clicking outside
- ✅ Badge shows unread count (if applicable)

---

#### TC-NAV-003: User Profile Menu
**Priority**: P1  
**Description**: Verify user profile menu functions correctly

**Test Steps**:
1. Click the user avatar/profile icon
2. Verify profile menu displays
3. Test all menu options

**Expected Results**:
- ✅ Profile menu opens correctly
- ✅ User information displays accurately
- ✅ Menu items are clickable and functional
- ✅ Logout function works (if implemented)

---

### 2. Dashboard Page

#### TC-DASH-001: Dashboard Metrics Display
**Priority**: P0  
**Description**: Verify all dashboard metrics load and display correctly

**Test Steps**:
1. Navigate to Dashboard
2. Verify the following metric cards appear:
   - Total Incidents (current month)
   - Pending Reviews
   - High Severity
   - Avg. Resolution Time

**Expected Results**:
- ✅ All four metric cards are visible
- ✅ Numbers display without errors
- ✅ Trend indicators (↑/↓) show with percentage
- ✅ Icons display correctly
- ✅ Data updates when date range changes (if applicable)

**Design System Check**:
- [ ] Card backgrounds use design system tokens
- [ ] Typography uses Roboto font
- [ ] Colors match brand palette
- [ ] Spacing uses Forge tokens

---

#### TC-DASH-002: Recent Incidents Table
**Priority**: P0  
**Description**: Verify recent incidents table displays and functions correctly

**Test Steps**:
1. Scroll to "Recent Incidents" section
2. Verify table displays with columns:
   - ID
   - Type
   - Student/Driver
   - Date
   - Severity
   - Status
   - Actions
3. Click "View" button on an incident
4. Test pagination (if applicable)

**Expected Results**:
- ✅ Table renders with all columns
- ✅ Data is properly formatted
- ✅ Severity badges display correct colors
- ✅ Status badges display correct states
- ✅ "View" button navigates to incident detail
- ✅ Pagination works correctly

---

#### TC-DASH-003: Incident Trends Chart
**Priority**: P1  
**Description**: Verify incident trends chart displays data correctly

**Test Steps**:
1. Locate the "Incident Trends" chart
2. Verify chart displays student and driver incident lines
3. Hover over data points
4. Change time period (if filters available)

**Expected Results**:
- ✅ Chart renders without errors
- ✅ Both student and driver data lines display
- ✅ Legend is accurate
- ✅ Tooltips show on hover
- ✅ Chart is responsive
- ✅ Data updates when filters change

---

#### TC-DASH-004: Severity Distribution Chart
**Priority**: P1  
**Description**: Verify severity distribution pie/donut chart functions correctly

**Test Steps**:
1. Locate severity distribution chart
2. Verify all severity levels are shown (Low, Medium, High)
3. Hover over chart segments
4. Verify percentages add up to 100%

**Expected Results**:
- ✅ Chart renders with correct data
- ✅ Colors match severity levels (red for high, yellow for medium, green for low)
- ✅ Percentages are accurate
- ✅ Tooltips display on hover
- ✅ Legend displays correctly

---

### 3. Incidents Page

#### TC-INC-001: Incidents List Display
**Priority**: P0  
**Description**: Verify incidents list displays all incidents correctly

**Test Steps**:
1. Navigate to Incidents page
2. Verify incidents table displays with all columns
3. Verify data is properly formatted
4. Test sorting by clicking column headers

**Expected Results**:
- ✅ All incidents load and display
- ✅ Table columns are properly aligned
- ✅ Data formats correctly (dates, IDs, etc.)
- ✅ Sorting works on sortable columns
- ✅ No layout breaking or overflow issues

---

#### TC-INC-002: Search Functionality
**Priority**: P0  
**Description**: Verify search bar filters incidents correctly

**Test Steps**:
1. Locate search input field
2. Enter search term (student name, incident ID, etc.)
3. Verify results update in real-time
4. Clear search and verify all incidents return
5. Test invalid/no results search

**Expected Results**:
- ✅ Search filters results as you type
- ✅ Results are relevant to search term
- ✅ Clearing search restores all incidents
- ✅ "No results" message displays when appropriate
- ✅ Search is case-insensitive

---

#### TC-INC-003: Status Filter
**Priority**: P0  
**Description**: Verify status filter dropdown works correctly

**Test Steps**:
1. Click status filter dropdown
2. Select "Open" status
3. Verify only open incidents display
4. Change to "In Progress"
5. Change to "Resolved"
6. Select "All Statuses"

**Expected Results**:
- ✅ Dropdown displays all status options
- ✅ Table updates immediately when status selected
- ✅ Only incidents matching selected status display
- ✅ "All Statuses" shows all incidents
- ✅ Filter state persists during session

---

#### TC-INC-004: Severity Filter
**Priority**: P1  
**Description**: Verify severity filter functions correctly

**Test Steps**:
1. Click severity filter dropdown
2. Select "High" severity
3. Verify only high severity incidents display
4. Test "Medium" and "Low" filters
5. Select "All Severities"

**Expected Results**:
- ✅ Filter updates table correctly
- ✅ Only matching severity incidents show
- ✅ Severity badges display correct colors
- ✅ "All Severities" resets filter

---

#### TC-INC-005: View Incident Details
**Priority**: P0  
**Description**: Verify clicking an incident opens detail view

**Test Steps**:
1. Click "View" button on any incident
2. Verify incident detail page/modal opens
3. Verify all incident information displays
4. Test "Back" or "Close" button

**Expected Results**:
- ✅ Detail view opens correctly
- ✅ All incident data displays accurately
- ✅ Photos/documents load if attached
- ✅ Workflow progress shows correctly
- ✅ Back/Close returns to incidents list

---

#### TC-INC-006: Edit Incident
**Priority**: P0  
**Description**: Verify incident editing functionality

**Test Steps**:
1. Open an incident detail view
2. Click "Edit" button
3. Modify incident fields (description, severity, etc.)
4. Click "Save"
5. Verify changes are saved
6. Test "Cancel" button discards changes

**Expected Results**:
- ✅ Edit dialog/form opens
- ✅ Current values pre-populate fields
- ✅ All fields are editable
- ✅ Save button commits changes
- ✅ Cancel button discards changes
- ✅ Success message displays after save

---

#### TC-INC-007: Export Incidents
**Priority**: P2  
**Description**: Verify incident export functionality (if implemented)

**Test Steps**:
1. Click "Export" button
2. Select export format (CSV, PDF, etc.)
3. Verify file downloads
4. Open file and verify data

**Expected Results**:
- ✅ Export dialog opens
- ✅ Format options are available
- ✅ File downloads successfully
- ✅ Data in file matches displayed data
- ✅ Formatting is correct

---

### 4. New Incident Form

#### TC-FORM-001: Incident Category Selection
**Priority**: P0  
**Description**: Verify incident category selection (Student vs Driver)

**Test Steps**:
1. Navigate to "New Incident" page
2. Verify two category cards display: "Student Incident" and "Driver Incident"
3. Click "Student Incident"
4. Verify form updates to student incident fields
5. Click "Change Incident Type" to go back
6. Click "Driver Incident"
7. Verify form updates to driver incident fields

**Expected Results**:
- ✅ Both category cards are visible and clickable
- ✅ Student card shows Users icon and appropriate description
- ✅ Driver card shows UserCircle2 icon and appropriate description
- ✅ Clicking a category updates form fields correctly
- ✅ "Change Incident Type" button allows going back
- ✅ Hover states work on category cards

**Design System Check**:
- [ ] Cards use Forge border radius tokens
- [ ] Hover states use brand colors
- [ ] Typography uses Roboto font
- [ ] Icon colors match design (blue for student, green for driver)

---

#### TC-FORM-002: Student Lookup and Selection
**Priority**: P0  
**Description**: Verify student lookup autocomplete works correctly

**Test Steps**:
1. Select "Student Incident" category
2. Click in "Student Name" field
3. Type partial student name (e.g., "Sara")
4. Verify autocomplete suggestions appear
5. Click on a student from the list
6. Verify student details populate:
   - Student ID auto-fills
   - Student photo displays
   - Grade and school show
   - Bus and route auto-populate

**Expected Results**:
- ✅ Autocomplete dropdown appears as you type
- ✅ Search is case-insensitive
- ✅ Results filter based on name and ID
- ✅ Selecting a student populates all fields
- ✅ Student photo displays in rounded frame
- ✅ Student ID field becomes disabled/read-only
- ✅ Bus and route fields auto-populate

**Edge Cases**:
- [ ] Search with no results shows "No student found"
- [ ] Clicking outside closes dropdown
- [ ] Special characters in name work correctly

---

#### TC-FORM-003: Driver Selection
**Priority**: P0  
**Description**: Verify driver selection works correctly

**Test Steps**:
1. Select "Driver Incident" category
2. Click "Driver" dropdown
3. Select a driver from the list
4. Verify driver details display:
   - Driver photo appears
   - Employee ID shows
   - Name displays

**Expected Results**:
- ✅ Dropdown displays all drivers
- ✅ Driver names and employee IDs are formatted correctly
- ✅ Selecting a driver shows photo inline
- ✅ Driver information displays accurately

---

#### TC-FORM-004: Incident Type Selection
**Priority**: P0  
**Description**: Verify incident type dropdown and auto-severity assignment

**Test Steps**:
1. Fill required fields (student/driver)
2. Click "Incident Type" dropdown
3. Verify types are grouped by category:
   - BEHAVIORAL
   - SAFETY
   - HEALTH
   - OPERATIONAL
   - Etc.
4. Select different incident types
5. Verify severity auto-assigns based on incident type

**Expected Results**:
- ✅ Dropdown displays all incident types
- ✅ Types are properly categorized
- ✅ Category headers are styled differently (uppercase, muted)
- ✅ Selecting a type auto-selects recommended severity
- ✅ Incident description displays below dropdown
- ✅ Only relevant types show based on student vs driver

**Design System Check**:
- [ ] Category headers use text-xs and uppercase styling
- [ ] Dropdown scrolls smoothly if many options
- [ ] Selected value displays correctly

---

#### TC-FORM-005: Location Selection
**Priority**: P0  
**Description**: Verify location dropdown displays correct options

**Test Steps**:
1. Click "Location" dropdown
2. For Student Incidents, verify categories:
   - ON ROUTE (On Vehicle, At Vehicle Stop, Loading/Unloading)
   - SCHOOL/LOCATION (School Campus, Parking Lot, Layover Location)
   - OTHER
3. For Driver Incidents, verify categories:
   - ON ROUTE
   - FACILITY (Garage, Yard, Maintenance Bay, Fuel Station, Wash Bay)
   - SCHOOL/LOCATION
   - OTHER
4. Select different locations

**Expected Results**:
- ✅ Correct locations display based on incident category
- ✅ Options are grouped by category
- ✅ All location options are selectable
- ✅ Selected location displays correctly

---

#### TC-FORM-006: Address Autocomplete
**Priority**: P1  
**Description**: Verify address autocomplete search works

**Test Steps**:
1. Click in "Address" field
2. Type partial address (e.g., "1234 Main")
3. Verify autocomplete suggestions appear
4. Select an address from dropdown
5. Verify full address populates field

**Expected Results**:
- ✅ Autocomplete dropdown appears
- ✅ MapPin icon displays in input field
- ✅ Addresses are properly formatted
- ✅ "Verified Address" label shows in dropdown
- ✅ Selecting an address populates field
- ✅ Clicking outside closes dropdown

---

#### TC-FORM-007: Vehicle and Route Selection
**Priority**: P1  
**Description**: Verify vehicle and route dropdowns work correctly

**Test Steps**:
1. Click "Vehicle Number" dropdown
2. Select a vehicle
3. Click "Run" dropdown
4. Select a run
5. Verify assigned driver auto-populates (if applicable)

**Expected Results**:
- ✅ Vehicle dropdown displays all vehicles
- ✅ Route dropdown displays all routes
- ✅ Selecting a route with an assigned driver auto-fills driver field
- ✅ Help text displays under route field
- ✅ Fields remain optional

---

#### TC-FORM-008: Severity Level Selection
**Priority**: P0  
**Description**: Verify severity level can be manually adjusted

**Test Steps**:
1. Select an incident type (which auto-assigns severity)
2. Click on a different severity level (Low, Medium, High)
3. Verify severity updates
4. Verify visual feedback shows selected severity

**Expected Results**:
- ✅ All three severity options display
- ✅ Auto-assigned severity is pre-selected
- ✅ Clicking another severity updates selection
- ✅ Selected severity shows CheckCircle2 icon
- ✅ Unselected severities show Circle icon
- ✅ Badge colors match severity (red=high, yellow=medium, green=low)
- ✅ Help text explains recommendation

**Design System Check**:
- [ ] Buttons use proper border styling
- [ ] Active state uses brand primary color
- [ ] Badges use correct variant colors

---

#### TC-FORM-009: Incident Description
**Priority**: P0  
**Description**: Verify incident description textarea works correctly

**Test Steps**:
1. Click in "Incident Description" textarea
2. Type a detailed description (at least 100 characters)
3. Verify character count or limit (if implemented)
4. Test required validation

**Expected Results**:
- ✅ Textarea accepts text input
- ✅ Multi-line input works correctly
- ✅ Field is marked as required (*)
- ✅ Help text displays below field
- ✅ Text wraps properly
- ✅ Validation error shows if submitted empty

---

#### TC-FORM-010: Interactive Map - Location Pinning
**Priority**: P0  
**Description**: Verify interactive map allows location pinning

**Test Steps**:
1. Scroll to "Incident Location" map section
2. Verify map loads correctly
3. Click anywhere on the map
4. Verify a pin appears at clicked location
5. Verify coordinates display below map
6. Click a different location
7. Verify pin moves to new location

**Expected Results**:
- ✅ Map loads with default center (Albany, NY area)
- ✅ Clicking map places a red pin marker
- ✅ Pin location coordinates display accurately
- ✅ Clicking again moves the pin
- ✅ Only one pin displays at a time
- ✅ Coordinates update when pin moves

**Design System Check**:
- [ ] Map has proper border radius
- [ ] Map border uses design system color
- [ ] Typography in map UI uses Roboto font

---

#### TC-FORM-011: Interactive Map - Pan (Drag)
**Priority**: P1  
**Description**: Verify map can be panned by dragging

**Test Steps**:
1. Click and hold on the map (avoid clicking existing pin)
2. Drag in any direction
3. Release mouse
4. Verify map view has moved
5. Verify pin location remains accurate if pin exists

**Expected Results**:
- ✅ Map responds to drag gesture
- ✅ Map view pans smoothly during drag
- ✅ Cursor changes to indicate dragging (if applicable)
- ✅ Releasing mouse stops panning
- ✅ Pin remains in correct geographic location
- ✅ Map doesn't pan when dragging outside map area

---

#### TC-FORM-012: Interactive Map - Zoom Controls
**Priority**: P1  
**Description**: Verify zoom in/out buttons work correctly

**Test Steps**:
1. Locate zoom controls (+ and - buttons)
2. Click "+" button multiple times
3. Verify map zooms in
4. Click "-" button multiple times
5. Verify map zooms out
6. Test zoom limits

**Expected Results**:
- ✅ "+" button zooms in
- ✅ "-" button zooms out
- ✅ Zoom animation is smooth
- ✅ Zoom centers on current map center
- ✅ Zoom has reasonable min/max limits
- ✅ Pin remains visible during zoom

**Note**: Mouse wheel zoom has been DISABLED per requirements

---

#### TC-FORM-013: Interactive Map - Use Current Location
**Priority**: P1  
**Description**: Verify "Use Current Location" GPS button

**Test Steps**:
1. Click "Use Current Location" button
2. Allow browser location permission (if prompted)
3. Verify pin moves to current GPS location
4. Verify coordinates update
5. Test with location permission denied

**Expected Results**:
- ✅ Button triggers geolocation request
- ✅ Loading indicator shows while fetching (if implemented)
- ✅ Pin moves to GPS coordinates
- ✅ Map centers on new location
- ✅ Coordinates display current location
- ✅ Button is disabled if geolocation unavailable
- ✅ No console errors if permission denied

**Edge Cases**:
- [ ] Geolocation permission denied - button disables
- [ ] Geolocation unavailable - no errors thrown
- [ ] Timeout handling - graceful error

---

#### TC-FORM-014: Interactive Map - Recenter Button
**Priority**: P2  
**Description**: Verify recenter button returns to pinned location

**Test Steps**:
1. Pin a location on the map
2. Pan the map away from the pin
3. Click "Recenter" button
4. Verify map centers back on pin

**Expected Results**:
- ✅ Recenter button is only visible when pin exists
- ✅ Clicking recenter moves map to pin location
- ✅ Zoom level adjusts appropriately
- ✅ Transition is smooth

---

#### TC-FORM-015: Interactive Map - Clear Pin
**Priority**: P1  
**Description**: Verify clear pin button removes location

**Test Steps**:
1. Pin a location on the map
2. Click "Clear Pin" button
3. Verify pin is removed
4. Verify coordinates clear
5. Verify location data is cleared from form

**Expected Results**:
- ✅ "Clear Pin" button only shows when pin exists
- ✅ Clicking button removes pin from map
- ✅ Coordinate display clears
- ✅ Location data is removed from form submission

---

#### TC-FORM-016: Interactive Map - View on Map Button
**Priority**: P2  
**Description**: Verify "View on Map" button opens external map

**Test Steps**:
1. Pin a location on the map
2. Click "View on Map" button
3. Verify external map service opens (e.g., Google Maps)
4. Verify coordinates match

**Expected Results**:
- ✅ Button only shows when pin exists
- ✅ Opens in new tab/window
- ✅ Coordinates are accurate
- ✅ External map loads at correct location

---

#### TC-FORM-017: Interactive Map - Manual Entry REMOVED
**Priority**: P0  
**Description**: Verify manual coordinate entry is NOT displayed

**Test Steps**:
1. Scroll to map section
2. Verify no manual latitude/longitude input fields exist
3. Verify no "Set Location" button for manual entry
4. Verify no "Or enter coordinates manually:" text

**Expected Results**:
- ✅ Manual entry section is completely hidden
- ✅ Only interactive map and buttons are visible
- ✅ No console errors related to removed feature

---

#### TC-FORM-018: Additional Information - Witnesses
**Priority**: P1  
**Description**: Verify witness checkbox and name field

**Test Steps**:
1. Check "Witness(es) present" checkbox
2. Verify "Witness Name(s)" field appears
3. Enter witness names
4. Uncheck witness checkbox
5. Verify field disappears

**Expected Results**:
- ✅ Checkbox toggles correctly
- ✅ Witness name field appears when checked
- ✅ Field accepts text input
- ✅ Field disappears when unchecked
- ✅ Data is not required

---

#### TC-FORM-019: Additional Information - Parent Notification
**Priority**: P1  
**Description**: Verify parent notification checkbox (student incidents only)

**Test Steps**:
1. Create a student incident
2. Scroll to "Additional Information" section
3. Verify "Parent/Guardian has been notified" checkbox appears
4. Toggle checkbox on/off
5. Create a driver incident
6. Verify parent notification checkbox does NOT appear

**Expected Results**:
- ✅ Checkbox only shows for student incidents
- ✅ Checkbox is optional
- ✅ Checkbox does not appear for driver incidents

---

#### TC-FORM-020: Additional Information - Action Taken
**Priority**: P1  
**Description**: Verify action taken textarea

**Test Steps**:
1. Click in "Immediate Action Taken" textarea
2. Enter action details
3. Verify placeholder text is contextual (student vs driver)

**Expected Results**:
- ✅ Textarea accepts input
- ✅ Placeholder text changes based on incident type
- ✅ Student placeholder mentions "student moved seats, verbal warning"
- ✅ Driver placeholder mentions "vehicle taken out of service, safety protocol"
- ✅ Field is optional

---

#### TC-FORM-021: Photo Upload
**Priority**: P1  
**Description**: Verify photo upload functionality

**Test Steps**:
1. Click "Upload Photos" button
2. Select one or more image files (JPG, PNG, GIF)
3. Verify photos appear in grid
4. Hover over a photo
5. Click "Remove" button
6. Verify photo is removed
7. Test uploading 10+ photos

**Expected Results**:
- ✅ File picker opens for image files only
- ✅ Multiple files can be selected
- ✅ Photos display in grid layout
- ✅ Photo thumbnails show correctly
- ✅ File name and size display under each photo
- ✅ Hover shows "Remove" button
- ✅ Remove button deletes photo
- ✅ Empty state shows when no photos uploaded
- ✅ Maximum file limit enforced (if applicable)

**Design System Check**:
- [ ] Grid uses proper spacing
- [ ] Border radius on photo cards matches design tokens
- [ ] Empty state icon and text use Roboto font

---

#### TC-FORM-022: Document Upload
**Priority**: P1  
**Description**: Verify document upload functionality

**Test Steps**:
1. Click "Upload Documents" button
2. Select PDF, DOC, or DOCX files
3. Verify documents appear in grid
4. Hover over a document
5. Click "Remove" button
6. Verify document is removed

**Expected Results**:
- ✅ File picker opens for document types only
- ✅ Multiple files can be selected
- ✅ Documents display in grid with FileText icon
- ✅ File name and size display correctly
- ✅ Hover shows "Remove" button
- ✅ Remove button deletes document
- ✅ Empty state shows when no documents uploaded

---

#### TC-FORM-023: Form Submission - Validation
**Priority**: P0  
**Description**: Verify form validation prevents invalid submission

**Test Steps**:
1. Click "Submit Report" without filling any fields
2. Verify validation errors appear on required fields
3. Fill only some required fields
4. Submit again
5. Verify remaining validation errors show

**Expected Results**:
- ✅ Required fields are marked with asterisk (*)
- ✅ Validation errors appear on submit
- ✅ Error messages are clear and helpful
- ✅ Form does not submit with errors
- ✅ First error field is focused (if applicable)

**Required Fields**:
- [ ] Student Name OR Driver (based on category)
- [ ] Incident Type
- [ ] Location
- [ ] Severity Level
- [ ] Incident Description

---

#### TC-FORM-024: Form Submission - Success
**Priority**: P0  
**Description**: Verify successful form submission

**Test Steps**:
1. Fill all required fields
2. Add optional data (photos, witnesses, etc.)
3. Click "Submit Report"
4. Verify success message appears
5. Verify redirect to incidents list after delay

**Expected Results**:
- ✅ Form submits without errors
- ✅ Success alert displays with green styling
- ✅ Success message: "Incident report submitted successfully! Supervisor has been notified."
- ✅ Alert auto-dismisses after ~3 seconds
- ✅ User is redirected to Incidents page
- ✅ New incident appears in incidents list

---

#### TC-FORM-025: Form Submission - Cancel
**Priority**: P1  
**Description**: Verify cancel button discards form

**Test Steps**:
1. Fill out some form fields
2. Click "Cancel" button
3. Verify redirect to Incidents page
4. Navigate back to New Incident
5. Verify form is empty/reset

**Expected Results**:
- ✅ Cancel button returns to Incidents page
- ✅ Form data is not saved
- ✅ No validation errors on cancel
- ✅ Starting a new incident shows empty form

---

### 5. Students Page

#### TC-STU-001: Students List Display
**Priority**: P0  
**Description**: Verify students list displays all students correctly

**Test Steps**:
1. Navigate to Students page
2. Verify students table displays
3. Verify all columns are present:
   - Photo
   - Student Name
   - ID
   - Grade
   - School
   - Bus
   - Route
   - Actions

**Expected Results**:
- ✅ Table displays all students
- ✅ Student photos display in rounded frames
- ✅ All data fields are populated
- ✅ Table is responsive
- ✅ No layout breaking

**Design System Check**:
- [ ] Table headers use Roboto font with proper weight
- [ ] Row hover states use subtle background color
- [ ] Photos have proper border radius

---

#### TC-STU-002: Student Search
**Priority**: P0  
**Description**: Verify student search functionality

**Test Steps**:
1. Locate search input
2. Type student name
3. Verify results filter in real-time
4. Search by student ID
5. Clear search

**Expected Results**:
- ✅ Search filters as you type
- ✅ Search works on name and ID
- ✅ Case-insensitive search
- ✅ Clearing search shows all students
- ✅ "No results" message when no matches

---

#### TC-STU-003: Student Filters
**Priority**: P1  
**Description**: Verify student filtering by grade, school, bus, route

**Test Steps**:
1. Test grade filter dropdown
2. Test school filter dropdown
3. Test bus filter
4. Test route filter
5. Test multiple filters combined
6. Clear all filters

**Expected Results**:
- ✅ Each filter updates table correctly
- ✅ Multiple filters work together (AND logic)
- ✅ Filter options are comprehensive
- ✅ Clear filters resets to all students

---

#### TC-STU-004: View Student Profile
**Priority**: P1  
**Description**: Verify student profile/detail view

**Test Steps**:
1. Click "View" button on a student
2. Verify student profile opens
3. Check all student information displays
4. Verify incident history shows (if applicable)

**Expected Results**:
- ✅ Profile view opens correctly
- ✅ All student data displays accurately
- ✅ Photo displays in large format
- ✅ Related incidents list shows (if any)
- ✅ Close/Back button returns to list

---

#### TC-STU-005: Student Incident History
**Priority**: P1  
**Description**: Verify student incident history displays

**Test Steps**:
1. View a student with existing incidents
2. Verify incidents list displays
3. Click on an incident
4. Verify incident detail opens

**Expected Results**:
- ✅ Incident history section displays
- ✅ All incidents for student are listed
- ✅ Incidents are sorted by date (newest first)
- ✅ Clicking incident opens detail view
- ✅ "No incidents" message shows if student has none

---

### 6. Drivers Page

#### TC-DRV-001: Drivers List Display
**Priority**: P0  
**Description**: Verify drivers list displays correctly

**Test Steps**:
1. Navigate to Drivers page
2. Verify drivers table displays with columns:
   - Photo
   - Name
   - Employee ID
   - Routes
   - Status
   - Actions

**Expected Results**:
- ✅ All drivers display in table
- ✅ Driver photos show correctly
- ✅ Employee IDs are formatted properly
- ✅ Routes list displays
- ✅ Status indicators show correctly

---

#### TC-DRV-002: Driver Search
**Priority**: P0  
**Description**: Verify driver search functionality

**Test Steps**:
1. Search by driver name
2. Search by employee ID
3. Clear search

**Expected Results**:
- ✅ Search filters results in real-time
- ✅ Search works on name and employee ID
- ✅ Case-insensitive
- ✅ Clearing search restores all drivers

---

#### TC-DRV-003: View Driver Profile
**Priority**: P1  
**Description**: Verify driver profile view

**Test Steps**:
1. Click "View" on a driver
2. Verify driver details display
3. Check assigned routes
4. Check incident history (if applicable)

**Expected Results**:
- ✅ Profile view opens
- ✅ All driver information displays
- ✅ Assigned routes list correctly
- ✅ Incident history shows (if any)
- ✅ Close/Back button works

---

### 7. Vehicles Page

#### TC-VEH-001: Vehicles Grid Display
**Priority**: P0  
**Description**: Verify vehicles display in grid or list format

**Test Steps**:
1. Navigate to Vehicles page
2. Verify vehicles display
3. Check vehicle information shows:
   - Vehicle number
   - Type (bus icon/image)
   - Status
   - Route assignment
   - Actions

**Expected Results**:
- ✅ All vehicles display correctly
- ✅ Vehicle icons/images show
- ✅ Status badges display with correct colors
- ✅ Layout is responsive
- ✅ No visual bugs

**Design System Check**:
- [ ] Vehicle cards use Forge spacing and radius
- [ ] Status badges use brand colors
- [ ] Typography uses Roboto font

---

#### TC-VEH-002: Vehicle Status Filter
**Priority**: P1  
**Description**: Verify vehicle status filtering

**Test Steps**:
1. Filter by "Active" status
2. Filter by "Maintenance" status
3. Filter by "Out of Service"
4. Select "All Statuses"

**Expected Results**:
- ✅ Filter updates vehicle display
- ✅ Only matching status vehicles show
- ✅ Status badges are color-coded correctly
- ✅ "All Statuses" shows all vehicles

---

#### TC-VEH-003: View Vehicle Details
**Priority**: P1  
**Description**: Verify vehicle detail view

**Test Steps**:
1. Click on a vehicle or "View" button
2. Verify vehicle details display
3. Check maintenance history (if implemented)
4. Check assigned route/driver

**Expected Results**:
- ✅ Detail view opens
- ✅ All vehicle information displays
- ✅ Maintenance records show (if any)
- ✅ Current assignment displays
- ✅ Close/Back button works

---

### 8. Communications Page

#### TC-COM-001: Communications List
**Priority**: P1  
**Description**: Verify communications/messages display

**Test Steps**:
1. Navigate to Communications page
2. Verify communication threads or messages display
3. Check message list formatting

**Expected Results**:
- ✅ Communications list loads
- ✅ Messages display with sender, date, subject
- ✅ Unread messages are highlighted (if applicable)
- ✅ List is sorted by date (newest first)

---

#### TC-COM-002: Send New Communication
**Priority**: P1  
**Description**: Verify sending new message/communication

**Test Steps**:
1. Click "New Message" or "Compose" button
2. Fill in recipient, subject, message
3. Click "Send"
4. Verify message is sent

**Expected Results**:
- ✅ New message form opens
- ✅ Recipient selection works (if dropdown/autocomplete)
- ✅ Subject and message fields accept input
- ✅ Send button submits message
- ✅ Success confirmation appears
- ✅ Message appears in sent items

---

#### TC-COM-003: View Communication Thread
**Priority**: P1  
**Description**: Verify viewing message thread/details

**Test Steps**:
1. Click on a communication
2. Verify message thread opens
3. Check all message details display
4. Test reply functionality (if implemented)

**Expected Results**:
- ✅ Thread view opens
- ✅ Full message content displays
- ✅ Sender/recipient information shows
- ✅ Timestamp is accurate
- ✅ Reply option works (if applicable)

---

### 9. Reports Page

#### TC-REP-001: Reports Dashboard
**Priority**: P1  
**Description**: Verify reports page displays available reports

**Test Steps**:
1. Navigate to Reports page
2. Verify list of available reports displays
3. Check report categories/types

**Expected Results**:
- ✅ Reports page loads successfully
- ✅ Available report types are listed
- ✅ Report descriptions are clear
- ✅ Layout is organized and professional

---

#### TC-REP-002: Generate Report
**Priority**: P1  
**Description**: Verify report generation functionality

**Test Steps**:
1. Select a report type
2. Set date range or filters
3. Click "Generate Report"
4. Verify report displays or downloads

**Expected Results**:
- ✅ Report type selection works
- ✅ Date range picker functions correctly
- ✅ Generate button triggers report creation
- ✅ Loading indicator shows during generation
- ✅ Report displays or downloads successfully
- ✅ Report data is accurate

---

#### TC-REP-003: Export Report
**Priority**: P1  
**Description**: Verify report export in different formats

**Test Steps**:
1. Generate a report
2. Click "Export" or "Download"
3. Select format (PDF, CSV, Excel)
4. Verify file downloads
5. Open file and verify data

**Expected Results**:
- ✅ Export options are available
- ✅ File downloads successfully
- ✅ Data in export matches displayed report
- ✅ Formatting is correct
- ✅ File opens without errors

---

#### TC-REP-004: Schedule Report (if implemented)
**Priority**: P2  
**Description**: Verify report scheduling functionality

**Test Steps**:
1. Select a report type
2. Click "Schedule" option
3. Set frequency (daily, weekly, monthly)
4. Set recipients
5. Save schedule

**Expected Results**:
- ✅ Schedule dialog opens
- ✅ Frequency options are available
- ✅ Recipient selection works
- ✅ Save button creates schedule
- ✅ Confirmation message displays

---

### 10. Workflows Page

#### TC-WF-001: Workflows List
**Priority**: P1  
**Description**: Verify workflows page displays all workflows

**Test Steps**:
1. Navigate to Workflows page
2. Verify workflow list displays
3. Check workflow information shows:
   - Workflow name
   - Trigger conditions
   - Status (active/inactive)
   - Actions

**Expected Results**:
- ✅ All workflows display in list
- ✅ Workflow details are accurate
- ✅ Status indicators show correctly
- ✅ Active/inactive toggle works (if implemented)

---

#### TC-WF-002: Create New Workflow
**Priority**: P1  
**Description**: Verify workflow creation

**Test Steps**:
1. Click "Create Workflow" or "New Workflow"
2. Enter workflow name
3. Set trigger conditions (incident type, severity)
4. Define workflow steps
5. Save workflow

**Expected Results**:
- ✅ Workflow builder opens
- ✅ Name field accepts input
- ✅ Trigger condition options are comprehensive
- ✅ Step configuration works correctly
- ✅ Save button creates workflow
- ✅ New workflow appears in list

---

#### TC-WF-003: Edit Workflow
**Priority**: P1  
**Description**: Verify workflow editing

**Test Steps**:
1. Click "Edit" on an existing workflow
2. Modify workflow name
3. Update trigger conditions
4. Add/remove/modify steps
5. Save changes

**Expected Results**:
- ✅ Edit mode opens with current values
- ✅ All fields are editable
- ✅ Changes save successfully
- ✅ Updated workflow reflects changes
- ✅ Incidents are assigned to updated workflow

---

#### TC-WF-004: Workflow Step Configuration
**Priority**: P1  
**Description**: Verify workflow step dialog

**Test Steps**:
1. Create or edit a workflow
2. Add a new step
3. Configure step:
   - Step name
   - Description
   - Assignee
   - Required/optional
   - Due date calculation
4. Save step

**Expected Results**:
- ✅ Step dialog opens
- ✅ All fields are configurable
- ✅ Assignee dropdown populates
- ✅ Required checkbox works
- ✅ Due date options are clear
- ✅ Save button adds step to workflow

---

#### TC-WF-005: Automatic Workflow Assignment
**Priority**: P0  
**Description**: Verify incidents are auto-assigned to workflows

**Test Steps**:
1. Create a workflow with specific triggers (e.g., High severity + Safety incident)
2. Create a new incident matching those triggers
3. Submit the incident
4. View the incident detail
5. Verify correct workflow is assigned

**Expected Results**:
- ✅ Incident matches workflow triggers
- ✅ Workflow is automatically assigned
- ✅ Incident detail shows workflow progress
- ✅ Workflow steps are initialized
- ✅ No workflow assigned if no match

---

#### TC-WF-006: Workflow Progress Display
**Priority**: P1  
**Description**: Verify workflow progress displays on incident detail

**Test Steps**:
1. Open an incident with an assigned workflow
2. Verify workflow progress section displays
3. Check that all steps are listed
4. Verify step status indicators (completed, in progress, pending)

**Expected Results**:
- ✅ Workflow progress section displays
- ✅ All workflow steps are listed in order
- ✅ Status indicators are accurate
- ✅ Completed steps show checkmark
- ✅ Current step is highlighted
- ✅ Step assignees display

**Design System Check**:
- [ ] Progress indicators use brand colors
- [ ] Typography uses Roboto font
- [ ] Spacing matches design tokens

---

#### TC-WF-007: Mark Workflow Step Complete
**Priority**: P1  
**Description**: Verify marking workflow steps as complete

**Test Steps**:
1. Open an incident with active workflow
2. Find current/pending workflow step
3. Click "Mark Complete" or checkbox
4. Verify step updates to completed status
5. Verify next step becomes active

**Expected Results**:
- ✅ Step completion action is available
- ✅ Clicking marks step as complete
- ✅ Visual status updates (icon, color)
- ✅ Timestamp records completion
- ✅ Next step becomes current
- ✅ If final step, workflow completes

---

### 11. Incident Detail Page

#### TC-DET-001: Incident Detail Display
**Priority**: P0  
**Description**: Verify all incident information displays correctly

**Test Steps**:
1. Navigate to an incident detail page
2. Verify the following sections display:
   - Incident header (ID, type, severity, status)
   - Student/Driver information
   - Incident details (description, location, date/time)
   - Photos (if uploaded)
   - Documents (if uploaded)
   - Workflow progress (if assigned)
   - Additional information (witnesses, actions taken)

**Expected Results**:
- ✅ All sections display without errors
- ✅ Data is accurate and formatted correctly
- ✅ Photos display in gallery format
- ✅ Documents are listed with download/view options
- ✅ Workflow progress shows correctly
- ✅ No layout breaking or overflow issues

**Design System Check**:
- [ ] All text uses Roboto font
- [ ] Spacing uses Forge tokens
- [ ] Severity and status badges use correct colors
- [ ] Card borders and radius match design system

---

#### TC-DET-002: Incident Location Map Display
**Priority**: P1  
**Description**: Verify incident location displays on map

**Test Steps**:
1. View an incident with pinned location
2. Verify map displays in detail view
3. Verify pin shows at correct coordinates
4. Test "View on Map" button (if available)

**Expected Results**:
- ✅ Map renders correctly
- ✅ Pin displays at saved location
- ✅ Coordinates are accurate
- ✅ "View on Map" opens external map service
- ✅ Map is properly sized and styled

---

#### TC-DET-003: View Photos in Gallery
**Priority**: P1  
**Description**: Verify photo gallery functionality

**Test Steps**:
1. View an incident with uploaded photos
2. Click on a photo thumbnail
3. Verify full-size view or lightbox opens
4. Navigate between photos (if multiple)
5. Close photo view

**Expected Results**:
- ✅ Photo thumbnails display correctly
- ✅ Clicking opens full-size view
- ✅ Navigation arrows work (if multiple photos)
- ✅ Close button returns to detail view
- ✅ Photos load without errors

---

#### TC-DET-004: Download Documents
**Priority**: P1  
**Description**: Verify document download functionality

**Test Steps**:
1. View an incident with uploaded documents
2. Click "Download" button on a document
3. Verify file downloads
4. Open file and verify content

**Expected Results**:
- ✅ Documents are listed with file names and sizes
- ✅ Download button is clickable
- ✅ File downloads successfully
- ✅ File opens without errors
- ✅ File content is intact

---

#### TC-DET-005: Edit Incident from Detail View
**Priority**: P0  
**Description**: Verify edit functionality from detail page

**Test Steps**:
1. Click "Edit" button on incident detail
2. Verify edit dialog opens
3. Make changes to fields
4. Save changes
5. Verify detail view updates

**Expected Results**:
- ✅ Edit dialog opens with current values
- ✅ All fields are editable
- ✅ Save button commits changes
- ✅ Detail view refreshes with updated data
- ✅ Success message displays

---

#### TC-DET-006: Print Incident Report
**Priority**: P2  
**Description**: Verify print functionality (if implemented)

**Test Steps**:
1. Click "Print" button
2. Verify print preview opens
3. Check print layout
4. Test actual printing

**Expected Results**:
- ✅ Print dialog opens
- ✅ Layout is print-optimized
- ✅ All relevant data is included
- ✅ Photos print clearly
- ✅ Page breaks are logical

---

### 12. Help Page

#### TC-HLP-001: Help Page Display
**Priority**: P2  
**Description**: Verify help page content displays

**Test Steps**:
1. Navigate to Help page
2. Verify help content displays
3. Check for FAQ, guides, or tutorials

**Expected Results**:
- ✅ Help page loads successfully
- ✅ Content is organized and readable
- ✅ Links work correctly (if any)
- ✅ Search functionality works (if implemented)

---

## Design System Compliance Testing

### DSC-001: Typography
**Description**: Verify all text uses Roboto font family

**Test Steps**:
1. Inspect various elements across all pages
2. Use browser DevTools to check computed font-family
3. Verify the following elements use Roboto:
   - Headings (h1, h2, h3, h4)
   - Body text
   - Button text
   - Form labels and inputs
   - Table text
   - Navigation items

**Expected Results**:
- ✅ All text elements use Roboto or Roboto, sans-serif
- ✅ No default system fonts are used
- ✅ Font weights are appropriate (regular, medium, semibold, bold)

---

### DSC-002: Color Palette
**Description**: Verify brand colors are used throughout the application

**Test Steps**:
1. Inspect UI elements for color usage
2. Verify brand colors are applied:
   - Deep blues: #4A6FA5, #5B8BB8, #6B9BC5
   - Olives: #7B8458, #8B9264, #9FA870
3. Check hover states, active states, and accents

**Expected Results**:
- ✅ Brand colors are used for primary actions and accents
- ✅ Hover states use brand color variants
- ✅ No hardcoded colors that bypass design system
- ✅ Colors are accessible (sufficient contrast)

---

### DSC-003: Spacing
**Description**: Verify Forge spacing tokens are used

**Test Steps**:
1. Inspect padding and margin on components
2. Check that spacing uses CSS variables:
   - --forge-spacing-small
   - --forge-spacing-medium
   - --forge-spacing-large
   - Etc.
3. Verify consistent spacing across similar elements

**Expected Results**:
- ✅ Spacing uses design system tokens
- ✅ Consistent spacing patterns throughout app
- ✅ No arbitrary pixel values for spacing

---

### DSC-004: Border Radius
**Description**: Verify Forge radius tokens are used

**Test Steps**:
1. Inspect border-radius on cards, buttons, inputs
2. Check that radius uses CSS variables:
   - --forge-radius-small
   - --forge-radius-medium
   - --forge-radius-large
3. Verify consistency across component types

**Expected Results**:
- ✅ Border radius uses design system tokens
- ✅ Consistent radius across similar components
- ✅ No hardcoded radius values

---

### DSC-005: Borders
**Description**: Verify Forge border tokens are used

**Test Steps**:
1. Inspect borders on cards, inputs, tables
2. Check border color variables:
   - --forge-color-border-default
   - --forge-color-border-subtle
3. Verify consistent border styling

**Expected Results**:
- ✅ Borders use design system color tokens
- ✅ Border widths are consistent
- ✅ No arbitrary border colors

---

### DSC-006: Buttons
**Description**: Verify button styles match design system

**Test Steps**:
1. Test all button variants:
   - Primary
   - Secondary
   - Outline
   - Ghost
   - Destructive
2. Check button states:
   - Default
   - Hover
   - Active
   - Disabled
3. Verify button sizing (sm, default, lg)

**Expected Results**:
- ✅ All button variants render correctly
- ✅ Hover states use brand colors
- ✅ Disabled states are visually distinct
- ✅ Button text uses Roboto font
- ✅ Button padding uses Forge tokens

---

### DSC-007: Form Inputs
**Description**: Verify input field styles match design system

**Test Steps**:
1. Test input field states:
   - Default
   - Focus
   - Error
   - Disabled
2. Check input types:
   - Text
   - Textarea
   - Select/Dropdown
   - Checkbox
   - Radio
3. Verify labels and help text styling

**Expected Results**:
- ✅ Inputs use Forge border and radius tokens
- ✅ Focus states use brand colors
- ✅ Error states are clear and accessible
- ✅ Disabled states are visually distinct
- ✅ Labels use Roboto font with proper weight

---

### DSC-008: Cards
**Description**: Verify card component styling

**Test Steps**:
1. Inspect cards across all pages
2. Check card borders, radius, shadows
3. Verify card header and content spacing
4. Test hover states (if applicable)

**Expected Results**:
- ✅ Cards use Forge radius tokens
- ✅ Card borders use design system colors
- ✅ Shadows are consistent (if used)
- ✅ Internal spacing uses Forge tokens
- ✅ Card headers use proper typography

---

### DSC-009: Tables
**Description**: Verify table styling matches design system

**Test Steps**:
1. Inspect tables on Incidents, Students, Drivers pages
2. Check header styling
3. Check row hover states
4. Verify cell padding and alignment
5. Test border styling

**Expected Results**:
- ✅ Table headers use Roboto font with medium/semibold weight
- ✅ Row hover states use subtle background color
- ✅ Cell padding uses Forge spacing tokens
- ✅ Borders use design system color tokens
- ✅ Text alignment is consistent

---

### DSC-010: Badges
**Description**: Verify badge component styling

**Test Steps**:
1. Find badges showing severity, status, etc.
2. Check badge variants:
   - Default
   - Destructive (high severity)
   - Secondary (medium severity)
   - Outline (low severity)
3. Verify badge colors and sizing

**Expected Results**:
- ✅ Severity badges use correct colors
- ✅ Status badges use appropriate styling
- ✅ Badge text uses Roboto font
- ✅ Badge sizing is consistent
- ✅ Badge radius uses Forge tokens

---

## Accessibility Testing

### ACC-001: Keyboard Navigation
**Priority**: P0  
**Description**: Verify all functionality is accessible via keyboard

**Test Steps**:
1. Use TAB key to navigate through the application
2. Test form inputs with TAB and arrow keys
3. Test buttons with ENTER and SPACE
4. Test dropdowns with arrow keys
5. Test modal dialogs with ESC key
6. Verify focus indicators are visible

**Expected Results**:
- ✅ All interactive elements are keyboard accessible
- ✅ TAB order is logical
- ✅ Focus indicators are clearly visible
- ✅ Dropdowns open/close with keyboard
- ✅ Modals close with ESC key
- ✅ No keyboard traps

---

### ACC-002: Screen Reader Compatibility
**Priority**: P1  
**Description**: Verify screen reader announces content correctly

**Test Steps**:
1. Use screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through main pages
3. Test form fields for labels
4. Test buttons for descriptive text
5. Test images for alt text
6. Test tables for proper structure

**Expected Results**:
- ✅ All images have meaningful alt text
- ✅ Form labels are properly associated
- ✅ Buttons have descriptive text
- ✅ Headings are properly structured (h1, h2, h3)
- ✅ Tables have proper headers
- ✅ ARIA labels are used where needed

---

### ACC-003: Color Contrast
**Priority**: P0  
**Description**: Verify sufficient color contrast for readability

**Test Steps**:
1. Use browser extension or tool (e.g., axe DevTools, WAVE)
2. Check contrast ratios on:
   - Body text on background
   - Button text on button background
   - Link text
   - Error messages
   - Disabled states
3. Verify WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)

**Expected Results**:
- ✅ All text meets WCAG AA contrast requirements
- ✅ Interactive elements have sufficient contrast
- ✅ Focus indicators are visible
- ✅ Error states are distinguishable

---

### ACC-004: Form Accessibility
**Priority**: P0  
**Description**: Verify forms are fully accessible

**Test Steps**:
1. Test form field labels association
2. Test error message announcement
3. Test required field indication
4. Test field help text
5. Use keyboard only to complete a form

**Expected Results**:
- ✅ All fields have associated labels
- ✅ Required fields are marked (visually and for screen readers)
- ✅ Error messages are announced
- ✅ Help text is associated with fields
- ✅ Forms can be completed with keyboard only

---

### ACC-005: Focus Management
**Priority**: P1  
**Description**: Verify focus is managed correctly in dynamic content

**Test Steps**:
1. Open a modal dialog
2. Verify focus moves to modal
3. Close modal and verify focus returns to trigger
4. Test autocomplete dropdowns
5. Test notifications/alerts

**Expected Results**:
- ✅ Focus moves to modal on open
- ✅ Focus is trapped in modal
- ✅ Focus returns to trigger on close
- ✅ Autocomplete manages focus correctly
- ✅ Alert messages are announced

---

### ACC-006: Skip Links
**Priority**: P2  
**Description**: Verify skip navigation links exist

**Test Steps**:
1. Load the application
2. Press TAB (before clicking anything)
3. Verify "Skip to main content" link appears
4. Activate the link
5. Verify focus moves to main content

**Expected Results**:
- ✅ Skip link is the first focusable element
- ✅ Skip link is visible when focused
- ✅ Activating skip link moves focus to main content

---

## Cross-Browser & Responsive Testing

### BR-001: Chrome Desktop
**Priority**: P0  
**Description**: Test full functionality in Chrome desktop

**Test Steps**:
1. Test all features in Chrome (latest version)
2. Verify UI renders correctly
3. Test interactive features
4. Check console for errors

**Expected Results**:
- ✅ All features work correctly
- ✅ No visual bugs
- ✅ No console errors
- ✅ Performance is acceptable

---

### BR-002: Firefox Desktop
**Priority**: P1  
**Description**: Test full functionality in Firefox desktop

**Test Steps**:
1. Test all features in Firefox (latest version)
2. Verify UI renders correctly
3. Test interactive features
4. Check console for errors

**Expected Results**:
- ✅ All features work correctly
- ✅ No visual bugs
- ✅ No console errors
- ✅ Performance is acceptable

---

### BR-003: Safari Desktop
**Priority**: P0  
**Description**: Test full functionality in Safari desktop

**Test Steps**:
1. Test all features in Safari (latest version)
2. Verify UI renders correctly
3. Test interactive features
4. Check console for errors

**Expected Results**:
- ✅ All features work correctly
- ✅ No visual bugs
- ✅ No console errors
- ✅ Performance is acceptable

---

### BR-004: Edge Desktop
**Priority**: P1  
**Description**: Test full functionality in Edge desktop

**Test Steps**:
1. Test all features in Edge (latest version)
2. Verify UI renders correctly
3. Test interactive features
4. Check console for errors

**Expected Results**:
- ✅ All features work correctly
- ✅ No visual bugs
- ✅ No console errors
- ✅ Performance is acceptable

---

### RESP-001: Mobile Viewport (375px)
**Priority**: P0  
**Description**: Test responsive design on small mobile (iPhone SE size)

**Test Steps**:
1. Resize browser to 375px width or use device
2. Test navigation (hamburger menu if applicable)
3. Test form inputs and buttons (touch targets)
4. Test tables (scrolling, stacking)
5. Test maps on mobile
6. Verify readability

**Expected Results**:
- ✅ Layout adapts to small screen
- ✅ Navigation is accessible
- ✅ Forms are usable on mobile
- ✅ Touch targets are at least 44x44px
- ✅ Text is readable without zooming
- ✅ No horizontal scrolling
- ✅ Maps are functional on mobile

---

### RESP-002: Tablet Viewport (768px)
**Priority**: P1  
**Description**: Test responsive design on tablet

**Test Steps**:
1. Resize browser to 768px width or use device
2. Test all pages
3. Verify layout adapts appropriately
4. Test portrait and landscape orientations

**Expected Results**:
- ✅ Layout adapts to tablet screen
- ✅ Navigation works correctly
- ✅ Multi-column layouts stack appropriately
- ✅ Touch interactions work
- ✅ No layout breaking

---

### RESP-003: Desktop Viewport (1920px)
**Priority**: P0  
**Description**: Test on large desktop screen

**Test Steps**:
1. View application on 1920px+ screen
2. Verify content doesn't stretch excessively
3. Check for max-width containers
4. Verify layout is balanced

**Expected Results**:
- ✅ Content has reasonable max-width
- ✅ Layout is balanced and not stretched
- ✅ Navigation and sidebar scale appropriately
- ✅ Images maintain aspect ratio

---

## Performance Testing

### PERF-001: Page Load Time
**Priority**: P1  
**Description**: Measure initial page load performance

**Test Steps**:
1. Clear browser cache
2. Load Dashboard page
3. Use browser DevTools Performance tab
4. Measure Time to Interactive (TTI)
5. Test on 3G connection (throttle network)

**Expected Results**:
- ✅ Dashboard loads in < 3 seconds on normal connection
- ✅ Dashboard loads in < 5 seconds on 3G
- ✅ Largest Contentful Paint (LCP) < 2.5 seconds
- ✅ First Input Delay (FID) < 100ms

---

### PERF-002: Large Data Sets
**Priority**: P1  
**Description**: Test performance with large amounts of data

**Test Steps**:
1. Load Incidents page with 100+ incidents
2. Test search and filter performance
3. Test table scrolling
4. Test sorting performance

**Expected Results**:
- ✅ Table renders without lag
- ✅ Search filters in < 500ms
- ✅ Sorting completes in < 1 second
- ✅ Scrolling is smooth (60fps)

---

### PERF-003: Image Loading
**Priority**: P1  
**Description**: Test image loading and optimization

**Test Steps**:
1. View incident with multiple uploaded photos
2. Check image file sizes
3. Verify lazy loading (if implemented)
4. Test photo gallery performance

**Expected Results**:
- ✅ Images are optimized (reasonable file sizes)
- ✅ Lazy loading works (if implemented)
- ✅ Thumbnails load quickly
- ✅ Full-size images load smoothly

---

### PERF-004: Map Performance
**Priority**: P1  
**Description**: Test interactive map performance

**Test Steps**:
1. Load incident form with map
2. Test panning performance
3. Test zoom performance
4. Test pinning location
5. Monitor CPU and memory usage

**Expected Results**:
- ✅ Map loads in < 2 seconds
- ✅ Panning is smooth (60fps)
- ✅ Zoom is smooth
- ✅ Pin placement is instant
- ✅ No memory leaks during extended use

---

## Bug Reporting Guidelines

### Bug Report Template

When reporting bugs, please include the following information:

**Bug ID**: [Unique identifier]  
**Title**: [Short, descriptive title]  
**Priority**: P0 / P1 / P2 / P3  
**Severity**: Critical / High / Medium / Low  
**Status**: New / In Progress / Fixed / Closed  

**Environment**:
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11, macOS 14]
- Device: [Desktop / Mobile / Tablet]
- Screen Size: [e.g., 1920x1080]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happens]

**Screenshots/Video**:
[Attach visual evidence]

**Console Errors** (if applicable):
```
[Paste console errors]
```

**Additional Notes**:
[Any other relevant information]

---

### Bug Priority Definitions

**P0 - Critical**:
- Application crashes or is unusable
- Data loss or corruption
- Security vulnerabilities
- Core functionality completely broken

**P1 - High**:
- Major feature not working
- Significant impact on user workflow
- Affects multiple users
- Workaround is difficult or non-existent

**P2 - Medium**:
- Minor feature not working
- Moderate impact on user experience
- Workaround is available
- Cosmetic issues affecting usability

**P3 - Low**:
- Minor cosmetic issues
- Edge cases
- Minimal impact on users
- Nice-to-have improvements

---

### Bug Severity Definitions

**Critical**:
- Prevents users from completing core tasks
- Data integrity issues
- Security vulnerabilities

**High**:
- Significantly degrades user experience
- Affects important functionality
- No reasonable workaround

**Medium**:
- Noticeable but doesn't prevent task completion
- Workaround available
- Affects minority of users

**Low**:
- Minor inconvenience
- Cosmetic only
- Rarely encountered

---

## Test Sign-off Checklist

Before signing off on a release, ensure the following:

### Functional Testing
- [ ] All P0 test cases pass
- [ ] All P1 test cases pass
- [ ] Critical bugs are fixed
- [ ] High priority bugs are fixed or deferred with approval

### Design System Compliance
- [ ] Typography uses Roboto font throughout
- [ ] Colors match brand palette
- [ ] Spacing uses Forge tokens
- [ ] Border radius uses Forge tokens
- [ ] Borders use Forge color tokens

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Forms are accessible
- [ ] Focus management is correct

### Cross-Browser
- [ ] Chrome desktop tested and passes
- [ ] Firefox desktop tested and passes
- [ ] Safari desktop tested and passes
- [ ] Edge desktop tested and passes

### Responsive Design
- [ ] Mobile (375px) tested and passes
- [ ] Tablet (768px) tested and passes
- [ ] Desktop (1920px) tested and passes

### Performance
- [ ] Page load times are acceptable
- [ ] Large data sets perform well
- [ ] Images load efficiently
- [ ] Map performance is smooth

### Documentation
- [ ] All bugs are documented
- [ ] Known issues are listed
- [ ] User documentation is updated (if applicable)
- [ ] Release notes are prepared

---

## Appendix A: Test Data

### Sample Students
- Sarah Mitchell (STU-2891) - 9th Grade, Lincoln Middle School, Bus 12
- Marcus Johnson (STU-3421) - 10th Grade, Washington High School, Bus 15
- Emma Rodriguez (STU-1956) - 8th Grade, Jefferson Middle School, Bus 22
- James Thompson (STU-4782) - 9th Grade, Roosevelt High School, Bus 31
- Olivia Davis (STU-5623) - 11th Grade, Washington High School, Bus 8

### Sample Drivers
- Robert Martinez (DRV-101, EMP-4521) - lincoln-elem-am-green
- Jennifer Davis (DRV-102, EMP-4522) - washington-high-pm-wolf
- Michael Chen (DRV-103, EMP-4523) - jefferson-middle-am-blue
- Patricia Johnson (DRV-104, EMP-4524) - roosevelt-high-pm-red
- David Thompson (DRV-105, EMP-4525) - colonie-high-am-purple

### Sample Vehicles
- Bus 12 - Active - lincoln-elem-am-green
- Bus 15 - Active - washington-high-pm-wolf
- Bus 22 - Active - jefferson-middle-am-blue
- Bus 31 - Maintenance - roosevelt-high-pm-red
- Bus 8 - Active - washington-high-pm-wolf

---

## Appendix B: Useful Testing Tools

### Browser Extensions
- **axe DevTools**: Accessibility testing
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Performance and accessibility auditing
- **ColorZilla**: Color picker and contrast checker
- **WhatFont**: Identify fonts on web pages

### Screen Readers
- **NVDA** (Windows): Free, open-source screen reader
- **JAWS** (Windows): Professional screen reader
- **VoiceOver** (macOS/iOS): Built-in screen reader

### Performance Tools
- **Chrome DevTools**: Network, Performance, Lighthouse tabs
- **WebPageTest**: Detailed performance testing
- **GTmetrix**: Page speed and performance analysis

### Responsive Testing
- **Chrome DevTools Device Mode**: Built-in responsive testing
- **BrowserStack**: Cross-browser and device testing
- **Responsively App**: Desktop app for responsive testing

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-28 | QA Team | Initial document creation |

---

**End of QA Testing Guide**
