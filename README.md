
# MediFlow AI

## AI-Powered Healthcare Enquiry Management System

MediFlow AI is a healthcare administration application designed to simplify patient enquiry management using Artificial Intelligence and automation.

## Project Objective

To reduce manual administrative work by automatically classifying patient enquiries, identifying departments and generating response drafts for staff review.

## Features

- Patient enquiry submission
- AI-powered enquiry classification
- Department identification
- Priority flagging
- AI-generated administrative reply drafts
- Dashboard statistics
- Search functionality
- Enquiry status management
- SQLite database storage

## Technologies Used

- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript
- Google Gemini API
- ChatGPT

## Installation

### 1. Clone or download the project

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment on Windows

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment variables

Create a `.env` file and add:

```env
GEMINI_API_KEY=your_gemini_api_key
FLASK_SECRET_KEY=your_random_secret
```

Keep your API key private.

### 6. Run the application

```bash
python app.py
```

### 7. Open in your browser

http://127.0.0.1:5000   http://127.0.0.1:5000/patient/dashboard

## Database

The application uses SQLite to store patient enquiries, AI analysis, timestamps and enquiry status.

The database is created automatically when the application starts.

## Safety Notice

This is an educational healthcare administration demonstration. It does not provide medical diagnosis, treatment recommendations or validated emergency triage. All AI-generated replies require human review. Use fictional patient data for testing.

## Developer

MediFlow AI - Healthcare Automation Project
