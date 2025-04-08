# AppointmentService

MediSync appointment service

## Description

The AppointmentService is a microservice within the MediSync system that manages appointment scheduling, rescheduling, and cancellations for healthcare providers and patients. It ensures seamless integration with other MediSync services.

## Features

- Create, update, and cancel appointments.
- View appointment details.
- Integration with patient and doctor services.
- Notifications for appointment updates.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (or any configured database)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TechVisionaries/AppointmentService.git
   cd AppointmentService
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the required variables (e.g., database connection string, API keys).

4. Start the service:
   ```bash
   npm start
   ```

## Usage

- Access the API endpoints via the configured base URL.
- Use tools like Postman or cURL to test the endpoints.
- Integrate the service with other MediSync modules.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
