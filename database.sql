-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mysql_nodejs
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coin_transaction`
--

DROP TABLE IF EXISTS `coin_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_transaction` (
  `coin_transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` enum('earn','spend','bonus','refund') NOT NULL,
  `amount` bigint NOT NULL,
  `source` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`coin_transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `coin_transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_transaction`
--

LOCK TABLES `coin_transaction` WRITE;
/*!40000 ALTER TABLE `coin_transaction` DISABLE KEYS */;
INSERT INTO `coin_transaction` VALUES (1,2,'earn',5,'สมัครแพ็กเกจ Beginner','2026-03-26 07:17:02'),(2,2,'earn',5,'daily_checkin','2026-03-26 07:17:12'),(3,2,'earn',5,'daily_checkin','2026-03-26 07:17:21'),(4,2,'earn',5,'daily_checkin','2026-03-26 07:21:05'),(5,5,'earn',5,'daily_checkin','2026-03-26 11:08:29'),(6,5,'earn',100,'สุ่มวงล้อนำโชค','2026-03-26 11:09:46'),(7,2,'earn',25,'สุ่มวงล้อนำโชค','2026-03-26 11:14:28'),(8,2,'earn',29,'สมัครแพ็กเกจ Premium','2026-03-26 12:16:37'),(9,2,'earn',24,'สมัครแพ็กเกจ Standard','2026-03-26 12:17:57'),(10,2,'earn',7,'สมัครแพ็กเกจ Mobile','2026-03-26 12:18:14'),(11,2,'earn',24,'สมัครแพ็กเกจ ID: 3 (CASH)','2026-03-26 13:09:54'),(12,2,'earn',5,'สมัครแพ็กเกจ ID: 1 (CASH)','2026-03-26 13:10:12'),(13,2,'spend',700,'สมัครแพ็กเกจ ID: 1 (COIN)','2026-03-26 13:14:50'),(14,2,'earn',24,'สมัครแพ็กเกจ ID: 3 (CASH)','2026-03-26 13:26:19'),(15,2,'spend',700,'สมัครแพ็กเกจ ID: 1 (COIN)','2026-03-26 13:26:29'),(16,2,'earn',24,'สมัครแพ็กเกจ ID: 3 (CASH)','2026-03-26 13:36:45'),(17,2,'earn',24,'สมัครแพ็กเกจ ID: 3 (CASH)','2026-03-26 13:37:04'),(18,2,'spend',4200,'สมัครแพ็กเกจ ID: 4 (COIN)','2026-03-26 13:37:09'),(19,2,'earn',29,'สมัครแพ็กเกจ ID: 4 (CASH)','2026-03-26 13:38:05'),(20,2,'spend',1000,'สมัครแพ็กเกจ ID: 2 (COIN)','2026-03-26 13:38:33'),(21,2,'earn',29,'สมัครแพ็กเกจ ID: 4 (CASH)','2026-03-26 13:39:19'),(22,2,'earn',24,'สมัครแพ็กเกจ ID: 3 (CASH)','2026-03-26 13:39:33'),(23,2,'earn',7,'สมัครแพ็กเกจ ID: 2 (CASH)','2026-03-27 02:27:08'),(24,2,'spend',1000,'สมัครแพ็กเกจ ID: 2 (COIN)','2026-03-27 03:48:39'),(25,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:42:18'),(26,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:42:21'),(27,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:42:29'),(28,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:42:32'),(29,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:42:38'),(30,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:42:41'),(31,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:42:46'),(32,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:43:09'),(33,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:43:19'),(34,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:43:39'),(35,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:45:05'),(36,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 05:48:51'),(37,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:52:56'),(38,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:52:59'),(39,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:53:27'),(40,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:53:31'),(41,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 05:54:53'),(42,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 06:14:01'),(43,2,'earn',5,'daily_checkin','2026-03-27 07:46:53'),(44,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 07:55:33'),(45,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 07:55:39'),(46,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 07:55:48'),(47,2,'spend',50,'แลกสิทธิพิเศษ ID: 2','2026-03-27 07:55:52'),(48,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 07:56:03'),(49,2,'spend',0,'แลกสิทธิพิเศษ ID: 1','2026-03-27 07:56:53'),(50,5,'spend',3500,'สมัครแพ็กเกจ ID: 3','2026-03-27 09:37:56'),(51,5,'spend',700,'สมัครแพ็กเกจ ID: 1','2026-03-27 09:38:03'),(52,5,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 09:41:20'),(53,5,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 09:41:25'),(54,5,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-27 09:41:33'),(55,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 09:42:31'),(56,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 09:42:39'),(57,5,'spend',0,'แลกรางวัล: ฟรี! แดรี่ควีน 1 โคน','2026-03-27 09:42:52'),(62,5,'earn',5,'daily_checkin','2026-03-27 10:36:39'),(70,5,'earn',20,'วงล้อนำโชค','2026-03-27 10:43:23'),(71,5,'earn',15,'วงล้อนำโชค','2026-03-27 10:43:31'),(72,5,'earn',50,'วงล้อนำโชค','2026-03-27 10:43:40'),(73,5,'earn',50,'วงล้อนำโชค','2026-03-27 10:43:55'),(74,5,'earn',20,'วงล้อนำโชค','2026-03-27 10:44:06'),(75,5,'earn',1,'วงล้อนำโชค','2026-03-27 10:44:13'),(76,5,'earn',50,'วงล้อนำโชค','2026-03-27 10:44:19'),(77,5,'earn',100,'วงล้อนำโชค','2026-03-27 10:44:26'),(78,5,'earn',1,'วงล้อนำโชค','2026-03-27 10:58:28'),(79,5,'earn',50,'วงล้อนำโชค','2026-03-27 10:58:34'),(80,5,'earn',5,'วงล้อนำโชค','2026-03-27 10:58:41'),(81,5,'earn',25,'วงล้อนำโชค','2026-03-27 10:58:47'),(82,5,'earn',100,'วงล้อนำโชค','2026-03-27 10:58:53'),(83,5,'earn',25,'วงล้อนำโชค','2026-03-27 10:58:59'),(84,5,'earn',25,'วงล้อนำโชค','2026-03-27 10:59:05'),(85,5,'earn',1,'วงล้อนำโชค','2026-03-27 10:59:13'),(86,5,'earn',15,'วงล้อนำโชค','2026-03-27 11:15:39'),(87,6,'earn',5,'รางวัลลงทะเบียน','2026-03-27 11:21:05'),(88,6,'earn',15,'วงล้อนำโชค','2026-03-27 11:23:14'),(89,6,'earn',5,'daily_checkin','2026-03-27 11:23:25'),(90,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:23:41'),(91,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 11:23:55'),(92,6,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-27 11:28:30'),(93,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 11:28:46'),(94,6,'earn',15,'วงล้อนำโชค','2026-03-27 11:29:14'),(95,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:29:57'),(96,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 11:33:53'),(97,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:42:10'),(98,6,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 11:46:25'),(99,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 11:47:12'),(100,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:47:31'),(101,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 11:47:41'),(102,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:47:54'),(103,2,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 11:49:45'),(104,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:57:22'),(105,2,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-27 11:57:49'),(106,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 11:59:41'),(107,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 12:10:27'),(108,2,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 12:10:53'),(109,2,'spend',4200,'สมัครแพ็กเกจ ID: 4','2026-03-27 12:12:38'),(110,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 12:12:38'),(111,2,'spend',1000,'สมัครแพ็กเกจ ID: 2','2026-03-27 12:14:53'),(112,2,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 12:14:53'),(113,2,'spend',3500,'สมัครแพ็กเกจ ID: 3','2026-03-27 12:15:24'),(114,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 12:15:24'),(115,2,'spend',1000,'สมัครแพ็กเกจ ID: 2','2026-03-27 12:22:25'),(116,2,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 12:22:25'),(117,2,'spend',3500,'สมัครแพ็กเกจ ID: 3','2026-03-27 12:22:59'),(118,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 12:22:59'),(119,2,'earn',100,'รางวัลดูโฆษณาครบ 10 ครั้ง','2026-03-27 12:42:12'),(120,2,'earn',100,'รางวัลดูโฆษณาครบ 10 ครั้ง','2026-03-27 12:55:14'),(121,7,'earn',1,'วงล้อนำโชค','2026-03-27 14:12:31'),(122,7,'earn',15,'วงล้อนำโชค','2026-03-27 14:17:10'),(123,7,'earn',5,'daily_checkin','2026-03-27 15:07:09'),(124,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 15:08:28'),(125,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 15:08:34'),(126,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 15:08:42'),(127,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 15:08:49'),(128,7,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 15:09:40'),(129,7,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-27 15:09:48'),(130,2,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 15:10:00'),(131,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 15:10:07'),(132,7,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-27 15:11:40'),(133,2,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 18:52:13'),(134,2,'spend',4200,'สมัครแพ็กเกจ ID: 4','2026-03-27 18:52:23'),(135,2,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 18:52:23'),(136,2,'spend',1200,'แลกรางวัล: ชุด Movie Set (ครบเซต)','2026-03-27 18:52:43'),(137,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:11:31'),(138,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 20:11:39'),(139,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:11:42'),(140,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 20:11:52'),(141,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:12:07'),(142,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 20:12:11'),(143,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:12:14'),(144,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 20:12:28'),(145,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:12:40'),(146,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 20:12:43'),(147,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 20:12:51'),(148,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 22:26:49'),(149,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-27 22:46:51'),(150,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 22:50:08'),(151,6,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-27 22:51:08'),(152,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-27 22:58:16'),(153,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-28 07:12:49'),(154,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 07:12:54'),(155,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-28 07:18:42'),(156,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 07:20:03'),(157,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-28 07:20:21'),(158,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 07:21:05'),(159,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 07:38:18'),(160,7,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-28 07:40:25'),(161,7,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 07:40:31'),(162,6,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-28 10:59:37'),(163,6,'earn',5,'โบนัสจากแพ็กเกจ ID: 1','2026-03-28 10:59:47'),(164,6,'spend',3500,'สมัครแพ็กเกจ ID: 3','2026-03-28 11:28:44'),(165,6,'earn',24,'โบนัสจากแพ็กเกจ ID: 3','2026-03-28 11:28:44'),(166,6,'spend',4200,'สมัครแพ็กเกจ ID: 4','2026-03-28 11:29:07'),(167,6,'earn',29,'โบนัสจากแพ็กเกจ ID: 4','2026-03-28 11:29:07'),(168,6,'earn',7,'โบนัสจากแพ็กเกจ ID: 2','2026-03-28 11:29:20');
/*!40000 ALTER TABLE `coin_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `content_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `type` varchar(20) DEFAULT NULL,
  `release_year` int DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `is_premium` tinyint(1) DEFAULT '0',
  `is_pay_per_view` tinyint(1) DEFAULT '0',
  `ppv_price` decimal(10,2) DEFAULT NULL,
  `total_views` bigint DEFAULT '0',
  `status` enum('active','inactive','coming_soon') DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `poster_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1582771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (83533,'อวตาร: อัคนีและธุลีดิน','ท่ามกลางสงครามอันโหดร้ายกับ RDA และความโศกเศร้าจากการสูญเสียลูกชายคนโต เจค ซัลลี่ และ เนย์ทีรี จะต้องพบกับภัยคุกคามใหม่บนดาวแพนโดร่า เหล่าชาวนาวีเผ่าขี้เถ้าที่ป่าเถื่อนและกระหายในอำนาจ นำโดยหัวหน้าเผ่าผู้เหี้ยมโหดที่มีชื่อว่า วารัง ครอบครัวของ เจค จะต้องต่อสู้เพื่อเอาชีวิตรอดและเพื่ออนาคตของดาวแพนโดร่า ในความขัดแย้งที่จะผลักดันทุกคนไปยังขีดสุดของทั้งร่างกายและจิตใจ','movie',2025,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/lhyuZnCVIGOCXnJqYL0HMLPNOvt.jpg'),(680493,'เมืองห่าผี นครคืนชีพ','เมื่อจดหมายลึกลับชักชวนให้เขากลับไปยัง ไซเลนต์ ฮิลล์ เพื่อที่จะตามหาคนรักที่หายไป เจมส์ ก็ได้กลับมาพบเจอกับเมืองที่คุ้นเคย และเผชิญหน้ากับตัวตนอันน่าสยดสยองทั้งเก่าและใหม่ และเริ่มที่จะตั้งคำถามถึงสติสัมปชัญญะของตัวเอง','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/ocVWTfImJpCqlO52DxpQXgj3MQO.jpg'),(687163,'ภารกิจกู้สุริยะ','คุณครูวิชาวิทยาศาสตร์ ไรแลนด์ เกรซ ตื่นขึ้นมาบนยานอวกาศที่อยู่ห่างไกลจากโลกหลายล้านปีแสง โดยที่ไม่มีความทรงจำว่าเขาคือใคร หรือเขามาอยู่ที่นี่ได้อย่างไร ในขณะที่ความทรงจำของเขาเริ่มกลับคืนมา เขาก็เริ่มที่จะเข้าใจถึงภารกิจของเขา คือ การไขปริศนาของสารลึกลับบางอย่างที่กำลังทำให้ดวงอาทิตย์มอดดับลง เขาต้องใช้ความรู้ทางวิทยาศาสตร์ทั้งหมดที่เขามี และความคิดนอกขนบเพื่อที่จะช่วยเหลือทุกชีวิตบนโลกจากการสูญพันธุ์ แต่มิตรภาพที่คาดไม่ถึงที่เข้ามา ก็หมายความว่าเขาอาจจะไม่ต้องทำมันเพียงแค่คนเดียว','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/yihdXomYb5kTeSivtFndMy5iDmf.jpg'),(840464,'ฝ่าชะตา โลกาวินาศ','ครอบครัว การ์ริตี้ ที่รอดชีวิตมาได้ จะต้องเดินทางออกจากหลุมหลบภัยที่แสนจะปลอดภัยในกรีนแลนด์ และผจญการเดินทางอันแสนอันตราย ข้ามผ่านดินแดนเยือกแข็งที่แหลกสลายของยุโรป เพื่อค้นหาบ้านหลังใหม่','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/kscgi20X3SWi1VjH2SU2uN2hQac.jpg'),(875828,'พีกี้ ไบลน์เดอร์ส: ชายผู้เป็นอมตะ','หลังจากลูกชายผู้ห่างเหินเข้าไปพัวพันกับแผนการของนาซี ทอมมี่ เชลบี้ มาเฟียผู้เนรเทศตัวเอง จึงต้องกลับมาที่เบอร์มิงแฮม เพื่อช่วยครอบครัวและประเทศของเขา','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/gRMalasZEzsZi4w2VFuYusfSfqf.jpg'),(1084187,'หน้าสวย สังหาร','แอ็กชันระทึกขวัญสุดเข้มข้น เมื่อนักบัลเลต์ห้าคนที่ไปติดอยู่กลางป่าในพื้นที่ห่างไกลระหว่างเดินทางไปแข่งขันเต้น ต้องจำใจหลบภัยในโรงแรมข้างทางชวนขนลุกที่บริหารโดยเดโวร่า คาสิเมอร์ และต้องแปรเปลี่ยนการฝึกฝนระดับตัวท็อปให้กลายเป็นอาวุธเพื่อเอาชีวิตรอด','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/mBPybixgdy3uL50y7PyEzkpr0iv.jpg'),(1084242,'นครสัตว์มหาสนุก 2','จูดี้ ฮอปส์ ตำรวจกระต่ายกระต่ายผู้กล้าหาญ กลับมาร่วมทีมกับ นิค เพื่อนสุนัขจิ้กจอกของเขาอีกครั้งเพื่อไขปริศนาคดีใหม่ ซึ่งเป็นคดีที่อันตรายและซับซ้อนที่สุดเท่าที่ทั้งสองเคยพบเจอมา','movie',2025,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/mrVGD3Mrlwd4vvRhlzmkpLvFtjd.jpg'),(1159559,'หวีดสุดขีด 7','เมื่อฆาตกรโกสต์เฟสคนใหม่ปรากฏตัวขึ้นในเมืองที่ ซิดนีย์ เพรสคอตต์ ได้สร้างชีวิตใหม่ของเธอเอาไว้ ความกลัวในห่วงลึกที่สุดของเธอ ก็คือการที่เธอได้รู้ว่าลูกสาวของเธอกลายมาเป็นเป้าหมายรายต่อไป','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/c3hz0WrOdb5EhoWha8TCPfkpMYm.jpg'),(1171145,'เส้นทางปล้นโคตรระห่ำ','เรื่องราวของนักสืบ ลู ลูเบสนิก ที่กำลังตามรอยโจรขโมยเพชรคนหนึ่งที่ยึดมั่นในกฎ Crime 101 ซึ่งเป็นแนวทางปฏิบัติเคร่งครัดสำหรับการปล้นที่ไร้ที่ติ','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/vFFrG27mjg0qXy2RaKp4a5US8kx.jpg'),(1193501,'หวีดเรียกผี','กลุ่มนักเรียนมัธยมที่ดูไม่เข้าพวก บังเอิญไปพบวัตถุต้องคำสาปอย่าง “นกหวีดมรณะแอซเท็ก” โบราณ พวกเขาค้นพบว่า ทุกครั้งที่เป่านกหวีด เสียงสยองนั้นจะปลุก “ความตายในอนาคต” ให้ตามล่าและเอาชีวิตพวกเขาทีละคน','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/fp54NJExgoZRkMPYpuATKJCeFDw.jpg'),(1198994,'โปรดส่งใครมาช่วยฉันที','สองเพื่อนร่วมงานต้องมาติดอยู่บนเกาะที่ถูกทิ้งร้าง หลังจากที่รอดชีวิตจากเหตุการณ์เครื่องบินตกมาได้ บนเกาะแห่งนี้ ทั้งสองต้องก้าวข้ามผ่านความขุ่นเคืองในอดีตและร่วมมือกันเพื่อเอาชีวิตรอด','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/wuam6tpNwlsWuHbGGZejuSVM2X4.jpg'),(1236153,'90 นาทีสั่งตาย','ในโลกอนาคตอันใกล้ที่อาชญากรรมร้ายแรงพุ่งสูงขึ้น นักสืบคนหนึ่งได้ถูกกล่าวหาว่าได้กระทำอาชญากรรมความรุนแรง และถูกบีบให้ต้องพิสูจน์ความบริสุทธิ์ของตัวเอง','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/szPNJ4RMYP64I3qruO1TBvjW5q0.jpg'),(1265609,'สงครามจักรกลถล่มโลก','ในภารกิจสุดโหดครั้งสุดท้ายระหว่างการฝึกของหน่วยเรนเจอร์ ทหารช่างนายหนึ่งต้องนำหน่วยของเขาต่อสู้กับเครื่องจักรสังหารขนาดยักษ์จากต่างดาว','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/tlPgDzwIE7VYYIIAGCTUOnN4wI1.jpg'),(1290821,'คลั่งนรก หลบตาย','เมสัน คือชายผู้ใช้ชีวิตอย่างสันโดษบนเกาะแห่งหนึ่ง ในตอนที่เขาเลือกที่จะช่วยชีวิตเด็กหญิงหนึ่งจากการจมนํ้าในพายุที่โหมกระหน่ำ เขาก็ได้จุดชนวนให้เหตุการณ์หลายอย่างเกิดขึ้นตามมา ซึ่งจะนำเอาความรุนแรงมาสู่เขา และบีบบังคับให้เขาต้องเผชิญหน้ากับตัวเลือกจากอดีตของเขา','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/tpMafEgJ53zroHCZUF3sy62HQXa.jpg'),(1297842,'คุณแพะหัวใจไม่แพ้','วิลล์เป็นแพะตัวน้อยที่มีความฝันอันยิ่งใหญ่ และได้รับโอกาสเพียงครั้งเดียวในชีวิตให้เข้าร่วมกับนักกีฬามืออาชีพและเล่นกีฬารูกีบอล กีฬาเข้มข้นพลังสูง แบบผสม และปะทะเต็มรูปแบบ ซึ่งถูกครอบงำโดยสัตว์ที่รวดเร็วและดุร้ายที่สุดในโลก เพื่อนร่วมทีมใหม่ของวิลล์ไม่ค่อยตื่นเต้นกับการมีแพะตัวเล็กอยู่ในทีม แต่วิลล์มุ่งมั่นที่จะปฏิวัติกีฬาและพิสูจน์ให้เห็นครั้งแล้วครั้งเล่าว่า “ตัวเล็กก็เล่นได้!”','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/wfuqMlaExcoYiUEvKfVpUTt1v4u.jpg'),(1316092,'“วัทเตอริ่ง ไฮต์ส”','เรื่องราวของความรักที่เต็มไปด้วยความรุ่มร้อนและวุ่นวาย ท่ามกลางฉากหลังของ ยอร์กมัวร์ส สำรวจความสัมพันธ์อันเข้มข้นและแสนอันตรายระหว่าง ฮีธคลิฟฟ์ และ แคทเธอรีน เอิร์นชอว์','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/6A2BCavqxvb6osj5kN9TIFmfDcP.jpg'),(1327819,'เด้งโดด เปลี่ยนโหมดเป็นบีเวอร์','หญิงสาวผู้โปรดปรานเหล่าสรรพสัตว์ที่มีชื่อว่า มาเบล ได้ใช้เทคโนโลยีใหม่ที่ออกแบบมาเพื่อนำเอาจิตใต้สำนึกของมนุษย์ ใส่ลงไปในหุ่นยนต์สัตว์เสมือนจริง เพื่อที่จะสื่อสารกับเหล่าบีเวอร์ และเปิดเผยให้เห็นถึงปริศนาภายในโลกของสรรพสัตว์ที่เหนือไปกว่าที่สิ่งเธอเคยจินตนาการเอาไว้','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/j3gjgNxJrtrON3xFZWuUF3NAKl1.jpg'),(1381216,'Lake Jesup: Bonecrusher\'s Revenge','','movie',2024,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/1Z1TgGXS1MD4DDfIkBNloM43vvj.jpg'),(1523145,'Твое сердце будет разбито','','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/iGpMm603GUKH2SiXB2S5m4sZ17t.jpg'),(1582770,'धुरंधर: द रिवेंज','','movie',2026,NULL,0,0,NULL,0,'active','2026-03-28 03:23:58','/6kD8pH9Rny649B8hSKOs50Qwdag.jpg');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_genre`
--

DROP TABLE IF EXISTS `content_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_genre` (
  `content_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`content_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `content_genre_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE,
  CONSTRAINT `content_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_genre`
--

LOCK TABLES `content_genre` WRITE;
/*!40000 ALTER TABLE `content_genre` DISABLE KEYS */;
INSERT INTO `content_genre` VALUES (83533,12),(687163,12),(840464,12),(1084242,12),(1327819,12),(1381216,12),(83533,14),(1084242,16),(1297842,16),(1327819,16),(680493,18),(875828,18),(1316092,18),(1523145,18),(1634301,18),(680493,27),(1084187,27),(1159559,27),(1193501,27),(1198994,27),(1381216,27),(1084187,28),(1236153,28),(1265609,28),(1290821,28),(1634301,28),(1084242,35),(1198994,35),(1297842,35),(1327819,35),(1381216,35),(840464,53),(1084187,53),(1171145,53),(1198994,53),(1236153,53),(1265609,53),(1290821,53),(875828,80),(1159559,80),(1171145,80),(1290821,80),(83533,878),(687163,878),(840464,878),(1236153,878),(1265609,878),(1327819,878),(680493,9648),(1084242,9648),(1159559,9648),(1193501,9648),(1316092,10749),(1523145,10749),(1084242,10751),(1297842,10751),(1327819,10751);
/*!40000 ALTER TABLE `content_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_rental`
--

DROP TABLE IF EXISTS `content_rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_rental` (
  `content_rental_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content_id` int NOT NULL,
  `rental_start` datetime DEFAULT NULL,
  `rental_end` datetime DEFAULT NULL,
  `status` enum('active','expired','used') DEFAULT 'active',
  PRIMARY KEY (`content_rental_id`),
  KEY `user_id` (`user_id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `content_rental_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `content_rental_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_rental`
--

LOCK TABLES `content_rental` WRITE;
/*!40000 ALTER TABLE `content_rental` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episode`
--

DROP TABLE IF EXISTS `episode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episode` (
  `episode_id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `season_id` int DEFAULT NULL,
  `episode_number` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `is_free_trial` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`episode_id`),
  KEY `content_id` (`content_id`),
  KEY `season_id` (`season_id`),
  CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE,
  CONSTRAINT `episode_ibfk_2` FOREIGN KEY (`season_id`) REFERENCES `season` (`season_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episode`
--

LOCK TABLES `episode` WRITE;
/*!40000 ALTER TABLE `episode` DISABLE KEYS */;
INSERT INTO `episode` VALUES (4,83533,1,1,'อวตาร: 1','https://www.youtube.com/embed/DzA3W91Ps48',NULL,1),(6,83533,2,2,'อวตาร: 2','https://www.youtube.com/embed/FLy75_6rC6o',NULL,1),(7,83533,3,3,'อวตาร: 3','https://www.youtube.com/embed/FenvCSTsyB8',NULL,1),(11,687163,4,1,'ภารกิจกู้สุริยะ','https://www.youtube.com/embed/Up_JGrLpRuQ',NULL,1),(12,83533,1,1,'อวตาร: 1','https://www.youtube.com/embed/DzA3W91Ps48',NULL,1),(13,83533,2,2,'อวตาร: 2','https://www.youtube.com/embed/FLy75_6rC6o',NULL,1),(14,83533,3,3,'อวตาร: 3','https://www.youtube.com/embed/FenvCSTsyB8',NULL,1),(15,687163,4,1,'ภารกิจกู้สุริยะ','https://www.youtube.com/embed/Up_JGrLpRuQ',NULL,1),(16,1290821,5,1,'คลั่งนรก หลบตาย','https://www.youtube.com/embed/wquK-rB0aLk',NULL,1),(17,1159559,6,1,'หวีดสุดขีด: ss1','https://www.youtube.com/embed/videoseries?list=PL1105CE4FE3BD6D6F',NULL,1),(18,1159559,7,2,'หวีดสุดขีด: ss2','https://www.youtube.com/embed/videoseries?list=PLPLyfs2YmGkemKUhYWSa-GZxl4KZa5zXJ',NULL,1),(19,1159559,8,3,'หวีดสุดขีด: ss3','https://www.youtube.com/embed/videoseries?list=PL5C6E7089CF859A08',NULL,1),(20,1159559,9,4,'หวีดสุดขีด: ss4','https://www.youtube.com/embed/videoseries?list=PLZbXA4lyCtqqPqKvYLGeMc47NsG8uLeeN',NULL,1),(21,1159559,10,5,'หวีดสุดขีด: ss5','https://www.youtube.com/embed/KQYZ1aFlUe4',NULL,1),(22,1159559,11,6,'หวีดสุดขีด: ss6','https://www.youtube.com/embed/videoseries?list=PLb1CIEJZAF3owMt187bySnsjzyxKL_F6X',NULL,1),(23,1159559,12,7,'หวีดสุดขีด: ss7','https://www.youtube.com/embed/vJMHvurq05o',NULL,1),(24,1171145,13,1,'เส้นทางปล้นโคตรระห่ำ','https://www.youtube.com/embed/2AWS8OhDKyE',NULL,1),(25,1265609,14,1,'สงครามจักรกลถล่มโลก','https://www.youtube.com/embed/ST1y48D-4rU',NULL,1),(26,1523145,15,1,'Твое сердце будет разбито','https://www.youtube.com/embed/xWJU4g24jxo',NULL,1),(27,840464,16,1,'ฝ่าชะตา โลกาวินาศ: 1','https://www.youtube.com/embed/jnGq0AUn5uo',NULL,1),(28,840464,17,2,'ฝ่าชะตา โลกาวินาศ: 2','https://www.youtube.com/embed/QD77ABqlZAA',NULL,1),(29,1198994,18,1,'โปรดส่งใครมาช่วยฉันที','https://www.youtube.com/embed/Jfm-Ky7tA8M',NULL,1),(30,1084242,19,1,'นครสัตว์มหาสนุก: 1','https://www.youtube.com/embed/vskmIRAeebA',NULL,1),(31,1084242,20,2,'นครสัตว์มหาสนุก: 2','https://www.youtube.com/embed/ZVruKquqryw',NULL,1),(32,1193501,21,1,'หวีดเรียกผี','https://www.youtube.com/embed/eDESvwUcTp8',NULL,1),(33,1381216,22,1,'Lake Jesup: Bonecrusher\'s Revenge','https://www.youtube.com/embed/rgn4RuDNri4',NULL,1),(34,1316092,23,1,'“วัทเตอริ่ง ไฮต์ส”','https://www.youtube.com/embed/fUostAxj1EA',NULL,1),(35,680493,24,1,'เมืองห่าผี นครคืนชีพ: 1','https://www.youtube.com/embed/yeiLzqemC7Q',NULL,1),(36,680493,25,2,'เมืองห่าผี นครคืนชีพ: 2','https://www.youtube.com/embed/n63Olw2uOzY',NULL,1),(37,680493,26,3,'เมืองห่าผี นครคืนชีพ: 3','https://www.youtube.com/embed/n4ZfhMKssys',NULL,1),(38,1582770,27,1,'धুরंधर: द रिवेंज','https://www.youtube.com/embed/FDj-zrPmqTs',NULL,1),(39,1236153,28,1,'90 นาทีสั่งตาย','https://www.youtube.com/embed/fbuQT7MSM04',NULL,1),(40,1327819,29,1,'เด้งโดด เปลี่ยนโหมดเป็นบีเวอร์','https://www.youtube.com/embed/BCWCA-ed5iQ',NULL,1);
/*!40000 ALTER TABLE `episode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (10763,'ข่าว'),(10751,'ครอบครัว'),(10765,'จิตนิมิตแนววิทยาศาสตร์'),(14,'จินตนาการ'),(10402,'ดนตรี'),(35,'ตลก'),(878,'นิยายวิทยาศาสตร์'),(10767,'บทสนทนา'),(28,'บู๊'),(10759,'บู๊, ผจญภัย'),(36,'ประวัติศาสตร์'),(12,'ผจญ'),(10770,'ภาพยนตร์โทรทัศน์'),(53,'ระทึกขวัญ'),(10766,'ละคร'),(9648,'ลึกลับ'),(10752,'สงคราม'),(10768,'สงครามและการเมือง'),(27,'สยองขวัญ'),(99,'สารคดี'),(10762,'สำหรับเด็ก'),(37,'หนังคาวบอยตะวันตก'),(18,'หนังชีวิต'),(10749,'หนังรักโรแมนติก'),(80,'อาชญากรรม'),(10764,'เรียลลิตี้'),(16,'แอนนิเมชั่น');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level_privilege_map`
--

DROP TABLE IF EXISTS `level_privilege_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level_privilege_map` (
  `map_id` int NOT NULL AUTO_INCREMENT,
  `level_id` int DEFAULT NULL,
  `privilege_id` int DEFAULT NULL,
  `limit_per_user` int DEFAULT '1',
  PRIMARY KEY (`map_id`),
  KEY `fk_map_to_level` (`level_id`),
  KEY `fk_map_to_privilege` (`privilege_id`),
  CONSTRAINT `fk_map_to_level` FOREIGN KEY (`level_id`) REFERENCES `member_level` (`member_level_id`),
  CONSTRAINT `fk_map_to_privilege` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`privilege_id`),
  CONSTRAINT `level_privilege_map_ibfk_1` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`privilege_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level_privilege_map`
--

LOCK TABLES `level_privilege_map` WRITE;
/*!40000 ALTER TABLE `level_privilege_map` DISABLE KEYS */;
INSERT INTO `level_privilege_map` VALUES (2,3,1,1),(3,3,3,1),(4,4,1,1),(5,4,4,1),(6,2,1,1),(7,2,2,1);
/*!40000 ALTER TABLE `level_privilege_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_level`
--

DROP TABLE IF EXISTS `member_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_level` (
  `member_level_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` enum('welcome','silver','gold','platinum') NOT NULL,
  `min_spending` decimal(12,2) DEFAULT NULL,
  `min_months` int DEFAULT NULL,
  PRIMARY KEY (`member_level_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_level`
--

LOCK TABLES `member_level` WRITE;
/*!40000 ALTER TABLE `member_level` DISABLE KEYS */;
INSERT INTO `member_level` VALUES (1,'welcome','welcome',0.00,0),(2,'silver','silver',3449.00,6),(3,'gold','gold',5099.00,12),(4,'platinum','platinum',6399.00,24);
/*!40000 ALTER TABLE `member_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `mission_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('once','daily','special','weekly') NOT NULL,
  `coin_reward` int NOT NULL,
  `required_count` int DEFAULT '1',
  PRIMARY KEY (`mission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
INSERT INTO `mission` VALUES (1,'ลงทะเบียนสมาชิก','once',200,1),(2,'ล็อคอินทุกวัน','daily',5,1),(3,'ล็อคอินต่อเนื่อง 7 วัน','special',20,7),(4,'ดูโฆษณา 10 คลิป','daily',50,10),(5,'สุ่มวงล้อ','daily',100,1),(6,'มินิเกม','daily',15,3);
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_progress`
--

DROP TABLE IF EXISTS `mission_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_progress` (
  `mission_progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `mission_id` int NOT NULL,
  `current_progress` int DEFAULT '0',
  `required_count` int DEFAULT '10',
  `status` varchar(20) DEFAULT 'pending',
  PRIMARY KEY (`mission_progress_id`),
  KEY `user_id` (`user_id`),
  KEY `mission_id` (`mission_id`),
  CONSTRAINT `mission_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `mission_progress_ibfk_2` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`mission_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_progress`
--

LOCK TABLES `mission_progress` WRITE;
/*!40000 ALTER TABLE `mission_progress` DISABLE KEYS */;
INSERT INTO `mission_progress` VALUES (6,5,1,1,10,'2'),(7,5,1,1,10,'2'),(8,5,1,1,10,'2'),(9,5,1,1,10,'2'),(10,5,1,1,10,'2'),(11,5,1,1,10,'2'),(12,5,1,1,10,'2'),(13,5,1,1,10,'2'),(14,5,1,1,10,'2'),(15,5,1,1,10,'2'),(16,5,1,1,10,'2'),(17,5,1,1,10,'2'),(18,5,1,1,10,'2'),(19,5,1,1,10,'2'),(20,5,1,1,10,'2'),(21,5,1,1,10,'2'),(22,5,1,1,10,'2'),(23,6,2,1,10,'2'),(24,6,1,1,10,'2'),(25,6,1,1,10,'2'),(26,7,2,1,10,'2'),(27,2,4,0,10,'2'),(28,2,6,10,10,'2'),(29,7,1,1,10,'2'),(30,7,1,1,10,'2'),(31,7,4,3,10,'in_progress'),(32,8,2,1,10,'2');
/*!40000 ALTER TABLE `mission_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `package_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `code` enum('beginner','mobile','basic','standard','premium') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_days` int NOT NULL,
  `max_profiles` int DEFAULT NULL,
  `max_devices` int DEFAULT NULL,
  `video_quality` enum('480p','720p','1080p','4K') DEFAULT NULL,
  `has_ads` tinyint(1) DEFAULT '0',
  `can_download` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`package_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Beginner','beginner',69.00,7,1,1,'480p',0,1),(2,'Mobile','mobile',99.00,30,1,1,'480p',0,1),(3,'Basic','basic',169.00,30,1,1,'720p',0,1),(4,'Standard','standard',349.00,30,2,2,'1080p',0,1),(5,'Premium','premium',419.00,30,4,4,'4K',0,1);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,2,'CASH',349.00,'completed','2026-03-26 13:26:19'),(2,2,'COIN',700.00,'completed','2026-03-26 13:26:29'),(3,2,'CASH',349.00,'completed','2026-03-26 13:36:45'),(4,2,'CASH',349.00,'completed','2026-03-26 13:37:04'),(5,2,'COIN',4200.00,'completed','2026-03-26 13:37:09'),(6,2,'CASH',419.00,'completed','2026-03-26 13:38:05'),(7,2,'COIN',1000.00,'completed','2026-03-26 13:38:33'),(8,2,'CASH',419.00,'completed','2026-03-26 13:39:19'),(9,2,'CASH',349.00,'completed','2026-03-26 13:39:33'),(10,2,'CASH',99.00,'completed','2026-03-27 02:27:08'),(11,2,'COIN',1000.00,'completed','2026-03-27 03:48:39'),(12,2,'CASH',349.00,'completed','2026-03-27 04:06:51'),(13,2,'CASH',349.00,'completed','2026-03-27 04:06:55'),(14,2,'COIN',700.00,'completed','2026-03-27 04:07:04'),(15,2,'COIN',700.00,'completed','2026-03-27 04:07:09'),(16,5,'CASH',99.00,'completed','2026-03-27 06:44:41'),(17,5,'CASH',349.00,'completed','2026-03-27 06:45:07'),(18,2,'CASH',419.00,'completed','2026-03-27 06:45:45'),(19,2,'CASH',349.00,'completed','2026-03-27 07:44:42'),(20,2,'COIN',700.00,'completed','2026-03-27 07:45:00'),(21,5,'CASH',419.00,'completed','2026-03-27 08:03:22'),(22,5,'CASH',419.00,'completed','2026-03-27 08:03:26'),(23,5,'CASH',419.00,'completed','2026-03-27 08:03:39'),(24,5,'CASH',419.00,'completed','2026-03-27 08:03:42'),(25,5,'CASH',419.00,'completed','2026-03-27 08:03:46'),(26,5,'CASH',419.00,'completed','2026-03-27 08:03:50'),(27,5,'CASH',419.00,'completed','2026-03-27 08:03:53'),(28,5,'CASH',419.00,'completed','2026-03-27 08:04:00'),(29,5,'CASH',349.00,'completed','2026-03-27 08:09:01'),(30,5,'CASH',349.00,'completed','2026-03-27 08:09:05'),(31,5,'CASH',419.00,'completed','2026-03-27 08:09:08'),(32,5,'CASH',419.00,'completed','2026-03-27 08:09:11'),(33,5,'CASH',349.00,'completed','2026-03-27 08:09:56'),(34,5,'CASH',349.00,'completed','2026-03-27 08:09:59'),(35,5,'CASH',349.00,'completed','2026-03-27 08:10:03'),(36,5,'CASH',349.00,'completed','2026-03-27 08:10:17'),(84,5,'CASH',99.00,'completed','2026-03-27 09:29:34'),(85,5,'CASH',419.00,'completed','2026-03-27 09:29:38'),(86,5,'CASH',99.00,'completed','2026-03-27 09:32:50'),(87,5,'CASH',419.00,'completed','2026-03-27 09:34:24'),(88,5,'COIN',3500.00,'completed','2026-03-27 09:37:56'),(89,5,'COIN',700.00,'completed','2026-03-27 09:38:03'),(90,5,'CASH',349.00,'completed','2026-03-27 09:38:14'),(91,5,'CASH',99.00,'completed','2026-03-27 09:41:20'),(92,5,'CASH',419.00,'completed','2026-03-27 09:41:25'),(93,5,'CASH',69.00,'completed','2026-03-27 09:41:33'),(94,2,'CASH',419.00,'completed','2026-03-27 09:42:31'),(95,2,'CASH',349.00,'completed','2026-03-27 09:42:39'),(96,6,'CASH',349.00,'completed','2026-03-27 11:23:41'),(97,6,'CASH',419.00,'completed','2026-03-27 11:23:55'),(98,6,'CASH',69.00,'completed','2026-03-27 11:28:30'),(99,6,'CASH',419.00,'completed','2026-03-27 11:28:46'),(100,6,'CASH',349.00,'completed','2026-03-27 11:29:57'),(101,6,'CASH',419.00,'completed','2026-03-27 11:33:53'),(102,6,'CASH',349.00,'completed','2026-03-27 11:42:10'),(103,6,'CASH',99.00,'completed','2026-03-27 11:46:25'),(104,2,'CASH',419.00,'completed','2026-03-27 11:47:12'),(105,2,'CASH',349.00,'completed','2026-03-27 11:47:31'),(106,2,'CASH',419.00,'completed','2026-03-27 11:47:41'),(107,2,'CASH',349.00,'completed','2026-03-27 11:47:54'),(108,2,'CASH',99.00,'completed','2026-03-27 11:49:45'),(109,2,'CASH',349.00,'completed','2026-03-27 11:57:22'),(110,2,'CASH',69.00,'completed','2026-03-27 11:57:49'),(111,7,'CASH',349.00,'completed','2026-03-27 11:59:41'),(112,7,'CASH',419.00,'completed','2026-03-27 12:10:27'),(113,2,'CASH',99.00,'completed','2026-03-27 12:10:53'),(114,2,'COIN',4200.00,'completed','2026-03-27 12:12:38'),(115,2,'COIN',1000.00,'completed','2026-03-27 12:14:53'),(116,2,'COIN',3500.00,'completed','2026-03-27 12:15:24'),(117,2,'COIN',1000.00,'completed','2026-03-27 12:22:25'),(118,2,'COIN',3500.00,'completed','2026-03-27 12:22:59'),(119,7,'CASH',349.00,'completed','2026-03-27 15:08:28'),(120,7,'CASH',419.00,'completed','2026-03-27 15:08:34'),(121,7,'CASH',349.00,'completed','2026-03-27 15:08:42'),(122,7,'CASH',419.00,'completed','2026-03-27 15:08:49'),(123,7,'CASH',99.00,'completed','2026-03-27 15:09:40'),(124,7,'CASH',69.00,'completed','2026-03-27 15:09:48'),(125,2,'CASH',99.00,'completed','2026-03-27 15:10:00'),(126,2,'CASH',419.00,'completed','2026-03-27 15:10:07'),(127,7,'CASH',99.00,'completed','2026-03-27 15:11:40'),(128,2,'CASH',349.00,'completed','2026-03-27 18:52:13'),(129,2,'COIN',4200.00,'completed','2026-03-27 18:52:23'),(130,7,'CASH',419.00,'completed','2026-03-27 20:11:31'),(131,7,'CASH',349.00,'completed','2026-03-27 20:11:39'),(132,7,'CASH',419.00,'completed','2026-03-27 20:11:42'),(133,7,'CASH',349.00,'completed','2026-03-27 20:11:52'),(134,7,'CASH',419.00,'completed','2026-03-27 20:12:07'),(135,7,'CASH',349.00,'completed','2026-03-27 20:12:11'),(136,7,'CASH',419.00,'completed','2026-03-27 20:12:14'),(137,7,'CASH',349.00,'completed','2026-03-27 20:12:28'),(138,7,'CASH',419.00,'completed','2026-03-27 20:12:40'),(139,7,'CASH',349.00,'completed','2026-03-27 20:12:43'),(140,7,'CASH',419.00,'completed','2026-03-27 20:12:51'),(141,6,'CASH',349.00,'completed','2026-03-27 22:26:49'),(142,6,'CASH',419.00,'completed','2026-03-27 22:46:51'),(143,6,'CASH',349.00,'completed','2026-03-27 22:50:08'),(144,6,'CASH',69.00,'completed','2026-03-27 22:51:08'),(145,6,'CASH',349.00,'completed','2026-03-27 22:58:16'),(146,6,'CASH',419.00,'completed','2026-03-28 07:12:49'),(147,6,'CASH',349.00,'completed','2026-03-28 07:12:54'),(148,6,'CASH',419.00,'completed','2026-03-28 07:18:42'),(149,6,'CASH',349.00,'completed','2026-03-28 07:20:03'),(150,6,'CASH',419.00,'completed','2026-03-28 07:20:21'),(151,6,'CASH',349.00,'completed','2026-03-28 07:21:05'),(152,7,'CASH',349.00,'completed','2026-03-28 07:38:18'),(153,7,'CASH',419.00,'completed','2026-03-28 07:40:25'),(154,7,'CASH',349.00,'completed','2026-03-28 07:40:31'),(155,6,'CASH',99.00,'completed','2026-03-28 10:59:37'),(156,6,'CASH',69.00,'completed','2026-03-28 10:59:47'),(157,6,'COIN',3500.00,'completed','2026-03-28 11:28:44'),(158,6,'COIN',4200.00,'completed','2026-03-28 11:29:07'),(159,6,'CASH',99.00,'completed','2026-03-28 11:29:20');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privileges`
--

DROP TABLE IF EXISTS `privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privileges` (
  `privilege_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `partner_name` varchar(100) DEFAULT NULL,
  `description` text,
  `coin_cost` int DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `total_qty` int DEFAULT '0',
  `remained_qty` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`privilege_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privileges`
--

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;
INSERT INTO `privileges` VALUES (1,'ฟรี! แดรี่ควีน 1 โคน','Dairy Queen','สมาชิกรับฟรีไอศกรีม 1 โคน',0,'https://cdn-icons-png.flaticon.com/512/938/938189.png',100,84,'2026-03-26 22:08:06'),(2,'ส่วนลดตั๋วหนัง เมเจอร์ 1 ที่นั่ง','Major Cineplex','ใช้เหรียญแลกส่วนลด (จำกัด 15 สิทธิ์)',50,'https://cdn-icons-png.flaticon.com/512/4221/4221419.png',15,6,'2026-03-26 22:08:06'),(3,'ตั๋วหนัง เมเจอร์ 1 ที่นั่ง','Major Cineplex','ใช้เหรียญแลกตั๋วฟรี (จำกัด 10 สิทธิ์)',500,'https://cdn-icons-png.flaticon.com/512/4221/4221419.png',10,10,'2026-03-26 22:08:06'),(4,'ชุด Movie Set (ครบเซต)','Major Cineplex','ตั๋วหนัง+ป๊อปคอร์น+น้ำ (จำกัด 5 สิทธิ์)',1200,'https://cdn-icons-png.flaticon.com/512/2619/2619246.png',5,4,'2026-03-26 22:08:06');
/*!40000 ALTER TABLE `privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `is_kids` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `review_text` text,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE,
  CONSTRAINT `review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season` (
  `season_id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `season_number` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`season_id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `season_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season`
--

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` VALUES (1,83533,1,'อวตาร: อัคนีและธุลีดิน - Season 1'),(2,83533,2,'อวตาร: อัคนีและธุลีดิน - Season 2'),(3,83533,3,'อวตาร: อัคนีและธุลีดิน - Season 3'),(4,687163,1,'ภารกิจกู้สุริยะ'),(5,1290821,1,'คลั่งนรก หลบตายะ'),(6,1159559,1,'หวีดสุดขีด:ss1'),(7,1159559,2,'หวีดสุดขีด:ss2'),(8,1159559,3,'หวีดสุดขีด:ss3'),(9,1159559,4,'หวีดสุดขีด:ss4'),(10,1159559,5,'หวีดสุดขีด:ss5'),(11,1159559,6,'หวีดสุดขีด:ss6'),(12,1159559,7,'หวีดสุดขีด:ss7'),(13,1171145,1,'เส้นทางปล้นโคตรระห่ำ\n'),(14,1265609,1,'สงครามจักรกลถล่มโลก'),(15,1523145,1,'Твое сердце будет разбито'),(16,840464,1,'ฝ่าชะตา โลกาวินาศ:1'),(17,840464,2,'ฝ่าชะตา โลกาวินาศ:2'),(18,1198994,1,'โปรดส่งใครมาช่วยฉันที'),(19,1084242,1,'นครสัตว์มหาสนุก: 1'),(20,1084242,2,'นครสัตว์มหาสนุก: 2'),(21,1193501,1,'หวีดเรียกผี'),(22,1381216,1,'Lake Jesup: Bonecrusher\'s Revenge'),(23,1316092,1,'“วัทเตอริ่ง ไฮต์ส”'),(24,680493,1,'เมืองห่าผี นครคืนชีพ:1'),(25,680493,2,'เมืองห่าผี นครคืนชีพ:2'),(26,680493,3,'เมืองห่าผี นครคืนชีพ:3'),(27,1582770,1,'धुरंधर: द रिवेंज'),(28,1236153,1,'90 นาทีสั่งตาย'),(29,1327819,1,'เด้งโดด เปลี่ยนโหมดเป็นบีเวอร์');
/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','expired','cancelled') DEFAULT 'active',
  `auto_renew` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`subscription_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `subscription_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `subscription_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `package` (`package_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (74,5,1,'2026-03-27','2026-04-26','active',1),(76,2,4,'2026-03-27','2026-04-26','active',1),(99,6,2,'2026-03-28','2026-04-27','active',1),(114,7,3,'2026-03-28','2026-04-27','active',1);
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_member`
--

DROP TABLE IF EXISTS `user_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_member` (
  `user_member_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `member_level_id` int NOT NULL,
  `total_spending` decimal(12,2) DEFAULT '0.00',
  `coin_balance` bigint DEFAULT '0',
  PRIMARY KEY (`user_member_id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `member_level_id` (`member_level_id`),
  CONSTRAINT `user_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_member_ibfk_2` FOREIGN KEY (`member_level_id`) REFERENCES `member_level` (`member_level_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_member`
--

LOCK TABLES `user_member` WRITE;
/*!40000 ALTER TABLE `user_member` DISABLE KEYS */;
INSERT INTO `user_member` VALUES (1,2,1,22634.00,9767),(14,5,1,6732.00,NULL),(58,7,1,7598.00,7179),(59,8,1,0.00,0),(60,6,1,10620.00,10692);
/*!40000 ALTER TABLE `user_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_redemptions`
--

DROP TABLE IF EXISTS `user_redemptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_redemptions` (
  `redemption_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `privilege_id` int DEFAULT NULL,
  `redeemed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','used','expired') DEFAULT 'active',
  PRIMARY KEY (`redemption_id`),
  KEY `user_id` (`user_id`),
  KEY `privilege_id` (`privilege_id`),
  CONSTRAINT `user_redemptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_redemptions_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`privilege_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_redemptions`
--

LOCK TABLES `user_redemptions` WRITE;
/*!40000 ALTER TABLE `user_redemptions` DISABLE KEYS */;
INSERT INTO `user_redemptions` VALUES (3,2,2,'2026-03-26 22:42:18','used'),(4,2,1,'2026-03-26 22:42:21','used'),(5,2,1,'2026-03-26 22:42:29','used'),(6,2,2,'2026-03-26 22:42:32','used'),(7,2,1,'2026-03-26 22:42:38','used'),(8,2,2,'2026-03-26 22:42:41','used'),(9,2,1,'2026-03-26 22:42:46','used'),(10,2,1,'2026-03-26 22:43:09','used'),(11,2,1,'2026-03-26 22:43:19','used'),(12,2,1,'2026-03-26 22:43:39','used'),(13,2,1,'2026-03-26 22:45:05','used'),(14,2,1,'2026-03-26 22:48:51','used'),(15,2,2,'2026-03-26 22:52:56','used'),(16,2,2,'2026-03-26 22:52:59','used'),(17,2,2,'2026-03-26 22:53:27','used'),(18,2,2,'2026-03-26 22:53:31','used'),(19,2,2,'2026-03-26 22:54:53','used'),(20,2,1,'2026-03-26 23:14:01','used'),(21,2,1,'2026-03-27 00:55:33','used'),(22,2,1,'2026-03-27 00:55:39','used'),(23,2,1,'2026-03-27 00:55:48','used'),(24,2,2,'2026-03-27 00:55:52','used'),(25,2,1,'2026-03-27 00:56:03','used'),(26,2,1,'2026-03-27 00:56:53','used'),(27,5,1,'2026-03-27 02:42:52','used'),(28,2,4,'2026-03-27 11:52:43','used');
/*!40000 ALTER TABLE `user_redemptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coin_balance` int NOT NULL DEFAULT '0',
  `member_level_id` int DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_member_level` (`member_level_id`),
  CONSTRAINT `fk_user_member_level` FOREIGN KEY (`member_level_id`) REFERENCES `member_level` (`member_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Somchai','Jaidee','somchai@email.com','$2b$10$BUhOsbBlPXqUd3nGOj5z5u5cARUXTCGJjgmF9A23GLpXpeF4Q7/3W','user',1,'2026-02-17 14:58:55','2026-02-17 14:58:55',0,1),(2,'ห','ฟห','0655417719@kmitl.ac.th','Nm_12345','user',1,'2026-03-25 14:18:15','2026-03-27 14:49:41',95896,1),(5,'kanokon','dokkaew','67050007@kmirtl.ac.th','Kanokon44.','user',1,'2026-03-26 03:25:12','2026-03-27 14:49:41',1399,1),(6,'thavakorn','tyy8','67089@kmitl.ac.th','Nm_1234j','user',1,'2026-03-27 04:21:05','2026-03-28 04:29:20',4654,1),(7,'หหฟห','กห','000000@kmitl.ac.th','Mz_12333','user',1,'2026-03-27 04:59:07','2026-03-28 00:40:31',7849,1),(8,'หกดเ','หกหดกเ','6ๅๅ7089@kmitl.ac.th','Nm_1234j111','user',1,'2026-03-27 15:54:37','2026-03-27 15:54:37',50,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watch_history`
--

DROP TABLE IF EXISTS `watch_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watch_history` (
  `watch_history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `profile_id` int DEFAULT NULL,
  `content_id` int NOT NULL,
  `episode_id` int DEFAULT NULL,
  `progress_percent` decimal(5,2) DEFAULT '0.00',
  `is_completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`watch_history_id`),
  KEY `user_id` (`user_id`),
  KEY `profile_id` (`profile_id`),
  KEY `content_id` (`content_id`),
  KEY `episode_id` (`episode_id`),
  CONSTRAINT `watch_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `watch_history_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE SET NULL,
  CONSTRAINT `watch_history_ibfk_3` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE,
  CONSTRAINT `watch_history_ibfk_4` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watch_history`
--

LOCK TABLES `watch_history` WRITE;
/*!40000 ALTER TABLE `watch_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `watch_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `watchlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `profile_id` int DEFAULT NULL,
  `content_id` int NOT NULL,
  PRIMARY KEY (`watchlist_id`),
  KEY `user_id` (`user_id`),
  KEY `profile_id` (`profile_id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE SET NULL,
  CONSTRAINT `watchlist_ibfk_3` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mysql_nodejs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-28 23:53:21
