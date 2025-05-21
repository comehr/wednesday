CREATE DATABASE cwsms;

USE cwsms;



-- Car Table
CREATE TABLE car (
  PlateNumber VARCHAR(20) NOT NULL,
  CarType VARCHAR(50),
  CarSize VARCHAR(50),
  DriverName VARCHAR(100),
  PhoneNumber VARCHAR(20),
  PRIMARY KEY (PlateNumber)
);

-- Package Table
CREATE TABLE package (
  PackageNumber INT NOT NULL AUTO_INCREMENT,
  PackageName VARCHAR(100),
  PackageDescription TEXT,
  PackagePrice DECIMAL(10,2),
  PRIMARY KEY (PackageNumber)
);

-- ServicePackage Table
CREATE TABLE servicepackage (
  RecordNumber INT NOT NULL AUTO_INCREMENT,
  PlateNumber VARCHAR(20),
  PackageNumber INT,
  ServiceDate DATE,
  PRIMARY KEY (RecordNumber),
  FOREIGN KEY (PlateNumber) REFERENCES car(PlateNumber),
  FOREIGN KEY (PackageNumber) REFERENCES package(PackageNumber)
);

-- Payment Table
CREATE TABLE payment (
  PaymentNumber INT NOT NULL AUTO_INCREMENT,
  RecordNumber INT,
  AmountPaid DECIMAL(10,2),
  PaymentDate DATE,
  PRIMARY KEY (PaymentNumber),
  FOREIGN KEY (RecordNumber) REFERENCES servicepackage(RecordNumber)
);




INSERT INTO package (PackageName, PackageDescription, PackagePrice) VALUES
('Basic wash', 'Exterior hand wash', 5000),
('Classic wash', 'Interior hand wash', 10000),
('Premium wash', 'Exterior and Interior hand wash', 20000);