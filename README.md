# Project Name

## Description

This project is a web-based ticket reservation system implemented with Django and React.js. It provides functionalities for both users and administrators, allowing users to create accounts, make reservations for sporting events, perform online payments, and generate tickets. Administrators have privileges to manage event information, view reports, and handle seat reallocation.

## Table of Contents

- [System Specification](#system-specification)
  - [User](#user)
    - [User Account](#user-account)
    - [Authentication](#authentication)
    - [Real-time Booking](#real-time-booking)
    - [Online Payment](#online-payment)
    - [Ticket Generation](#ticket-generation)
    - [Cancellation](#cancellation)
  - [Administrator](#administrator)
    - [Administrator Account](#administrator-account)
    - [Modification](#modification)
    - [Reports and Inventory](#reports-and-inventory)
    - [Seat Reallocation](#seat-reallocation)
- [Features](#features)
- [Database Interaction](#database-interaction)
- [User Interface](#user-interface)
  - [Match Listing](#match-listing)
  - [Seat Selection](#seat-selection)
  - [Payment Page](#payment-page)
- [Screenshots](#screenshots)
  - [ERD](#erd)
  - [Application Screenshots](#application-screenshots)

## System Specification

### User

#### User Account
The system allows users to create accounts through registration, providing access to system services.

#### Authentication
User access to system data is validated through login details validation and verification.

#### Real-time Booking
Users can look up forthcoming sporting events, search for available seats, and make reservation bookings.

#### Online Payment
Users can make payments using their debit cards.

#### Ticket Generation
Users can print reservation tickets after successful booking and payment.

#### Cancellation
Users have the ability to cancel reservations at any time.

### Administrator

#### Administrator Account
Administrators can create accounts with additional system privileges.

#### Modification
Administrators can edit and update information about football matches and other events.

#### Reports and Inventory
Administrators can examine reports on stadium seat counts, available seats for a specific match, reservation records, and payment reports.

#### Seat Reallocation
Administrators can reallocate seats when a user cancels a reservation.

## Features

- User Account Management
- Real-time Booking
- Online Payment
- Ticket Generation
- Reservation Cancellation
- Administrator Privileges
- Event Information Modification
- Reporting and Inventory Management
- Seat Reallocation

## Database Interaction

All features interact directly with the database. Seat allocation is straightforward, while the payment side generates seat prices stored in the database.

## User Interface

### Match Listing

A page displays available matches with thumbnail images, match names, and ticket prices. The grid view indicates the percentage of seats left. Users must sign in to select and purchase tickets.

### Seat Selection

After selecting a match thumbnail, users navigate to a page to visually select seats. Each seat has a number, and users can visually choose seats before proceeding to the payment page.

### Payment Page

The payment page displays details of the selected seat and match. It includes a pay button, and upon payment, the system generates a receipt with payment details, receipt number, seat number, and match time.

## Screenshots

### ERD

![ERD Screenshot](/path/to/erd_screenshot.png)

### Application Screenshots

![Screenshot 1](/path/to/screenshot1.png)
![Screenshot 2](/path/to/screenshot2.png)
![Screenshot 3](/path/to/screenshot3.png)

*Add more screenshots as needed.*
