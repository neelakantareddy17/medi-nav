# MediQ – Smart Hospital Queue Management System

## Overview

MediQ is a real-time hospital queue and appointment management platform designed to reduce patient waiting times and improve the healthcare experience.

The system allows patients to book appointments, check into queues digitally, monitor live queue progress, and interact with healthcare services through a modern web interface. Doctors can manage patient flow through a dedicated dashboard and monitor queue activity in real time.

Built using React, TypeScript, Firebase Authentication, and Cloud Firestore, MediQ demonstrates how modern web technologies can streamline outpatient hospital operations.

---

## Features

### Patient Features

* Secure Authentication using Firebase Auth
* Book Appointments with Doctors
* Cancel Appointments
* Real-Time Queue Tracking
* Digital Check-In System
* Live Token Generation
* Queue Position Monitoring
* Estimated Waiting Time Calculation
* Appointment History
* Medicine Catalog Browsing
* Responsive Mobile-Friendly Interface

### Doctor Features

* Dedicated Doctor Dashboard
* Live Queue Monitoring
* Current Token Display
* Waiting Patient Statistics
* Queue Advancement Controls
* Real-Time Queue Updates

### Real-Time Capabilities

* Firestore OnSnapshot Listeners
* Instant Queue Synchronization
* Live Appointment Updates
* Multi-User Support
* Cross-Device Queue Tracking

---

## Technology Stack

### Frontend

* React
* TypeScript
* TanStack Router
* Framer Motion
* Tailwind CSS
* Lucide React Icons

### Backend & Database

* Firebase Authentication
* Cloud Firestore
* Firestore Real-Time Listeners

### Deployment

* Vercel

---

## System Architecture

```text
Patient
   │
   ▼
Appointment Booking
   │
   ▼
Check-In
   │
   ▼
Token Generation
   │
   ▼
Live Queue Tracking
   │
   ▼
Doctor Dashboard
   │
   ▼
Consultation
```

---

## Queue Workflow

### Patient Side

```text
Book Appointment
      │
      ▼
Check In
      │
      ▼
Receive Token
      │
      ▼
Track Queue Live
      │
      ▼
Consultation
```

### Doctor Side

```text
View Queue
      │
      ▼
Monitor Current Token
      │
      ▼
Call Next Patient
      │
      ▼
Queue Updates Instantly
```

---

## Current Project Status

### Completed Phases

#### Phase 1 – Authentication System

* Firebase Authentication
* Login & Signup
* Protected Routes
* Session Persistence

#### Phase 2 – Appointment Management

* Appointment Booking
* Appointment Cancellation
* Appointment History
* Firestore Integration

#### Phase 3 – Queue Management

* Doctor-Specific Queues
* Token Generation
* Queue Progress Tracking
* Estimated Wait Times

#### Phase 4 – Doctor Dashboard

* Doctor Role Detection
* Queue Monitoring
* Live Queue Statistics
* Queue Advancement Controls

#### Phase 5 – Real-Time Synchronization

* Firestore OnSnapshot Integration
* Real-Time Queue Updates
* Cross-Device Synchronization
* Multi-User Queue Management

---

## Future Roadmap

### Phase 6 – Digital Prescription System

* Doctor Prescription Panel
* Medicine Selection from Catalog
* Prescription Storage
* Patient Prescription History

### Phase 7 – Medical Records

* Patient Health Records
* Prescription Archive
* Visit History
* Downloadable Reports

### Phase 8 – Multi-Doctor Support

* Doctor Profiles
* Doctor Availability
* Doctor-Specific Dashboards
* Department Management

### Phase 9 – Notifications

* Queue Alerts
* Appointment Reminders
* Consultation Notifications

### Phase 10 – Dark Mode

* Light/Dark Theme Toggle
* Theme Persistence
* Accessibility Improvements

---

## Future AI & Machine Learning Integration

MediQ is planned to evolve into an intelligent healthcare platform using Machine Learning.

### Smart Waiting Time Prediction

Predict patient waiting times using:

* Queue Length
* Doctor Consultation Patterns
* Historical Appointment Data
* Peak Hour Analysis

### Appointment Demand Forecasting

Predict future hospital traffic using:

* Historical Appointment Data
* Seasonal Trends
* Doctor Availability
* Patient Arrival Patterns

### Intelligent Queue Optimization

Optimize patient flow using:

* Priority Scheduling
* Dynamic Queue Balancing
* Resource Allocation Models

### AI Healthcare Assistant

Future chatbot capabilities:

* Symptom Guidance
* Appointment Assistance
* Queue Information
* Hospital Navigation

### Predictive Analytics Dashboard

For hospital administrators:

* Daily Patient Forecasts
* Department Load Prediction
* Doctor Utilization Metrics
* Operational Insights

---

## Learning Outcomes

This project demonstrates:

* Real-Time Application Development
* Authentication Systems
* Cloud Firestore Integration
* State Management
* Role-Based Access Control
* Responsive UI Design
* Scalable Frontend Architecture
* Queue Management Algorithms
* Production Deployment Workflows

---

## Author

**Neelakanta Reddy Chinnakotla**

B.Tech Computer Science & Engineering

Indian Institute of Information Technology Kottayam

2024 – 2028

---

## License

This project is developed for educational, research, and portfolio purposes.
