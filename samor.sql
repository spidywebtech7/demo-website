-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 27, 2026 at 03:07 AM
-- Server version: 10.11.18-MariaDB-cll-lve
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `samor`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_users`
--

CREATE TABLE `app_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `app_users`
--

INSERT INTO `app_users` (`id`, `username`, `password_hash`) VALUES
(1, 'spidy', '$2y$10$7LLXhDAtFQ.ArZ5tIv./7ePEuRILF6wgnSMqTVPj5s.xYcScuB2vG');

-- --------------------------------------------------------

--
-- Table structure for table `site_data`
--

CREATE TABLE `site_data` (
  `id` int(11) NOT NULL,
  `section_key` varchar(50) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `images` longtext NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_data`
--

INSERT INTO `site_data` (`id`, `section_key`, `section_name`, `images`, `description`) VALUES
(1, 'hero', 'Hero Banners', '[\"uploads\\/image-1781681967.jpg\",\"uploads\\/image-1781682230.jpg\",\"uploads\\/image-1781681785.jpg\",\"uploads\\/image-1781682249.jpg\"]', NULL),
(2, 'curated', 'Excellent collection', '[\"uploads\\/image-1781585628.jpg\",\"uploads\\/image-1781585645.jpg\",\"uploads\\/image-1781586280.jpg\",\"uploads\\/image-1781586555.jpg\",\"uploads\\/image-1781586755.jpg\",\"uploads\\/image-1781586384.jpg\",\"uploads\\/image-1781585723.jpg\",\"uploads\\/image-1781588021.jpg\",\"uploads\\/image-1781585749.jpg\",\"uploads\\/image-1781585778.jpg\"]', 'Discover our most celebrated designs, crafted with unparalleled precision and timeless elegance.'),
(3, 'exclusive', 'New collection', '[\"uploads\\/image-1781587872.jpg\",\"uploads\\/image-1781587886.jpg\",\"uploads\\/image-1781587973.jpg\",\"uploads\\/image-1781587989.jpg\",\"uploads\\/image-1781588056.jpg\",\"uploads\\/image-1781588081.jpg\",\"uploads\\/image-1781588105.jpg\",\"uploads\\/image-1781588137.jpg\"]', 'For the bride who dreams in tradition and shines in modern elegance our diamond and Polki creations bring together brilliance, heritage, and a touch of celestial charm.'),
(4, 'promo', 'Promotional Banner', '[\"uploads\\/image-1781590045.jpg\"]', NULL),
(5, 'elegant', 'Timeless Elegance', '[\"uploads\\/image-1781552739.jpg\",\"uploads\\/image-1781552750.jpg\",\"uploads\\/image-1781552759.jpg\"]', ''),
(6, 'signature_owner', 'Signature Styles Owner', '[\"uploads\\/image-1781551213.jpg\"]', NULL),
(7, 'signature_scroll', 'Signature Styles Scrolling', '[\"uploads\\/image-1781588280.jpg\",\"uploads\\/image-1781588299.jpg\",\"uploads\\/image-1781588319.jpg\",\"uploads\\/image-1781588335.jpg\",\"uploads\\/image-1781588348.jpg\",\"uploads\\/image-1781588365.jpg\"]', NULL),
(8, 'reels', 'Reels Videos', '[\"uploads\\/image-1781552102.mp4\",\"uploads\\/image-1781552171.mp4\",\"uploads\\/image-1781552220.mp4\",\"uploads\\/image-1781552896.mp4\",\"uploads\\/image-1781552946.mp4\",\"uploads\\/image-1781552986.mp4\",\"uploads\\/image-1781553045.mp4\"]', 'Step into the spotlight with your favorite creators. Trends, style, and moments that inspire. All in one Reel.'),
(12, 'insta_col1', 'Instagram Column 1 (Left Up)', '[\"uploads\\/image-1781551595.jpg\",\"uploads\\/image-1781588676.jpg\",\"uploads\\/image-1781588690.jpg\",\"uploads\\/image-1781588715.jpg\"]', NULL),
(13, 'insta_col2', 'Instagram Column 2 (Left Down)', '[\"uploads\\/image-1781588730.jpg\",\"uploads\\/image-1781588750.jpg\",\"uploads\\/image-1781588770.jpg\",\"uploads\\/image-1781588787.jpg\"]', NULL),
(14, 'insta_gallery', 'Instagram Center Gallery', '[\"uploads\\/image-1781588442.jpg\",\"uploads\\/image-1781588451.jpg\",\"uploads\\/image-1781588463.jpg\",\"uploads\\/image-1781588485.jpg\",\"uploads\\/image-1781588499.jpg\",\"uploads\\/image-1781588514.jpg\",\"uploads\\/image-1781588534.jpg\",\"uploads\\/image-1781588546.jpg\",\"uploads\\/image-1781588565.jpg\"]', NULL),
(15, 'insta_col3', 'Instagram Column 3 (Right Up)', '[\"uploads\\/image-1781588825.jpg\",\"uploads\\/image-1781588838.jpg\",\"uploads\\/image-1781588849.jpg\",\"uploads\\/image-1781588859.jpg\"]', NULL),
(16, 'insta_col4', 'Instagram Column 4 (Right Down)', '[\"uploads\\/image-1781552586.jpg\",\"uploads\\/image-1781552596.jpg\",\"uploads\\/image-1781552617.jpg\",\"uploads\\/image-1781552607.jpg\"]', NULL),
(17, 'rc_marquee', 'Horizontal Marquee (Mangalsutras)', '[\"uploads\\/image-1781552629.jpg\",\"uploads\\/image-1781552638.jpg\",\"uploads\\/image-1781552657.jpg\",\"uploads\\/image-1781552669.jpg\",\"uploads\\/image-1781552682.jpg\",\"uploads\\/image-1781552693.jpg\",\"uploads\\/image-1781552704.jpg\",\"uploads\\/image-1781552715.jpg\"]', NULL),
(18, 'latest_row1', 'Latest Collection (Row 1 RTL)', '[\"uploads\\/image-1781551808.jpg\",\"uploads\\/image-1781551822.jpg\",\"uploads\\/image-1781551837.jpg\",\"uploads\\/image-1781551853.jpg\",\"uploads\\/image-1781551867.jpg\",\"uploads\\/image-1781551884.jpg\",\"uploads\\/image-1781551896.jpg\",\"uploads\\/image-1781551912.jpg\"]', 'Explore our latest arrivals, crafted with precision to elevate your style and celebrations.'),
(19, 'latest_row2', 'Latest Collection (Row 2 LTR)', '[\"uploads\\/image-1781551929.jpg\",\"uploads\\/image-1781551941.jpg\",\"uploads\\/image-1781551953.jpg\",\"uploads\\/image-1781551970.jpg\",\"uploads\\/image-1781551990.jpg\",\"uploads\\/image-1781552013.jpg\",\"uploads\\/image-1781552029.jpg\",\"uploads\\/image-1781552050.jpg\"]', NULL),
(20, 'signature_col1', 'Signature Column 1 (Left Up)', '[\"uploads\\/image-1781674032.jpg\",\"uploads\\/image-1781674043.jpg\",\"uploads\\/image-1781674055.jpg\",\"uploads\\/image-1781674066.jpg\",\"uploads\\/image-1781674079.jpg\",\"uploads\\/image-1781674093.jpg\"]', NULL),
(21, 'signature_col2', 'Signature Column 2 (Middle Down)', '[\"uploads\\/image-1781674107.jpg\",\"uploads\\/image-1781674121.jpg\",\"uploads\\/image-1781674133.jpg\",\"uploads\\/image-1781674145.jpg\",\"uploads\\/image-1781674161.jpg\",\"uploads\\/image-1781674172.jpg\"]', NULL),
(22, 'signature_col3', 'Signature Column 3 (Right Up)', '[\"uploads\\/image-1781674198.jpg\",\"uploads\\/image-1781674232.jpg\",\"uploads\\/image-1781674221.jpg\",\"uploads\\/image-1781674243.jpg\",\"uploads\\/image-1781674209.jpg\",\"uploads\\/image-1781674187.jpg\"]', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_users`
--
ALTER TABLE `app_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `site_data`
--
ALTER TABLE `site_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section_key` (`section_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_users`
--
ALTER TABLE `app_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `site_data`
--
ALTER TABLE `site_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
