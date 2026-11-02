# MediFlow AI - Prompt Documentation

## 1. Project Planning

**Tool:** ChatGPT

**Prompt:**

Suggest an AI-powered healthcare administration project that solves a practical problem. It should include patient enquiry management, AI classification, automated reply drafting, and a dashboard.

**Purpose:**

To identify a practical healthcare automation problem and plan the project workflow.

## 2. Frontend Development

**Tool:** ChatGPT

**Prompt:**

Create a responsive healthcare administration dashboard using HTML, CSS and JavaScript. Include a patient enquiry form, statistics cards, enquiry table, search functionality and status management.

**Purpose:**

To develop a simple and user-friendly interface.

## 3. Backend Development

**Tool:** ChatGPT

**Prompt:**

Develop a Python Flask backend with SQLite database integration. Create API endpoints to submit enquiries, retrieve records and update enquiry status.

**Purpose:**

To connect the frontend with the database and manage enquiry records.

## 4. AI Integration

**Tool:** ChatGPT and Google Gemini

**Prompt:**

Use Gemini AI to classify healthcare administrative enquiries into appointment, billing, report and general categories. Identify the appropriate department and generate a polite administrative reply draft. Return structured JSON.

**Purpose:**

To automate enquiry classification and reply drafting.

## 5. Safety Improvement

**Tool:** ChatGPT

**Prompt:**

Improve the healthcare enquiry workflow by avoiding medical diagnosis and treatment recommendations. Add a conservative emergency phrase flag and require human staff review.

**Purpose:**

To make the application safer for an administrative demonstration.

## 6. Debugging and Testing

**Tool:** ChatGPT

**Prompt:**

Review the Flask application, identify potential errors and improve input validation, API responses and database operations.

**Purpose:**

To improve application reliability and handle errors.

## 7. Testing Scenarios

- Appointment booking enquiry
- Billing enquiry
- Laboratory report enquiry
- General information enquiry
- Possible emergency-related phrase
- Enquiry status update
- Search functionality

## 8. Development Notes

This project uses ChatGPT for planning, code assistance and debugging, and Google Gemini for AI-powered enquiry analysis when a valid API key is configured.

The application includes a local fallback classifier if Gemini is unavailable. AI-generated content is for staff review only.

Only fictional information should be used during demonstrations.