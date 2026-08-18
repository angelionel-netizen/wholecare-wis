-- 1. Customer Table
CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(50),
    DateOfBirth DATE,
    Password VARCHAR(255) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Provider Table
CREATE TABLE Provider (
    ProviderID SERIAL PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Specialty VARCHAR(100) NOT NULL,
    Rating DECIMAL(2, 1) DEFAULT 5.0,
    Availability VARCHAR(255) NOT NULL
);

-- 3. Appointment Table
CREATE TABLE Appointment (
    AppointmentID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    ProviderID INT NOT NULL REFERENCES Provider(ProviderID) ON DELETE CASCADE,
    DateTime TIMESTAMP NOT NULL,
    Notes TEXT,
    Status VARCHAR(50) DEFAULT 'Confirmed'
);

-- 4. ConsentRecord Table (Audit trail & Permission Gate)
CREATE TABLE ConsentRecord (
    ConsentID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    ConsentType VARCHAR(100) NOT NULL,
    Granted BOOLEAN NOT NULL DEFAULT FALSE,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Recommendation Table (Consent-gated)
CREATE TABLE Recommendation (
    RecommendationID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    AppointmentID INT REFERENCES Appointment(AppointmentID) ON DELETE SET NULL,
    Content TEXT NOT NULL,
    Category VARCHAR(50) NOT NULL, -- 'Diet' or 'Exercise'
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Mock Providers
INSERT INTO Provider (Name, Specialty, Rating, Availability) VALUES
('Dr. Alice Smith', 'Nutrition & Metabolic Health', 4.9, 'Mon, Wed, Fri (9am - 3pm)'),
('Coach Brian Miller', 'Functional Wellness & Diet', 4.8, 'Tue, Thu (10am - 4pm)'),
('Dr. Claire Vance', 'Holistic Health & Supplements', 5.0, 'Mon - Thu (8am - 1pm)');