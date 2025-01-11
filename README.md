# Online Student Council Voting System

## Overview
The **Online Student Council Voting System** is a comprehensive platform designed to facilitate secure and efficient student council elections. The system consists of a backend API built with **Node.js** and **Express.js**, and a frontend application built with **React.js** and **Tailwind CSS**. The backend supports functionalities like user authentication, voter registration, election management, real-time voting, result declaration, and report generation. The frontend provides a user-friendly interface for voters, admins, and super admins to interact with the system.

## Features

### Backend
1. **Authentication**
   - Secure login and registration for voters and admins.
   - Multi-factor authentication (MFA) via **Twilio Verify API** for voter registration and login.
   - Sub-admin invitation and account activation via email using **Nodemailer**.

2. **User Roles**
   - **Voter**: Register, log in, and cast votes securely.
   - **Admin**: Manage candidate registrations and monitor elections.
   - **Super Admin**: Manage elections, approve/reject candidates, and generate reports.

3. **Election Management**
   - Create, manage, and monitor elections.
   - Support for multiple elections with unique schedules.

4. **Voting**
   - One vote per election per voter.
   - Ensures voters can only vote for verified candidates.

5. **Result Management**
   - Real-time results with **Socket.IO**.
   - Automatic winner declaration.

6. **Report Generation**
   - Generate detailed CSV reports of election results.
   - Reports include candidate name, department, total votes, and election details.

### Frontend
1. **Authentication**
   - Secure login and registration forms for voters and admins.
   - OTP verification for voter registration and login.

2. **User Roles**
   - **Voter**: Access voter dashboard, view elections, and cast votes.
   - **Admin**: Access admin dashboard, manage candidates, and monitor elections.
   - **Super Admin**: Access super admin dashboard, manage elections, approve/reject candidates, and generate reports.

3. **Responsive Design**
   - User-friendly interface with responsive design using **Tailwind CSS**.

4. **Real-time Updates**
   - Real-time result updates using **Socket.IO**.

## API Endpoints

### Authentication
- **Register Voter**
  - `POST /api/auth/register-voter`
  - Request Body:
    ```json
    {
      "studentId": "EAUGRW0002736",
      "name": "Said Ibrahim",
      "gender": "Male",
      "department": "Computer Science",
      "year": "4",
      "mobile": "+252907841570",
      "password": "12345"
    }
    ```

- **Login Voter**
  - `POST /api/auth/login-voter`
  - Request Body:
    ```json
    {
      "mobile": "+252907841570",
      "password": "12345"
    }
    ```

- **Verify OTP**
  - `POST /api/auth/verify-otp`
  - Request Body:
    ```json
    {
      "mobile": "+252907841570",
      "otpCode": "569312"
    }
    ```

### Admin Management
- **Invite Sub-Admin**
  - `POST /api/admin/invite-sub-admin`
  - Request Body:
    ```json
    {
      "name": "Admin One",
      "email": "admin1@example.com",
      "department": "Operations"
    }
    ```

### Election Management
- **Create Election**
  - `POST /api/elections/create`
  - Request Body:
    ```json
    {
      "name": "Student Council Election 2024",
      "startDate": "2024-12-01",
      "endDate": "2024-12-07",
      "candidateSubmissionDeadline": "2024-11-20"
    }
    ```

### Candidate Management
- **Add Candidate**
  - `POST /api/candidates/add`
  - Form Data:
    - `fullName`: Candidate name
    - `faculty`: Faculty name
    - `manifesto`: Candidate manifesto
    - `candidateImage`: Image file

- **Approve/Reject Candidate**
  - `POST /api/candidates/approve`
  - Request Body:
    ```json
    {
      "candidateId": "candidate123",
      "approvalStatus": "approved"
    }
    ```

### Voting
- **Cast Vote**
  - `POST /api/votes/cast`
  - Request Body:
    ```json
    {
      "electionId": "election123",
      "candidateId": "candidate123"
    }
    ```

### Result Management
- **Calculate Results**
  - `POST /api/results/calculate/:electionId`

- **Generate Report**
  - `GET /api/results/report/:electionId`

## Instructions for Frontend Developer

1. **Connect to the Backend**
   - Update `BASE_URL` in the frontend to point to the backend server (e.g., `http://localhost:5000`).

2. **Endpoints Interaction**
   - Use the provided API documentation for route interactions.
   - Use `Authorization` headers with JWT tokens for protected routes.

3. **Real-time Updates**
   - Integrate **Socket.IO** for live result updates.

4. **Static Assets**
   - Fetch candidate images from `http://localhost:5000/uploads/<image-file-name>`.

5. **Sample Workflows**
   - **Voter Registration** → OTP Verification → Voting.
   - **Admin Workflow** → Invite Sub-Admin → Approve Candidates → Generate Reports.

## Testing Locally

1. Clone the frontend and backend repositories into separate folders.
2. Start the backend server:
   ```sh
   cd backend
   npm install
   npm start
   ```
3. Start the frontend server:
   ```sh
   cd frontend
   npm install
   npm start
   ```
4. Access the frontend at `http://localhost:5173/` and ensure it communicates with the backend at `http://localhost:5000`.

## Credentials for Access

### Voter Login Credentials
- **Mobile**: 252907841579
- **Password**: 12345

### Admin Login Credentials
- **Email**: saidabdishakur2000@gmail.com
- **Password**: 12345

### Super Admin Login Credentials
- **Email**: superadmin@example.com
- **Password**: admin@123

## Collaboration

This project is open for collaboration. Feel free to fork the repository, make changes, and submit pull requests. Happy coding!

---

just testing and practicing pull request and git collaboration!!!
