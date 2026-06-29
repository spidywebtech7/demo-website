-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: jayambe_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_users`
--

DROP TABLE IF EXISTS `app_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_users`
--

LOCK TABLES `app_users` WRITE;
/*!40000 ALTER TABLE `app_users` DISABLE KEYS */;
INSERT INTO `app_users` VALUES (1,'spidy','$2y$10$7LLXhDAtFQ.ArZ5tIv./7ePEuRILF6wgnSMqTVPj5s.xYcScuB2vG');
/*!40000 ALTER TABLE `app_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_data`
--

DROP TABLE IF EXISTS `site_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_key` varchar(50) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `images` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `section_key` (`section_key`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_data`
--

LOCK TABLES `site_data` WRITE;
/*!40000 ALTER TABLE `site_data` DISABLE KEYS */;
INSERT INTO `site_data` VALUES (1,'hero','Hero Banners','[\"assets\\/hero_banner.png\",\"images\\/banner 2.avif\",\"uploads\\/image-1781201674354.jpg\",\"uploads\\/image-1781273015584.avif\"]'),(2,'curated','Curated Collection','[\"images\\/ring.avif\",\"images\\/necklace.avif\",\"images\\/earrings.avif\",\"uploads\\/image-1781201881244.jpg\",\"images\\/kada.avif\",\"images\\/pendant.avif\",\"images\\/bangles.avif\",\"images\\/mangalsutra.avif\",\"images\\/chain.avif\",\"images\\/pendant.avif\"]'),(3,'exclusive','Exclusive Brands','[\"uploads\\/image-1781201917734.jpg\",\"https:\\/\\/images.unsplash.com\\/photo-1584377334016-464803e03b80?auto=format&fit=crop&w=600&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80\",\"uploads\\/image-1781201930837.jpg\",\"https:\\/\\/images.unsplash.com\\/photo-1584377334016-464803e03b80?auto=format&fit=crop&w=600&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80\"]'),(4,'promo','Promotional Banner','[\"images\\/banner 1.avif\"]'),(5,'elegant','Timeless Elegance','[\"uploads\\/image-1781201944085.jpg\",\"uploads\\/image-1781201963070.jpg\",\"uploads\\/image-1781201954717.jpg\"]'),(6,'signature_owner','Signature Styles Owner','[\"images\\/owner image.avif\"]'),(7,'signature_scroll','Signature Styles Scrolling','[\"images\\/ring.avif\",\"images\\/necklace.avif\",\"images\\/earrings.avif\",\"images\\/kada.avif\",\"images\\/bangles.avif\",\"images\\/chain.avif\"]'),(8,'reels','Reels Videos','[\"\",\"\",\"\",\"\",\"\",\"\",\"\"]'),(12,'insta_col1','Instagram Column 1 (Left Up)','[\"uploads\\/image-1781294404.webp\",\"uploads\\/image-1781294411.webp\",\"uploads\\/image-1781294418.webp\",\"uploads\\/image-1781294425.webp\"]'),(13,'insta_col2','Instagram Column 2 (Left Down)','[\"uploads\\/image-1781294434.webp\",\"uploads\\/image-1781294441.webp\",\"uploads\\/image-1781294448.webp\",\"uploads\\/image-1781294456.webp\"]'),(14,'insta_gallery','Instagram Center Gallery','[\"uploads\\/image-1781292377.jpeg\",\"uploads\\/image-1781292393.jpg\",\"uploads\\/image-1781292414.jpg\",\"images\\/earrings.avif\",\"images\\/chain.avif\",\"images\\/pendant.avif\",\"images\\/mangalsutra.avif\",\"images\\/bangles.avif\",\"images\\/ring.avif\"]'),(15,'insta_col3','Instagram Column 3 (Right Up)','[\"uploads\\/image-1781292479.jpg\",\"images\\/earrings.avif\",\"images\\/earrings.avif\",\"images\\/earrings.avif\"]'),(16,'insta_col4','Instagram Column 4 (Right Down)','[\"uploads\\/image-1781292516.jpg\",\"images\\/bangles.avif\",\"images\\/bangles.avif\",\"images\\/bangles.avif\"]'),(17,'rc_marquee','Horizontal Marquee (Mangalsutras)','[\"uploads\\/image-1781294467.webp\",\"uploads\\/image-1781294474.webp\",\"uploads\\/image-1781294481.webp\",\"uploads\\/image-1781294504.webp\",\"uploads\\/image-1781294512.webp\",\"uploads\\/image-1781294520.webp\",\"uploads\\/image-1781294489.webp\",\"uploads\\/image-1781294497.webp\"]'),(18,'latest_row1','Latest Collection (Row 1 RTL)','[\"uploads\\/image-1781294539.webp\",\"uploads\\/image-1781294548.webp\",\"uploads\\/image-1781294563.webp\",\"uploads\\/image-1781294570.webp\",\"uploads\\/image-1781294577.webp\",\"uploads\\/image-1781294585.webp\",\"uploads\\/image-1781294530.webp\",\"uploads\\/image-1781294556.webp\"]'),(19,'latest_row2','Latest Collection (Row 2 LTR)','[\"uploads\\/image-1781294603.webp\",\"uploads\\/image-1781294611.webp\",\"uploads\\/image-1781294635.webp\",\"uploads\\/image-1781294642.webp\",\"uploads\\/image-1781294649.webp\",\"uploads\\/image-1781294657.webp\",\"uploads\\/image-1781294618.webp\",\"uploads\\/image-1781294626.webp\"]');
/*!40000 ALTER TABLE `site_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-13 19:12:19
