-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3300
-- Generation Time: Jun 26, 2025 at 07:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_users`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phone`, `created_at`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', '0612345678', '2025-06-25 14:49:53'),
(3, 'Ali', 'Karim', 'ali.karim@example.com', '0655443322', '2025-06-25 14:49:53'),
(4, 'Ali', 'Test', 'ali@example.com', '0123456789', '2025-06-26 15:15:02'),
(6, 'Zack', 'Reguieg', 'zack@gmail.com', '19339900', '2025-06-26 15:36:49'),
(7, 'sophiane', 'khedim', 'sofiane@gmail.com', '12345678', '2025-06-26 15:37:16'),
(10, 'Mokrane', 'Rabah', 'Mokrane@gmail.com', '13993229', '2025-06-26 15:42:31'),
(11, 'Ali', 'Ismail', 'ali.samir.ismail03@gmail.com', '0616419823', '2025-06-26 15:57:23'),
(12, 'Ali', 'Ismail', 'samir.ismail03@gmail.co', '0616419823', '2025-06-26 15:57:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;