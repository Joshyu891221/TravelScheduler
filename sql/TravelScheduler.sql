-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: TravelScheduler
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CONTAIN`
--

DROP TABLE IF EXISTS `CONTAIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CONTAIN` (
  `user_id` varchar(256) NOT NULL,
  `group_id` varchar(256) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `CONTAIN_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `CONTAIN_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `GROUP` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONTAIN`
--

LOCK TABLES `CONTAIN` WRITE;
/*!40000 ALTER TABLE `CONTAIN` DISABLE KEYS */;
/*!40000 ALTER TABLE `CONTAIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GROUP`
--

DROP TABLE IF EXISTS `GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GROUP` (
  `group_id` varchar(256) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `people_num` int DEFAULT NULL,
  `creator_id` varchar(256) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `GROUP_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GROUP`
--

LOCK TABLES `GROUP` WRITE;
/*!40000 ALTER TABLE `GROUP` DISABLE KEYS */;
/*!40000 ALTER TABLE `GROUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HAS`
--

DROP TABLE IF EXISTS `HAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HAS` (
  `has_id` varchar(256) NOT NULL,
  `travel_id` varchar(256) NOT NULL,
  `spot_id` varchar(256) NOT NULL,
  `tag_name` varchar(50) DEFAULT NULL,
  `transportation` varchar(20) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `arrive_id` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`has_id`),
  KEY `spot_id` (`spot_id`),
  KEY `arrive_id` (`arrive_id`),
  CONSTRAINT `HAS_ibfk_1` FOREIGN KEY (`travel_id`) REFERENCES `TRAVEL` (`travel_id`) ON DELETE CASCADE,
  CONSTRAINT `HAS_ibfk_2` FOREIGN KEY (`spot_id`) REFERENCES `SPOT` (`spot_id`) ON DELETE CASCADE,
  CONSTRAINT `HAS_ibfk_3` FOREIGN KEY (`tag_name`) REFERENCES `TAG` (`name`) ON DELETE SET NULL,
  CONSTRAINT `HAS_ibfk_4` FOREIGN KEY (`arrive_id`) REFERENCES `HAS` (`has_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HAS`
--

LOCK TABLES `HAS` WRITE;
/*!40000 ALTER TABLE `HAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `HAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SPOT`
--

DROP TABLE IF EXISTS `SPOT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SPOT` (
  `spot_id` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `ranking` float DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `longtitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `open_hour` varchar(256) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`spot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SPOT`
--

LOCK TABLES `SPOT` WRITE;
/*!40000 ALTER TABLE `SPOT` DISABLE KEYS */;
INSERT INTO `SPOT` VALUES ('yIADybgv2S/xwuEANM0OfmRCMG6wWlImQjsy3IV865g=','test_roy',5.5,'none',1.2,1.1,'7-11','123456879');
/*!40000 ALTER TABLE `SPOT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STAR`
--

DROP TABLE IF EXISTS `STAR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STAR` (
  `user_id` varchar(256) NOT NULL,
  `spot_id` varchar(256) NOT NULL,
  PRIMARY KEY (`user_id`,`spot_id`),
  KEY `spot_id` (`spot_id`),
  CONSTRAINT `STAR_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `STAR_ibfk_2` FOREIGN KEY (`spot_id`) REFERENCES `SPOT` (`spot_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STAR`
--

LOCK TABLES `STAR` WRITE;
/*!40000 ALTER TABLE `STAR` DISABLE KEYS */;
/*!40000 ALTER TABLE `STAR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAG`
--

DROP TABLE IF EXISTS `TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG` (
  `name` varchar(50) NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAG`
--

LOCK TABLES `TAG` WRITE;
/*!40000 ALTER TABLE `TAG` DISABLE KEYS */;
/*!40000 ALTER TABLE `TAG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TRAVEL`
--

DROP TABLE IF EXISTS `TRAVEL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRAVEL` (
  `travel_id` varchar(256) NOT NULL,
  `group_id` varchar(256) DEFAULT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `people_num` int DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `done` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`travel_id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `TRAVEL_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `GROUP` (`group_id`) ON DELETE SET NULL,
  CONSTRAINT `TRAVEL_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TRAVEL`
--

LOCK TABLES `TRAVEL` WRITE;
/*!40000 ALTER TABLE `TRAVEL` DISABLE KEYS */;
/*!40000 ALTER TABLE `TRAVEL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `user_id` varchar(256) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `photoURL` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13 16:49:27
