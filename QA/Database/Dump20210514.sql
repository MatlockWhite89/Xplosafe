CREATE DATABASE  IF NOT EXISTS `xplosafedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `xplosafedb`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: xplosafe    Database: xplosafedb
-- ------------------------------------------------------
-- Server version	5.7.30-log

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
-- Table structure for table `analyte_table`
--

DROP TABLE IF EXISTS `analyte_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analyte_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `analyte_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `cas_number` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `molecular_weight` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `reporting_limit` varchar(255) DEFAULT NULL,
  `sampling_rate` varchar(255) DEFAULT NULL,
  `osha_pel_ppm` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `osha_pel_mg` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `cal_osha_pel_8_hour_twa` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `cal_osha_pel_8_hour_twa_st` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `cal_osha_pel_8_hour_twa_c` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `niosh_rel_10_hour_twa` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `niosh_rel_10_hour_twa_st` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `niosh_rel_10_hour_twa_c` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `acgih_2019_tlv_8_hour_twa` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `acgih_2019_tlv_8_hour_twa_st` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `acgih_2019_tlv_8_hour_twa_c` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `date_last_updated` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analyte_table`
--

LOCK TABLES `analyte_table` WRITE;
/*!40000 ALTER TABLE `analyte_table` DISABLE KEYS */;
INSERT INTO `analyte_table` VALUES (6,'acetaldehyde','75-07-0','44.05',NULL,NULL,'200','360',NULL,NULL,'25 ppm',NULL,NULL,NULL,NULL,NULL,'25 ppm','2021-01-19 11:34:00'),(7,'acetic acid','64-19-7','60.052',NULL,NULL,'25','10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-04-16 10:14:27.669'),(8,'acetic anhydride','108-24-7','102.09',NULL,NULL,'20','5',NULL,NULL,'5 ppm',NULL,NULL,NULL,NULL,NULL,NULL,'2021-02-01 11:59:30.508'),(9,'acetone','67-64-1','58.08',NULL,NULL,'1000','2400','500 ppm','750 ppm','3000 ppm','250 ppm',NULL,NULL,'250 ppm','500 ppm',NULL,'2021-01-19 11:34:00'),(11,'2-acetylaminofluorene','53-96-3','223.27',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-28 10:57:29.361'),(12,'acetylene tetrabromide','79-27-6','345.65',NULL,NULL,'1','14','1 ppm',NULL,NULL,NULL,NULL,NULL,'0.1 ppm',NULL,NULL,'2021-01-19 11:34:00'),(13,'acrolein','107-02-8','56.06',NULL,NULL,'0.1','0.25',NULL,NULL,'0.1 ppm','0.1 ppm','0.3 ppm',NULL,NULL,NULL,'0.1 ppm','2021-01-19 11:34:00'),(14,'benzene','71-43-2','78.11',NULL,NULL,'',NULL,'1 ppm','5 ppm',NULL,'0.1 ppm','1 ppm',NULL,'0.5 ppm','2.5 ppm',NULL,'2021-01-19 11:34:00'),(19,'toluene','108-88-3','92.14',NULL,NULL,'100','200','25 ppm','100 ppm','300 ppm','10 ppm','25 ppm',NULL,'10 ppm','25 ppm',NULL,'2021-01-19 11:34:00'),(20,'formaldehyde','50-00-0','30.031',NULL,NULL,NULL,NULL,'0.75 ppm','2 ppm',NULL,'0.016 ppm',NULL,'0.1 ppm','0.1 ppm','0.3 ppm',NULL,'2021-01-19 11:34:00'),(21,'1,2-dichlorotetrafluoroethane','76-14-2','170.92',NULL,NULL,'1000','1000','1000 ppm',NULL,NULL,'1000 ppm',NULL,NULL,'1000 ppm',NULL,NULL,'2021-01-19 11:34:00'),(22,'p-Dichlorobenzene','106-46-7','147.00',NULL,NULL,'75','450','10 ppm','110 ppm','200 ppm',NULL,NULL,NULL,'10 ppm',NULL,NULL,'2021-01-19 11:34:00'),(23,'cumene','98-82-8','120.19',NULL,NULL,'50','245','50 ppm',NULL,NULL,'50 ppm',NULL,NULL,'50 ppm',NULL,NULL,'2021-01-19 11:34:00'),(24,'ethyl benzene','100-41-4','106.167',NULL,NULL,'100','435','5 ppm','30 ppm',NULL,'100 ppm','125 ppm',NULL,'20 ppm',NULL,NULL,'2021-01-19 11:34:00'),(25,'1,1,2,2-Tetrachloroethane','79-34-5','167.848',NULL,NULL,'5','35','1 ppm',NULL,NULL,'1 ppm',NULL,NULL,'1 ppm',NULL,NULL,'2021-01-19 11:34:00'),(26,'1,1,2-Trichloroethane','79-00-5','133.4',NULL,NULL,'10','45','10 ppm',NULL,NULL,'10 ppm',NULL,NULL,'10 ppm',NULL,NULL,'2021-01-19 11:34:00'),(27,'Trichloroethylene','79-01-6','131.4',NULL,NULL,'100','200','25 ppm','100 ppm','300 ppm',NULL,NULL,NULL,'10 ppm','25 ppm',NULL,'2021-01-19 11:34:00'),(28,'tetrahydrofuran','109-99-9','72.11',NULL,NULL,'200','590','200 ppm','250 ppm',NULL,'200 ppm','250 ppm',NULL,'50 ppm','100 ppm',NULL,'2021-01-19 11:34:00'),(29,'m-xylene','1330-20-7','106.16',NULL,NULL,'100','435','100 ppm','150 ppm','300 ppm','100 ppm','150 ppm',NULL,'100 ppm','150 ppm',NULL,'2021-01-19 11:34:00'),(30,'n-Hexane','110-54-3','86.18',NULL,NULL,'500','1800','50 ppm',NULL,NULL,'50 ppm',NULL,NULL,'50 ppm',NULL,NULL,'2021-01-19 11:34:00'),(31,'methylene chloride','75-09-2','84.93',NULL,NULL,NULL,NULL,'25 ppm','125 ppm',NULL,NULL,NULL,NULL,'50 ppm',NULL,NULL,'2021-01-19 11:34:00'),(32,'Hexone (methyl isobutyl ketone)','108-10-1','100.16',NULL,NULL,'100','410','50 ppm','75 ppm',NULL,'50 ppm','75 ppm',NULL,'20 ppm','75 ppm',NULL,'2021-01-19 11:34:00'),(33,'2-Butanone (methyl ethyl ketone)','78-93-3','72.11',NULL,NULL,'200','590','200 ppm','300 ppm',NULL,'200 ppm','300 ppm',NULL,'200 ppm','300 ppm',NULL,'2021-01-19 11:34:00'),(34,'Dinitrotoluene','25321-14-6','182.134',NULL,NULL,NULL,'1.5','0.15 mg',NULL,NULL,'1.5 mg',NULL,NULL,'0.2 mg',NULL,NULL,'2021-01-19 11:34:00'),(35,'Acetonitrile','75-05-8','41.05',NULL,NULL,'40','70','40 ppm','60 ppm',NULL,'20 ppm',NULL,NULL,'20 ppm',NULL,NULL,'2021-01-19 11:34:00'),(36,'Acrylonitrile','107-13-1','53.06',NULL,NULL,NULL,NULL,'2 ppm',NULL,NULL,'1 ppm',NULL,'10 ppm','2 ppm',NULL,NULL,'2021-01-19 11:34:00'),(37,'Chloroform (Trichloromethane)','67-66-3','119.38',NULL,NULL,'50','240','2 ppm',NULL,NULL,NULL,'2 ppm',NULL,'10 ppm',NULL,NULL,'2021-01-19 11:34:00'),(38,'cyclohexane','110-82-7','84.16',NULL,NULL,'300','1050','300 ppm',NULL,NULL,'300 ppm',NULL,NULL,'100 ppm',NULL,NULL,'2021-01-19 11:34:00'),(39,'Dioxane (Diethylene dioxide)','123-91-1','88.11',NULL,NULL,'100','360','0.28 ppm',NULL,NULL,'',NULL,'1 ppm','20 ppm',NULL,NULL,'2021-01-19 11:34:00'),(40,'2-Hexanone (Methyl n-butyl ketone)','591-78-6','100.089',NULL,NULL,'100','410','1 ppm','10 ppm',NULL,'1 ppm',NULL,NULL,'5 ppm','10 ppm',NULL,'2021-01-19 11:34:00'),(41,'Chlorodiphenyl (42% Chlorine) (PCB-4)','53469-21-9','326.4',NULL,NULL,NULL,'1','1 mg','',NULL,'0.001 mg',NULL,NULL,'1 mg',NULL,NULL,'2021-01-19 11:34:00'),(42,'Coal tar pitch volatiles (benzo [a] pyrene, chrysene)','65966-93-2','228.3',NULL,NULL,'0.22',NULL,'0.2 mg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-29 13:04:21.761'),(43,'Naphtalene','91-20-3','128.1705',NULL,NULL,'10','50','0.1 ppm',NULL,NULL,'10 ppm','15 ppm',NULL,'10 ppm',NULL,NULL,'2021-01-19 11:34:00'),(44,'1,1-Dichloroethane','75-34-3','98.96',NULL,NULL,'100','400','100 ppm',NULL,NULL,'100 ppm',NULL,NULL,'100 ppm',NULL,NULL,'2021-01-19 11:34:00'),(45,'styrene','100-42-5','104.15',NULL,NULL,'100','200','25 ppm','100 ppm','500 ppm','100 ppm','150 ppm',NULL,'20 ppm',NULL,NULL,'2021-01-19 11:34:00'),(46,'bromoform','75-25-2','252.73',NULL,NULL,'0.5','5','0.5 ppm',NULL,NULL,'0.5 ppm',NULL,NULL,'0.5 ppm',NULL,NULL,'2021-01-19 11:34:00'),(47,'Ethylene dibromide (1,2-dibromoethane)','106-93-4','187.86',NULL,NULL,'20','30','0.13 ppm',NULL,NULL,'0.045 ppm',NULL,'0.13 ppm',NULL,NULL,NULL,'2021-01-19 11:34:00'),(48,'Butadiene (1,3-Butadiene)','106-99-0','54.0916',NULL,NULL,'1-5',NULL,'1 ppm','5 ppm',NULL,NULL,NULL,NULL,'2 ppm',NULL,NULL,'2021-01-19 11:34:00'),(49,'Ethyl acetate','141-78-6','88.11',NULL,NULL,'400','1400','400 ppm','',NULL,'400 ppm',NULL,NULL,'400 ppm',NULL,NULL,'2021-01-19 11:34:00'),(50,'Methyl methacrylate','80-62-6','100.121',NULL,NULL,'100','410','50 ppm','100 ppm',NULL,'100 ppm',NULL,NULL,'50 ppm','100 ppm',NULL,'2021-01-19 11:34:00'),(51,'Ethyl alcohol (Ethanol)','64-17-5','46.07',NULL,NULL,'1000','1900','1000 ppm',NULL,NULL,'1000 ppm',NULL,NULL,NULL,'1000 ppm',NULL,'2021-01-19 11:34:00'),(52,'Ethanolamine (Monoethanolamine)','141-43-5','61.08',NULL,NULL,'3','6','3 ppm','6 ppm',NULL,'3 ppm','6 ppm',NULL,'3 ppm','6 ppm',NULL,'2021-01-19 11:34:00'),(53,'Nonane','111-84-2','128.2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'200 ppm',NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(54,'1,2,4-trimethylbenzene','95-63-6','120.19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'25 ppm',NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(55,'Vinyl Bromide','593-60-2','106.95',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(56,'Propionaldehyde','123-38-6','58.08',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(57,'p-Toluenesulfonamide','70-55-3','171.22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(58,'Hexaclorobutadiene (hexacloro-1,3-butadiene)','87-68-3','260.76',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.02 ppm',NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(59,'N-Nitrosodimethylamine','62-75-9','74.0819',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(60,'Chrysene','218-01-9','228.3',NULL,NULL,NULL,'0.2','0.2 mg',NULL,NULL,'0.1 mg',NULL,NULL,'0.2 mg',NULL,NULL,'2021-01-19 11:34:00'),(61,'Phenanthrene','85-01-8','178.23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(62,'Bromodichloromethane','75-27-4','163.8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(63,'1,2,3,4,6,7,8-Heptachlorodibenzo-p-dioxin','35822-46-9','425.3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(64,'1,2,3,6,8,9-Hexachlorodibenzo-p-dioxin','19408-74-3','390.9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(65,'Vinyl acetate','803-18-4','86.09',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(66,'2-bromodibenzofuran','86-76-0','247.09',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(67,'4-ethyltoluene','622-96-8','120.19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(68,'1,2-dichlorobenzene','95-50-1','147.01',NULL,NULL,'50','300','25 ppm',NULL,'50 ppm',NULL,NULL,'50 ppm','25 ppm',NULL,'50 ppm','2021-01-19 11:34:00'),(69,'Vinylidene fluoride','75-35-4','64.03',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(70,'2-chloro-p-dioxin','39227-54-8','218.63',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(71,'2,4-dinitrotoluene','121-14-2','182.134',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-19 11:34:00'),(72,'PCB-3','2051-62-9','498.6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2021-01-29 13:01:49.342');
/*!40000 ALTER TABLE `analyte_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analyzed_token_table`
--

DROP TABLE IF EXISTS `analyzed_token_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analyzed_token_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cas_number` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `analyte_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `recorded_value` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `badge_serial_number` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `token_id` int(11) DEFAULT NULL,
  `data_table_id` int(11) DEFAULT NULL,
  `analyst_id` int(11) DEFAULT NULL,
  `token_type` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `analysis_method` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `recorded_units` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `reporting_limit` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `volume_concentration` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `found_concentration` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `concentration_units` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `analyzed_comments` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `date_created` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `date_last_updated` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Analyzed Data Key_idx` (`data_table_id`),
  KEY `Analyzed Analyst Key_idx` (`analyst_id`),
  KEY `Analyzed Token Key_idx` (`token_id`),
  CONSTRAINT `Analyzed Analyst Key` FOREIGN KEY (`analyst_id`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Analyzed Data Key` FOREIGN KEY (`data_table_id`) REFERENCES `data_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Analyzed Token Key` FOREIGN KEY (`token_id`) REFERENCES `tolken_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analyzed_token_table`
--

LOCK TABLES `analyzed_token_table` WRITE;
/*!40000 ALTER TABLE `analyzed_token_table` DISABLE KEYS */;
INSERT INTO `analyzed_token_table` VALUES (1,'67-64-1','acetone','16.716','1-9115-062',2,2,6,'OSU-6','TD/GC-MS','ug',NULL,'0.078','33.071','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(2,'64-17-5','Ethyl alcohol (ethanol)','67.082','1-9115-062',2,2,6,'OSU-6','TD/GC-MS','ug',NULL,'0.140','74.314','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(3,'108-88-3','toluene','0.388','1-9115-062',2,2,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.462','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(4,'78-93-3','2-Butanone (methyl ethyl ketone)','0.518','1-9115-062',2,2,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.220','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(5,'67-64-1','acetone','16.317','1-9115-062',3,3,6,'OSU-6','TD/GC-MS','ug',NULL,'0.077','32.281','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(6,'64-17-5','Ethyl alcohol (ethanol)','66.184','1-9115-062',3,3,6,'OSU-6','TD/GC-MS','ug',NULL,'0.138','73.319','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(7,'108-88-3','toluene','0.233','1-9115-062',3,3,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.278','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(8,'78-93-3','2-Butanone (methyl ethyl ketone)','0.412','1-9115-062',3,3,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.175','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(9,'67-64-1','acetone','16.405','1-9115-066',1,4,6,'OSU-6','TD/GC-MS','ug',NULL,'0.077','32.423','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(10,'64-17-5','Ethyl alcohol (ethanol)','85.8163','1-9115-066',1,4,6,'OSU-6','TD/GC-MS','ug',NULL,'0.179','94.972','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(11,'108-88-3','toluene','0.9683','1-9115-066',1,4,6,'OSU-6','TD/GC-MS','ug',NULL,'0.004','1.152','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(12,'78-93-3','2-Butanone (methyl ethyl ketone)','0.5843','1-9115-066',1,4,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.248','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(13,'67-64-1','acetone','24.867','1-9115-066',2,5,6,'OSU-6','TD/GC-MS','ug',NULL,'0.117','49.147','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(14,'64-17-5','Ethyl alcohol (ethanol)','81.509','1-9115-066',2,5,6,'OSU-6','TD/GC-MS','ug',NULL,'0.170','90.206','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(15,'108-88-3','toluene','0.792','1-9115-066',2,5,6,'OSU-6','TD/GC-MS','ug',NULL,'0.004','0.942','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(16,'78-93-3','2-Butanone (methyl ethyl ketone)','0.729','1-9115-066',2,5,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.309','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(17,'67-64-1','acetone','25.035','1-9115-066',3,6,6,'OSU-6','TD/GC-MS','ug',NULL,'0.117','49.479','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(18,'64-17-5','Ethyl alcohol (ethanol)','84.813','1-9115-066',3,6,6,'OSU-6','TD/GC-MS','ug',NULL,'0.177','93.862','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(19,'108-88-3','toluene','0.673','1-9115-066',3,6,6,'OSU-6','TD/GC-MS','ug',NULL,'0.003','0.801','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(20,'78-93-3','2-Butanone (methyl ethyl ketone)','0.719','1-9115-066',3,6,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.305','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(21,'67-64-1','acetone','13.371','1-9115-067',1,7,6,'OSU-6','TD/GC-MS','ug',NULL,'0.062','26.453','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(22,'64-17-5','Ethyl alcohol (ethanol)','62.01','1-9115-067',1,7,6,'OSU-6','TD/GC-MS','ug',NULL,'0.129','68.695','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(23,'108-88-3','toluene','0.601','1-9115-067',1,7,6,'OSU-6','TD/GC-MS','ug',NULL,'0.003','0.716','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(24,'78-93-3','2-Butanone (methyl ethyl ketone)','0.318','1-9115-067',1,7,6,'OSU-6','TD/GC-MS','ug',NULL,'0.000','0.135','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(25,'67-64-1','acetone','18.262','1-9115-067',2,8,6,'OSU-6','TD/GC-MS','ug',NULL,'0.086','36.129','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(26,'64-17-5','Ethyl alcohol (ethanol)','66.343','1-9115-067',2,8,6,'OSU-6','TD/GC-MS','ug',NULL,'0.138','73.495','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(27,'108-88-3','toluene','0.573','1-9115-067',2,8,6,'OSU-6','TD/GC-MS','ug',NULL,'0.003','0.683','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(28,'78-93-3','2-Butanone (methyl ethyl ketone)','0.502','1-9115-067',2,8,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.213','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(29,'67-64-1','acetone','23.379','1-9115-067',3,9,6,'OSU-6','TD/GC-MS','ug',NULL,'0.110','46.252','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(30,'64-17-5','Ethyl alcohol (ethanol)','74.997','1-9115-067',3,9,6,'OSU-6','TD/GC-MS','ug',NULL,'0.156','83.082','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(31,'108-88-3','toluene','0.491','1-9115-067',3,9,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.585','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(32,'78-93-3','2-Butanone (methyl ethyl ketone)','0.589','1-9115-067',3,9,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.250','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(33,'67-64-1','acetone','13.242','1-9115-069',1,10,6,'OSU-6','TD/GC-MS','ug',NULL,'0.062','26.201','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(34,'64-17-5','Ethyl alcohol (ethanol)','67.983','1-9115-069',1,10,6,'OSU-6','TD/GC-MS','ug',NULL,'0.142','75.321','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(35,'108-88-3','toluene','0.481','1-9115-069',1,10,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.573','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(36,'78-93-3','2-Butanone (methyl ethyl ketone)','0.507','1-9115-069',1,10,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.215','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(37,'67-64-1','acetone','21.918','1-9115-069',2,11,6,'OSU-6','TD/GC-MS','ug',NULL,'0.103','43.367','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(38,'64-17-5','Ethyl alcohol (ethanol)','76.876','1-9115-069',2,11,6,'OSU-6','TD/GC-MS','ug',NULL,'0.160','85.174','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(39,'108-88-3','toluene','0.490','1-9115-069',2,11,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.584','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(40,'78-93-3','2-Butanone (methyl ethyl ketone)','0.639','1-9115-069',2,11,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.271','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(41,'67-64-1','acetone','20.142','1-9115-069',3,12,6,'OSU-6','TD/GC-MS','ug',NULL,'0.095','39.853','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(42,'64-17-5','Ethyl alcohol (ethanol)','72.084','1-9115-069',3,12,6,'OSU-6','TD/GC-MS','ug',NULL,'0.150','79.865','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(43,'108-88-3','toluene','0.416','1-9115-069',3,12,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.496','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(44,'78-93-3','2-Butanone (methyl ethyl ketone)','0.557','1-9115-069',3,12,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.237','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(45,'67-64-1','acetone','11.586','1-9115-071',1,13,6,'OSU-6','TD/GC-MS','ug',NULL,'0.054','22.924','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(46,'64-17-5','Ethyl alcohol (ethanol)','80.111','1-9115-071',1,13,6,'OSU-6','TD/GC-MS','ug',NULL,'0.167','88.758','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(47,'108-88-3','toluene','0.496','1-9115-071',1,13,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.591','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(48,'78-93-3','2-Butanone (methyl ethyl ketone)','0.47','1-9115-071',1,13,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.200','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(49,'67-64-1','acetone','26.25','1-9115-071',2,14,6,'OSU-6','TD/GC-MS','ug',NULL,'0.123','51.939','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(50,'64-17-5','Ethyl alcohol (ethanol)','93.22','1-9115-071',2,14,6,'OSU-6','TD/GC-MS','ug',NULL,'0.194','103.282','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(51,'108-88-3','toluene','0.490','1-9115-071',2,14,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.584','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(52,'78-93-3','2-Butanone (methyl ethyl ketone)','0.741','1-9115-071',2,14,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.315','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(53,'67-64-1','acetone','22.758','1-9115-071',3,15,6,'OSU-6','TD/GC-MS','ug',NULL,'0.107','45.030','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(54,'64-17-5','Ethyl alcohol (ethanol)','86.323','1-9115-071',3,15,6,'OSU-6','TD/GC-MS','ug',NULL,'0.180','95.641','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(55,'108-88-3','toluene','0.492','1-9115-071',3,15,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.586','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(56,'78-93-3','2-Butanone (methyl ethyl ketone)','0.617','1-9115-071',3,15,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.262','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(57,'67-64-1','acetone','11.586','1-8318-028',1,16,6,'OSU-6','TD/GC-MS','ug',NULL,'0.073','30.927','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(58,'64-17-5','Ethyl alcohol (ethanol)','80.111','1-8318-028',1,16,6,'OSU-6','TD/GC-MS','ug',NULL,'0.207','109.861','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(59,'108-88-3','toluene','0.496','1-8318-028',1,16,6,'OSU-6','TD/GC-MS','ug',NULL,'0.003','0.688','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(60,'78-93-3','2-Butanone (methyl ethyl ketone)','0.47','1-8318-028',1,16,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.320','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(61,'67-64-1','acetone','26.25','1-8318-028',2,17,6,'OSU-6','TD/GC-MS','ug',NULL,'0.128','53.885','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(62,'64-17-5','Ethyl alcohol (ethanol)','93.22','1-8318-028',2,17,6,'OSU-6','TD/GC-MS','ug',NULL,'0.234','124.061','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(63,'108-88-3','toluene','0.490','1-8318-028',2,17,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.625','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(64,'78-93-3','2-Butanone (methyl ethyl ketone)','0.741','1-8318-028',2,17,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.336','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(65,'67-64-1','acetone','22.758','1-8318-028',3,18,6,'OSU-6','TD/GC-MS','ug',NULL,'0.140','59.150','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(66,'64-17-5','Ethyl alcohol (ethanol)','86.323','1-8318-028',3,18,6,'OSU-6','TD/GC-MS','ug',NULL,'0.198','105.173','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(67,'108-88-3','toluene','0.492','1-8318-028',3,18,6,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.472','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(68,'78-93-3','2-Butanone (methyl ethyl ketone)','0.617','1-8318-028',3,18,6,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.372','PPB','Sample Data','2019-06-11 17:52:00','2019-06-11 17:52:00'),(69,'75-07-0','acetaldehyde','0.22','1-9115-062',1,1,1,'OSU-6','TD/GC-MS','ug',NULL,'0.22','0.22','PPB','Comments','2021-04-07 17:45:14.595','2021-04-07 17:45:14.595'),(70,'107-13-1','Acrylonitrile','0.33','1-9115-062',1,1,1,'OSU-6','TD/GC-MS','ug',NULL,'0.33','0.33','PPB','Comments','2021-04-07 17:45:14.599','2021-04-07 17:45:14.599'),(71,'64-19-7','acetic acid','0.22','1-9115-061',1,19,1,'OSU-6','TD/GC-MS','ug',NULL,'0.22','0.22','PPB','Comments','2021-04-07 18:01:34.769','2021-04-07 18:01:34.769'),(72,'98-82-8','cumene','0.11','1-9115-061',1,19,1,'OSU-6','TD/GC-MS','ug',NULL,'0.11','0.11','PPB','Comments','2021-04-07 18:01:34.775','2021-04-07 18:01:34.775'),(73,'109-99-9','tetrahydrofuran','0.77','1-9115-061',1,19,1,'OSU-6','TD/GC-MS','ug',NULL,'0.77','0.77','PPB','Comments','2021-04-07 18:01:34.778','2021-04-07 18:01:34.778'),(74,'75-07-0','acetaldehyde','0.22','1-9115-061',2,20,1,'OSU-6','TD/GC-MS','ug',NULL,'0.22','0.22','PPB','C','2021-04-07 18:02:11.580','2021-04-07 18:02:11.580'),(75,'79-01-6','Trichloroethylene','0.34','1-9115-061',3,21,1,'OSU-6','TD/GC-MS','ug',NULL,'0.34','0.34','PPB','Comments','2021-04-07 18:02:36.458','2021-04-07 18:02:36.458'),(76,'75-07-0','acetaldehyde','1.12','1-1060-002',1,61,1,'OSU-6','TD/GC-MS','ug',NULL,'0.110','0.001','PPB','Comments','2021-04-09 12:39:43.538','2021-04-09 12:39:43.538'),(77,'50-00-0','formaldehyde','21.38','1-1060-002',1,61,1,'OSU-6','TD/GC-MS','ug',NULL,'18.31','1.012','PPB','Comments','2021-04-09 12:39:43.544','2021-04-09 12:39:43.544'),(78,'107-02-8','acrolein','1.20','1-1060-002',1,61,1,'OSU-6','TD/GC-MS','ug',NULL,'0.087','0.001','PPB','Comments','2021-04-09 12:39:43.549','2021-04-09 12:39:43.549'),(79,'75-07-0','acetaldehyde','0.118','1-1060-002',2,67,1,'OSU-6','TD/GC-MS','ug',NULL,'0.098','0.001','PPB','Comments 2','2021-04-09 12:41:12.793','2021-04-09 12:41:12.793'),(80,'107-02-8','acrolein','0.135','1-1060-002',2,67,1,'OSU-6','TD/GC-MS','ug',NULL,'0.23','0.052','PPB','Comments 2','2021-04-09 12:41:12.800','2021-04-09 12:41:12.800'),(81,'50-00-0','formaldehyde','24.22','1-1060-002',2,67,1,'OSU-6','TD/GC-MS','ug',NULL,'14.56','11.21','PPB','Comments 2','2021-04-09 12:41:12.806','2021-04-09 12:41:12.806'),(82,'107-02-8','acrolein','0.087','1-1060-002',3,68,1,'OSU-6','TD/GC-MS','ug',NULL,'0.102','0.003','PPB','Comments 3','2021-04-09 12:42:28.262','2021-04-09 12:42:28.262'),(83,'50-00-0','formaldehyde','19.214','1-1060-002',3,68,1,'OSU-6','TD/GC-MS','ug',NULL,'21.211','14.23','PPB','Comments 3','2021-04-09 12:42:28.269','2021-04-09 12:42:28.269'),(84,'75-07-0','acetaldehyde','0.102','1-1060-002',3,68,1,'OSU-6','TD/GC-MS','ug',NULL,'0.089','0.021','PPB','Comments 3','2021-04-09 12:42:28.273','2021-04-09 12:42:28.273'),(85,'100-41-4','ethyl benzene','32.235','1-9116-001',1,31,1,'OSU-6','TD/GC-MS','ug',NULL,'21.333','28.321','PPB','test4','2021-04-09 14:18:55.607','2021-04-09 14:18:55.607'),(86,'100-41-4','ethyl benzene','38.654','1-9116-001',2,32,1,'OSU-6','TD/GC-MS','ug',NULL,'26.321','31.333','PPB','test4','2021-04-09 14:19:21.961','2021-04-09 14:19:21.961'),(87,'100-41-4','ethyl benzene','40.121','1-9116-001',3,33,1,'OSU-6','TD/GC-MS','ug',NULL,'31.333','35.654','PPB','test4','2021-04-09 14:19:53.339','2021-04-09 14:19:53.339'),(88,'108-88-3','toluene','0.512','1-9115-059',1,25,1,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.561','PPB','test5','2021-04-09 14:22:35.481','2021-04-09 14:22:35.481'),(89,'108-88-3','toluene','0.522','1-9115-059',2,26,1,'OSU-6','TD/GC-MS','ug',NULL,'0.002','0.574','PPB','test5','2021-04-09 14:23:10.075','2021-04-09 14:23:10.075'),(90,'108-88-3','toluene','0.531','1-9115-059',3,27,1,'OSU-6','TD/GC-MS','ug',NULL,'0.001','0.555','PPB','test5','2021-04-09 14:23:36.229','2021-04-09 14:23:36.229'),(94,'108-88-3','toluene','0.288','1-9116-003',1,37,1,'OSU-6','TD/GC-MS','ug',NULL,'0.232','0.312','PPB','Comments','Mon Apr 12 2021 12:17:22 GMT-0500 (Central Daylight Time)','Mon Apr 12 2021 12:17:22 GMT-0500 (Central Daylight Time)'),(95,'108-88-3','toluene','0.288','1-9116-003',1,37,1,'OSU-6','TD/GC-MS','ug',NULL,'0.232','0.312','PPB','Comments','2021-04-12 12:26:05.707','2021-04-12 12:26:05.707'),(96,'67-64-1','acetone','22.76','1-9116-003',1,37,1,'OSU-6','TD/GC-MS','ug',NULL,'0.134','56.154','PPB','Comments','2021-04-12 12:26:05.711','2021-04-12 12:26:05.711'),(97,'108-88-3','toluene','0.22','1-9116-003',2,38,1,'OSU-6','TD/GC-MS','ug',NULL,'0.13','0.14','PPB',NULL,'2021-04-12 12:26:39.949','2021-04-12 12:26:39.949'),(98,'67-64-1','acetone','22.71','1-9116-003',2,38,1,'OSU-6','TD/GC-MS','ug',NULL,'0.133','56.142','PPB',NULL,'2021-04-12 12:26:39.953','2021-04-12 12:26:39.953'),(99,'67-64-1','acetone','22.72','1-9116-003',3,39,1,'OSU-6','TD/GC-MS','ug',NULL,'0.141','56.138','PPB','Comments','2021-04-12 12:27:14.160','2021-04-12 12:27:14.160'),(100,'108-88-3','toluene','0.33','1-9116-003',3,39,1,'OSU-6','TD/GC-MS','ug',NULL,'0.21','0.25','PPB','Comments','2021-04-12 12:27:14.157','2021-04-12 12:27:14.157'),(101,'108-88-3','toluene','0.24','1-1060-004',1,69,1,'OSU-6','TD/GC-MS','ug',NULL,'0.24','0.24','PPB',NULL,'2021-04-16 10:12:51.174','2021-04-16 10:12:51.174'),(102,'108-88-3','toluene','0.21','1-1060-004',2,70,1,'OSU-6','TD/GC-MS','ug',NULL,'0.21','0.21','PPB','Database checks','2021-04-16 10:13:25.771','2021-04-16 10:13:25.771'),(103,'108-88-3','toluene','0.23','1-9116-000',1,28,1,'OSU-6','TD/GC-MS','ug',NULL,'0.23','0.23','PPB','Toulene Found','2021-04-16 14:44:31.108','2021-04-16 14:44:31.108'),(104,'108-88-3','toluene','0.24','1-9116-000',2,29,1,'OSU-6','TD/GC-MS','ug',NULL,'0.24','0.24','PPB','Toulene found','2021-04-16 14:44:51.897','2021-04-16 14:44:51.897'),(105,'108-88-3','toluene','0.25','1-9116-000',3,30,1,'OSU-6','TD/GC-MS','ug',NULL,'0.25','0.25','PPB','Toulene Found','2021-04-16 14:45:19.092','2021-04-16 14:45:19.092'),(106,'109-99-9','tetrahydrofuran','0.11','1-9116-000',1,28,1,'OSU-6','TD/GC-MS','ug',NULL,'0.11','0.11','PPB','Toulene and Tetrahydrofuran found','2021-04-16 14:58:18.155','2021-04-16 14:58:18.155'),(107,'75-07-0','acetaldehyde','0.33','1-9116-002',1,34,1,'OSU-6','TD/GC-MS','ug',NULL,'0.33','0.33','PPB',NULL,'2021-04-16 14:59:36.437','2021-04-16 14:59:36.437'),(108,'75-07-0','acetaldehyde','0.34','1-9116-002',2,35,1,'OSU-6','TD/GC-MS','ug',NULL,'0.34','0.34','PPB','Acetaldehyde found','2021-04-16 15:00:28.796','2021-04-16 15:00:28.796'),(109,'75-07-0','acetaldehyde','0.36','1-9116-002',3,36,1,'OSU-6','TD/GC-MS','ug',NULL,'0.36','0.36','PPB','Acetaldehyde found','2021-04-16 15:01:02.211','2021-04-16 15:01:02.211');
/*!40000 ALTER TABLE `analyzed_token_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `analyzed_token_table_AFTER_INSERT` AFTER INSERT ON `analyzed_token_table` FOR EACH ROW
BEGIN
	declare dataId int;
    declare analystId int; 
    declare wearerId int;
    declare wearerName varchar(255);
    declare analystName varchar(255);
    declare badgeSerialNumber varchar(255);
    
    set dataId = new.data_table_id;
    set analystId = new.analyst_id;
    set badgeSerialNumber = new.badge_serial_number;
    
    Select assigned_user from xplosafedb.badge_table where (badge_serial_number = badgeSerialNumber) into wearerName;
    Select id from xplosafedb.login_table where (username = wearername) into wearerId;
    Select username from xplosafedb.login_table where (id = analystId) into analystName;
    
UPDATE xplosafedb.data_table
	Set `wearer` = wearerName,
	`wearer_id` = wearerId,
	`analyst` = analystName,
	`analyst_id` = analystId WHERE (`id` = dataId);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `badge_status_table`
--

DROP TABLE IF EXISTS `badge_status_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge_status_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge_status_table`
--

LOCK TABLES `badge_status_table` WRITE;
/*!40000 ALTER TABLE `badge_status_table` DISABLE KEYS */;
INSERT INTO `badge_status_table` VALUES (1,'Inactive'),(2,'Active'),(3,'Expired'),(4,'Completed'),(5,'Quarantined'),(6,'Damaged'),(7,'Assigned'),(8,'Analyzed'),(9,'Collecting Data');
/*!40000 ALTER TABLE `badge_status_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badge_table`
--

DROP TABLE IF EXISTS `badge_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assigned_user` varchar(45) DEFAULT NULL,
  `badge_status` int(11) DEFAULT NULL,
  `activated_time` varchar(255) DEFAULT NULL,
  `turned_in_time` varchar(255) DEFAULT NULL,
  `expiration_date` varchar(255) DEFAULT NULL,
  `batch_group` varchar(255) DEFAULT NULL,
  `badge_serial_number` varchar(255) DEFAULT NULL,
  `number_of_tokens` int(11) DEFAULT NULL,
  `temperature_celsius` varchar(255) DEFAULT NULL,
  `temperature_fahrenheit` varchar(255) DEFAULT NULL,
  `vapors_exposed` varchar(255) DEFAULT NULL,
  `relative_humidity` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BadgeSerialNumber_UNIQUE` (`badge_serial_number`),
  KEY `Badge Status Key_idx` (`badge_status`),
  KEY `Assigned User Key_idx` (`assigned_user`),
  CONSTRAINT `Assigned User Key` FOREIGN KEY (`assigned_user`) REFERENCES `login_table` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Badge Status Key` FOREIGN KEY (`badge_status`) REFERENCES `badge_status_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge_table`
--

LOCK TABLES `badge_table` WRITE;
/*!40000 ALTER TABLE `badge_table` DISABLE KEYS */;
INSERT INTO `badge_table` VALUES (1,'Wearer',8,'2021-04-09 12:20:00','2019-05-31 17:52:00','2021-12-31 14:50:00','1','1-9115-062',3,'35.2','95.3',NULL,'15','2019-05-01 10:28:38','2021-05-05 11:07:34.855',NULL),(2,'Peter',8,'2021-04-15 11:37:00','2021-04-16 11:37:00','2021-12-31 14:50:00','1','1-9115-066',3,'35.2','95.3',NULL,'15','2019-05-01 10:28:38','2021-05-05 11:07:53.315',NULL),(3,'Alice',6,'2019-05-03 08:00:00','2019-05-31 17:52:00','2021-12-31 14:50:00','1','1-9115-067',3,'35.2','95.3',NULL,'10','2019-05-01 10:28:38','2021-03-16 05:17:24.696',NULL),(4,'Michael',8,'2019-05-03 08:00:00','2019-05-31 17:52:00','2021-12-31 14:50:00','1','1-9115-069',3,'35.2','95.3',NULL,'10','2019-05-01 10:28:38','2019-06-11 17:52:00',NULL),(5,'JarJar',8,'2021-03-16 10:07:00','2021-03-24 10:07:00','2021-12-31 14:50:00','1','1-9115-071',3,'32.8','91',NULL,'21','2019-05-01 10:28:38','2021-05-05 11:08:20.665',NULL),(6,'Opeth',8,'2019-05-03 08:00:00','2019-05-31 17:52:00','2021-12-31 14:50:00','1','1-8318-028',3,'35.2','95.3',NULL,'15','2019-05-01 10:28:38','2021-05-05 11:08:04.250',NULL),(7,'JarJar',8,'2021-04-01 18:00:00','2021-04-06 18:00:00','2021-02-24 09:41:00','1','1-9115-061',3,'0.3','32.6',NULL,'11','2021-02-25 09:41:46.232','2021-05-05 11:08:37.889',NULL),(8,'Wearer',6,'2021-03-01 15:17:00','2021-03-01 15:24:00','2021-02-26 09:42:00','1','1-9115-060',3,'16.1','61',NULL,'12','2021-02-25 09:42:14.506','2021-05-05 11:08:56.879',NULL),(9,'Wearer',8,'2021-03-16 10:07:00','2021-03-23 10:07:00','2021-03-25 09:48:00','1','1-9115-059',3,'25.6','78',NULL,'23','2021-02-25 09:48:12.282','2021-05-05 11:09:17.070',NULL),(10,'Peter',8,'2021-03-15 16:24:00','2021-04-16 11:48:00','2022-03-12 17:51:48','2','1-9116-000',3,'-10','14',NULL,'8','2021-03-12 11:52:07.690','2021-05-05 11:09:31.640',NULL),(11,'Peter',8,'2021-04-09 09:51:00','2021-04-11 09:52:00','2022-03-12 17:51:48','2','1-9116-001',3,'32','89.6',NULL,'6','2021-03-12 11:52:17.009','2021-05-05 11:09:47.993',NULL),(12,'Wearer',8,'2021-04-04 16:29:00','2021-04-16 11:49:00','2022-03-12 17:51:48','2','1-9116-002',3,'23.3','74',NULL,'11','2021-03-12 11:52:18.622','2021-05-05 11:10:02.353',NULL),(13,'Opeth',8,'2021-03-15 16:26:00','2021-04-09 14:05:00','2022-03-12 17:51:48','2','1-9116-003',3,'43.9','111',NULL,'17','2021-03-12 11:52:19.766','2021-05-05 11:10:21.772',NULL),(14,'Peter',2,'2021-04-05 16:27:00',NULL,'2022-03-12 17:51:48','2','1-9116-004',3,NULL,NULL,NULL,NULL,'2021-03-12 11:52:20.925','2021-04-05 16:27:42.146',NULL),(15,'Peter',2,'2021-04-05 16:30:00',NULL,'2022-03-12 18:05:00','3','1-9117-000',3,NULL,NULL,NULL,NULL,'2021-03-12 12:06:23.863','2021-04-05 16:30:31.106',NULL),(16,'JarJar',2,'2021-04-05 16:26:00',NULL,'2022-03-12 18:05:00','3','1-9117-001',3,NULL,NULL,NULL,NULL,'2021-03-12 12:06:32.014','2021-04-05 16:26:54.935',NULL),(17,'Wearer',2,'2021-04-04 16:29:00',NULL,'2022-03-12 18:05:00','3','1-9117-002',3,NULL,NULL,NULL,NULL,'2021-03-12 12:06:36.923','2021-04-05 16:29:20.084',NULL),(18,'mike',2,'2021-04-04 16:30:00',NULL,'2022-03-12 21:02:00','2','1-1-001',2,NULL,NULL,NULL,NULL,'2021-03-12 15:02:03.535','2021-04-05 16:30:44.881',NULL),(19,'Peter',2,'2021-04-05 16:51:00',NULL,'2022-03-12 22:03:00','4','1-1064-001',3,NULL,NULL,NULL,NULL,'2021-03-12 16:03:22.067','2021-04-05 16:51:28.920',NULL),(20,'Picah',2,'2021-04-05 17:14:00',NULL,'2022-03-12 22:03:00','4','1-1064-002',3,NULL,NULL,NULL,NULL,'2021-03-12 16:03:22.072','2021-04-05 17:14:50.440',NULL),(21,'Wearer',2,'2021-04-05 17:27:00',NULL,'2022-03-15 15:17:00','5','1-1060-001',3,NULL,NULL,NULL,NULL,'2021-03-15 10:17:38.361','2021-04-05 17:27:51.112',NULL),(22,'Opeth',2,'2021-03-15 16:31:00',NULL,'2022-03-15 15:17:00','5','1-1060-003',3,NULL,NULL,NULL,NULL,'2021-03-15 10:17:38.371','2021-03-15 16:31:24.231',NULL),(23,'Opeth',8,'2021-04-07 17:57:00','2021-04-09 12:36:00','2022-03-15 15:17:00','5','1-1060-002',3,'27.9','82.3',NULL,'10','2021-03-15 10:17:38.365','2021-05-05 11:10:44.950',NULL),(24,'Peter',8,'2021-04-04 17:18:00','2021-04-16 09:51:00','2022-03-15 15:21:00','5','1-1060-004',2,'29.5','85.1',NULL,'15','2021-03-15 10:21:25.192','2021-05-05 11:10:58.333',NULL),(25,'Wearer',2,'2021-04-05 17:20:00',NULL,'2022-03-15 15:23:00','5','1-1060-005',3,NULL,NULL,NULL,NULL,'2021-03-15 10:23:32.608','2021-04-05 17:20:18.499',NULL),(26,'Picah',2,'2021-04-04 17:18:00',NULL,'2022-03-15 15:41:00','5','1-1060-006',3,NULL,NULL,NULL,NULL,'2021-03-15 10:41:07.758','2021-04-05 17:18:38.165',NULL),(27,'Administrator',4,'2021-04-16 10:11:00','2021-04-16 10:12:00','2022-03-15 15:43:00','5','1-1060-007',3,'27.3','81.2',NULL,'14','2021-03-15 10:43:18.527','2021-05-05 11:11:17.614',NULL),(28,NULL,1,NULL,NULL,'2022-03-15 15:52:00','5','1-1060-008',3,NULL,NULL,NULL,NULL,'2021-03-15 10:52:00.824','2021-03-15 10:52:00.824',NULL),(29,'Picah',4,'2021-04-05 17:25:00','2021-04-16 10:11:00','2022-03-15 16:23:00','5','1-1060-009',3,'19.4','67',NULL,'10','2021-03-15 11:23:05.100','2021-05-05 11:11:35.000',NULL),(30,NULL,1,NULL,NULL,'2022-04-16 15:20:00','3','1-1136-001',3,NULL,NULL,NULL,NULL,'2021-04-16 10:20:04.469','2021-04-16 10:20:04.469',NULL),(31,NULL,1,NULL,NULL,'2022-04-16 15:20:00','3','1-1136-002',3,NULL,NULL,NULL,NULL,'2021-04-16 10:20:04.474','2021-04-16 10:20:04.474',NULL),(32,NULL,1,NULL,NULL,'2022-04-16 15:20:00','3','1-1136-003',3,NULL,NULL,NULL,NULL,'2021-04-16 10:20:04.479','2021-04-16 10:20:04.479',NULL),(38,NULL,1,NULL,NULL,'2022-05-12 18:37:00','3','1-1163-001',3,NULL,NULL,NULL,NULL,'2021-05-12 13:37:04.204','2021-05-12 13:37:04.204',NULL),(39,NULL,1,NULL,NULL,'2022-05-12 18:37:00','3','1-1163-002',3,NULL,NULL,NULL,NULL,'2021-05-12 13:37:04.206','2021-05-12 13:37:04.206',NULL),(40,NULL,1,NULL,NULL,'2022-05-12 18:37:00','3','1-1163-003',3,NULL,NULL,NULL,NULL,'2021-05-12 13:37:04.210','2021-05-12 13:37:04.210',NULL),(41,NULL,1,NULL,NULL,'2021-05-28 13:44:00','3','1-1163-004',3,NULL,NULL,NULL,NULL,'2021-05-12 13:44:31.541','2021-05-12 13:44:31.541',NULL),(42,NULL,1,NULL,NULL,'2021-05-28 13:44:00','3','1-1163-006',3,NULL,NULL,NULL,NULL,'2021-05-12 13:44:31.543','2021-05-12 13:44:31.543',NULL),(43,NULL,1,NULL,NULL,'2021-05-28 13:44:00','3','1-1163-005',3,NULL,NULL,NULL,NULL,'2021-05-12 13:44:31.544','2021-05-12 13:44:31.544',NULL),(44,NULL,1,NULL,NULL,'2021-06-17 13:53:00','3','1-1163-008',3,NULL,NULL,NULL,NULL,'2021-05-12 13:53:52.922','2021-05-12 13:53:52.922',NULL),(45,NULL,1,NULL,NULL,'2021-06-17 13:53:00','3','1-1163-007',3,NULL,NULL,NULL,NULL,'2021-05-12 13:53:52.921','2021-05-12 13:53:52.921',NULL),(46,NULL,1,NULL,NULL,'2021-06-17 13:53:00','3','1-1163-009',3,NULL,NULL,NULL,NULL,'2021-05-12 13:53:52.923','2021-05-12 13:53:52.923',NULL),(47,NULL,1,NULL,NULL,'2021-06-17 13:53:00','3','1-1163-010',3,NULL,NULL,NULL,NULL,'2021-05-12 13:53:52.924','2021-05-12 13:53:52.924',NULL),(56,NULL,1,NULL,NULL,'2021-05-29 14:02:00','A123','1-1163-013',3,NULL,NULL,NULL,NULL,'Wed May 12 2021 14:02:46 GMT-0500 (Central Daylight Time)','Wed May 12 2021 14:02:46 GMT-0500 (Central Daylight Time)',NULL);
/*!40000 ALTER TABLE `badge_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `badge_table_AFTER_INSERT` AFTER INSERT ON `badge_table` FOR EACH ROW BEGIN
declare id int;
declare batchGroup varchar(255);
set id = NEW.id;
set batchGroup = NEW.batch_group;
call create_new_badge_values(id);
call create_batch_group(batchGroup);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `xplosafedb`.`badge_table_BEFORE_DELETE` BEFORE DELETE ON `badge_table` FOR EACH ROW
BEGIN
	declare id int;
    declare badgeSerialNumber VARCHAR(255);
    declare numberOfTokens int;
	set id = OLD.id;
    set numberOfTokens = OLD.number_of_tokens;
    set badgeSerialNumber = OLD.badge_serial_number;
    
    call badge_removed(numberOfTokens, id, badgeSerialNumber);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `batch_group_table`
--

DROP TABLE IF EXISTS `batch_group_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_group_table` (
  `id` varchar(255) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_group_table`
--

LOCK TABLES `batch_group_table` WRITE;
/*!40000 ALTER TABLE `batch_group_table` DISABLE KEYS */;
INSERT INTO `batch_group_table` VALUES ('1','OSU-6','2021-02-25 09:41:46.232','2021-02-25 09:41:46.232'),('2','OSU-6','2021-02-25 09:41:46.232','2021-02-25 09:41:46.232'),('3','OSU-6','2021-02-25 09:41:46.232','2021-05-12 13:47:49'),('4','OSU-6','2021-02-25 09:41:46.232','2021-02-25 09:41:46.232'),('5','OSU-6','2021-02-25 09:41:46.232','2021-02-25 09:41:46.232'),('A123','OSU-6','2021-05-12 14:02:22','2021-05-12 14:02:22');
/*!40000 ALTER TABLE `batch_group_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_table`
--

DROP TABLE IF EXISTS `contact_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_table`
--

LOCK TABLES `contact_table` WRITE;
/*!40000 ALTER TABLE `contact_table` DISABLE KEYS */;
INSERT INTO `contact_table` VALUES (1,'Matlock.white@Longwaveinc.com','(888)888-8888','2020-12-14 10:28:38','2020-12-14 10:28:38'),(2,'Caleb.Dunham@Longwaveinc.com','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(3,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(4,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(5,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(6,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(7,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(8,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(9,'Email1','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(10,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(11,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(12,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(13,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(15,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(21,'default','N/A','2020-12-14 10:28:38','2020-12-14 10:28:38'),(22,'default','N/A','2020-12-15 13:22:44','2020-12-15 13:22:44'),(23,'default','N/A','2020-12-15 13:35:18','2020-12-15 13:35:18'),(24,'default','N/A','2020-12-15 13:36:46','2020-12-15 13:36:46'),(28,'default','N/A','2020-12-15 15:53:03','2020-12-15 15:53:03'),(29,'default','N/A','2020-12-15 15:55:35','2020-12-15 15:55:35'),(30,'default','N/A','2020-12-22 14:36:16','2020-12-22 14:36:16'),(31,'default','N/A','2021-01-28 11:19:02','2021-01-28 11:19:02'),(32,'default','N/A','2021-03-05 16:26:47','2021-03-05 16:26:47'),(33,'default','N/A','2021-03-05 16:26:47','2021-03-05 16:26:47'),(34,'default','N/A','2021-03-05 16:26:47','2021-03-05 16:26:47'),(35,'default','N/A','2021-03-05 16:26:47','2021-03-05 16:26:47'),(36,'default','N/A','2021-03-05 16:26:47','2021-03-05 16:26:47'),(37,'default','N/A','2021-04-16 09:45:26','2021-04-16 09:45:26');
/*!40000 ALTER TABLE `contact_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_table`
--

DROP TABLE IF EXISTS `data_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_table_type` varchar(45) DEFAULT NULL,
  `raw_data_id` int(11) DEFAULT NULL,
  `badge_id` int(11) DEFAULT NULL,
  `wearer` varchar(255) DEFAULT NULL,
  `wearer_id` int(11) DEFAULT NULL,
  `analyst` varchar(255) DEFAULT NULL,
  `analyst_id` int(11) DEFAULT NULL,
  `badge_serial_number` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Raw Data Key_idx` (`raw_data_id`),
  KEY `Analyst Key_idx` (`analyst_id`),
  KEY `Wearer Data Key_idx` (`wearer_id`),
  KEY `Badge Data Key_idx` (`badge_id`),
  CONSTRAINT `Analyst Data Key` FOREIGN KEY (`analyst_id`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Badge Data Key` FOREIGN KEY (`badge_id`) REFERENCES `badge_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Raw Data Key` FOREIGN KEY (`raw_data_id`) REFERENCES `raw_data_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Wearer Data Key` FOREIGN KEY (`wearer_id`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_table`
--

LOCK TABLES `data_table` WRITE;
/*!40000 ALTER TABLE `data_table` DISABLE KEYS */;
INSERT INTO `data_table` VALUES (1,'Badge',1,1,'Wearer',3,'Analyst',6,'1-9115-062','2021-02-24 17:11:03','2021-02-24 17:11:03'),(2,'Badge',2,1,'Wearer',3,'Analyst',6,'1-9115-062','2021-02-24 17:11:03','2021-02-24 17:11:03'),(3,'Badge',3,1,'Wearer',3,'Analyst',6,'1-9115-062','2021-02-24 17:11:03','2021-02-24 17:11:03'),(4,'Badge',4,2,'Peter',10,'Analyst',6,'1-9115-066','2021-02-24 17:11:03','2021-02-24 17:11:03'),(5,'Badge',5,2,'Peter',10,'Analyst',6,'1-9115-066','2021-02-24 17:11:03','2021-02-24 17:11:03'),(6,'Badge',6,2,'Peter',10,'Analyst',6,'1-9115-066','2021-02-24 17:11:03','2021-02-24 17:11:03'),(7,'Badge',7,3,'Alice',30,'Analyst',6,'1-9115-067','2021-02-24 17:11:03','2021-02-24 17:11:03'),(8,'Badge',8,3,'Alice',30,'Analyst',6,'1-9115-067','2021-02-24 17:11:03','2021-02-24 17:11:03'),(9,'Badge',9,3,'Alice',30,'Analyst',6,'1-9115-067','2021-02-24 17:11:03','2021-02-24 17:11:03'),(10,'Badge',10,4,'Michael',11,'Analyst',6,'1-9115-069','2021-02-24 17:11:03','2021-02-24 17:11:03'),(11,'Badge',11,4,'Michael',11,'Analyst',6,'1-9115-069','2021-02-24 17:11:03','2021-02-24 17:11:03'),(12,'Badge',12,4,'Michael',11,'Analyst',6,'1-9115-069','2021-02-24 17:11:03','2021-02-24 17:11:03'),(13,'Badge',13,5,'JarJar',28,'Analyst',6,'1-9115-071','2021-02-24 17:11:03','2021-02-24 17:11:03'),(14,'Badge',14,5,'JarJar',28,'Analyst',6,'1-9115-071','2021-02-24 17:11:03','2021-02-24 17:11:03'),(15,'Badge',15,5,'JarJar',28,'Analyst',6,'1-9115-071','2021-02-24 17:11:03','2021-02-24 17:11:03'),(16,'Badge',16,6,'Opeth',29,'Analyst',6,'1-8318-028','2021-02-24 17:11:03','2021-02-24 17:11:03'),(17,'Badge',17,6,'Opeth',29,'Analyst',6,'1-8318-028','2021-02-24 17:11:03','2021-02-24 17:11:03'),(18,'Badge',18,6,'Opeth',29,'Analyst',6,'1-8318-028','2021-02-24 17:11:03','2021-02-24 17:11:03'),(19,'Badge',19,7,'JarJar',28,'Matlock',1,'1-9115-061','2021-02-25 09:41:46','2021-02-25 09:41:46'),(20,'Badge',20,7,'JarJar',28,'Matlock',1,'1-9115-061','2021-02-25 09:41:46','2021-02-25 09:41:46'),(21,'Badge',21,7,'JarJar',28,'Matlock',1,'1-9115-061','2021-02-25 09:41:46','2021-02-25 09:41:46'),(22,'Badge',22,8,'',NULL,NULL,NULL,'1-9115-060','2021-02-25 09:42:14','2021-02-25 09:42:14'),(23,'Badge',23,8,NULL,NULL,NULL,NULL,'1-9115-060','2021-02-25 09:42:14','2021-02-25 09:42:14'),(24,'Badge',24,8,NULL,NULL,NULL,NULL,'1-9115-060','2021-02-25 09:42:14','2021-02-25 09:42:14'),(25,'Badge',25,9,'Wearer',3,'Matlock',1,'1-9115-059','2021-02-25 09:48:12','2021-02-25 09:48:12'),(26,'Badge',26,9,'Wearer',3,'Matlock',1,'1-9115-059','2021-02-25 09:48:12','2021-02-25 09:48:12'),(27,'Badge',27,9,'Wearer',3,'Matlock',1,'1-9115-059','2021-02-25 09:48:12','2021-02-25 09:48:12'),(28,'Badge',28,10,'Peter',10,'Matlock',1,'1-9116-000','2021-03-12 11:47:08','2021-03-12 11:47:08'),(29,'Badge',29,10,'Peter',10,'Matlock',1,'1-9116-000','2021-03-12 11:47:08','2021-03-12 11:47:08'),(30,'Badge',30,10,'Peter',10,'Matlock',1,'1-9116-000','2021-03-12 11:47:08','2021-03-12 11:47:08'),(31,'Badge',31,11,'Peter',10,'Matlock',1,'1-9116-001','2021-03-12 11:47:17','2021-03-12 11:47:17'),(32,'Badge',32,11,'Peter',10,'Matlock',1,'1-9116-001','2021-03-12 11:47:17','2021-03-12 11:47:17'),(33,'Badge',33,11,'Peter',10,'Matlock',1,'1-9116-001','2021-03-12 11:47:17','2021-03-12 11:47:17'),(34,'Badge',34,12,'Wearer',3,'Matlock',1,'1-9116-002','2021-03-12 11:47:19','2021-03-12 11:47:19'),(35,'Badge',35,12,'Wearer',3,'Matlock',1,'1-9116-002','2021-03-12 11:47:19','2021-03-12 11:47:19'),(36,'Badge',36,12,'Wearer',3,'Matlock',1,'1-9116-002','2021-03-12 11:47:19','2021-03-12 11:47:19'),(37,'Badge',37,13,'Opeth',29,'Matlock',1,'1-9116-003','2021-03-12 11:47:20','2021-03-12 11:47:20'),(38,'Badge',38,13,'Opeth',29,'Matlock',1,'1-9116-003','2021-03-12 11:47:20','2021-03-12 11:47:20'),(39,'Badge',39,13,'Opeth',29,'Matlock',1,'1-9116-003','2021-03-12 11:47:20','2021-03-12 11:47:20'),(40,'Badge',40,14,NULL,NULL,NULL,NULL,'1-9116-004','2021-03-12 11:47:21','2021-03-12 11:47:21'),(41,'Badge',41,14,NULL,NULL,NULL,NULL,'1-9116-004','2021-03-12 11:47:21','2021-03-12 11:47:21'),(42,'Badge',42,14,NULL,NULL,NULL,NULL,'1-9116-004','2021-03-12 11:47:21','2021-03-12 11:47:21'),(43,'Badge',43,15,NULL,NULL,NULL,NULL,'1-9117-000','2021-03-12 12:01:24','2021-03-12 12:01:24'),(44,'Badge',44,15,NULL,NULL,NULL,NULL,'1-9117-000','2021-03-12 12:01:24','2021-03-12 12:01:24'),(45,'Badge',45,15,NULL,NULL,NULL,NULL,'1-9117-000','2021-03-12 12:01:24','2021-03-12 12:01:24'),(46,'Badge',46,16,NULL,NULL,NULL,NULL,'1-9117-001','2021-03-12 12:01:32','2021-03-12 12:01:32'),(47,'Badge',47,16,NULL,NULL,NULL,NULL,'1-9117-001','2021-03-12 12:01:32','2021-03-12 12:01:32'),(48,'Badge',48,16,NULL,NULL,NULL,NULL,'1-9117-001','2021-03-12 12:01:32','2021-03-12 12:01:32'),(49,'Badge',49,17,NULL,NULL,NULL,NULL,'1-9117-002','2021-03-12 12:01:37','2021-03-12 12:01:37'),(50,'Badge',50,17,NULL,NULL,NULL,NULL,'1-9117-002','2021-03-12 12:01:37','2021-03-12 12:01:37'),(51,'Badge',51,17,NULL,NULL,NULL,NULL,'1-9117-002','2021-03-12 12:01:37','2021-03-12 12:01:37'),(52,'Badge',52,18,NULL,NULL,NULL,NULL,'1-1-001','2021-03-12 14:57:04','2021-03-12 14:57:04'),(53,'Badge',53,18,NULL,NULL,NULL,NULL,'1-1-001','2021-03-12 14:57:04','2021-03-12 14:57:04'),(54,'Badge',54,19,NULL,NULL,NULL,NULL,'1-1064-001','2021-03-12 15:58:22','2021-03-12 15:58:22'),(55,'Badge',55,19,NULL,NULL,NULL,NULL,'1-1064-001','2021-03-12 15:58:22','2021-03-12 15:58:22'),(56,'Badge',56,19,NULL,NULL,NULL,NULL,'1-1064-001','2021-03-12 15:58:22','2021-03-12 15:58:22'),(57,'Badge',57,20,NULL,NULL,NULL,NULL,'1-1064-002','2021-03-12 15:58:22','2021-03-12 15:58:22'),(58,'Badge',58,20,NULL,NULL,NULL,NULL,'1-1064-002','2021-03-12 15:58:22','2021-03-12 15:58:22'),(59,'Badge',59,20,NULL,NULL,NULL,NULL,'1-1064-002','2021-03-12 15:58:22','2021-03-12 15:58:22'),(60,'Badge',60,21,NULL,NULL,NULL,NULL,'1-1060-001','2021-03-15 10:12:40','2021-03-15 10:12:40'),(61,'Badge',62,23,'Opeth',29,'Matlock',1,'1-1060-002','2021-03-15 10:12:40','2021-03-15 10:12:40'),(62,'Badge',61,22,NULL,NULL,NULL,NULL,'1-1060-003','2021-03-15 10:12:40','2021-03-15 10:12:40'),(63,'Badge',63,21,NULL,NULL,NULL,NULL,'1-1060-001','2021-03-15 10:12:40','2021-03-15 10:12:40'),(64,'Badge',64,22,NULL,NULL,NULL,NULL,'1-1060-003','2021-03-15 10:12:40','2021-03-15 10:12:40'),(65,'Badge',65,21,NULL,NULL,NULL,NULL,'1-1060-001','2021-03-15 10:12:40','2021-03-15 10:12:40'),(66,'Badge',66,22,NULL,NULL,NULL,NULL,'1-1060-003','2021-03-15 10:12:40','2021-03-15 10:12:40'),(67,'Badge',67,23,'Opeth',29,'Matlock',1,'1-1060-002','2021-03-15 10:12:40','2021-03-15 10:12:40'),(68,'Badge',68,23,'Opeth',29,'Matlock',1,'1-1060-002','2021-03-15 10:12:40','2021-03-15 10:12:40'),(69,'Badge',69,24,'Peter',10,'Matlock',1,'1-1060-004','2021-03-15 10:16:27','2021-03-15 10:16:27'),(70,'Badge',70,24,'Peter',10,'Matlock',1,'1-1060-004','2021-03-15 10:16:27','2021-03-15 10:16:27'),(71,'Badge',71,25,NULL,NULL,NULL,NULL,'1-1060-005','2021-03-15 10:18:34','2021-03-15 10:18:34'),(72,'Badge',72,25,NULL,NULL,NULL,NULL,'1-1060-005','2021-03-15 10:18:34','2021-03-15 10:18:34'),(73,'Badge',73,25,NULL,NULL,NULL,NULL,'1-1060-005','2021-03-15 10:18:34','2021-03-15 10:18:34'),(74,'Badge',74,26,NULL,NULL,NULL,NULL,'1-1060-006','2021-03-15 10:36:09','2021-03-15 10:36:09'),(75,'Badge',75,26,NULL,NULL,NULL,NULL,'1-1060-006','2021-03-15 10:36:09','2021-03-15 10:36:09'),(76,'Badge',76,26,NULL,NULL,NULL,NULL,'1-1060-006','2021-03-15 10:36:09','2021-03-15 10:36:09'),(77,'Badge',77,27,NULL,NULL,NULL,NULL,'1-1060-007','2021-03-15 10:38:20','2021-03-15 10:38:20'),(78,'Badge',78,27,NULL,NULL,NULL,NULL,'1-1060-007','2021-03-15 10:38:20','2021-03-15 10:38:20'),(79,'Badge',79,27,NULL,NULL,NULL,NULL,'1-1060-007','2021-03-15 10:38:20','2021-03-15 10:38:20'),(80,'Badge',80,28,NULL,NULL,NULL,NULL,'1-1060-008','2021-03-15 10:47:02','2021-03-15 10:47:02'),(81,'Badge',81,28,NULL,NULL,NULL,NULL,'1-1060-008','2021-03-15 10:47:02','2021-03-15 10:47:02'),(82,'Badge',82,28,NULL,NULL,NULL,NULL,'1-1060-008','2021-03-15 10:47:02','2021-03-15 10:47:02'),(83,'Badge',83,29,NULL,NULL,NULL,NULL,'1-1060-009','2021-03-15 11:18:07','2021-03-15 11:18:07'),(84,'Badge',84,29,NULL,NULL,NULL,NULL,'1-1060-009','2021-03-15 11:18:07','2021-03-15 11:18:07'),(85,'Badge',85,29,NULL,NULL,NULL,NULL,'1-1060-009','2021-03-15 11:18:07','2021-03-15 11:18:07'),(86,'Badge',88,31,NULL,NULL,NULL,NULL,'1-1136-002','2021-04-16 10:14:25','2021-04-16 10:14:25'),(87,'Badge',86,30,NULL,NULL,NULL,NULL,'1-1136-001','2021-04-16 10:14:25','2021-04-16 10:14:25'),(88,'Badge',87,32,NULL,NULL,NULL,NULL,'1-1136-003','2021-04-16 10:14:25','2021-04-16 10:14:25'),(89,'Badge',89,30,NULL,NULL,NULL,NULL,'1-1136-001','2021-04-16 10:14:25','2021-04-16 10:14:25'),(90,'Badge',90,31,NULL,NULL,NULL,NULL,'1-1136-002','2021-04-16 10:14:25','2021-04-16 10:14:25'),(91,'Badge',91,30,NULL,NULL,NULL,NULL,'1-1136-001','2021-04-16 10:14:25','2021-04-16 10:14:25'),(92,'Badge',92,31,NULL,NULL,NULL,NULL,'1-1136-002','2021-04-16 10:14:25','2021-04-16 10:14:25'),(93,'Badge',93,32,NULL,NULL,NULL,NULL,'1-1136-003','2021-04-16 10:14:25','2021-04-16 10:14:25'),(94,'Badge',94,32,NULL,NULL,NULL,NULL,'1-1136-003','2021-04-16 10:14:25','2021-04-16 10:14:25'),(110,'Badge',110,38,NULL,NULL,NULL,NULL,'1-1163-001','2021-05-12 13:31:00','2021-05-12 13:31:00'),(111,'Badge',111,38,NULL,NULL,NULL,NULL,'1-1163-001','2021-05-12 13:31:00','2021-05-12 13:31:00'),(112,'Badge',112,39,NULL,NULL,NULL,NULL,'1-1163-002','2021-05-12 13:31:00','2021-05-12 13:31:00'),(113,'Badge',113,39,NULL,NULL,NULL,NULL,'1-1163-002','2021-05-12 13:31:00','2021-05-12 13:31:00'),(114,'Badge',114,39,NULL,NULL,NULL,NULL,'1-1163-002','2021-05-12 13:31:00','2021-05-12 13:31:00'),(115,'Badge',115,38,NULL,NULL,NULL,NULL,'1-1163-001','2021-05-12 13:31:00','2021-05-12 13:31:00'),(116,'Badge',116,40,NULL,NULL,NULL,NULL,'1-1163-003','2021-05-12 13:31:00','2021-05-12 13:31:00'),(117,'Badge',117,40,NULL,NULL,NULL,NULL,'1-1163-003','2021-05-12 13:31:00','2021-05-12 13:31:00'),(118,'Badge',118,40,NULL,NULL,NULL,NULL,'1-1163-003','2021-05-12 13:31:00','2021-05-12 13:31:00'),(119,'Badge',119,43,NULL,NULL,NULL,NULL,'1-1163-005','2021-05-12 13:38:27','2021-05-12 13:38:27'),(120,'Badge',120,41,NULL,NULL,NULL,NULL,'1-1163-004','2021-05-12 13:38:27','2021-05-12 13:38:27'),(121,'Badge',121,43,NULL,NULL,NULL,NULL,'1-1163-005','2021-05-12 13:38:27','2021-05-12 13:38:27'),(122,'Badge',122,41,NULL,NULL,NULL,NULL,'1-1163-004','2021-05-12 13:38:27','2021-05-12 13:38:27'),(123,'Badge',123,43,NULL,NULL,NULL,NULL,'1-1163-005','2021-05-12 13:38:27','2021-05-12 13:38:27'),(124,'Badge',124,41,NULL,NULL,NULL,NULL,'1-1163-004','2021-05-12 13:38:27','2021-05-12 13:38:27'),(125,'Badge',125,42,NULL,NULL,NULL,NULL,'1-1163-006','2021-05-12 13:38:27','2021-05-12 13:38:27'),(126,'Badge',126,42,NULL,NULL,NULL,NULL,'1-1163-006','2021-05-12 13:38:27','2021-05-12 13:38:27'),(127,'Badge',127,42,NULL,NULL,NULL,NULL,'1-1163-006','2021-05-12 13:38:27','2021-05-12 13:38:27'),(128,'Badge',128,47,NULL,NULL,NULL,NULL,'1-1163-010','2021-05-12 13:47:49','2021-05-12 13:47:49'),(129,'Badge',129,44,NULL,NULL,NULL,NULL,'1-1163-008','2021-05-12 13:47:49','2021-05-12 13:47:49'),(130,'Badge',130,47,NULL,NULL,NULL,NULL,'1-1163-010','2021-05-12 13:47:49','2021-05-12 13:47:49'),(131,'Badge',131,44,NULL,NULL,NULL,NULL,'1-1163-008','2021-05-12 13:47:49','2021-05-12 13:47:49'),(132,'Badge',132,47,NULL,NULL,NULL,NULL,'1-1163-010','2021-05-12 13:47:49','2021-05-12 13:47:49'),(133,'Badge',133,44,NULL,NULL,NULL,NULL,'1-1163-008','2021-05-12 13:47:49','2021-05-12 13:47:49'),(134,'Badge',134,45,NULL,NULL,NULL,NULL,'1-1163-007','2021-05-12 13:47:49','2021-05-12 13:47:49'),(135,'Badge',135,46,NULL,NULL,NULL,NULL,'1-1163-009','2021-05-12 13:47:49','2021-05-12 13:47:49'),(136,'Badge',136,45,NULL,NULL,NULL,NULL,'1-1163-007','2021-05-12 13:47:49','2021-05-12 13:47:49'),(137,'Badge',137,46,NULL,NULL,NULL,NULL,'1-1163-009','2021-05-12 13:47:49','2021-05-12 13:47:49'),(138,'Badge',138,45,NULL,NULL,NULL,NULL,'1-1163-007','2021-05-12 13:47:49','2021-05-12 13:47:49'),(139,'Badge',139,46,NULL,NULL,NULL,NULL,'1-1163-009','2021-05-12 13:47:49','2021-05-12 13:47:49'),(141,'Badge',141,56,NULL,NULL,NULL,NULL,'1-1163-013','2021-05-12 14:02:22','2021-05-12 14:02:22'),(142,'Badge',142,56,NULL,NULL,NULL,NULL,'1-1163-013','2021-05-12 14:02:22','2021-05-12 14:02:22'),(143,'Badge',143,56,NULL,NULL,NULL,NULL,'1-1163-013','2021-05-12 14:02:22','2021-05-12 14:02:22');
/*!40000 ALTER TABLE `data_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doehrs_analyte_result_data`
--

DROP TABLE IF EXISTS `doehrs_analyte_result_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doehrs_analyte_result_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AnalyteIdentifier` varchar(12) COLLATE utf8mb4_bin DEFAULT NULL,
  `CASNumber` varchar(12) COLLATE utf8mb4_bin DEFAULT NULL,
  `AnalyteName` varchar(400) COLLATE utf8mb4_bin NOT NULL,
  `AnalyzedDateTime` datetime NOT NULL,
  `Inspirability` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `AnalyticalMethod` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `MassMeasuredResult` float DEFAULT NULL,
  `MassMeasuredResultQualifier` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `MassCorrectedResult` float DEFAULT NULL,
  `MassCorrectedResultQualifier` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `MassResultUnit` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `ConcentrationMeasuredResult` float DEFAULT NULL,
  `ConcentrationMeasuredResultQualifier` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `ConcentrationCorrectedResult` float DEFAULT NULL,
  `ConcentrationCorrectedResultQualifier` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `ConcentrationResultUnit` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `ResultNotDetected` tinyint(4) DEFAULT NULL,
  `ResultComments` varchar(4000) COLLATE utf8mb4_bin DEFAULT NULL,
  `ReportingLimit` float DEFAULT NULL,
  `ReportingLimitUnit` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `token_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Doehrs Analyte Token Key_idx` (`token_id`),
  CONSTRAINT `Doehrs Analyte Token Key` FOREIGN KEY (`token_id`) REFERENCES `tolken_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doehrs_analyte_result_data`
--

LOCK TABLES `doehrs_analyte_result_data` WRITE;
/*!40000 ALTER TABLE `doehrs_analyte_result_data` DISABLE KEYS */;
INSERT INTO `doehrs_analyte_result_data` VALUES (1,'9115-062','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.518,NULL,NULL,NULL,'ug',0.22,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(2,'9115-062','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.412,NULL,NULL,NULL,'ug',0.175,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(3,'9115-066','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.5843,NULL,NULL,NULL,'ug',0.248,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(4,'9115-066','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.729,NULL,NULL,NULL,'ug',0.309,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(5,'9115-066','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.719,NULL,NULL,NULL,'ug',0.305,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(6,'9115-067','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.318,NULL,NULL,NULL,'ug',0.135,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(7,'9115-067','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.502,NULL,NULL,NULL,'ug',0.213,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(8,'9115-067','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.589,NULL,NULL,NULL,'ug',0.25,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(9,'9115-069','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.507,NULL,NULL,NULL,'ug',0.215,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(10,'9115-069','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.639,NULL,NULL,NULL,'ug',0.271,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(11,'9115-069','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.557,NULL,NULL,NULL,'ug',0.237,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(12,'9115-071','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.47,NULL,NULL,NULL,'ug',0.2,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(13,'9115-071','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.741,NULL,NULL,NULL,'ug',0.315,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(14,'9115-071','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.617,NULL,NULL,NULL,'ug',0.262,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(15,'8318-028','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.47,NULL,NULL,NULL,'ug',0.32,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(16,'8318-028','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.741,NULL,NULL,NULL,'ug',0.336,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(17,'8318-028','78-93-3','2-Butanone (methyl ethyl ketone)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.617,NULL,NULL,NULL,'ug',0.372,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(18,'9115-062','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',16.716,NULL,NULL,NULL,'ug',33.071,NULL,0.078,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(19,'9115-062','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',16.317,NULL,NULL,NULL,'ug',32.281,NULL,0.077,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(20,'9115-066','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',16.405,NULL,NULL,NULL,'ug',32.423,NULL,0.077,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(21,'9115-066','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',24.867,NULL,NULL,NULL,'ug',49.147,NULL,0.117,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(22,'9115-066','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',25.035,NULL,NULL,NULL,'ug',49.479,NULL,0.117,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(23,'9115-067','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',13.371,NULL,NULL,NULL,'ug',26.453,NULL,0.062,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(24,'9115-067','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',18.262,NULL,NULL,NULL,'ug',36.129,NULL,0.086,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(25,'9115-067','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',23.379,NULL,NULL,NULL,'ug',46.252,NULL,0.11,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(26,'9115-069','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',13.242,NULL,NULL,NULL,'ug',26.201,NULL,0.062,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(27,'9115-069','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',21.918,NULL,NULL,NULL,'ug',43.367,NULL,0.103,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(28,'9115-069','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',20.142,NULL,NULL,NULL,'ug',39.853,NULL,0.095,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(29,'9115-071','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',11.586,NULL,NULL,NULL,'ug',22.924,NULL,0.054,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(30,'9115-071','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',26.25,NULL,NULL,NULL,'ug',51.939,NULL,0.123,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(31,'9115-071','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',22.758,NULL,NULL,NULL,'ug',45.03,NULL,0.107,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(32,'8318-028','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',11.586,NULL,NULL,NULL,'ug',30.927,NULL,0.073,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(33,'8318-028','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',26.25,NULL,NULL,NULL,'ug',53.885,NULL,0.128,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(34,'8318-028','67-64-1','acetone','2019-06-11 17:52:00','OSU-6','TD/GC-MS',22.758,NULL,NULL,NULL,'ug',59.15,NULL,0.14,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(35,'9115-062','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',67.082,NULL,NULL,NULL,'ug',74.314,NULL,0.14,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(36,'9115-062','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',66.184,NULL,NULL,NULL,'ug',73.319,NULL,0.138,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(37,'9115-066','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',85.8163,NULL,NULL,NULL,'ug',94.972,NULL,0.179,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(38,'9115-066','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',81.509,NULL,NULL,NULL,'ug',90.206,NULL,0.17,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(39,'9115-066','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',84.813,NULL,NULL,NULL,'ug',93.862,NULL,0.177,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(40,'9115-067','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',62.01,NULL,NULL,NULL,'ug',68.695,NULL,0.129,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(41,'9115-067','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',66.343,NULL,NULL,NULL,'ug',73.495,NULL,0.138,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(42,'9115-067','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',74.997,NULL,NULL,NULL,'ug',83.082,NULL,0.156,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(43,'9115-069','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',67.983,NULL,NULL,NULL,'ug',75.321,NULL,0.142,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(44,'9115-069','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',76.876,NULL,NULL,NULL,'ug',85.174,NULL,0.16,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(45,'9115-069','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',72.084,NULL,NULL,NULL,'ug',79.865,NULL,0.15,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(46,'9115-071','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',80.111,NULL,NULL,NULL,'ug',88.758,NULL,0.167,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(47,'9115-071','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',93.22,NULL,NULL,NULL,'ug',103.282,NULL,0.194,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(48,'9115-071','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',86.323,NULL,NULL,NULL,'ug',95.641,NULL,0.18,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(49,'8318-028','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',80.111,NULL,NULL,NULL,'ug',109.861,NULL,0.207,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(50,'8318-028','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',93.22,NULL,NULL,NULL,'ug',124.061,NULL,0.234,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(51,'8318-028','64-17-5','Ethyl alcohol (ethanol)','2019-06-11 17:52:00','OSU-6','TD/GC-MS',86.323,NULL,NULL,NULL,'ug',105.173,NULL,0.198,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(52,'9115-062','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.388,NULL,NULL,NULL,'ug',0.462,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(53,'9115-062','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.233,NULL,NULL,NULL,'ug',0.278,NULL,0.001,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(54,'9115-066','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.9683,NULL,NULL,NULL,'ug',1.152,NULL,0.004,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(55,'9115-066','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.792,NULL,NULL,NULL,'ug',0.942,NULL,0.004,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(56,'9115-066','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.673,NULL,NULL,NULL,'ug',0.801,NULL,0.003,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(57,'9115-067','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.601,NULL,NULL,NULL,'ug',0.716,NULL,0.003,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(58,'9115-067','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.573,NULL,NULL,NULL,'ug',0.683,NULL,0.003,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(59,'9115-067','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.491,NULL,NULL,NULL,'ug',0.585,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(60,'9115-069','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.481,NULL,NULL,NULL,'ug',0.573,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(61,'9115-069','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.49,NULL,NULL,NULL,'ug',0.584,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(62,'9115-069','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.416,NULL,NULL,NULL,'ug',0.496,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(63,'9115-071','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.496,NULL,NULL,NULL,'ug',0.591,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(64,'9115-071','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.49,NULL,NULL,NULL,'ug',0.584,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(65,'9115-071','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.492,NULL,NULL,NULL,'ug',0.586,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(66,'8318-028','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.496,NULL,NULL,NULL,'ug',0.688,NULL,0.003,NULL,'PPB',0,'Sample Data',NULL,NULL,1),(67,'8318-028','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.49,NULL,NULL,NULL,'ug',0.625,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,2),(68,'8318-028','108-88-3','toulene','2019-06-11 17:52:00','OSU-6','TD/GC-MS',0.492,NULL,NULL,NULL,'ug',0.472,NULL,0.002,NULL,'PPB',0,'Sample Data',NULL,NULL,3),(69,'9115-062','75-07-0','acetaldehyde','2021-04-07 17:45:15','OSU-6','TD/GC-MS',0.22,NULL,NULL,NULL,'ug',0.22,NULL,0.22,NULL,'PPB',0,'Comments',NULL,NULL,1),(70,'9115-062','107-13-1','Acrylonitrile','2021-04-07 17:45:15','OSU-6','TD/GC-MS',0.33,NULL,NULL,NULL,'ug',0.33,NULL,0.33,NULL,'PPB',0,'Comments',NULL,NULL,1),(71,'9115-061','64-19-7','acetic acid','2021-04-07 18:01:35','OSU-6','TD/GC-MS',0.22,NULL,NULL,NULL,'ug',0.22,NULL,0.22,NULL,'PPB',0,'Comments',NULL,NULL,1),(72,'9115-061','98-82-8','cumene','2021-04-07 18:01:35','OSU-6','TD/GC-MS',0.11,NULL,NULL,NULL,'ug',0.11,NULL,0.11,NULL,'PPB',0,'Comments',NULL,NULL,1),(73,'9115-061','109-99-9','tetrahydrofuran','2021-04-07 18:01:35','OSU-6','TD/GC-MS',0.77,NULL,NULL,NULL,'ug',0.77,NULL,0.77,NULL,'PPB',0,'Comments',NULL,NULL,1),(74,'9115-061','75-07-0','acetaldehyde','2021-04-07 18:02:12','OSU-6','TD/GC-MS',0.22,NULL,NULL,NULL,'ug',0.22,NULL,0.22,NULL,'PPB',0,'C',NULL,NULL,2),(75,'9115-062','79-01-6','Trichloroethylene','2021-04-07 18:02:36','OSU-6','TD/GC-MS',0.69,NULL,NULL,NULL,'ug',0.34,NULL,0.34,NULL,'PPB',0,'Comments',NULL,NULL,3),(76,'1060-002','50-00-0','formaldehyde','2021-04-09 12:39:44','OSU-6','TD/GC-MS',21.38,NULL,NULL,NULL,'ug',1.012,NULL,18.31,NULL,'PPB',0,'Comments',NULL,NULL,1),(77,'1060-002','75-07-0','acetaldehyde','2021-04-09 12:39:44','OSU-6','TD/GC-MS',1.12,NULL,NULL,NULL,'ug',0.001,NULL,0.11,NULL,'PPB',0,'Comments',NULL,NULL,1),(78,'1060-002','107-02-8','acrolein','2021-04-09 12:39:44','OSU-6','TD/GC-MS',1.2,NULL,NULL,NULL,'ug',0.001,NULL,0.087,NULL,'PPB',0,'Comments',NULL,NULL,1),(79,'1060-002','75-07-0','acetaldehyde','2021-04-09 12:41:13','OSU-6','TD/GC-MS',0.118,NULL,NULL,NULL,'ug',0.001,NULL,0.098,NULL,'PPB',0,'Comments 2',NULL,NULL,2),(80,'1060-002','107-02-8','acrolein','2021-04-09 12:41:13','OSU-6','TD/GC-MS',0.135,NULL,NULL,NULL,'ug',0.052,NULL,0.23,NULL,'PPB',0,'Comments 2',NULL,NULL,2),(81,'1060-002','50-00-0','formaldehyde','2021-04-09 12:41:13','OSU-6','TD/GC-MS',24.22,NULL,NULL,NULL,'ug',11.21,NULL,14.56,NULL,'PPB',0,'Comments 2',NULL,NULL,2),(82,'1060-002','107-02-8','acrolein','2021-04-09 12:42:28','OSU-6','TD/GC-MS',0.087,NULL,NULL,NULL,'ug',0.003,NULL,0.102,NULL,'PPB',0,'Comments 3',NULL,NULL,3),(83,'1060-002','75-07-0','acetaldehyde','2021-04-09 12:42:28','OSU-6','TD/GC-MS',0.102,NULL,NULL,NULL,'ug',0.021,NULL,0.089,NULL,'PPB',0,'Comments 3',NULL,NULL,3),(84,'1060-002','50-00-0','formaldehyde','2021-04-09 12:42:28','OSU-6','TD/GC-MS',19.214,NULL,NULL,NULL,'ug',14.23,NULL,21.211,NULL,'PPB',0,'Comments 3',NULL,NULL,3),(85,'9116-001','100-41-4','ethyl benzene','2021-04-09 14:18:56','OSU-6','TD/GC-MS',32.235,NULL,NULL,NULL,'ug',28.321,NULL,21.333,NULL,'PPB',0,NULL,NULL,NULL,1),(86,'9116-001','100-41-4','ethyl benzene','2021-04-09 14:19:22','OSU-6','TD/GC-MS',38.654,NULL,NULL,NULL,'ug',31.333,NULL,26.321,NULL,'PPB',0,'test4',NULL,NULL,2),(87,'9116-001','100-41-4','ethyl benzene','2021-04-09 14:19:53','OSU-6','TD/GC-MS',40.121,NULL,NULL,NULL,'ug',35.654,NULL,31.333,NULL,'PPB',0,'test4',NULL,NULL,3),(88,'9115-059','108-88-3','toulene','2021-04-09 14:22:35','OSU-6','TD/GC-MS',21.32,NULL,NULL,NULL,'ug',21.32,NULL,21.32,NULL,'PPB',0,'test5',NULL,NULL,1),(89,'9115-059','108-88-3','toulene','2021-04-09 14:23:10','OSU-6','TD/GC-MS',24.21,NULL,NULL,NULL,'ug',18.456,NULL,12.321,NULL,'PPB',0,'test5',NULL,NULL,2),(90,'9115-059','108-88-3','toulene','2021-04-09 14:23:36','OSU-6','TD/GC-MS',31.321,NULL,NULL,NULL,'ug',16.645,NULL,12.111,NULL,'PPB',0,'test5',NULL,NULL,3),(91,'9116-003','108-88-3','toulene','2021-04-12 12:26:06','OSU-6','TD/GC-MS',0.288,NULL,NULL,NULL,'ug',0.312,NULL,0.232,NULL,'PPB',0,'Comments',NULL,NULL,1),(92,'9116-003','67-64-1','acetone','2021-04-12 12:26:06','OSU-6','TD/GC-MS',0.31,NULL,NULL,NULL,'ug',0.31,NULL,0.31,NULL,'PPB',0,'Comments',NULL,NULL,1),(93,'9116-003','108-88-3','toulene','2021-04-12 12:26:40','OSU-6','TD/GC-MS',0.22,NULL,NULL,NULL,'ug',0.14,NULL,0.13,NULL,'PPB',0,NULL,NULL,NULL,2),(94,'9116-003','67-64-1','acetone','2021-04-12 12:26:40','OSU-6','TD/GC-MS',0.31,NULL,NULL,NULL,'ug',0.29,NULL,0.27,NULL,'PPB',0,NULL,NULL,NULL,2),(95,'9116-003','67-64-1','acetone','2021-04-12 12:27:14','OSU-6','TD/GC-MS',0.25,NULL,NULL,NULL,'ug',0.2,NULL,0.16,NULL,'PPB',0,'Comments',NULL,NULL,3),(96,'9116-003','108-88-3','toulene','2021-04-12 12:27:14','OSU-6','TD/GC-MS',0.33,NULL,NULL,NULL,'ug',0.25,NULL,0.21,NULL,'PPB',0,'Comments',NULL,NULL,3),(97,'1060-004','108-88-3','toulene','2021-04-16 10:12:51','OSU-6','TD/GC-MS',0.24,NULL,NULL,NULL,'ug',0.24,NULL,0.24,NULL,'PPB',0,NULL,NULL,NULL,1),(98,'1060-004','108-88-3','toulene','2021-04-16 10:13:26','OSU-6','TD/GC-MS',0.21,NULL,NULL,NULL,'ug',0.21,NULL,0.21,NULL,'PPB',0,'Database checks',NULL,NULL,2),(99,'9116-000','108-88-3','toulene','2021-04-16 14:44:31','OSU-6','TD/GC-MS',0.23,NULL,NULL,NULL,'ug',0.23,NULL,0.23,NULL,'PPB',0,'Toulene Found',NULL,NULL,1),(100,'9116-000','108-88-3','toulene','2021-04-16 14:44:52','OSU-6','TD/GC-MS',0.24,NULL,NULL,NULL,'ug',0.24,NULL,0.24,NULL,'PPB',0,'Toulene found',NULL,NULL,2),(101,'9116-000','108-88-3','toulene','2021-04-16 14:45:19','OSU-6','TD/GC-MS',0.25,NULL,NULL,NULL,'ug',0.25,NULL,0.25,NULL,'PPB',0,'Toulene Found',NULL,NULL,3),(102,'9116-000','109-99-9','tetrahydrofuran','2021-04-16 14:58:18','OSU-6','TD/GC-MS',0.11,NULL,NULL,NULL,'ug',0.11,NULL,0.11,NULL,'PPB',0,'Toulene and Tetrahydrofuran found',NULL,NULL,1),(103,'9116-002','75-07-0','acetaldehyde','2021-04-16 14:59:36','OSU-6','TD/GC-MS',0.33,NULL,NULL,NULL,'ug',0.33,NULL,0.33,NULL,'PPB',0,NULL,NULL,NULL,1),(104,'9116-002','75-07-0','acetaldehyde','2021-04-16 15:00:29','OSU-6','TD/GC-MS',0.34,NULL,NULL,NULL,'ug',0.34,NULL,0.34,NULL,'PPB',0,'Acetaldehyde found',NULL,NULL,2),(105,'9116-002','75-07-0','acetaldehyde','2021-04-16 15:01:02','OSU-6','TD/GC-MS',0.36,NULL,NULL,NULL,'ug',0.36,NULL,0.36,NULL,'PPB',0,'Acetaldehyde found',NULL,NULL,3);
/*!40000 ALTER TABLE `doehrs_analyte_result_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `xplosafedb`.`doehrs_analyte_result_data_AFTER_INSERT` AFTER INSERT ON `doehrs_analyte_result_data` FOR EACH ROW
BEGIN
declare id int;
declare sumMassMeasured float;
declare sumConcMeasured float;
declare sumConcCorrected float;
declare sampleId varchar(20);
declare selectedDate Date;
declare comments varchar(4000);
    
Set id = NEW.id;
set sumMassMeasured = NEW.MassMeasuredResult;
set sumConcMeasured = NEW.ConcentrationMeasuredResult;
set sumConcCorrected = NEW.ConcentrationCorrectedResult;
set sampleId = NEW.AnalyteIdentifier;
set selectedDate = NEW.AnalyzedDateTime;
set comments = NEW.ResultComments;

Call doehrs_sample_added(id, sumMassMeasured, sumConcMeasured, sumConcCorrected, sampleId, selectedDate, comments);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `xplosafedb`.`doehrs_analyte_result_data_AFTER_UPDATE` AFTER UPDATE ON `doehrs_analyte_result_data` FOR EACH ROW
BEGIN
declare id int;
declare sumMassMeasured float;
declare sumConcMeasured float;
declare sumConcCorrected float;
declare prevMassMeasured float;
declare prevConcMeasured float;
declare prevConcCorrected float;
declare sampleId varchar(20);
declare selectedDate Date;
declare comments varchar(4000);

set sampleId = NEW.AnalyteIdentifier;
set selectedDate = NEW.AnalyzedDateTime;
set comments = NEW.ResultComments;

Set id = NEW.id;
set prevMassMeasured = OLD.`MassMeasuredResult`;
set prevConcMeasured = OLD.`ConcentrationMeasuredResult`;
set prevConcCorrected = OLD.`ConcentrationCorrectedResult`;
Call doehrs_sample_removed(id, prevMassMeasured, prevConcMeasured, prevConcCorrected, sampleId, selectedDate, comments);

set sumMassMeasured = NEW.`MassMeasuredResult`;
set sumConcMeasured = NEW.`ConcentrationMeasuredResult`;
set sumConcCorrected = NEW.`ConcentrationCorrectedResult`;
Call doehrs_sample_updated(id, sumMassMeasured, sumConcMeasured, sumConcCorrected, sampleId, selectedDate, comments);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `xplosafedb`.`doehrs_analyte_result_data_BEFORE_DELETE` BEFORE DELETE ON `doehrs_analyte_result_data` FOR EACH ROW
BEGIN
declare id int;
declare sumMassMeasured float;
declare sumConcMeasured float;
declare sumConcCorrected float;
declare sampleId varchar(20);
declare selectedDate Date;
declare comments varchar(4000);

Set id = OLD.id;
set sumMassMeasured = OLD.`MassMeasuredResult`;
set sumConcMeasured = OLD.`ConcentrationMeasuredResult`;
set sumConcCorrected = OLD.`ConcentrationCorrectedResult`;
set sampleId = OLD.AnalyteIdentifier;
set selectedDate = OLD.AnalyzedDateTime;
set comments = OLD.ResultComments;


Call doehrs_sample_removed(id, sumMassMeasured, sumConcMeasured, sumConcCorrected, sampleId, selectedDate, comments);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `doehrs_chain_of_custody_table`
--

DROP TABLE IF EXISTS `doehrs_chain_of_custody_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doehrs_chain_of_custody_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RelinquishedBy` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `RelinquishedDateTime` datetime DEFAULT NULL,
  `ReceivedBy` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `ReceivedDateTime` datetime DEFAULT NULL,
  `Comments` varchar(4000) COLLATE utf8mb4_bin DEFAULT NULL,
  `LabSampleId` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doehrs_chain_of_custody_table`
--

LOCK TABLES `doehrs_chain_of_custody_table` WRITE;
/*!40000 ALTER TABLE `doehrs_chain_of_custody_table` DISABLE KEYS */;
INSERT INTO `doehrs_chain_of_custody_table` VALUES (1,'Wearer','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-9115-062.','1-9115-062'),(2,'Peter','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-9115-066.','1-9115-066'),(3,'Michael','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-9115-069.','1-9115-069'),(4,'JarJar','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-9115-071.','1-9115-071'),(5,'Opeth','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-8318-028.','1-8318-028'),(6,'Alice','2019-05-31 17:52:00','Analyst','2019-06-11 17:52:00','Badge Serial Number: 1-9115-067. Badge Was Damaged (Caps were Missing)','1-9115-067'),(7,'Wearer','2021-03-01 15:24:00','Analyst','2021-03-02 15:24:00','Badge Serial Number: 1-9115-060. Badge Was Damaged (Tokens were gouged open)','1-9115-060'),(8,'matlock','2021-04-05 16:22:21','Peter','2021-04-05 16:22:21','Badge has been issued to wearer.','1-9116-001'),(9,'Manufacturer','2021-04-05 16:22:21','matlock','2021-04-05 16:22:21','Badge has been Accepted by Manager.','1-9116-001'),(10,'Manufacturer','2021-04-05 16:24:20','matlock','2021-04-05 16:24:20','Badge has been Accepted by Manager.','1-9116-001'),(11,'matlock','2021-04-05 16:24:20','Peter','2021-04-05 16:24:20','Badge has been issued to wearer.','1-9116-001'),(12,'Manufacturer','2021-04-05 16:26:27','matlock','2021-04-05 16:26:27','Badge has been Accepted by Manager.','1-9117-001'),(13,'matlock','2021-04-05 16:26:27','JarJar','2021-04-05 16:26:27','Badge has been issued to wearer.','1-9117-001'),(14,'Manufacturer','2021-04-05 16:26:41','matlock','2021-04-05 16:26:41','Badge has been Accepted by Manager.','1-9117-001'),(15,'matlock','2021-04-05 16:26:41','JarJar','2021-04-05 16:26:41','Badge has been issued to wearer.','1-9117-001'),(16,'Manufacturer','2021-04-05 16:26:55','matlock','2021-04-05 16:26:55','Badge has been Accepted by Manager.','1-9117-001'),(17,'matlock','2021-04-05 16:26:55','JarJar','2021-04-05 16:26:55','Badge has been issued to wearer.','1-9117-001'),(18,'Manufacturer','2021-04-05 16:27:42','matlock','2021-04-05 16:27:42','Badge has been Accepted by Manager.','1-9116-004'),(19,'matlock','2021-04-05 16:27:42','Peter','2021-04-05 16:27:42','Badge has been issued to wearer.','1-9116-004'),(20,'matlock','2021-04-05 16:29:03','Wearer','2021-04-05 16:29:03','Badge has been issued to wearer.','1-9116-002'),(21,'Manufacturer','2021-04-05 16:29:03','matlock','2021-04-05 16:29:03','Badge has been Accepted by Manager.','1-9116-002'),(22,'Manufacturer','2021-04-05 16:29:20','matlock','2021-04-05 16:29:20','Badge has been Accepted by Manager.','1-9117-002'),(23,'matlock','2021-04-05 16:29:20','Wearer','2021-04-05 16:29:20','Badge has been issued to wearer.','1-9117-002'),(24,'Manufacturer','2021-04-05 16:30:31','matlock','2021-04-05 16:30:31','Badge has been Accepted by Manager.','1-9117-000'),(25,'matlock','2021-04-05 16:30:31','Peter','2021-04-05 16:30:31','Badge has been issued to wearer.','1-9117-000'),(26,'Manufacturer','2021-04-05 16:30:45','matlock','2021-04-05 16:30:45','Badge has been Accepted by Manager.','1-1-001'),(27,'matlock','2021-04-05 16:30:45','mike','2021-04-05 16:30:45','Badge has been issued to wearer.','1-1-001'),(28,'Manufacturer','2021-04-05 16:51:29','matlock','2021-04-05 16:51:29','Badge has been Accepted by Manager.','1-1064-001'),(29,'matlock','2021-04-05 16:51:29','Peter','2021-04-05 16:51:29','Badge has been issued to wearer.','1-1064-001'),(30,'Manufacturer','2021-04-05 17:14:50','matlock','2021-04-05 17:14:50','Badge has been Accepted by Manager.','1-1064-002'),(31,'matlock','2021-04-05 17:14:50','Picah','2021-04-05 17:14:50','Badge has been issued to wearer.','1-1064-002'),(32,'Manufacturer','2021-04-05 17:18:27','matlock','2021-04-05 17:18:27','Badge has been Accepted by Manager.','1-1060-004'),(33,'matlock','2021-04-05 17:18:27','Peter','2021-04-05 17:18:27','Badge has been issued to wearer.','1-1060-004'),(34,'Manufacturer','2021-04-05 17:18:38','matlock','2021-04-05 17:18:38','Badge has been Accepted by Manager.','1-1060-006'),(35,'matlock','2021-04-05 17:18:38','Picah','2021-04-05 17:18:38','Badge has been issued to wearer.','1-1060-006'),(36,'Manufacturer','2021-04-05 17:20:19','matlock','2021-04-05 17:20:19','Badge has been Accepted by Manager.','1-1060-005'),(37,'matlock','2021-04-05 17:20:19','Wearer','2021-04-05 17:20:19','Badge has been issued to wearer.','1-1060-005'),(38,'Manufacturer','2021-04-05 17:25:54','matlock','2021-04-05 17:25:54','Badge has been Accepted by Manager.','1-1060-009'),(39,'matlock','2021-04-05 17:25:54','Picah','2021-04-05 17:25:54','Badge has been issued to wearer.','1-1060-009'),(40,'Manufacturer','2021-04-05 17:27:51','matlock','2021-04-05 17:27:51','Badge has been Accepted by Manager.','1-1060-001'),(41,'matlock','2021-04-05 17:27:51','Wearer','2021-04-05 17:27:51','Badge has been issued to wearer.','1-1060-001'),(42,'Manufacturer','2021-04-07 09:29:10','matlock','2021-04-07 09:29:10','Badge has been Accepted by Manager.','1-9115-061'),(43,'matlock','2021-04-07 09:29:10','JarJar','2021-04-07 09:29:10','Badge has been issued to wearer.','1-9115-061'),(44,'Manufacturer','2021-04-07 17:57:18','Matlock','2021-04-07 17:57:18','Badge has been Accepted by Manager.','1-1060-002'),(45,'Matlock','2021-04-07 17:57:18','Opeth','2021-04-07 17:57:18','Badge has been issued to wearer.','1-1060-002'),(46,'matlock','2021-04-08 11:50:25','matlock','2021-04-08 11:50:25','Badge has been accepted for analysis.','1-9115-061'),(47,'matlock','2021-04-08 11:50:25','matlock','2021-04-08 11:50:25','Badge has been accepted for analysis.','1-9115-061'),(48,'matlock','2021-04-08 11:50:25','matlock','2021-04-08 11:50:25','Badge has been accepted for analysis.','1-9115-061'),(49,'matlock','2021-04-09 12:19:40','matlock','2021-04-09 12:19:40','Badge has been accepted for analysis.','1-8318-028'),(50,'matlock','2021-04-09 12:19:40','matlock','2021-04-09 12:19:40','Badge has been accepted for analysis.','1-8318-028'),(51,'matlock','2021-04-09 12:19:40','matlock','2021-04-09 12:19:40','Badge has been accepted for analysis.','1-8318-028'),(52,'matlock','2021-04-09 12:42:47','matlock','2021-04-09 12:42:47','Badge has been accepted for analysis.','1-1060-002'),(53,'matlock','2021-04-09 12:42:47','matlock','2021-04-09 12:42:47','Badge has been accepted for analysis.','1-1060-002'),(54,'matlock','2021-04-09 12:42:47','matlock','2021-04-09 12:42:47','Badge has been accepted for analysis.','1-1060-002'),(55,'matlock','2021-04-09 14:08:36','matlock','2021-04-09 14:08:36','Badge has been accepted for analysis.','1-9116-003'),(56,'matlock','2021-04-09 14:08:36','matlock','2021-04-09 14:08:36','Badge has been accepted for analysis.','1-9116-003'),(57,'matlock','2021-04-09 14:08:36','matlock','2021-04-09 14:08:36','Badge has been accepted for analysis.','1-9116-003'),(58,'matlock','2021-04-09 14:20:07','matlock','2021-04-09 14:20:07','Badge has been accepted for analysis.','1-9116-001'),(59,'matlock','2021-04-09 14:20:07','matlock','2021-04-09 14:20:07','Badge has been accepted for analysis.','1-9116-001'),(60,'matlock','2021-04-09 14:20:07','matlock','2021-04-09 14:20:07','Badge has been accepted for analysis.','1-9116-001'),(61,'matlock','2021-04-09 14:23:43','matlock','2021-04-09 14:23:43','Badge has been accepted for analysis.','1-9115-059'),(62,'matlock','2021-04-09 14:23:43','matlock','2021-04-09 14:23:43','Badge has been accepted for analysis.','1-9115-059'),(63,'matlock','2021-04-09 14:23:43','matlock','2021-04-09 14:23:43','Badge has been accepted for analysis.','1-9115-059'),(64,'matlock','2021-04-12 12:27:18','matlock','2021-04-12 12:27:18','Badge has been accepted for analysis.','1-9116-003'),(65,'matlock','2021-04-12 12:27:18','matlock','2021-04-12 12:27:18','Badge has been accepted for analysis.','1-9116-003'),(66,'matlock','2021-04-12 12:27:18','matlock','2021-04-12 12:27:18','Badge has been accepted for analysis.','1-9116-003'),(67,'Manufacturer','2021-04-16 10:11:48','matlock','2021-04-16 10:11:48','Badge has been Accepted by Manager.','1-1060-007'),(68,'matlock','2021-04-16 10:11:48','Administrator','2021-04-16 10:11:48','Badge has been issued to wearer.','1-1060-007'),(69,'matlock','2021-04-16 10:13:30','matlock','2021-04-16 10:13:30','Badge has been accepted for analysis.','1-1060-004'),(70,'matlock','2021-04-16 10:13:30','matlock','2021-04-16 10:13:30','Badge has been accepted for analysis.','1-1060-004'),(71,'matlock','2021-04-16 14:45:24','matlock','2021-04-16 14:45:24','Badge has been accepted for analysis.','1-9116-000'),(72,'matlock','2021-04-16 14:45:24','matlock','2021-04-16 14:45:24','Badge has been accepted for analysis.','1-9116-000'),(73,'matlock','2021-04-16 14:45:24','matlock','2021-04-16 14:45:24','Badge has been accepted for analysis.','1-9116-000'),(74,'matlock','2021-04-16 14:58:27','matlock','2021-04-16 14:58:27','Badge has been accepted for analysis.','1-9116-000'),(75,'matlock','2021-04-16 15:01:06','matlock','2021-04-16 15:01:06','Badge has been accepted for analysis.','1-9116-000'),(76,'matlock','2021-04-16 15:01:06','matlock','2021-04-16 15:01:06','Badge has been accepted for analysis.','1-9116-002'),(77,'matlock','2021-04-16 15:01:06','matlock','2021-04-16 15:01:06','Badge has been accepted for analysis.','1-9116-002'),(78,'matlock','2021-04-16 15:01:06','matlock','2021-04-16 15:01:06','Badge has been accepted for analysis.','1-9116-002');
/*!40000 ALTER TABLE `doehrs_chain_of_custody_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doehrs_ih_lab_sample_analysis_results`
--

DROP TABLE IF EXISTS `doehrs_ih_lab_sample_analysis_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doehrs_ih_lab_sample_analysis_results` (
  `LabSampleId` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `Lab` int(11) DEFAULT NULL,
  PRIMARY KEY (`LabSampleId`),
  KEY `Doehrs IH Lab Key_idx` (`Lab`),
  CONSTRAINT `Doehrs IH Lab Key` FOREIGN KEY (`Lab`) REFERENCES `doehrs_lab_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doehrs_ih_lab_sample_analysis_results`
--

LOCK TABLES `doehrs_ih_lab_sample_analysis_results` WRITE;
/*!40000 ALTER TABLE `doehrs_ih_lab_sample_analysis_results` DISABLE KEYS */;
INSERT INTO `doehrs_ih_lab_sample_analysis_results` VALUES ('1-1060-002',1),('1-1060-004',1),('1-8318-028',1),('1-9115-059',1),('1-9115-067',1),('1-9115-069',1),('1-9115-071',1),('1-9116-000',1),('1-9116-001',1),('1-9116-002',1),('1-9116-003',1),('1-9115-062',2),('1-9115-066',2);
/*!40000 ALTER TABLE `doehrs_ih_lab_sample_analysis_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doehrs_lab_table`
--

DROP TABLE IF EXISTS `doehrs_lab_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doehrs_lab_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `LabName` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `LabCode` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `POCName` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `POCEmail` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `POCPhone` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doehrs_lab_table`
--

LOCK TABLES `doehrs_lab_table` WRITE;
/*!40000 ALTER TABLE `doehrs_lab_table` DISABLE KEYS */;
INSERT INTO `doehrs_lab_table` VALUES (1,'Longwave1','1','Matlock','Matlock.white@longwaveinc.com','(405)555-5555'),(2,'Longwave2','2','Caleb','Caleb.Dunham@longwaveinc.com','(405)555-5555'),(3,'Lab 1','AIPH','POC-1','POC1@test.com','(555)555-5555'),(4,'Lab 2','AIPHCR','POC-2','POC2@test.com','(555)555-5555'),(5,'Lab 3','CIHL-E','POC-3','POC3@test.com','(555)555-5555'),(6,'Lab 4','CIHL-W','POC-4','POC4@test.com','(555)555-5555'),(7,'Lab 5','USAFSAM-AD','POC-5','POC5@test.com','(555)555-5555'),(8,'Lab 6','USAFSAM-OEAL','POC-6','POC6@test.com','(555)555-5555'),(9,'Longwave2','2','Analyst','Analyst@test.com','(555)555-5555');
/*!40000 ALTER TABLE `doehrs_lab_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doehrs_sample_table`
--

DROP TABLE IF EXISTS `doehrs_sample_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doehrs_sample_table` (
  `SampleId` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `SampleFieldId` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL,
  `LabSampleId` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `SampleAnalyzedDate` date NOT NULL,
  `ResultsReportedDate` date DEFAULT NULL,
  `ResultsReturnedDate` date NOT NULL,
  `PostSampledWeight` float DEFAULT NULL,
  `NetWeight` float DEFAULT NULL,
  `LabSampleComments` varchar(4000) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`SampleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doehrs_sample_table`
--

LOCK TABLES `doehrs_sample_table` WRITE;
/*!40000 ALTER TABLE `doehrs_sample_table` DISABLE KEYS */;
INSERT INTO `doehrs_sample_table` VALUES ('1060-002','1-1060-002','1-1060-002','2021-04-09','2021-04-09','2021-04-09',21.38,40.702,'Comments'),('1060-004','1-1060-004','1-1060-004','2021-04-16','2021-04-16','2021-04-16',0.21,0.63,'Database checks'),('8318-028','1-8318-028','1-8318-028','2019-06-11','2019-06-12','2019-06-12',323.554,485.87,NULL),('9115-059','1-9115-059','1-9115-059','2021-04-09','2021-04-09','2021-04-09',31.321,60.077,'test5'),('9115-061','1-9115-061','1-9115-061','2021-04-09','2021-04-09','2021-04-09',0.34,1.02,'Sample Data'),('9115-062','1-9115-062','1-9115-062','2019-06-11','2019-06-12','2019-06-11',19.214,54.655,'Sample Data'),('9115-066','1-9115-066','1-9115-066','2019-06-11','2019-06-12','2019-06-12',322.909,413.846,NULL),('9115-067','1-9115-067','1-9115-067','2019-06-11','2019-06-12','2019-06-12',261.436,336.688,NULL),('9115-069','1-9115-069','1-9115-069','2019-06-11','2019-06-12','2019-06-12',275.335,352.157,NULL),('9115-071','1-9115-071','1-9115-071','2019-06-11','2019-06-12','2019-06-12',323.554,410.112,NULL),('9116-000','1-9116-000','1-9116-000','2021-04-16','2021-04-16','2021-04-16',0.11,0.33,'Toulene and Tetrahydrofuran found'),('9116-001','1-9116-001','1-9116-001','2021-04-09','2021-04-09','2021-04-09',40.121,107.108,'test4'),('9116-002','1-9116-002','1-9116-002','2021-04-16','2021-04-16','2021-04-16',0.36,1.08,'Acetaldehyde found'),('9116-003','1-9116-003','1-9116-003','2021-04-12','2021-04-12','2021-04-12',0.33,0.79,'Comments');
/*!40000 ALTER TABLE `doehrs_sample_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_audit_table`
--

DROP TABLE IF EXISTS `event_audit_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_audit_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `log_data` varchar(255) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `ip_endpoint` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User ID_idx` (`user_id`),
  KEY `Location_idx` (`location`),
  KEY `Event ID_idx` (`event_id`),
  KEY `Log Data_idx` (`log_data`),
  CONSTRAINT `Event Key` FOREIGN KEY (`event_id`) REFERENCES `event_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `User Key` FOREIGN KEY (`user_id`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2012 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_audit_table`
--

LOCK TABLES `event_audit_table` WRITE;
/*!40000 ALTER TABLE `event_audit_table` DISABLE KEYS */;
INSERT INTO `event_audit_table` VALUES (1,1,6,'Login Event',2,'2021-02-25 06:48:22.963','::1'),(2,2,6,'Logout Event',2,'2021-02-25 06:49:42.969','::1'),(3,1,7,'Login Event',2,'2021-02-25 06:49:50.126','::1'),(4,2,7,'Logout Event',2,'2021-02-25 06:51:12.429','::1'),(5,1,7,'Login Event',2,'2021-02-25 06:51:19.274','::1'),(6,2,7,'Logout Event',2,'2021-02-25 06:52:24.431','::1'),(7,1,1,'Login Event',1,'2021-02-25 06:52:31.216','::1'),(8,1,1,'Login Event',1,'2021-02-25 06:55:02.354','::1'),(9,2,1,'Logout Event',1,'2021-02-25 06:56:23.802','::1'),(10,1,2,'Login Event',1,'2021-02-25 09:05:22.287','::1'),(11,1,2,'Login Event',1,'2021-02-25 09:22:33.851','::1'),(12,2,2,'Logout Event',1,'2021-02-25 09:22:37.127','::1'),(13,1,2,'Login Event',1,'2021-02-25 09:22:41.861','::1'),(14,2,2,'Logout Event',1,'2021-02-25 09:30:55.226','::1'),(15,1,7,'Login Event',2,'2021-02-25 09:31:18.503','::1'),(16,2,7,'Logout Event',2,'2021-02-25 09:34:03.288','::1'),(17,1,6,'Login Event',2,'2021-02-25 09:34:08.450','::1'),(18,2,6,'Logout Event',2,'2021-02-25 09:39:30.282','::1'),(19,1,2,'Login Event',1,'2021-02-25 09:39:41.342','::1'),(20,3,2,'New Badge Created',1,'2021-02-25 09:41:46.264','::1'),(21,3,2,'New Badge Created',1,'2021-02-25 09:42:14.521','::1'),(22,2,2,'Logout Event',1,'2021-02-25 09:47:42.048','::1'),(23,1,2,'Login Event',1,'2021-02-25 09:47:47.022','::1'),(24,3,2,'New Badge Created',1,'2021-02-25 09:48:12.297','::1'),(25,1,2,'Login Event',1,'2021-02-25 10:02:57.267','::1'),(26,2,2,'Logout Event',1,'2021-02-25 10:04:00.452','::1'),(27,1,6,'Login Event',2,'2021-02-25 10:04:32.661','::1'),(28,2,6,'Logout Event',2,'2021-02-25 10:04:36.652','::1'),(29,1,1,'Login Event',1,'2021-02-25 10:04:59.436','::1'),(30,2,1,'Logout Event',1,'2021-02-25 10:09:04.190','::1'),(31,1,7,'Login Event',2,'2021-02-25 10:09:10.214','::1'),(32,2,7,'Logout Event',2,'2021-02-25 10:09:39.673','::1'),(33,1,1,'Login Event',1,'2021-02-25 10:09:47.755','::1'),(34,7,1,'User Information Updated',1,'2021-02-25 10:10:15.116','::1'),(35,1,1,'Login Event',1,'2021-02-25 10:22:39.405','::1'),(36,2,1,'Logout Event',1,'2021-02-25 10:24:36.620','::1'),(37,1,6,'Login Event',2,'2021-02-25 10:24:53.909','::1'),(38,2,6,'Logout Event',2,'2021-02-25 10:26:24.812','::1'),(39,1,7,'Login Event',2,'2021-02-25 10:26:37.142','::1'),(40,7,7,'User Information Updated',2,'2021-02-25 10:26:46.604','::1'),(41,7,7,'User Information Updated',2,'2021-02-25 10:26:54.255','::1'),(42,1,7,'Login Event',2,'2021-02-25 10:30:18.529','::1'),(43,7,7,'User Information Updated',2,'2021-02-25 10:30:47.451','::1'),(44,1,7,'Login Event',2,'2021-02-25 10:38:37.685','::1'),(45,7,7,'User Information Updated',2,'2021-02-25 10:38:47.687','::1'),(46,1,7,'Login Event',2,'2021-02-25 10:41:23.614','::1'),(47,7,7,'User Information Updated',2,'2021-02-25 10:41:32.448','::1'),(48,1,7,'Login Event',2,'2021-02-25 10:43:21.148','::1'),(49,7,7,'User Information Updated',2,'2021-02-25 10:43:28.475','::1'),(50,7,7,'User Information Updated',2,'2021-02-25 10:43:53.613','::1'),(51,7,7,'User Information Updated',2,'2021-02-25 10:44:02.049','::1'),(52,1,1,'Login Event',1,'2021-02-25 11:10:07.844','::1'),(53,7,1,'User Information Updated',1,'2021-02-25 11:10:57.014','::1'),(54,2,1,'Logout Event',1,'2021-02-25 11:16:14.423','::1'),(55,1,6,'Login Event',2,'2021-02-25 11:16:23.991','::1'),(56,2,6,'Logout Event',2,'2021-02-25 11:21:57.582','::1'),(57,1,7,'Login Event',2,'2021-02-25 11:22:05.024','::1'),(58,2,7,'Logout Event',2,'2021-02-25 11:22:06.611','::1'),(59,1,7,'Login Event',2,'2021-02-25 11:22:13.051','::1'),(60,2,7,'Logout Event',2,'2021-02-25 11:26:23.896','::1'),(61,1,2,'Login Event',1,'2021-02-25 17:21:14.244','::1'),(62,1,2,'Login Event',1,'2021-02-25 17:21:14.250','::1'),(63,1,2,'Login Event',1,'2021-02-26 17:14:34.378','::1'),(64,1,2,'Login Event',1,'2021-02-26 17:15:12.022','::1'),(65,1,2,'Login Event',1,'2021-02-26 17:20:17.795','::1'),(66,1,2,'Login Event',1,'2021-02-26 17:21:39.148','::1'),(67,1,2,'Login Event',1,'2021-02-26 17:23:18.831','::1'),(68,2,2,'Logout Event',1,'2021-02-26 17:24:14.530','::1'),(69,1,7,'Login Event',2,'2021-02-26 17:24:29.169','::1'),(70,1,2,'Login Event',1,'2021-02-26 17:25:50.463','::1'),(71,2,2,'Logout Event',1,'2021-02-26 17:27:50.437','::1'),(72,1,7,'Login Event',2,'2021-02-26 17:28:03.884','::1'),(73,1,2,'Login Event',1,'2021-03-01 00:47:17.181','::1'),(74,2,2,'Logout Event',1,'2021-03-01 00:48:13.405','::1'),(75,1,2,'Login Event',1,'2021-03-01 00:48:18.763','::1'),(76,1,2,'Login Event',1,'2021-03-01 01:31:54.667','::1'),(77,2,2,'Logout Event',1,'2021-03-01 01:32:59.015','::1'),(78,1,2,'Login Event',1,'2021-03-01 01:33:04.410','::1'),(79,1,2,'Login Event',1,'2021-03-01 01:35:30.499','::1'),(80,2,2,'Logout Event',1,'2021-03-01 01:37:46.636','::1'),(81,1,7,'Login Event',2,'2021-03-01 01:37:52.662','::1'),(82,1,2,'Login Event',1,'2021-03-01 01:39:15.009','::1'),(83,2,2,'Logout Event',1,'2021-03-01 01:40:51.745','::1'),(84,1,7,'Login Event',2,'2021-03-01 01:40:57.752','::1'),(85,1,2,'Login Event',1,'2021-03-01 01:41:42.077','::1'),(86,2,2,'Logout Event',1,'2021-03-01 01:42:38.737','::1'),(87,1,3,'Login Event',2,'2021-03-01 01:42:48.626','::1'),(88,1,1,'Login Event',1,'2021-03-01 01:42:57.952','::1'),(89,2,1,'Logout Event',1,'2021-03-01 01:43:01.313','::1'),(90,1,2,'Login Event',1,'2021-03-01 01:43:51.224','::1'),(91,1,2,'Login Event',1,'2021-03-01 02:04:01.006','::1'),(92,2,2,'Logout Event',1,'2021-03-01 02:10:59.309','::1'),(93,1,2,'Login Event',1,'2021-03-01 02:11:14.283','::1'),(94,1,2,'Login Event',1,'2021-03-01 02:27:06.444','::1'),(95,1,2,'Login Event',1,'2021-03-01 02:38:47.260','::1'),(96,1,2,'Login Event',1,'2021-03-01 02:41:05.777','::1'),(97,1,2,'Login Event',1,'2021-03-01 02:46:40.312','::1'),(98,1,2,'Login Event',1,'2021-03-01 02:50:11.449','::1'),(99,1,2,'Login Event',1,'2021-03-01 03:03:56.292','::1'),(100,2,2,'Logout Event',1,'2021-03-01 03:04:20.756','::1'),(101,1,2,'Login Event',1,'2021-03-01 03:08:19.057','::1'),(102,1,2,'Login Event',1,'2021-03-01 03:22:02.106','::1'),(103,1,7,'Login Event',2,'2021-03-01 03:22:54.329','::1'),(104,1,2,'Login Event',1,'2021-03-01 04:07:11.770','::1'),(105,2,2,'Logout Event',1,'2021-03-01 04:07:57.602','::1'),(106,1,7,'Login Event',2,'2021-03-01 04:08:05.184','::1'),(107,1,2,'Login Event',1,'2021-03-01 04:09:37.944','::1'),(108,1,2,'Login Event',1,'2021-03-01 04:24:42.059','::1'),(109,2,2,'Logout Event',1,'2021-03-01 04:25:01.334','::1'),(110,1,2,'Login Event',1,'2021-03-01 04:25:09.018','::1'),(111,7,2,'User Information Updated',1,'2021-03-01 04:25:20.965','::1'),(112,2,2,'Logout Event',1,'2021-03-01 04:25:25.561','::1'),(113,1,2,'Login Event',1,'2021-03-01 04:29:50.740','::1'),(114,7,2,'User Information Updated',1,'2021-03-01 04:30:41.414','::1'),(115,2,2,'Logout Event',1,'2021-03-01 04:30:47.652','::1'),(116,1,2,'Login Event',1,'2021-03-01 04:30:53.311','::1'),(117,7,2,'User Information Updated',1,'2021-03-01 04:31:00.213','::1'),(118,2,2,'Logout Event',1,'2021-03-01 04:31:08.609','::1'),(119,1,7,'Login Event',2,'2021-03-01 04:31:22.897','::1'),(120,7,7,'User Information Updated',2,'2021-03-01 04:31:34.179','::1'),(121,2,7,'Logout Event',2,'2021-03-01 04:32:02.564','::1'),(122,1,2,'Login Event',1,'2021-03-01 04:32:10.498','::1'),(123,7,2,'User Information Updated',1,'2021-03-01 04:32:19.929','::1'),(124,2,2,'Logout Event',1,'2021-03-01 04:32:22.947','::1'),(125,1,2,'Login Event',1,'2021-03-01 04:32:30.729','::1'),(126,2,2,'Logout Event',1,'2021-03-01 04:32:33.184','::1'),(127,1,2,'Login Event',1,'2021-03-01 04:39:01.804','::1'),(128,1,2,'Login Event',1,'2021-03-01 04:45:40.003','::1'),(129,2,2,'Logout Event',1,'2021-03-01 04:52:20.527','::1'),(130,1,2,'Login Event',1,'2021-03-01 04:54:36.947','::1'),(131,1,2,'Login Event',1,'2021-03-01 05:01:12.616','::1'),(132,1,2,'Login Event',1,'2021-03-01 05:05:48.928','::1'),(133,1,2,'Login Event',1,'2021-03-01 05:08:08.044','::1'),(134,1,2,'Login Event',1,'2021-03-01 05:19:11.846','::1'),(135,1,2,'Login Event',1,'2021-03-01 05:20:34.397','::1'),(136,1,2,'Login Event',1,'2021-03-01 05:31:45.407','::1'),(137,1,2,'Login Event',1,'2021-03-01 05:33:50.249','::1'),(138,2,2,'Logout Event',1,'2021-03-01 05:34:13.763','::1'),(139,1,2,'Login Event',1,'2021-03-01 05:39:23.554','::1'),(140,1,2,'Login Event',1,'2021-03-01 05:41:53.386','::1'),(141,1,2,'Login Event',1,'2021-03-01 05:46:56.180','::1'),(142,1,2,'Login Event',1,'2021-03-01 05:48:42.484','::1'),(143,1,2,'Login Event',1,'2021-03-01 05:50:02.175','::1'),(144,1,2,'Login Event',1,'2021-03-01 05:52:25.741','::1'),(145,2,2,'Logout Event',1,'2021-03-01 05:52:32.490','::1'),(146,1,7,'Login Event',2,'2021-03-01 05:52:38.250','::1'),(147,2,7,'Logout Event',2,'2021-03-01 05:52:42.749','::1'),(148,1,7,'Login Event',2,'2021-03-01 05:52:48.375','::1'),(149,2,7,'Logout Event',2,'2021-03-01 05:52:54.335','::1'),(150,1,2,'Login Event',1,'2021-03-01 05:54:50.583','::1'),(151,1,1,'Login Event',1,'2021-03-01 13:47:41.846','::1'),(152,2,1,'Logout Event',1,'2021-03-01 13:48:22.914','::1'),(153,1,2,'Login Event',1,'2021-03-01 14:08:56.601','::1'),(154,1,2,'Login Event',1,'2021-03-01 14:11:04.226','::1'),(155,1,3,'Login Event',2,'2021-03-01 14:16:38.862','::1'),(156,1,3,'Login Event',2,'2021-03-01 14:26:34.271','::1'),(157,1,1,'Login Event',1,'2021-03-01 14:32:51.363','::1'),(158,1,1,'Login Event',1,'2021-03-01 14:35:56.890','::1'),(159,1,10,'Login Event',1,'2021-03-01 14:37:59.161','::1'),(160,1,1,'Login Event',1,'2021-03-01 14:39:37.632','::1'),(161,2,3,'Logout Event',2,'2021-03-01 14:43:04.649','::1'),(162,1,3,'Login Event',2,'2021-03-01 15:07:52.290','::1'),(163,1,3,'Login Event',2,'2021-03-01 15:14:28.929','::1'),(164,1,3,'Login Event',2,'2021-03-01 15:15:58.341','::1'),(165,4,3,'Bage Issued',2,'2021-03-01 15:17:50.281','::1'),(166,1,3,'Login Event',2,'2021-03-01 15:20:57.033','::1'),(167,5,3,'Badge Turned In',2,'2021-03-01 15:24:32.730','::1'),(168,5,3,'Badge Turned In',2,'2021-03-01 15:24:43.855','::1'),(169,1,3,'Login Event',2,'2021-03-01 15:26:27.558','::1'),(170,5,3,'Badge Turned In',2,'2021-03-01 15:26:36.652','::1'),(171,4,3,'Bage Issued',2,'2021-03-01 15:26:53.521','::1'),(172,5,3,'Badge Turned In',2,'2021-03-01 15:27:21.129','::1'),(173,2,3,'Logout Event',2,'2021-03-01 15:28:10.216','::1'),(174,1,3,'Login Event',2,'2021-03-01 15:32:06.153','::1'),(175,5,3,'Badge Turned In',2,'2021-03-01 15:32:17.048','::1'),(176,2,3,'Logout Event',2,'2021-03-01 15:32:25.706','::1'),(177,1,1,'Login Event',1,'2021-03-01 15:32:35.073','::1'),(178,1,1,'Login Event',1,'2021-03-01 15:36:13.907','::1'),(179,1,1,'Login Event',1,'2021-03-01 15:37:05.198','::1'),(180,1,1,'Login Event',1,'2021-03-01 15:37:49.698','::1'),(181,2,1,'Logout Event',1,'2021-03-01 15:38:08.842','::1'),(182,1,3,'Login Event',2,'2021-03-01 15:38:14.128','::1'),(183,2,3,'Logout Event',2,'2021-03-01 15:40:54.527','::1'),(184,1,1,'Login Event',1,'2021-03-01 15:40:58.999','::1'),(185,2,1,'Logout Event',1,'2021-03-01 16:00:16.423','::1'),(186,1,3,'Login Event',2,'2021-03-01 16:00:24.518','::1'),(187,2,3,'Logout Event',2,'2021-03-01 16:00:26.969','::1'),(188,1,3,'Login Event',2,'2021-03-01 16:00:32.245','::1'),(189,5,3,'Badge Turned In',2,'2021-03-01 16:01:20.605','::1'),(190,2,3,'Logout Event',2,'2021-03-01 16:02:51.093','::1'),(191,1,3,'Login Event',2,'2021-03-01 16:04:15.735','::1'),(192,2,3,'Logout Event',2,'2021-03-01 16:04:19.779','::1'),(193,1,1,'Login Event',1,'2021-03-01 16:04:23.625','::1'),(194,2,1,'Logout Event',1,'2021-03-01 16:09:57.924','::1'),(195,1,1,'Login Event',1,'2021-03-01 16:10:01.948','::1'),(196,1,1,'Login Event',1,'2021-03-01 16:13:19.941','::1'),(197,1,1,'Login Event',1,'2021-03-01 16:28:06.875','::1'),(198,1,1,'Login Event',1,'2021-03-01 16:41:07.616','::1'),(199,1,1,'Login Event',1,'2021-03-01 16:42:08.625','::1'),(200,1,1,'Login Event',1,'2021-03-01 16:45:20.317','::1'),(201,1,1,'Login Event',1,'2021-03-01 16:46:14.261','::1'),(202,1,1,'Login Event',1,'2021-03-01 16:46:53.471','::1'),(203,2,1,'Logout Event',1,'2021-03-01 17:03:15.481','::1'),(204,1,1,'Login Event',1,'2021-03-01 17:04:08.958','::1'),(205,2,1,'Logout Event',1,'2021-03-01 17:04:20.739','::1'),(206,1,6,'Login Event',2,'2021-03-01 17:04:25.593','::1'),(207,1,3,'Login Event',2,'2021-03-01 17:04:29.528','::1'),(208,1,1,'Login Event',1,'2021-03-01 17:04:33.224','::1'),(209,2,1,'Logout Event',1,'2021-03-01 17:05:33.495','::1'),(210,1,6,'Login Event',2,'2021-03-01 17:05:37.806','::1'),(211,2,6,'Logout Event',2,'2021-03-01 17:07:00.016','::1'),(212,1,6,'Login Event',2,'2021-03-01 17:07:05.716','::1'),(213,1,1,'Login Event',1,'2021-03-01 17:07:14.950','::1'),(214,2,1,'Logout Event',1,'2021-03-01 17:07:23.612','::1'),(215,1,1,'Login Event',1,'2021-03-02 11:28:58.249','::1'),(216,1,1,'Login Event',1,'2021-03-02 11:31:07.503','::1'),(217,1,1,'Login Event',1,'2021-03-02 11:38:11.626','::1'),(218,1,1,'Login Event',1,'2021-03-02 11:41:04.882','::1'),(219,1,1,'Login Event',1,'2021-03-02 11:42:52.454','::1'),(220,1,1,'Login Event',1,'2021-03-02 11:58:43.735','::1'),(221,1,1,'Login Event',1,'2021-03-02 12:10:41.217','::1'),(222,1,1,'Login Event',1,'2021-03-02 12:26:54.502','::1'),(223,2,1,'Logout Event',1,'2021-03-02 12:31:36.941','::1'),(224,1,3,'Login Event',2,'2021-03-02 12:31:41.844','::1'),(225,1,3,'Login Event',2,'2021-03-02 12:35:43.244','::1'),(226,1,1,'Login Event',1,'2021-03-02 12:40:04.622','::1'),(227,2,1,'Logout Event',1,'2021-03-02 12:40:23.982','::1'),(228,1,3,'Login Event',2,'2021-03-02 12:40:43.927','::1'),(229,1,1,'Login Event',1,'2021-03-02 12:45:59.697','::1'),(230,1,1,'Login Event',1,'2021-03-02 12:48:52.534','::1'),(231,1,1,'Login Event',1,'2021-03-02 12:49:27.184','::1'),(232,3,1,'New Badge Created',1,'2021-03-02 12:50:18.703','::1'),(233,3,1,'New Badge Created',1,'2021-03-02 12:52:37.421','::1'),(234,3,1,'New Badge Created',1,'2021-03-02 12:52:39.697','::1'),(235,3,1,'New Badge Created',1,'2021-03-02 12:53:40.613','::1'),(236,3,1,'New Badge Created',1,'2021-03-02 12:53:41.096','::1'),(237,3,1,'New Badge Created',1,'2021-03-02 12:53:41.313','::1'),(238,3,1,'New Badge Created',1,'2021-03-02 12:53:55.761','::1'),(239,3,1,'New Badge Created',1,'2021-03-02 12:53:56.177','::1'),(240,3,1,'New Badge Created',1,'2021-03-02 12:53:56.426','::1'),(241,3,1,'New Badge Created',1,'2021-03-02 12:53:56.618','::1'),(242,3,1,'New Badge Created',1,'2021-03-02 12:54:21.094','::1'),(243,3,1,'New Badge Created',1,'2021-03-02 12:54:21.588','::1'),(244,3,1,'New Badge Created',1,'2021-03-02 12:54:21.786','::1'),(245,3,1,'New Badge Created',1,'2021-03-02 12:55:26.984','::1'),(246,1,1,'Login Event',1,'2021-03-02 12:58:22.992','::1'),(247,4,1,'Bage Issued',1,'2021-03-02 12:58:45.849','::1'),(248,3,1,'New Badge Created',1,'2021-03-02 12:59:38.645','::1'),(249,1,1,'Login Event',1,'2021-03-02 13:04:40.723','::1'),(250,4,1,'Bage Issued',1,'2021-03-02 13:04:55.428','::1'),(251,3,1,'New Badge Created',1,'2021-03-02 13:05:14.586','::1'),(252,1,1,'Login Event',1,'2021-03-02 13:08:17.864','::1'),(253,3,1,'New Badge Created',1,'2021-03-02 13:09:22.856','::1'),(254,4,1,'Bage Issued',1,'2021-03-02 13:09:34.091','::1'),(255,1,3,'Login Event',2,'2021-03-02 16:04:48.807','::1'),(256,2,3,'Logout Event',2,'2021-03-02 16:07:55.129','::1'),(257,1,7,'Login Event',2,'2021-03-02 16:08:02.131','::1'),(258,2,7,'Logout Event',2,'2021-03-02 16:47:05.458','::1'),(259,1,2,'Login Event',1,'2021-03-02 16:49:08.557','::1'),(260,1,2,'Login Event',1,'2021-03-02 17:01:37.914','::1'),(261,1,7,'Login Event',2,'2021-03-03 09:49:26.232','::1'),(262,2,7,'Logout Event',2,'2021-03-03 09:54:32.990','::1'),(263,1,3,'Login Event',2,'2021-03-03 09:54:38.744','::1'),(264,2,3,'Logout Event',2,'2021-03-03 09:55:37.253','::1'),(265,1,7,'Login Event',2,'2021-03-03 09:57:03.079','::1'),(266,2,7,'Logout Event',2,'2021-03-03 11:01:31.134','::1'),(267,1,3,'Login Event',2,'2021-03-03 11:01:40.581','::1'),(268,2,3,'Logout Event',2,'2021-03-03 11:06:52.919','::1'),(269,1,7,'Login Event',2,'2021-03-03 11:06:58.563','::1'),(270,1,3,'Login Event',2,'2021-03-03 14:19:55.431','::1'),(271,2,3,'Logout Event',2,'2021-03-03 14:20:01.731','::1'),(272,1,4,'Login Event',2,'2021-03-03 14:20:24.746','::1'),(273,2,4,'Logout Event',2,'2021-03-03 14:20:34.239','::1'),(274,1,6,'Login Event',2,'2021-03-03 14:20:41.687','::1'),(275,2,6,'Logout Event',2,'2021-03-03 14:20:58.379','::1'),(276,1,5,'Login Event',2,'2021-03-03 14:21:03.880','::1'),(277,2,5,'Logout Event',2,'2021-03-03 14:21:24.428','::1'),(278,1,7,'Login Event',2,'2021-03-03 14:21:32.729','::1'),(279,2,7,'Logout Event',2,'2021-03-03 14:21:32.772','::1'),(280,1,7,'Login Event',2,'2021-03-03 14:21:37.915','::1'),(281,2,7,'Logout Event',2,'2021-03-03 14:21:50.243','::1'),(282,1,8,'Login Event',2,'2021-03-03 14:21:58.887','::1'),(283,2,8,'Logout Event',2,'2021-03-03 14:22:04.434','::1'),(284,1,2,'Login Event',1,'2021-03-03 14:22:10.934','::1'),(285,1,2,'Login Event',1,'2021-03-03 14:22:19.107','::1'),(286,2,2,'Logout Event',1,'2021-03-03 14:23:26.654','::1'),(287,1,3,'Login Event',2,'2021-03-03 14:23:51.962','::1'),(288,2,3,'Logout Event',2,'2021-03-03 14:24:07.936','::1'),(289,1,2,'Login Event',1,'2021-03-03 14:24:13.470','::1'),(290,2,2,'Logout Event',1,'2021-03-03 14:24:18.017','::1'),(291,1,7,'Login Event',2,'2021-03-03 14:24:28.193','::1'),(292,2,7,'Logout Event',2,'2021-03-03 14:26:55.346','::1'),(293,1,1,'Login Event',1,'2021-03-05 10:37:02.447','::1'),(294,2,1,'Logout Event',1,'2021-03-05 10:37:02.620','::1'),(295,1,3,'Login Event',2,'2021-03-05 10:39:39.404','::1'),(296,2,3,'Logout Event',2,'2021-03-05 10:39:39.474','::1'),(297,1,3,'Login Event',2,'2021-03-05 10:51:52.342','::1'),(298,1,3,'Login Event',2,'2021-03-05 11:01:48.561','::1'),(299,1,3,'Login Event',2,'2021-03-05 11:06:49.939','::1'),(300,1,3,'Login Event',2,'2021-03-05 11:07:29.070','::1'),(301,1,3,'Login Event',2,'2021-03-05 11:13:44.186','::1'),(302,1,3,'Login Event',2,'2021-03-05 11:19:03.490','::1'),(303,1,3,'Login Event',2,'2021-03-05 11:20:48.633','::1'),(304,1,1,'Login Event',1,'2021-03-05 11:20:57.728','::1'),(305,1,3,'Login Event',2,'2021-03-05 11:31:06.117','::1'),(306,2,3,'Logout Event',2,'2021-03-05 11:31:50.810','::1'),(307,1,1,'Login Event',1,'2021-03-05 11:31:54.780','::1'),(308,1,1,'Login Event',1,'2021-03-05 11:35:32.715','::1'),(309,1,1,'Login Event',1,'2021-03-05 11:45:28.288','::1'),(310,2,1,'Logout Event',1,'2021-03-05 11:45:44.856','::1'),(311,1,3,'Login Event',2,'2021-03-05 11:45:49.723','::1'),(312,2,3,'Logout Event',2,'2021-03-05 11:46:38.547','::1'),(313,1,1,'Login Event',1,'2021-03-05 11:46:56.523','::1'),(314,2,1,'Logout Event',1,'2021-03-05 11:57:08.844','::1'),(315,1,1,'Login Event',1,'2021-03-05 11:57:13.246','::1'),(316,1,1,'Login Event',1,'2021-03-05 11:59:38.830','::1'),(317,2,1,'Logout Event',1,'2021-03-05 12:00:43.262','::1'),(318,1,3,'Login Event',2,'2021-03-05 12:00:49.394','::1'),(319,1,1,'Login Event',1,'2021-03-05 12:19:44.512','::1'),(320,2,1,'Logout Event',1,'2021-03-05 12:20:12.143','::1'),(321,1,3,'Login Event',2,'2021-03-05 12:20:16.305','::1'),(322,2,3,'Logout Event',2,'2021-03-05 12:20:16.361','::1'),(323,1,3,'Login Event',2,'2021-03-05 12:20:21.040','::1'),(324,2,3,'Logout Event',2,'2021-03-05 12:21:02.973','::1'),(325,1,3,'Login Event',2,'2021-03-05 12:21:09.211','::1'),(326,2,3,'Logout Event',2,'2021-03-05 12:22:12.500','::1'),(327,1,1,'Login Event',1,'2021-03-05 12:22:16.860','::1'),(328,2,1,'Logout Event',1,'2021-03-05 12:22:42.943','::1'),(329,1,3,'Login Event',2,'2021-03-05 12:22:48.028','::1'),(330,2,3,'Logout Event',2,'2021-03-05 12:22:58.596','::1'),(331,1,6,'Login Event',2,'2021-03-05 14:48:41.275','::1'),(332,2,6,'Logout Event',2,'2021-03-05 14:48:44.216','::1'),(333,1,5,'Login Event',2,'2021-03-05 14:48:48.727','::1'),(334,2,5,'Logout Event',2,'2021-03-05 14:49:02.155','::1'),(335,1,1,'Login Event',1,'2021-03-05 14:49:07.284','::1'),(336,2,1,'Logout Event',1,'2021-03-05 14:53:53.658','::1'),(337,1,1,'Login Event',1,'2021-03-05 15:16:22.841','::1'),(338,1,32,'Login Event',0,'2021-03-05 17:48:33.008','::1'),(339,1,32,'Login Event',0,'2021-03-05 18:06:03.737','::1'),(340,1,32,'Login Event',0,'2021-03-05 18:07:31.948','::1'),(341,2,32,'Logout Event',0,'2021-03-05 18:08:02.848','::1'),(342,1,2,'Login Event',1,'2021-03-05 18:25:30.855','::1'),(343,1,2,'Login Event',1,'2021-03-05 18:26:07.808','::1'),(344,2,2,'Logout Event',1,'2021-03-05 18:42:47.107','::1'),(345,1,2,'Login Event',1,'2021-03-08 10:22:49.699','::1'),(346,1,1,'Login Event',1,'2021-03-08 11:46:23.487','::1'),(347,1,1,'Login Event',1,'2021-03-08 11:56:26.861','::1'),(348,1,1,'Login Event',1,'2021-03-08 11:57:37.908','::1'),(349,1,1,'Login Event',1,'2021-03-08 11:59:11.093','::1'),(350,1,1,'Login Event',1,'2021-03-08 12:00:29.943','::1'),(351,1,1,'Login Event',1,'2021-03-08 12:02:23.170','::1'),(352,2,1,'Logout Event',1,'2021-03-08 12:17:38.964','::1'),(353,1,1,'Login Event',1,'2021-03-08 12:21:29.112','::1'),(354,2,1,'Logout Event',1,'2021-03-08 12:36:39.487','::1'),(355,1,1,'Login Event',1,'2021-03-08 12:37:36.450','::1'),(356,1,2,'Login Event',1,'2021-03-08 12:41:05.425','::1'),(357,2,2,'Logout Event',1,'2021-03-08 12:41:25.365','::1'),(358,1,1,'Login Event',1,'2021-03-08 12:46:41.678','::1'),(359,1,1,'Login Event',1,'2021-03-08 12:47:51.011','::1'),(360,2,1,'Logout Event',1,'2021-03-08 12:48:35.036','::1'),(361,1,5,'Login Event',2,'2021-03-08 12:48:40.118','::1'),(362,2,5,'Logout Event',2,'2021-03-08 13:04:05.415','::1'),(363,1,5,'Login Event',2,'2021-03-08 13:04:29.434','::1'),(364,1,5,'Login Event',2,'2021-03-08 13:11:14.449','::1'),(365,1,5,'Login Event',2,'2021-03-08 13:11:40.757','::1'),(366,1,5,'Login Event',2,'2021-03-08 13:15:56.936','::1'),(367,1,5,'Login Event',2,'2021-03-08 13:27:00.828','::1'),(368,1,1,'Login Event',1,'2021-03-08 13:29:24.984','::1'),(369,2,1,'Logout Event',1,'2021-03-08 13:29:27.718','::1'),(370,1,5,'Login Event',2,'2021-03-08 13:29:32.052','::1'),(371,1,5,'Login Event',2,'2021-03-08 13:42:08.822','::1'),(372,1,5,'Login Event',2,'2021-03-08 13:53:13.666','::1'),(373,1,5,'Login Event',2,'2021-03-08 13:57:07.280','::1'),(374,1,5,'Login Event',2,'2021-03-08 13:59:00.084','::1'),(375,1,5,'Login Event',2,'2021-03-08 14:00:07.557','::1'),(376,2,5,'Logout Event',2,'2021-03-08 14:03:52.140','::1'),(377,1,1,'Login Event',1,'2021-03-08 14:03:59.176','::1'),(378,1,2,'Login Event',1,'2021-03-08 14:06:08.311','::1'),(379,1,2,'Login Event',1,'2021-03-08 14:13:36.003','::1'),(380,2,1,'Logout Event',1,'2021-03-08 14:13:43.965','::1'),(381,1,6,'Login Event',2,'2021-03-08 14:13:48.457','::1'),(382,1,3,'Login Event',2,'2021-03-08 14:13:55.565','::1'),(383,2,3,'Logout Event',2,'2021-03-08 14:14:14.871','::1'),(384,1,8,'Login Event',2,'2021-03-08 14:14:20.810','::1'),(385,2,8,'Logout Event',2,'2021-03-08 14:17:54.321','::1'),(386,1,8,'Login Event',2,'2021-03-08 14:18:00.965','::1'),(387,2,8,'Logout Event',2,'2021-03-08 14:18:33.982','::1'),(388,1,8,'Login Event',2,'2021-03-08 14:18:40.089','::1'),(389,2,8,'Logout Event',2,'2021-03-08 14:18:45.204','::1'),(390,1,8,'Login Event',2,'2021-03-08 14:18:50.662','::1'),(391,1,2,'Login Event',1,'2021-03-08 14:21:37.348','::1'),(392,14,2,'Data has failed to Upload',1,'2021-03-08 14:21:52.195','::1'),(393,1,2,'Login Event',1,'2021-03-08 14:24:15.898','::1'),(394,2,8,'Logout Event',2,'2021-03-08 14:25:17.682','::1'),(395,1,6,'Login Event',2,'2021-03-08 14:25:26.461','::1'),(396,2,6,'Logout Event',2,'2021-03-08 14:25:29.169','::1'),(397,1,3,'Login Event',2,'2021-03-08 14:25:34.893','::1'),(398,2,3,'Logout Event',2,'2021-03-08 14:25:42.123','::1'),(399,1,6,'Login Event',2,'2021-03-08 14:25:47.094','::1'),(400,2,6,'Logout Event',2,'2021-03-08 14:25:49.589','::1'),(401,1,3,'Login Event',2,'2021-03-08 14:25:54.337','::1'),(402,2,3,'Logout Event',2,'2021-03-08 14:26:03.606','::1'),(403,1,2,'Login Event',1,'2021-03-08 14:35:02.846','::1'),(404,1,7,'Login Event',2,'2021-03-08 14:38:33.289','::1'),(405,1,2,'Login Event',1,'2021-03-08 14:38:43.716','::1'),(406,14,2,'Data has failed to Upload',1,'2021-03-08 14:39:00.413','::1'),(407,1,2,'Login Event',1,'2021-03-08 14:40:40.288','::1'),(408,1,2,'Login Event',1,'2021-03-08 14:44:17.350','::1'),(409,1,2,'Login Event',1,'2021-03-08 14:53:50.709','::1'),(410,14,2,'Data has failed to Upload',1,'2021-03-08 14:54:07.866','::1'),(411,2,7,'Logout Event',2,'2021-03-08 14:57:26.452','::1'),(412,1,2,'Login Event',1,'2021-03-08 15:03:53.348','::1'),(413,1,1,'Login Event',1,'2021-03-08 15:06:06.597','::1'),(414,1,2,'Login Event',1,'2021-03-08 15:07:32.886','::1'),(415,1,1,'Login Event',1,'2021-03-08 15:09:46.997','::1'),(416,1,2,'Login Event',1,'2021-03-08 15:10:57.871','::1'),(417,2,1,'Logout Event',1,'2021-03-08 15:17:09.102','::1'),(418,1,5,'Login Event',2,'2021-03-08 15:17:13.675','::1'),(419,1,2,'Login Event',1,'2021-03-08 15:26:16.059','::1'),(420,1,2,'Login Event',1,'2021-03-08 15:29:52.159','::1'),(421,14,2,'Data has failed to Upload',1,'2021-03-08 15:30:05.530','::1'),(422,2,5,'Logout Event',2,'2021-03-08 15:33:56.940','::1'),(423,1,1,'Login Event',1,'2021-03-08 15:34:41.540','::1'),(424,1,2,'Login Event',1,'2021-03-08 15:34:49.004','::1'),(425,14,2,'Data has failed to Upload',1,'2021-03-08 15:35:06.651','::1'),(426,1,2,'Login Event',1,'2021-03-08 15:45:48.304','::1'),(427,14,2,'Data has failed to Upload',1,'2021-03-08 15:46:17.414','::1'),(428,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-08 15:46:37.962','::1'),(429,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-08 15:52:19.074','::1'),(430,14,2,'Data has failed to Upload',1,'2021-03-08 15:54:01.161','::1'),(431,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-08 15:54:31.671','::1'),(432,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-08 15:54:49.073','::1'),(433,2,1,'Logout Event',1,'2021-03-08 15:56:42.066','::1'),(434,1,2,'Login Event',1,'2021-03-08 16:02:29.932','::1'),(435,14,2,'Data has failed to Upload',1,'2021-03-08 16:02:47.529','::1'),(436,1,2,'Login Event',1,'2021-03-08 16:12:43.012','::1'),(437,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-08 16:12:54.204','::1'),(438,1,1,'Login Event',1,'2021-03-08 16:36:07.210','::1'),(439,2,1,'Logout Event',1,'2021-03-08 16:36:21.409','::1'),(440,1,6,'Login Event',2,'2021-03-08 16:36:26.902','::1'),(441,2,6,'Logout Event',2,'2021-03-08 16:36:29.652','::1'),(442,1,8,'Login Event',2,'2021-03-08 16:36:34.711','::1'),(443,2,8,'Logout Event',2,'2021-03-08 16:36:44.435','::1'),(444,1,1,'Login Event',1,'2021-03-08 16:36:54.474','::1'),(445,2,1,'Logout Event',1,'2021-03-08 16:53:20.552','::1'),(446,2,2,'Logout Event',1,'2021-03-08 17:10:09.436','::1'),(447,1,2,'Login Event',1,'2021-03-08 23:59:39.908','::1'),(448,1,2,'Login Event',1,'2021-03-09 00:01:53.768','::1'),(449,1,2,'Login Event',1,'2021-03-09 00:03:39.615','::1'),(450,1,2,'Login Event',1,'2021-03-09 00:29:49.456','::1'),(451,2,2,'Logout Event',1,'2021-03-09 00:29:49.661','::1'),(452,1,2,'Login Event',1,'2021-03-09 13:44:30.314','::1'),(453,1,1,'Login Event',1,'2021-03-09 15:24:27.080','::1'),(454,2,1,'Logout Event',1,'2021-03-09 15:58:00.986','::1'),(455,1,1,'Login Event',1,'2021-03-10 09:44:27.092','::1'),(456,1,5,'Login Event',2,'2021-03-10 09:53:48.892','::1'),(457,1,1,'Login Event',1,'2021-03-10 10:15:02.946','::1'),(458,2,1,'Logout Event',1,'2021-03-10 10:15:03.112','::1'),(459,1,1,'Login Event',1,'2021-03-10 11:09:20.520','::1'),(460,1,1,'Login Event',1,'2021-03-10 11:10:42.217','::1'),(461,2,1,'Logout Event',1,'2021-03-10 11:13:16.693','::1'),(462,1,1,'Login Event',1,'2021-03-10 11:13:20.142','::1'),(463,1,1,'Login Event',1,'2021-03-10 11:14:57.753','::1'),(464,2,1,'Logout Event',1,'2021-03-10 11:38:23.470','::1'),(465,1,1,'Login Event',1,'2021-03-10 11:56:55.537','::1'),(466,1,1,'Login Event',1,'2021-03-10 11:58:21.470','::1'),(467,1,1,'Login Event',1,'2021-03-10 12:08:28.817','::1'),(468,1,1,'Login Event',1,'2021-03-10 12:12:43.204','::1'),(469,1,1,'Login Event',1,'2021-03-10 12:13:24.016','::1'),(470,1,1,'Login Event',1,'2021-03-10 12:14:25.095','::1'),(471,2,1,'Logout Event',1,'2021-03-10 12:14:34.735','::1'),(472,1,1,'Login Event',1,'2021-03-10 12:15:22.016','::1'),(473,2,1,'Logout Event',1,'2021-03-10 12:15:25.021','::1'),(474,1,1,'Login Event',1,'2021-03-10 12:15:28.446','::1'),(475,2,1,'Logout Event',1,'2021-03-10 12:19:12.648','::1'),(476,1,5,'Login Event',2,'2021-03-10 12:19:17.302','::1'),(477,2,5,'Logout Event',2,'2021-03-10 12:19:18.687','::1'),(478,1,3,'Login Event',2,'2021-03-10 12:24:11.004','::1'),(479,2,3,'Logout Event',2,'2021-03-10 12:24:18.196','::1'),(480,1,8,'Login Event',2,'2021-03-10 12:24:24.149','::1'),(481,1,8,'Login Event',2,'2021-03-10 12:25:59.886','::1'),(482,2,8,'Logout Event',2,'2021-03-10 12:27:32.005','::1'),(483,1,8,'Login Event',2,'2021-03-10 12:31:08.389','::1'),(484,1,8,'Login Event',2,'2021-03-10 12:31:15.059','::1'),(485,2,8,'Logout Event',2,'2021-03-10 12:31:20.824','::1'),(486,1,6,'Login Event',2,'2021-03-10 12:31:26.372','::1'),(487,2,6,'Logout Event',2,'2021-03-10 12:32:39.043','::1'),(488,1,4,'Login Event',2,'2021-03-10 12:34:47.984','::1'),(489,11,4,'User attempted to access restricted content',2,'2021-03-10 12:34:48.042','::1'),(490,8,4,'User Account Locked',2,'2021-03-10 12:34:48.043','::1'),(491,11,4,'User attempted to access restricted content',2,'2021-03-10 12:34:50.238','::1'),(492,8,4,'User Account Locked',2,'2021-03-10 12:34:50.238','::1'),(493,11,4,'User attempted to access restricted content',2,'2021-03-10 12:34:54.513','::1'),(494,8,4,'User Account Locked',2,'2021-03-10 12:34:54.514','::1'),(495,11,4,'User attempted to access restricted content',2,'2021-03-10 12:34:54.527','::1'),(496,8,4,'User Account Locked',2,'2021-03-10 12:34:54.528','::1'),(497,11,4,'User attempted to access restricted content',2,'2021-03-10 12:34:54.538','::1'),(498,8,4,'User Account Locked',2,'2021-03-10 12:34:54.539','::1'),(499,10,4,'Failed Login Attempt',2,'2021-03-10 12:35:04.476','::1'),(500,1,4,'Login Event',2,'2021-03-10 12:35:29.796','::1'),(501,11,4,'User attempted to access restricted content',2,'2021-03-10 12:35:31.635','::1'),(502,8,4,'User Account Locked',2,'2021-03-10 12:35:31.636','::1'),(503,10,4,'Failed Login Attempt',2,'2021-03-10 12:35:40.391','::1'),(504,1,4,'Login Event',2,'2021-03-10 12:42:53.947','::1'),(505,11,4,'User attempted to access restricted content',2,'2021-03-10 12:43:21.951','::1'),(506,8,4,'User Account Locked',2,'2021-03-10 12:43:21.952','::1'),(507,8,4,'User Account Locked',2,'2021-03-10 12:43:21.962','::1'),(508,11,4,'User attempted to access restricted content',2,'2021-03-10 12:43:21.961','::1'),(509,11,4,'User attempted to access restricted content',2,'2021-03-10 12:43:21.970','::1'),(510,8,4,'User Account Locked',2,'2021-03-10 12:43:21.976','::1'),(511,1,4,'Login Event',2,'2021-03-10 12:44:02.144','::1'),(512,2,4,'Logout Event',2,'2021-03-10 12:44:21.504','::1'),(513,1,9,'Login Event',2,'2021-03-10 12:44:35.667','::1'),(514,2,9,'Logout Event',2,'2021-03-10 12:45:53.542','::1'),(515,1,5,'Login Event',2,'2021-03-10 12:51:05.286','::1'),(516,2,5,'Logout Event',2,'2021-03-10 12:51:07.924','::1'),(517,1,6,'Login Event',2,'2021-03-10 12:51:12.621','::1'),(518,1,6,'Login Event',2,'2021-03-10 12:54:13.876','::1'),(519,1,6,'Login Event',2,'2021-03-10 13:04:02.073','::1'),(520,1,6,'Login Event',2,'2021-03-10 13:08:08.402','::1'),(521,1,6,'Login Event',2,'2021-03-10 13:09:49.384','::1'),(522,1,6,'Login Event',2,'2021-03-10 13:10:21.437','::1'),(523,1,6,'Login Event',2,'2021-03-10 13:13:34.275','::1'),(524,2,6,'Logout Event',2,'2021-03-10 13:29:03.577','::1'),(525,1,1,'Login Event',1,'2021-03-10 13:32:17.325','::1'),(526,2,1,'Logout Event',1,'2021-03-10 13:32:19.442','::1'),(527,1,6,'Login Event',2,'2021-03-10 13:32:23.061','::1'),(528,1,6,'Login Event',2,'2021-03-10 13:33:48.259','::1'),(529,1,6,'Login Event',2,'2021-03-10 13:40:17.291','::1'),(530,1,6,'Login Event',2,'2021-03-10 13:42:30.274','::1'),(531,1,6,'Login Event',2,'2021-03-10 13:47:16.814','::1'),(532,1,6,'Login Event',2,'2021-03-10 13:49:14.473','::1'),(533,1,6,'Login Event',2,'2021-03-10 13:56:31.778','::1'),(534,1,6,'Login Event',2,'2021-03-10 13:58:44.872','::1'),(535,1,6,'Login Event',2,'2021-03-10 13:59:38.556','::1'),(536,1,6,'Login Event',2,'2021-03-10 14:00:21.312','::1'),(537,1,6,'Login Event',2,'2021-03-10 14:02:04.129','::1'),(538,1,6,'Login Event',2,'2021-03-10 14:03:10.093','::1'),(539,1,1,'Login Event',1,'2021-03-10 14:03:39.818','::1'),(540,2,1,'Logout Event',1,'2021-03-10 14:03:42.674','::1'),(541,1,6,'Login Event',2,'2021-03-10 14:03:46.345','::1'),(542,1,6,'Login Event',2,'2021-03-10 14:07:03.301','::1'),(543,1,1,'Login Event',1,'2021-03-10 14:10:24.575','::1'),(544,2,1,'Logout Event',1,'2021-03-10 14:10:28.893','::1'),(545,1,6,'Login Event',2,'2021-03-10 14:10:36.419','::1'),(546,1,6,'Login Event',2,'2021-03-10 14:12:37.713','::1'),(547,1,6,'Login Event',2,'2021-03-10 14:19:18.949','::1'),(548,1,6,'Login Event',2,'2021-03-10 14:30:30.737','::1'),(549,1,6,'Login Event',2,'2021-03-10 14:32:39.531','::1'),(550,1,6,'Login Event',2,'2021-03-10 14:45:06.155','::1'),(551,1,6,'Login Event',2,'2021-03-10 14:46:16.657','::1'),(552,1,6,'Login Event',2,'2021-03-10 14:48:19.074','::1'),(553,1,6,'Login Event',2,'2021-03-10 14:50:57.792','::1'),(554,1,6,'Login Event',2,'2021-03-10 14:52:16.513','::1'),(555,1,6,'Login Event',2,'2021-03-10 14:52:57.351','::1'),(556,1,6,'Login Event',2,'2021-03-10 14:54:17.510','::1'),(557,1,6,'Login Event',2,'2021-03-10 14:54:42.263','::1'),(558,1,6,'Login Event',2,'2021-03-10 14:56:13.776','::1'),(559,1,6,'Login Event',2,'2021-03-10 14:56:38.936','::1'),(560,1,6,'Login Event',2,'2021-03-10 14:57:01.197','::1'),(561,1,6,'Login Event',2,'2021-03-10 15:09:01.598','::1'),(562,1,6,'Login Event',2,'2021-03-10 15:12:16.447','::1'),(563,1,6,'Login Event',2,'2021-03-10 15:24:34.418','::1'),(564,1,1,'Login Event',1,'2021-03-10 15:25:26.187','::1'),(565,2,1,'Logout Event',1,'2021-03-10 15:25:28.775','::1'),(566,1,6,'Login Event',2,'2021-03-10 15:25:32.534','::1'),(567,2,6,'Logout Event',2,'2021-03-10 15:40:45.433','::1'),(568,1,6,'Login Event',2,'2021-03-10 15:49:37.814','::1'),(569,1,2,'Login Event',1,'2021-03-10 15:59:02.760','::1'),(570,2,2,'Logout Event',1,'2021-03-10 15:59:02.891','::1'),(571,2,6,'Logout Event',2,'2021-03-10 16:04:50.111','::1'),(572,1,2,'Login Event',1,'2021-03-11 06:03:35.469','::1'),(573,1,2,'Login Event',1,'2021-03-11 06:07:54.458','::1'),(574,1,2,'Login Event',1,'2021-03-11 06:13:51.178','::1'),(575,1,2,'Login Event',1,'2021-03-11 06:18:00.664','::1'),(576,1,2,'Login Event',1,'2021-03-11 06:27:29.022','::1'),(577,1,2,'Login Event',1,'2021-03-11 06:31:22.729','::1'),(578,1,2,'Login Event',1,'2021-03-11 06:34:20.177','::1'),(579,1,2,'Login Event',1,'2021-03-11 06:48:23.340','::1'),(580,1,2,'Login Event',1,'2021-03-11 06:50:00.023','::1'),(581,1,2,'Login Event',1,'2021-03-11 06:59:23.652','::1'),(582,1,2,'Login Event',1,'2021-03-11 07:02:24.541','::1'),(583,1,2,'Login Event',1,'2021-03-11 07:07:02.375','::1'),(584,1,2,'Login Event',1,'2021-03-11 07:24:59.473','::1'),(585,2,2,'Logout Event',1,'2021-03-11 07:24:59.628','::1'),(586,1,2,'Login Event',1,'2021-03-11 07:47:26.428','::1'),(587,1,2,'Login Event',1,'2021-03-11 07:49:33.270','::1'),(588,1,2,'Login Event',1,'2021-03-11 07:51:28.474','::1'),(589,1,2,'Login Event',1,'2021-03-11 08:05:12.118','::1'),(590,1,2,'Login Event',1,'2021-03-11 08:09:09.679','::1'),(591,1,2,'Login Event',1,'2021-03-11 08:12:44.800','::1'),(592,1,2,'Login Event',1,'2021-03-11 08:22:36.558','::1'),(593,1,2,'Login Event',1,'2021-03-11 08:31:59.071','::1'),(594,1,2,'Login Event',1,'2021-03-11 08:33:01.277','::1'),(595,1,2,'Login Event',1,'2021-03-11 08:37:51.813','::1'),(596,1,2,'Login Event',1,'2021-03-11 08:43:43.070','::1'),(597,1,2,'Login Event',1,'2021-03-11 08:46:49.199','::1'),(598,1,2,'Login Event',1,'2021-03-11 08:54:12.706','::1'),(599,1,2,'Login Event',1,'2021-03-11 15:36:56.420','::1'),(600,2,2,'Logout Event',1,'2021-03-11 15:36:56.577','::1'),(601,1,2,'Login Event',1,'2021-03-11 16:21:41.133','::1'),(602,1,2,'Login Event',1,'2021-03-11 16:30:40.583','::1'),(603,1,2,'Login Event',1,'2021-03-11 16:33:10.311','::1'),(604,1,2,'Login Event',1,'2021-03-11 16:40:51.118','::1'),(605,2,2,'Logout Event',1,'2021-03-12 00:56:43.334','::1'),(606,1,2,'Login Event',1,'2021-03-12 10:48:55.230','::1'),(607,1,4,'Login Event',2,'2021-03-12 11:41:10.625','::1'),(608,1,4,'Login Event',2,'2021-03-12 11:50:54.369','::1'),(609,3,4,'New Badge Created',2,'2021-03-12 11:52:07.803','::1'),(610,3,4,'New Badge Created',2,'2021-03-12 11:52:17.053','::1'),(611,3,4,'New Badge Created',2,'2021-03-12 11:52:18.651','::1'),(612,3,4,'New Badge Created',2,'2021-03-12 11:52:19.790','::1'),(613,3,4,'New Badge Created',2,'2021-03-12 11:52:20.936','::1'),(614,1,1,'Login Event',1,'2021-03-12 11:54:13.275','::1'),(615,2,1,'Logout Event',1,'2021-03-12 11:54:15.939','::1'),(616,1,4,'Login Event',2,'2021-03-12 11:54:22.996','::1'),(617,1,4,'Login Event',2,'2021-03-12 11:56:57.205','::1'),(618,1,4,'Login Event',2,'2021-03-12 12:00:57.140','::1'),(619,1,1,'Login Event',1,'2021-03-12 12:04:40.029','::1'),(620,2,1,'Logout Event',1,'2021-03-12 12:04:43.411','::1'),(621,1,4,'Login Event',2,'2021-03-12 12:04:48.059','::1'),(622,3,4,'New Badge Created',2,'2021-03-12 12:06:23.885','::1'),(623,3,4,'New Badge Created',2,'2021-03-12 12:06:32.032','::1'),(624,3,4,'New Badge Created',2,'2021-03-12 12:06:36.958','::1'),(625,1,1,'Login Event',1,'2021-03-12 12:30:01.185','::1'),(626,1,4,'Login Event',2,'2021-03-12 12:30:09.936','::1'),(627,2,4,'Logout Event',2,'2021-03-12 12:30:10.046','::1'),(628,1,4,'Login Event',2,'2021-03-12 12:30:14.644','::1'),(629,1,4,'Login Event',2,'2021-03-12 12:34:13.441','::1'),(630,1,4,'Login Event',2,'2021-03-12 12:35:50.923','::1'),(631,1,4,'Login Event',2,'2021-03-12 12:37:46.579','::1'),(632,1,4,'Login Event',2,'2021-03-12 12:38:50.046','::1'),(633,1,2,'Login Event',1,'2021-03-12 12:43:16.582','::1'),(634,2,2,'Logout Event',1,'2021-03-12 12:43:16.828','::1'),(635,2,4,'Logout Event',2,'2021-03-12 12:54:17.097','::1'),(636,1,2,'Login Event',1,'2021-03-12 13:32:11.987','::1'),(637,1,2,'Login Event',1,'2021-03-12 13:33:03.152','::1'),(638,1,2,'Login Event',1,'2021-03-12 13:45:14.409','::1'),(639,1,2,'Login Event',1,'2021-03-12 13:47:46.135','::1'),(640,1,2,'Login Event',1,'2021-03-12 13:50:05.722','::1'),(641,1,2,'Login Event',1,'2021-03-12 13:59:54.159','::1'),(642,1,2,'Login Event',1,'2021-03-12 14:01:28.851','::1'),(643,1,2,'Login Event',1,'2021-03-12 14:03:50.351','::1'),(644,1,2,'Login Event',1,'2021-03-12 14:08:34.675','::1'),(645,1,2,'Login Event',1,'2021-03-12 14:18:01.499','::1'),(646,1,2,'Login Event',1,'2021-03-12 14:27:43.329','::1'),(647,1,2,'Login Event',1,'2021-03-12 14:35:14.393','::1'),(648,1,2,'Login Event',1,'2021-03-12 14:50:19.077','::1'),(649,2,2,'Logout Event',1,'2021-03-12 14:50:19.242','::1'),(650,1,4,'Login Event',2,'2021-03-12 14:56:57.864','::1'),(651,2,4,'Logout Event',2,'2021-03-12 14:58:47.398','::1'),(652,1,4,'Login Event',2,'2021-03-12 14:58:56.934','::1'),(653,3,4,'New Badge Created',2,'2021-03-12 15:02:03.629','::1'),(654,1,4,'Login Event',2,'2021-03-12 15:07:47.042','::1'),(655,1,4,'Login Event',2,'2021-03-12 15:09:48.876','::1'),(656,1,4,'Login Event',2,'2021-03-12 15:16:14.347','::1'),(657,1,4,'Login Event',2,'2021-03-12 15:18:11.429','::1'),(658,1,4,'Login Event',2,'2021-03-12 15:36:30.150','::1'),(659,2,4,'Logout Event',2,'2021-03-12 15:36:30.313','::1'),(660,1,4,'Login Event',2,'2021-03-12 15:36:36.007','::1'),(661,1,4,'Login Event',2,'2021-03-12 15:39:58.997','::1'),(662,1,4,'Login Event',2,'2021-03-12 15:41:46.126','::1'),(663,1,4,'Login Event',2,'2021-03-12 15:43:56.946','::1'),(664,1,4,'Login Event',2,'2021-03-12 15:46:58.457','::1'),(665,1,4,'Login Event',2,'2021-03-12 15:53:31.903','::1'),(666,1,2,'Login Event',1,'2021-03-14 12:38:16.959','::1'),(667,1,2,'Login Event',1,'2021-03-14 13:15:36.859','::1'),(668,2,2,'Logout Event',1,'2021-03-14 13:15:37.019','::1'),(669,1,4,'Login Event',2,'2021-03-15 09:43:12.411','::1'),(670,2,4,'Logout Event',2,'2021-03-15 09:43:14.627','::1'),(671,1,4,'Login Event',2,'2021-03-15 09:43:19.065','::1'),(672,1,4,'Login Event',2,'2021-03-15 09:45:31.097','::1'),(673,1,4,'Login Event',2,'2021-03-15 09:47:02.949','::1'),(674,1,4,'Login Event',2,'2021-03-15 09:49:55.781','::1'),(675,1,4,'Login Event',2,'2021-03-15 09:52:59.975','::1'),(676,1,4,'Login Event',2,'2021-03-15 09:56:33.085','::1'),(677,1,4,'Login Event',2,'2021-03-15 10:02:46.769','::1'),(678,1,4,'Login Event',2,'2021-03-15 10:12:26.921','::1'),(679,1,1,'Login Event',1,'2021-03-15 10:16:00.955','::1'),(680,1,1,'Login Event',1,'2021-03-15 10:16:07.903','::1'),(681,2,1,'Logout Event',1,'2021-03-15 10:16:36.103','::1'),(682,1,4,'Login Event',2,'2021-03-15 10:16:41.593','::1'),(683,3,4,'New Badge Created',2,'2021-03-15 10:17:38.502','::1'),(684,3,4,'New Badge Created',2,'2021-03-15 10:17:38.505','::1'),(685,3,4,'New Badge Created',2,'2021-03-15 10:17:38.508','::1'),(686,1,4,'Login Event',2,'2021-03-15 10:18:50.448','::1'),(687,3,4,'New Badge Created',2,'2021-03-15 10:21:25.220','::1'),(688,1,4,'Login Event',2,'2021-03-15 10:23:20.057','::1'),(689,3,4,'New Badge Created',2,'2021-03-15 10:23:32.616','::1'),(690,1,4,'Login Event',2,'2021-03-15 10:40:46.258','::1'),(691,2,4,'Logout Event',2,'2021-03-15 10:40:46.391','::1'),(692,1,4,'Login Event',2,'2021-03-15 10:40:51.387','::1'),(693,3,4,'New Badge Created',2,'2021-03-15 10:41:07.775','::1'),(694,1,4,'Login Event',2,'2021-03-15 10:43:08.511','::1'),(695,3,4,'New Badge Created',2,'2021-03-15 10:43:18.559','::1'),(696,1,4,'Login Event',2,'2021-03-15 10:49:57.430','::1'),(697,1,4,'Login Event',2,'2021-03-15 10:51:46.608','::1'),(698,3,4,'New Badge Created',2,'2021-03-15 10:52:00.845','::1'),(699,2,4,'Logout Event',2,'2021-03-15 11:07:20.243','::1'),(700,1,4,'Login Event',2,'2021-03-15 11:18:02.226','::1'),(701,1,4,'Login Event',2,'2021-03-15 11:19:04.713','::1'),(702,1,4,'Login Event',2,'2021-03-15 11:20:35.215','::1'),(703,1,4,'Login Event',2,'2021-03-15 11:22:46.158','::1'),(704,3,4,'New Badge Created',2,'2021-03-15 11:23:05.122','::1'),(705,1,4,'Login Event',2,'2021-03-15 11:27:51.401','::1'),(706,1,4,'Login Event',2,'2021-03-15 11:40:31.846','::1'),(707,1,4,'Login Event',2,'2021-03-15 11:44:23.384','::1'),(708,1,4,'Login Event',2,'2021-03-15 11:45:50.096','::1'),(709,1,4,'Login Event',2,'2021-03-15 11:48:24.283','::1'),(710,1,4,'Login Event',2,'2021-03-15 11:57:09.554','::1'),(711,1,4,'Login Event',2,'2021-03-15 11:59:14.709','::1'),(712,1,4,'Login Event',2,'2021-03-15 12:02:23.534','::1'),(713,1,4,'Login Event',2,'2021-03-15 12:06:33.560','::1'),(714,1,4,'Login Event',2,'2021-03-15 12:21:13.537','::1'),(715,1,4,'Login Event',2,'2021-03-15 12:22:08.727','::1'),(716,2,4,'Logout Event',2,'2021-03-15 12:22:08.829','::1'),(717,1,4,'Login Event',2,'2021-03-15 12:22:14.718','::1'),(718,1,4,'Login Event',2,'2021-03-15 12:23:19.875','::1'),(719,1,4,'Login Event',2,'2021-03-15 12:25:51.043','::1'),(720,1,4,'Login Event',2,'2021-03-15 12:26:50.934','::1'),(721,1,4,'Login Event',2,'2021-03-15 12:29:13.409','::1'),(722,1,4,'Login Event',2,'2021-03-15 12:34:35.403','::1'),(723,1,4,'Login Event',2,'2021-03-15 12:35:56.431','::1'),(724,1,4,'Login Event',2,'2021-03-15 12:36:35.645','::1'),(725,1,4,'Login Event',2,'2021-03-15 12:37:09.263','::1'),(726,1,4,'Login Event',2,'2021-03-15 12:43:08.243','::1'),(727,1,4,'Login Event',2,'2021-03-15 12:46:22.335','::1'),(728,1,4,'Login Event',2,'2021-03-15 12:47:25.781','::1'),(729,1,4,'Login Event',2,'2021-03-15 12:51:15.754','::1'),(730,1,4,'Login Event',2,'2021-03-15 12:57:24.746','::1'),(731,1,4,'Login Event',2,'2021-03-15 13:03:19.234','::1'),(732,1,4,'Login Event',2,'2021-03-15 13:05:40.970','::1'),(733,1,4,'Login Event',2,'2021-03-15 13:06:48.883','::1'),(734,1,4,'Login Event',2,'2021-03-15 13:10:06.364','::1'),(735,1,4,'Login Event',2,'2021-03-15 13:12:36.274','::1'),(736,1,4,'Login Event',2,'2021-03-15 13:13:59.380','::1'),(737,1,2,'Login Event',1,'2021-03-15 14:38:19.061','::1'),(738,1,2,'Login Event',1,'2021-03-15 14:40:48.393','::1'),(739,1,2,'Login Event',1,'2021-03-15 14:43:05.994','::1'),(740,1,2,'Login Event',1,'2021-03-15 15:01:05.457','::1'),(741,2,2,'Logout Event',1,'2021-03-15 15:01:05.668','::1'),(742,1,5,'Login Event',2,'2021-03-15 15:32:47.962','::1'),(743,2,5,'Logout Event',2,'2021-03-15 15:32:51.779','::1'),(744,1,6,'Login Event',2,'2021-03-15 15:32:57.083','::1'),(745,2,6,'Logout Event',2,'2021-03-15 15:33:00.122','::1'),(746,1,9,'Login Event',2,'2021-03-15 15:33:23.190','::1'),(747,1,9,'Login Event',2,'2021-03-15 15:35:05.483','::1'),(748,1,9,'Login Event',2,'2021-03-15 15:38:43.803','::1'),(749,1,9,'Login Event',2,'2021-03-15 15:40:25.273','::1'),(750,1,2,'Login Event',1,'2021-03-15 16:12:10.925','::1'),(751,1,4,'Login Event',2,'2021-03-15 16:12:46.930','::1'),(752,1,2,'Login Event',1,'2021-03-15 16:22:24.538','::1'),(753,2,4,'Logout Event',2,'2021-03-15 16:24:12.065','::1'),(754,1,1,'Login Event',1,'2021-03-15 16:24:18.414','::1'),(755,4,1,'Bage Issued',1,'2021-03-15 16:24:34.431','::1'),(756,1,2,'Login Event',1,'2021-03-15 16:24:35.044','::1'),(757,4,1,'Bage Issued',1,'2021-03-15 16:27:21.258','::1'),(758,3,1,'New Badge Created',1,'2021-03-15 16:30:16.254','::1'),(759,4,1,'Bage Issued',1,'2021-03-15 16:31:24.248','::1'),(760,1,1,'Login Event',1,'2021-03-15 16:34:45.756','::1'),(761,1,2,'Login Event',1,'2021-03-15 16:37:49.470','::1'),(762,1,2,'Login Event',1,'2021-03-15 16:47:51.497','::1'),(763,1,2,'Login Event',1,'2021-03-15 16:57:24.006','::1'),(764,1,2,'Login Event',1,'2021-03-15 17:03:26.832','::1'),(765,1,2,'Login Event',1,'2021-03-15 17:07:05.469','::1'),(766,1,2,'Login Event',1,'2021-03-15 17:09:35.831','::1'),(767,1,2,'Login Event',1,'2021-03-15 17:12:30.216','::1'),(768,1,2,'Login Event',1,'2021-03-15 20:09:09.344','::1'),(769,2,2,'Logout Event',1,'2021-03-15 20:09:09.514','::1'),(770,1,2,'Login Event',1,'2021-03-15 22:52:45.952','::1'),(771,14,2,'Data has failed to Upload',1,'2021-03-15 23:06:32.569','::1'),(772,14,2,'Data has failed to Upload',1,'2021-03-15 23:06:32.880','::1'),(773,1,2,'Login Event',1,'2021-03-15 23:07:58.735','::1'),(774,1,2,'Login Event',1,'2021-03-15 23:10:46.820','::1'),(775,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-15 23:12:29.994','::1'),(776,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-15 23:12:30.308','::1'),(777,1,2,'Login Event',1,'2021-03-15 23:23:54.601','::1'),(778,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-15 23:24:03.323','::1'),(779,1,2,'Login Event',1,'2021-03-15 23:30:53.239','::1'),(780,1,2,'Login Event',1,'2021-03-15 23:32:10.317','::1'),(781,1,2,'Login Event',1,'2021-03-15 23:34:04.075','::1'),(782,1,2,'Login Event',1,'2021-03-15 23:43:36.725','::1'),(783,1,2,'Login Event',1,'2021-03-15 23:44:15.323','::1'),(784,1,2,'Login Event',1,'2021-03-15 23:58:10.198','::1'),(785,1,2,'Login Event',1,'2021-03-16 00:02:02.117','::1'),(786,1,2,'Login Event',1,'2021-03-16 00:04:32.085','::1'),(787,1,2,'Login Event',1,'2021-03-16 00:26:53.410','::1'),(788,2,2,'Logout Event',1,'2021-03-16 00:26:53.649','::1'),(789,1,2,'Login Event',1,'2021-03-16 03:09:32.022','::1'),(790,1,2,'Login Event',1,'2021-03-16 03:12:08.545','::1'),(791,1,2,'Login Event',1,'2021-03-16 03:30:28.069','::1'),(792,2,2,'Logout Event',1,'2021-03-16 03:30:28.234','::1'),(793,1,2,'Login Event',1,'2021-03-16 03:44:01.164','::1'),(794,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-16 03:46:02.283','::1'),(795,1,2,'Login Event',1,'2021-03-16 04:05:44.205','::1'),(796,2,2,'Logout Event',1,'2021-03-16 04:05:44.425','::1'),(797,1,2,'Login Event',1,'2021-03-16 04:15:42.573','::1'),(798,1,2,'Login Event',1,'2021-03-16 04:17:33.513','::1'),(799,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-16 04:18:29.272','::1'),(800,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-16 04:21:06.100','::1'),(801,1,2,'Login Event',1,'2021-03-16 04:55:58.640','::1'),(802,1,2,'Login Event',1,'2021-03-16 05:07:36.785','::1'),(803,1,2,'Login Event',1,'2021-03-16 10:16:38.303','::1'),(804,1,2,'Login Event',1,'2021-03-16 10:22:49.394','::1'),(805,1,2,'Login Event',1,'2021-03-16 10:26:23.424','::1'),(806,1,2,'Login Event',1,'2021-03-16 10:54:30.327','::1'),(807,2,2,'Logout Event',1,'2021-03-16 10:54:30.485','::1'),(808,1,9,'Login Event',2,'2021-03-16 10:55:36.663','::1'),(809,1,2,'Login Event',1,'2021-03-16 11:37:28.230','::1'),(810,1,2,'Login Event',1,'2021-03-16 11:44:52.289','::1'),(811,1,2,'Login Event',1,'2021-03-16 11:47:49.295','::1'),(812,1,2,'Login Event',1,'2021-03-16 12:20:15.057','::1'),(813,2,2,'Logout Event',1,'2021-03-16 12:20:15.219','::1'),(814,1,1,'Login Event',1,'2021-03-16 12:26:55.500','::1'),(815,1,1,'Login Event',1,'2021-03-16 12:39:37.231','::1'),(816,2,1,'Logout Event',1,'2021-03-16 12:55:23.102','::1'),(817,1,1,'Login Event',1,'2021-03-16 13:04:52.614','::1'),(818,1,1,'Login Event',1,'2021-03-16 13:09:13.671','::1'),(819,1,1,'Login Event',1,'2021-03-16 13:11:51.623','::1'),(820,1,1,'Login Event',1,'2021-03-16 13:18:58.925','::1'),(821,1,1,'Login Event',1,'2021-03-16 13:23:25.228','::1'),(822,1,1,'Login Event',1,'2021-03-16 13:23:53.025','::1'),(823,1,1,'Login Event',1,'2021-03-16 13:25:44.224','::1'),(824,1,1,'Login Event',1,'2021-03-16 13:38:09.147','::1'),(825,1,1,'Login Event',1,'2021-03-16 13:41:22.939','::1'),(826,1,1,'Login Event',1,'2021-03-16 13:42:43.788','::1'),(827,2,1,'Logout Event',1,'2021-03-16 13:49:10.730','::1'),(828,1,4,'Login Event',2,'2021-03-16 13:49:16.116','::1'),(829,2,4,'Logout Event',2,'2021-03-16 14:03:30.891','::1'),(830,1,1,'Login Event',1,'2021-03-16 14:03:35.017','::1'),(831,2,1,'Logout Event',1,'2021-03-16 14:07:45.429','::1'),(832,1,9,'Login Event',2,'2021-03-16 14:08:26.564','::1'),(833,1,1,'Login Event',1,'2021-03-16 14:19:00.613','::1'),(834,2,1,'Logout Event',1,'2021-03-16 14:37:25.363','::1'),(835,1,2,'Login Event',1,'2021-03-16 16:14:07.772','::1'),(836,1,2,'Login Event',1,'2021-03-16 16:26:32.476','::1'),(837,1,2,'Login Event',1,'2021-03-16 16:37:14.151','::1'),(838,1,2,'Login Event',1,'2021-03-16 16:52:32.726','::1'),(839,2,2,'Logout Event',1,'2021-03-16 16:52:32.947','::1'),(840,1,2,'Login Event',1,'2021-03-17 10:26:52.620','::1'),(841,1,2,'Login Event',1,'2021-03-17 10:31:03.705','::1'),(842,1,2,'Login Event',1,'2021-03-17 10:43:55.454','::1'),(843,1,2,'Login Event',1,'2021-03-17 11:19:24.554','::1'),(844,2,2,'Logout Event',1,'2021-03-17 11:19:24.778','::1'),(845,1,1,'Login Event',1,'2021-03-18 12:16:01.671','::1'),(846,2,1,'Logout Event',1,'2021-03-18 12:37:18.459','::1'),(847,1,5,'Login Event',2,'2021-03-18 12:37:25.777','::1'),(848,2,5,'Logout Event',2,'2021-03-18 13:03:14.445','::1'),(849,1,8,'Login Event',2,'2021-03-18 13:03:20.164','::1'),(850,2,8,'Logout Event',2,'2021-03-18 13:03:25.217','::1'),(851,1,2,'Login Event',1,'2021-03-18 13:57:08.402','::1'),(852,1,2,'Login Event',1,'2021-03-18 14:04:26.286','::1'),(853,1,2,'Login Event',1,'2021-03-18 14:08:42.136','::1'),(854,1,2,'Login Event',1,'2021-03-18 14:13:16.802','::1'),(855,2,2,'Logout Event',1,'2021-03-18 14:37:02.014','::1'),(856,1,2,'Login Event',1,'2021-03-18 15:08:27.149','::ffff:127.0.0.1'),(857,1,2,'Login Event',1,'2021-03-18 15:13:02.314','::1'),(858,1,2,'Login Event',1,'2021-03-18 15:29:59.140','::1'),(859,1,2,'Login Event',1,'2021-03-18 15:39:44.824','::1'),(860,1,2,'Login Event',1,'2021-03-18 15:45:14.642','::1'),(861,1,2,'Login Event',1,'2021-03-18 15:47:04.298','::1'),(862,1,2,'Login Event',1,'2021-03-18 15:48:04.528','::1'),(863,1,2,'Login Event',1,'2021-03-18 15:53:24.987','::1'),(864,1,2,'Login Event',1,'2021-03-18 16:08:50.793','::1'),(865,1,2,'Login Event',1,'2021-03-18 16:26:45.666','::1'),(866,1,2,'Login Event',1,'2021-03-18 16:36:04.212','::1'),(867,1,2,'Login Event',1,'2021-03-18 16:43:03.707','::1'),(868,1,2,'Login Event',1,'2021-03-18 16:46:02.284','::1'),(869,1,2,'Login Event',1,'2021-03-18 17:01:45.277','::1'),(870,2,2,'Logout Event',1,'2021-03-18 17:01:45.491','::1'),(871,1,2,'Login Event',1,'2021-03-19 09:18:12.425','::1'),(872,1,2,'Login Event',1,'2021-03-19 09:19:52.905','::1'),(873,1,2,'Login Event',1,'2021-03-19 09:20:51.304','::1'),(874,1,2,'Login Event',1,'2021-03-19 09:21:35.007','::1'),(875,1,2,'Login Event',1,'2021-03-19 09:27:53.499','::1'),(876,1,2,'Login Event',1,'2021-03-19 09:31:23.772','::1'),(877,1,2,'Login Event',1,'2021-03-19 09:32:01.286','::1'),(878,1,1,'Login Event',1,'2021-03-19 13:12:40.680','::1'),(879,2,1,'Logout Event',1,'2021-03-19 13:12:46.384','::1'),(880,1,1,'Login Event',1,'2021-03-19 13:14:31.186','::1'),(881,1,1,'Login Event',1,'2021-03-19 13:15:24.668','::1'),(882,1,1,'Login Event',1,'2021-03-19 13:17:51.455','::1'),(883,1,5,'Login Event',2,'2021-03-19 13:21:44.294','::1'),(884,2,5,'Logout Event',2,'2021-03-19 13:22:25.172','::1'),(885,1,2,'Login Event',1,'2021-03-19 13:22:29.987','::1'),(886,2,2,'Logout Event',1,'2021-03-19 13:22:30.125','::1'),(887,2,1,'Logout Event',1,'2021-03-19 13:33:33.501','::1'),(888,1,1,'Login Event',1,'2021-03-19 13:36:55.335','::1'),(889,1,1,'Login Event',1,'2021-03-19 13:39:19.044','::1'),(890,1,1,'Login Event',1,'2021-03-19 13:43:18.719','::ffff:127.0.0.1'),(891,1,1,'Login Event',1,'2021-03-19 13:58:53.026','::1'),(892,21,1,'New Location has been added',1,'2021-03-19 13:59:17.208','::1'),(893,1,1,'Login Event',1,'2021-03-19 14:01:13.984','::1'),(894,21,1,'New Location has been added',1,'2021-03-19 14:01:33.221','::1'),(895,21,1,'New Location has been added',1,'2021-03-19 14:06:41.266','::1'),(896,1,1,'Login Event',1,'2021-03-19 14:15:58.579','::1'),(897,1,1,'Login Event',1,'2021-03-19 14:18:29.399','::1'),(898,1,1,'Login Event',1,'2021-03-19 14:24:25.921','::ffff:127.0.0.1'),(899,21,1,'New Location has been added',1,'2021-03-19 14:24:34.225','::ffff:127.0.0.1'),(900,1,1,'Login Event',1,'2021-03-19 14:26:05.688','::ffff:127.0.0.1'),(901,1,1,'Login Event',1,'2021-03-19 14:29:07.086','::1'),(902,1,1,'Login Event',1,'2021-03-19 15:02:22.386','::1'),(903,22,1,'Location has been Updated',1,'2021-03-19 15:03:32.751','::1'),(904,2,1,'Logout Event',1,'2021-03-19 15:18:32.829','::1'),(905,1,1,'Login Event',1,'2021-03-19 15:21:56.109','::1'),(906,22,1,'Location has been Updated',1,'2021-03-19 15:22:58.032','::1'),(907,1,1,'Login Event',1,'2021-03-19 15:26:51.621','::1'),(908,22,1,'Location has been Updated',1,'2021-03-19 15:27:06.372','::1'),(909,1,1,'Login Event',1,'2021-03-19 15:31:16.583','::1'),(910,22,1,'Location has been Updated',1,'2021-03-19 15:31:29.469','::1'),(911,1,1,'Login Event',1,'2021-03-19 15:39:46.396','::1'),(912,22,1,'Location has been Updated',1,'2021-03-19 15:39:58.735','::1'),(913,1,1,'Login Event',1,'2021-03-19 15:49:34.192','::1'),(914,21,1,'New Location has been added',1,'2021-03-19 15:49:49.491','::1'),(915,1,1,'Login Event',1,'2021-03-19 15:52:29.857','::1'),(916,22,1,'Location has been Updated',1,'2021-03-19 15:52:36.945','::1'),(917,1,1,'Login Event',1,'2021-03-19 15:54:04.563','::1'),(918,22,1,'Location has been Updated',1,'2021-03-19 15:54:15.830','::1'),(919,21,1,'New Location has been added',1,'2021-03-19 15:54:41.233','::1'),(920,22,1,'Location has been Updated',1,'2021-03-19 15:56:39.604','::1'),(921,21,1,'New Location has been added',1,'2021-03-19 15:57:55.662','::1'),(922,22,1,'Location has been Updated',1,'2021-03-19 15:58:40.530','::1'),(923,22,1,'Location has been Updated',1,'2021-03-19 15:59:03.366','::1'),(924,1,1,'Login Event',1,'2021-03-19 16:00:12.462','::1'),(925,1,1,'Login Event',1,'2021-03-19 16:00:47.842','::1'),(926,2,1,'Logout Event',1,'2021-03-19 16:18:57.213','::1'),(927,1,2,'Login Event',1,'2021-03-19 16:22:08.935','::1'),(928,1,2,'Login Event',1,'2021-03-19 16:23:23.979','::1'),(929,1,2,'Login Event',1,'2021-03-19 16:26:12.278','::1'),(930,1,2,'Login Event',1,'2021-03-19 16:28:24.746','::1'),(931,1,2,'Login Event',1,'2021-03-19 16:35:50.739','::1'),(932,1,1,'Login Event',1,'2021-03-19 16:40:52.287','::1'),(933,2,2,'Logout Event',1,'2021-03-19 16:53:48.631','::1'),(934,2,1,'Logout Event',1,'2021-03-19 17:01:34.854','::1'),(935,1,1,'Login Event',1,'2021-03-22 10:07:24.071','::1'),(936,22,1,'Location has been Updated',1,'2021-03-22 10:07:45.410','::1'),(937,2,1,'Logout Event',1,'2021-03-22 10:22:30.205','::1'),(938,1,4,'Login Event',2,'2021-03-22 10:22:35.592','::1'),(939,2,4,'Logout Event',2,'2021-03-22 10:29:56.920','::1'),(940,1,8,'Login Event',2,'2021-03-22 10:30:01.888','::1'),(941,2,8,'Logout Event',2,'2021-03-22 10:35:08.731','::1'),(942,1,8,'Login Event',2,'2021-03-22 10:46:55.086','::1'),(943,1,1,'Login Event',1,'2021-03-22 11:22:08.348','::1'),(944,1,1,'Login Event',1,'2021-03-22 11:28:20.489','::1'),(945,1,1,'Login Event',1,'2021-03-22 11:30:05.920','::1'),(946,1,1,'Login Event',1,'2021-03-22 11:31:01.247','::1'),(947,1,1,'Login Event',1,'2021-03-22 11:31:40.049','::1'),(948,1,1,'Login Event',1,'2021-03-22 11:32:55.533','::1'),(949,1,1,'Login Event',1,'2021-03-22 11:33:20.896','::1'),(950,2,1,'Logout Event',1,'2021-03-22 11:49:17.797','::1'),(951,1,1,'Login Event',1,'2021-03-22 11:54:47.057','::1'),(952,1,1,'Login Event',1,'2021-03-22 11:55:50.513','::1'),(953,1,1,'Login Event',1,'2021-03-22 11:56:43.050','::1'),(954,1,1,'Login Event',1,'2021-03-22 11:57:22.543','::1'),(955,1,1,'Login Event',1,'2021-03-22 11:57:57.007','::1'),(956,1,1,'Login Event',1,'2021-03-22 11:58:30.786','::1'),(957,1,1,'Login Event',1,'2021-03-22 12:00:18.248','::1'),(958,1,1,'Login Event',1,'2021-03-22 12:01:01.160','::1'),(959,1,1,'Login Event',1,'2021-03-22 12:02:42.540','::1'),(960,1,1,'Login Event',1,'2021-03-22 12:03:38.580','::1'),(961,1,1,'Login Event',1,'2021-03-22 12:04:48.665','::1'),(962,1,1,'Login Event',1,'2021-03-22 12:05:16.182','::1'),(963,1,1,'Login Event',1,'2021-03-22 12:05:38.371','::1'),(964,1,1,'Login Event',1,'2021-03-22 12:06:08.344','::1'),(965,1,1,'Login Event',1,'2021-03-22 12:06:32.054','::1'),(966,1,1,'Login Event',1,'2021-03-22 12:06:51.089','::1'),(967,1,1,'Login Event',1,'2021-03-22 12:07:30.614','::1'),(968,1,1,'Login Event',1,'2021-03-22 12:09:38.601','::1'),(969,1,1,'Login Event',1,'2021-03-22 12:10:05.484','::1'),(970,1,5,'Login Event',2,'2021-03-22 12:12:33.093','::1'),(971,1,5,'Login Event',2,'2021-03-22 12:13:44.444','::1'),(972,1,1,'Login Event',1,'2021-03-22 12:14:08.669','::1'),(973,2,1,'Logout Event',1,'2021-03-22 12:14:11.638','::1'),(974,1,5,'Login Event',2,'2021-03-22 12:14:15.741','::1'),(975,1,1,'Login Event',1,'2021-03-22 12:16:59.396','::1'),(976,1,1,'Login Event',1,'2021-03-22 12:19:49.994','::1'),(977,1,1,'Login Event',1,'2021-03-22 12:20:55.343','::1'),(978,1,4,'Login Event',2,'2021-03-22 12:29:49.460','::1'),(979,1,4,'Login Event',2,'2021-03-22 12:33:18.997','::1'),(980,1,4,'Login Event',2,'2021-03-22 12:35:32.087','::1'),(981,1,4,'Login Event',2,'2021-03-22 12:36:22.250','::1'),(982,1,1,'Login Event',1,'2021-03-22 12:38:04.275','::1'),(983,2,1,'Logout Event',1,'2021-03-22 12:38:04.402','::1'),(984,1,4,'Login Event',2,'2021-03-22 12:38:09.622','::1'),(985,1,3,'Login Event',2,'2021-03-22 12:44:50.142','::1'),(986,1,1,'Login Event',1,'2021-03-22 12:46:11.325','::1'),(987,1,1,'Login Event',1,'2021-03-22 12:47:26.960','::1'),(988,2,1,'Logout Event',1,'2021-03-22 12:47:41.327','::1'),(989,1,3,'Login Event',2,'2021-03-22 12:47:46.574','::1'),(990,1,1,'Login Event',1,'2021-03-22 12:50:08.951','::1'),(991,1,1,'Login Event',1,'2021-03-22 12:55:16.923','::1'),(992,1,1,'Login Event',1,'2021-03-22 12:57:02.616','::1'),(993,1,1,'Login Event',1,'2021-03-22 12:59:20.212','::1'),(994,1,1,'Login Event',1,'2021-03-22 13:00:15.641','::1'),(995,1,1,'Login Event',1,'2021-03-22 13:00:44.468','::1'),(996,1,1,'Login Event',1,'2021-03-22 13:05:45.848','::1'),(997,1,1,'Login Event',1,'2021-03-22 13:06:46.111','::1'),(998,2,1,'Logout Event',1,'2021-03-22 13:08:01.269','::1'),(999,1,1,'Login Event',1,'2021-03-22 13:12:13.905','::1'),(1000,1,1,'Login Event',1,'2021-03-22 13:16:48.337','::1'),(1001,2,1,'Logout Event',1,'2021-03-22 13:17:09.041','::1'),(1002,1,5,'Login Event',2,'2021-03-22 13:17:12.669','::1'),(1003,2,5,'Logout Event',2,'2021-03-22 13:17:12.729','::1'),(1004,1,6,'Login Event',2,'2021-03-22 13:17:27.121','::1'),(1005,2,6,'Logout Event',2,'2021-03-22 13:17:44.050','::1'),(1006,1,8,'Login Event',2,'2021-03-22 13:17:47.982','::1'),(1007,2,8,'Logout Event',2,'2021-03-22 13:17:48.034','::1'),(1008,1,4,'Login Event',2,'2021-03-22 13:18:07.385','::1'),(1009,2,4,'Logout Event',2,'2021-03-22 13:18:07.441','::1'),(1010,1,4,'Login Event',2,'2021-03-22 13:18:12.860','::1'),(1011,2,4,'Logout Event',2,'2021-03-22 13:18:18.990','::1'),(1012,1,3,'Login Event',2,'2021-03-22 13:18:23.583','::1'),(1013,2,3,'Logout Event',2,'2021-03-22 13:18:23.630','::1'),(1014,1,3,'Login Event',2,'2021-03-22 13:18:28.386','::1'),(1015,1,1,'Login Event',1,'2021-03-22 13:38:31.929','::1'),(1016,1,1,'Login Event',1,'2021-03-22 13:44:10.160','::1'),(1017,1,1,'Login Event',1,'2021-03-22 13:45:02.711','::1'),(1018,2,1,'Logout Event',1,'2021-03-22 13:46:17.001','::1'),(1019,1,1,'Login Event',1,'2021-03-22 13:50:57.109','::1'),(1020,1,1,'Login Event',1,'2021-03-22 13:53:05.689','::1'),(1021,2,1,'Logout Event',1,'2021-03-22 14:20:26.141','::1'),(1022,1,1,'Login Event',1,'2021-03-22 14:28:12.474','::1'),(1023,1,1,'Login Event',1,'2021-03-22 14:35:03.964','::1'),(1024,1,1,'Login Event',1,'2021-03-22 14:37:16.549','::1'),(1025,1,1,'Login Event',1,'2021-03-22 14:41:29.053','::1'),(1026,2,1,'Logout Event',1,'2021-03-22 14:42:47.199','::1'),(1027,1,8,'Login Event',2,'2021-03-22 14:42:52.672','::1'),(1028,2,8,'Logout Event',2,'2021-03-22 14:43:30.722','::1'),(1029,1,6,'Login Event',2,'2021-03-22 14:43:36.632','::1'),(1030,2,6,'Logout Event',2,'2021-03-22 14:44:18.093','::1'),(1031,1,5,'Login Event',2,'2021-03-22 14:44:21.591','::1'),(1032,2,5,'Logout Event',2,'2021-03-22 14:45:02.521','::1'),(1033,1,3,'Login Event',2,'2021-03-22 14:45:07.171','::1'),(1034,2,3,'Logout Event',2,'2021-03-22 14:45:07.216','::1'),(1035,1,3,'Login Event',2,'2021-03-22 14:45:10.998','::1'),(1036,2,3,'Logout Event',2,'2021-03-22 14:45:59.866','::1'),(1037,1,4,'Login Event',2,'2021-03-22 14:46:05.604','::1'),(1038,1,4,'Login Event',2,'2021-03-22 14:49:55.477','::1'),(1039,1,4,'Login Event',2,'2021-03-22 14:51:33.519','::1'),(1040,1,4,'Login Event',2,'2021-03-22 14:53:36.991','::1'),(1041,1,4,'Login Event',2,'2021-03-22 14:56:23.179','::1'),(1042,1,4,'Login Event',2,'2021-03-22 14:59:44.932','::1'),(1043,1,4,'Login Event',2,'2021-03-22 15:00:26.765','::1'),(1044,1,4,'Login Event',2,'2021-03-22 15:01:25.556','::1'),(1045,1,4,'Login Event',2,'2021-03-22 15:02:35.802','::1'),(1046,2,4,'Logout Event',2,'2021-03-22 15:18:05.897','::1'),(1047,1,1,'Login Event',1,'2021-03-22 15:18:39.224','::1'),(1048,2,1,'Logout Event',1,'2021-03-22 15:18:51.104','::1'),(1049,1,4,'Login Event',2,'2021-03-22 15:18:58.732','::1'),(1050,2,4,'Logout Event',2,'2021-03-22 15:19:35.931','::1'),(1051,1,8,'Login Event',2,'2021-03-22 15:19:46.792','::1'),(1052,2,8,'Logout Event',2,'2021-03-22 15:19:54.894','::1'),(1053,1,3,'Login Event',2,'2021-03-22 15:19:59.830','::1'),(1054,2,3,'Logout Event',2,'2021-03-22 15:20:05.292','::1'),(1055,1,6,'Login Event',2,'2021-03-22 15:24:16.967','::1'),(1056,2,6,'Logout Event',2,'2021-03-22 15:36:37.239','::1'),(1057,1,1,'Login Event',1,'2021-03-22 15:36:41.128','::1'),(1058,2,1,'Logout Event',1,'2021-03-22 15:38:13.108','::1'),(1059,1,8,'Login Event',2,'2021-03-22 15:38:17.747','::1'),(1060,2,8,'Logout Event',2,'2021-03-22 15:39:34.133','::1'),(1061,1,5,'Login Event',2,'2021-03-22 15:39:45.696','::1'),(1062,2,5,'Logout Event',2,'2021-03-22 15:40:07.872','::1'),(1063,1,3,'Login Event',2,'2021-03-22 15:40:18.337','::1'),(1064,2,3,'Logout Event',2,'2021-03-22 15:40:38.597','::1'),(1065,1,6,'Login Event',2,'2021-03-22 15:40:44.007','::1'),(1066,2,6,'Logout Event',2,'2021-03-22 15:40:51.317','::1'),(1067,1,8,'Login Event',2,'2021-03-22 15:41:29.475','::1'),(1068,2,8,'Logout Event',2,'2021-03-22 15:41:39.505','::1'),(1069,1,4,'Login Event',2,'2021-03-22 15:41:46.517','::1'),(1070,2,4,'Logout Event',2,'2021-03-22 15:41:59.426','::1'),(1071,1,3,'Login Event',2,'2021-03-22 15:42:04.439','::1'),(1072,2,3,'Logout Event',2,'2021-03-22 15:42:10.063','::1'),(1073,1,4,'Login Event',2,'2021-03-22 15:42:19.264','::1'),(1074,2,4,'Logout Event',2,'2021-03-22 15:42:22.101','::1'),(1075,1,6,'Login Event',2,'2021-03-22 15:47:45.419','::1'),(1076,2,6,'Logout Event',2,'2021-03-22 15:47:48.061','::1'),(1077,1,4,'Login Event',2,'2021-03-22 15:47:52.772','::1'),(1078,2,4,'Logout Event',2,'2021-03-22 15:47:56.756','::1'),(1079,1,8,'Login Event',2,'2021-03-22 15:48:01.226','::1'),(1080,2,8,'Logout Event',2,'2021-03-22 15:48:06.489','::1'),(1081,1,2,'Login Event',1,'2021-03-22 15:56:28.091','::1'),(1082,1,2,'Login Event',1,'2021-03-22 15:59:41.410','::1'),(1083,1,2,'Login Event',1,'2021-03-22 16:11:44.064','::1'),(1084,1,2,'Login Event',1,'2021-03-22 16:15:46.393','::1'),(1085,1,1,'Login Event',1,'2021-03-22 16:15:46.942','::1'),(1086,2,1,'Logout Event',1,'2021-03-22 16:15:51.420','::1'),(1087,1,6,'Login Event',2,'2021-03-22 16:15:55.572','::1'),(1088,2,6,'Logout Event',2,'2021-03-22 16:15:57.625','::1'),(1089,1,5,'Login Event',2,'2021-03-22 16:16:01.215','::1'),(1090,2,5,'Logout Event',2,'2021-03-22 16:18:32.408','::1'),(1091,1,6,'Login Event',2,'2021-03-22 16:18:37.905','::1'),(1092,2,6,'Logout Event',2,'2021-03-22 16:18:40.445','::1'),(1093,1,2,'Login Event',1,'2021-03-22 16:20:25.819','::1'),(1094,1,2,'Login Event',1,'2021-03-22 16:26:51.476','::1'),(1095,1,2,'Login Event',1,'2021-03-22 16:31:38.711','::1'),(1096,1,2,'Login Event',1,'2021-03-22 16:32:38.253','::1'),(1097,1,2,'Login Event',1,'2021-03-22 16:34:18.381','::1'),(1098,1,5,'Login Event',2,'2021-03-22 16:42:46.868','::1'),(1099,1,5,'Login Event',2,'2021-03-22 16:42:57.029','::1'),(1100,2,5,'Logout Event',2,'2021-03-22 16:45:23.300','::1'),(1101,1,6,'Login Event',2,'2021-03-22 16:45:27.791','::1'),(1102,2,6,'Logout Event',2,'2021-03-22 16:45:38.778','::1'),(1103,1,3,'Login Event',2,'2021-03-22 16:45:46.993','::1'),(1104,2,3,'Logout Event',2,'2021-03-22 16:46:47.457','::1'),(1105,1,8,'Login Event',2,'2021-03-22 16:46:54.128','::1'),(1106,2,8,'Logout Event',2,'2021-03-22 16:48:09.688','::1'),(1107,1,4,'Login Event',2,'2021-03-22 16:48:15.078','::1'),(1108,2,4,'Logout Event',2,'2021-03-22 16:50:40.092','::1'),(1109,1,2,'Login Event',1,'2021-03-22 16:50:45.697','::1'),(1110,2,2,'Logout Event',1,'2021-03-22 16:50:45.911','::1'),(1111,1,6,'Login Event',2,'2021-03-22 16:50:48.852','::1'),(1112,2,6,'Logout Event',2,'2021-03-22 16:56:42.153','::1'),(1113,1,6,'Login Event',2,'2021-03-22 16:56:52.177','::1'),(1114,2,6,'Logout Event',2,'2021-03-22 16:56:54.833','::1'),(1115,1,2,'Login Event',1,'2021-03-22 18:57:22.784','::1'),(1116,1,2,'Login Event',1,'2021-03-22 19:13:58.358','::1'),(1117,2,2,'Logout Event',1,'2021-03-22 19:13:58.534','::1'),(1118,1,2,'Login Event',1,'2021-03-23 06:25:29.263','::1'),(1119,1,2,'Login Event',1,'2021-03-23 06:29:04.574','::ffff:127.0.0.1'),(1120,1,2,'Login Event',1,'2021-03-23 06:31:55.599','::1'),(1121,1,2,'Login Event',1,'2021-03-23 06:43:05.757','::ffff:127.0.0.1'),(1122,1,2,'Login Event',1,'2021-03-23 06:49:02.448','::ffff:127.0.0.1'),(1123,1,2,'Login Event',1,'2021-03-23 06:50:43.268','::ffff:127.0.0.1'),(1124,1,2,'Login Event',1,'2021-03-23 06:52:46.944','::ffff:127.0.0.1'),(1125,1,2,'Login Event',1,'2021-03-23 06:55:46.189','::ffff:127.0.0.1'),(1126,1,2,'Login Event',1,'2021-03-23 09:32:37.658','::1'),(1127,2,2,'Logout Event',1,'2021-03-23 10:32:40.362','::1'),(1128,1,2,'Login Event',1,'2021-03-23 10:36:18.864','::1'),(1129,2,2,'Logout Event',1,'2021-03-23 10:55:11.904','::1'),(1130,1,2,'Login Event',1,'2021-03-23 14:29:56.671','::1'),(1131,1,2,'Login Event',1,'2021-03-23 14:41:30.781','::1'),(1132,1,2,'Login Event',1,'2021-03-23 14:44:20.285','::1'),(1133,1,2,'Login Event',1,'2021-03-23 14:49:45.189','::1'),(1134,1,1,'Login Event',1,'2021-03-24 10:14:40.830','::1'),(1135,1,1,'Login Event',1,'2021-03-24 10:15:39.670','::1'),(1136,1,1,'Login Event',1,'2021-03-24 10:15:43.537','::1'),(1137,1,1,'Login Event',1,'2021-03-24 11:43:14.859','::1'),(1138,1,1,'Login Event',1,'2021-03-24 12:05:23.203','::1'),(1139,1,1,'Login Event',1,'2021-03-24 12:09:07.681','::1'),(1140,2,1,'Logout Event',1,'2021-03-24 12:10:38.558','::1'),(1141,1,5,'Login Event',2,'2021-03-24 12:10:43.022','::1'),(1142,2,5,'Logout Event',2,'2021-03-24 12:11:12.736','::1'),(1143,1,1,'Login Event',1,'2021-03-24 12:12:46.001','::1'),(1144,1,1,'Login Event',1,'2021-03-24 12:17:27.173','::1'),(1145,1,5,'Login Event',2,'2021-03-24 12:33:09.703','::1'),(1146,2,5,'Logout Event',2,'2021-03-24 12:34:08.604','::1'),(1147,1,5,'Login Event',2,'2021-03-24 12:34:18.034','::1'),(1148,1,5,'Login Event',2,'2021-03-24 12:51:04.810','::1'),(1149,2,5,'Logout Event',2,'2021-03-24 12:51:04.949','::1'),(1150,1,1,'Login Event',1,'2021-03-24 13:04:38.962','::1'),(1151,2,1,'Logout Event',1,'2021-03-24 13:04:39.081','::1'),(1152,1,1,'Login Event',1,'2021-03-24 13:08:34.011','::1'),(1153,1,1,'Login Event',1,'2021-03-24 13:09:27.543','::1'),(1154,2,1,'Logout Event',1,'2021-03-24 13:09:48.608','::1'),(1155,1,6,'Login Event',2,'2021-03-24 13:10:41.670','::1'),(1156,2,6,'Logout Event',2,'2021-03-24 13:10:55.691','::1'),(1157,1,1,'Login Event',1,'2021-03-24 13:21:16.857','::1'),(1158,1,1,'Login Event',1,'2021-03-24 13:25:06.822','::1'),(1159,1,1,'Login Event',1,'2021-03-24 13:26:24.553','::1'),(1160,1,1,'Login Event',1,'2021-03-24 13:28:06.832','::1'),(1161,1,2,'Login Event',1,'2021-03-24 13:48:10.448','::1'),(1162,2,2,'Logout Event',1,'2021-03-24 13:48:43.060','::1'),(1163,1,2,'Login Event',1,'2021-03-24 13:48:49.523','::1'),(1164,1,2,'Login Event',1,'2021-03-24 13:51:49.103','::1'),(1165,1,1,'Login Event',1,'2021-03-24 15:13:01.768','::1'),(1166,1,1,'Login Event',1,'2021-03-24 15:19:36.349','::1'),(1167,2,1,'Logout Event',1,'2021-03-24 15:21:29.013','::1'),(1168,1,6,'Login Event',2,'2021-03-24 15:21:40.421','::1'),(1169,2,6,'Logout Event',2,'2021-03-24 15:21:50.580','::1'),(1170,1,1,'Login Event',1,'2021-03-24 15:21:55.015','::1'),(1171,2,1,'Logout Event',1,'2021-03-24 15:28:45.866','::1'),(1172,1,5,'Login Event',2,'2021-03-24 15:28:50.223','::1'),(1173,2,5,'Logout Event',2,'2021-03-24 15:30:37.042','::1'),(1174,1,1,'Login Event',1,'2021-03-24 15:30:42.201','::1'),(1175,2,2,'Logout Event',1,'2021-03-24 15:40:43.224','::1'),(1176,2,1,'Logout Event',1,'2021-03-24 15:50:45.944','::1'),(1177,1,1,'Login Event',1,'2021-03-24 16:01:50.293','::1'),(1178,1,1,'Login Event',1,'2021-03-24 16:01:59.973','::1'),(1179,1,1,'Login Event',1,'2021-03-24 16:07:43.164','::1'),(1180,1,1,'Login Event',1,'2021-03-24 16:10:46.346','::1'),(1181,1,1,'Login Event',1,'2021-03-24 16:13:18.909','::1'),(1182,1,1,'Login Event',1,'2021-03-24 16:15:21.420','::1'),(1183,1,1,'Login Event',1,'2021-03-24 16:16:53.939','::1'),(1184,1,1,'Login Event',1,'2021-03-24 16:22:05.324','::1'),(1185,1,1,'Login Event',1,'2021-03-24 16:25:01.656','::1'),(1186,1,1,'Login Event',1,'2021-03-24 16:26:41.258','::1'),(1187,1,1,'Login Event',1,'2021-03-24 16:44:21.175','::1'),(1188,1,1,'Login Event',1,'2021-03-24 16:46:46.238','::1'),(1189,1,1,'Login Event',1,'2021-03-24 16:49:21.555','::1'),(1190,1,1,'Login Event',1,'2021-03-24 16:53:56.747','::1'),(1191,1,1,'Login Event',1,'2021-03-24 16:56:15.111','::1'),(1192,1,1,'Login Event',1,'2021-03-24 16:56:57.658','::1'),(1193,1,1,'Login Event',1,'2021-03-24 17:05:06.759','::1'),(1194,1,1,'Login Event',1,'2021-03-24 17:07:47.163','::1'),(1195,1,1,'Login Event',1,'2021-03-24 17:11:32.301','::1'),(1196,1,1,'Login Event',1,'2021-03-24 17:13:40.193','::1'),(1197,1,1,'Login Event',1,'2021-03-24 17:15:34.797','::1'),(1198,2,1,'Logout Event',1,'2021-03-24 17:21:45.543','::1'),(1199,1,6,'Login Event',2,'2021-03-24 17:21:50.038','::1'),(1200,2,6,'Logout Event',2,'2021-03-24 17:22:15.516','::1'),(1201,1,1,'Login Event',1,'2021-03-24 17:37:21.938','::1'),(1202,1,1,'Login Event',1,'2021-03-24 17:39:08.692','::1'),(1203,1,1,'Login Event',1,'2021-03-24 17:44:11.418','::1'),(1204,1,1,'Login Event',1,'2021-03-24 17:46:14.341','::1'),(1205,1,1,'Login Event',1,'2021-03-24 17:50:15.223','::1'),(1206,1,2,'Login Event',1,'2021-03-25 17:36:50.586','::1'),(1207,1,1,'Login Event',1,'2021-03-25 17:38:42.481','::1'),(1208,2,2,'Logout Event',1,'2021-03-25 17:54:03.035','::1'),(1209,2,1,'Logout Event',1,'2021-03-25 17:54:11.990','::1'),(1210,1,2,'Login Event',1,'2021-03-25 18:09:23.611','::1'),(1211,1,2,'Login Event',1,'2021-03-25 18:15:14.845','::1'),(1212,1,2,'Login Event',1,'2021-03-25 18:19:10.036','::1'),(1213,1,2,'Login Event',1,'2021-03-25 18:22:20.714','::1'),(1214,1,1,'Login Event',1,'2021-03-25 18:34:22.747','::1'),(1215,1,2,'Login Event',1,'2021-03-26 09:27:44.706','::1'),(1216,2,2,'Logout Event',1,'2021-03-26 09:27:44.924','::1'),(1217,1,1,'Login Event',1,'2021-03-26 09:54:37.408','::1'),(1218,2,1,'Logout Event',1,'2021-03-26 09:59:02.211','::1'),(1219,1,5,'Login Event',2,'2021-03-26 09:59:07.310','::1'),(1220,1,5,'Login Event',2,'2021-03-26 09:59:13.171','::1'),(1221,2,5,'Logout Event',2,'2021-03-26 10:01:19.071','::1'),(1222,1,1,'Login Event',1,'2021-03-26 10:01:23.515','::1'),(1223,1,1,'Login Event',1,'2021-03-26 10:03:44.846','::1'),(1224,1,2,'Login Event',1,'2021-03-26 10:05:30.899','::1'),(1225,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-26 10:05:59.754','::1'),(1226,1,1,'Login Event',1,'2021-03-26 10:08:27.822','::1'),(1227,1,2,'Login Event',1,'2021-03-26 10:10:35.111','::1'),(1228,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-26 10:10:49.209','::1'),(1229,1,1,'Login Event',1,'2021-03-26 10:10:58.573','::1'),(1230,1,2,'Login Event',1,'2021-03-26 10:12:51.831','::1'),(1231,13,2,'User has Uploaded Raw Data Analysis',1,'2021-03-26 10:13:12.532','::1'),(1232,1,1,'Login Event',1,'2021-03-26 10:13:14.703','::1'),(1233,1,1,'Login Event',1,'2021-03-26 10:17:19.589','::1'),(1234,1,1,'Login Event',1,'2021-03-26 10:18:45.600','::1'),(1235,1,1,'Login Event',1,'2021-03-26 10:22:11.730','::1'),(1236,1,1,'Login Event',1,'2021-03-26 10:24:53.972','::1'),(1237,1,1,'Login Event',1,'2021-03-26 10:28:11.344','::1'),(1238,1,1,'Login Event',1,'2021-03-26 10:29:40.331','::1'),(1239,1,2,'Login Event',1,'2021-03-26 10:35:13.922','::1'),(1240,2,2,'Logout Event',1,'2021-03-26 10:35:14.084','::1'),(1241,1,1,'Login Event',1,'2021-03-26 10:36:27.963','::1'),(1242,1,1,'Login Event',1,'2021-03-26 10:39:00.471','::1'),(1243,1,1,'Login Event',1,'2021-03-26 10:41:20.042','::1'),(1244,2,1,'Logout Event',1,'2021-03-26 11:03:18.178','::1'),(1245,1,1,'Login Event',1,'2021-03-26 13:06:33.052','::1'),(1246,1,1,'Login Event',1,'2021-03-26 13:11:07.208','::1'),(1247,1,1,'Login Event',1,'2021-03-26 13:11:51.450','::1'),(1248,1,1,'Login Event',1,'2021-03-26 13:17:31.216','::1'),(1249,1,1,'Login Event',1,'2021-03-26 13:31:07.851','::1'),(1250,1,1,'Login Event',1,'2021-03-26 13:33:35.348','::1'),(1251,1,1,'Login Event',1,'2021-03-26 13:40:40.352','::1'),(1252,1,1,'Login Event',1,'2021-03-26 13:41:39.121','::1'),(1253,1,1,'Login Event',1,'2021-03-26 13:42:31.216','::1'),(1254,1,1,'Login Event',1,'2021-03-26 13:44:26.156','::1'),(1255,1,1,'Login Event',1,'2021-03-26 13:50:32.925','::1'),(1256,2,1,'Logout Event',1,'2021-03-26 14:06:26.288','::1'),(1257,1,7,'Login Event',2,'2021-03-26 14:08:47.250','::1'),(1258,1,1,'Login Event',1,'2021-03-26 14:20:03.945','::1'),(1259,1,1,'Login Event',1,'2021-03-26 14:27:10.006','::1'),(1260,1,1,'Login Event',1,'2021-03-26 14:28:42.044','::1'),(1261,1,7,'Login Event',2,'2021-03-26 14:35:06.198','::1'),(1262,2,7,'Logout Event',2,'2021-03-26 14:36:01.410','::1'),(1263,1,1,'Login Event',1,'2021-03-26 14:43:40.619','::1'),(1264,1,1,'Login Event',1,'2021-03-26 14:45:22.447','::1'),(1265,1,1,'Login Event',1,'2021-03-26 14:49:52.670','::1'),(1266,1,1,'Login Event',1,'2021-03-26 15:36:57.719','::1'),(1267,2,1,'Logout Event',1,'2021-03-26 15:36:57.852','::1'),(1268,1,1,'Login Event',1,'2021-03-26 15:40:10.656','::1'),(1269,2,1,'Logout Event',1,'2021-03-26 15:40:21.252','::1'),(1270,1,1,'Login Event',1,'2021-03-29 09:12:07.080','::1'),(1271,1,1,'Login Event',1,'2021-03-29 09:13:44.483','::1'),(1272,1,1,'Login Event',1,'2021-03-29 09:28:01.391','::1'),(1273,2,1,'Logout Event',1,'2021-03-29 09:43:20.152','::1'),(1274,1,1,'Login Event',1,'2021-03-29 09:58:00.579','::1'),(1275,2,1,'Logout Event',1,'2021-03-29 10:13:17.129','::1'),(1276,1,1,'Login Event',1,'2021-03-29 10:31:10.662','::1'),(1277,1,5,'Login Event',2,'2021-03-29 10:37:48.233','::1'),(1278,1,5,'Login Event',2,'2021-03-29 10:40:41.147','::1'),(1279,1,5,'Login Event',2,'2021-03-29 10:44:24.304','::1'),(1280,1,1,'Login Event',1,'2021-03-29 10:58:20.945','::1'),(1281,2,1,'Logout Event',1,'2021-03-29 10:58:21.047','::1'),(1282,1,6,'Login Event',2,'2021-03-29 11:24:39.935','::1'),(1283,2,6,'Logout Event',2,'2021-03-29 11:24:43.003','::1'),(1284,1,8,'Login Event',2,'2021-03-29 11:24:50.464','::1'),(1285,2,8,'Logout Event',2,'2021-03-29 11:24:53.582','::1'),(1286,1,9,'Login Event',2,'2021-03-29 11:25:05.236','::1'),(1287,11,9,'User attempted to access restricted content',2,'2021-03-29 11:25:05.339','::1'),(1288,8,9,'User Account Locked',2,'2021-03-29 11:25:05.340','::1'),(1289,10,9,'Failed Login Attempt',2,'2021-03-29 11:25:10.495','::1'),(1290,1,1,'Login Event',1,'2021-03-29 12:18:02.329','::1'),(1291,1,1,'Login Event',1,'2021-03-29 12:18:32.417','::1'),(1292,1,1,'Login Event',1,'2021-03-29 12:22:18.506','::1'),(1293,1,1,'Login Event',1,'2021-03-29 12:26:02.866','::1'),(1294,1,1,'Login Event',1,'2021-03-29 12:27:50.251','::1'),(1295,1,1,'Login Event',1,'2021-03-29 12:39:34.737','::1'),(1296,1,1,'Login Event',1,'2021-03-29 12:40:10.169','::1'),(1297,1,1,'Login Event',1,'2021-03-29 12:41:37.468','::1'),(1298,1,1,'Login Event',1,'2021-03-29 12:54:04.270','::1'),(1299,1,1,'Login Event',1,'2021-03-29 12:55:02.034','::1'),(1300,1,1,'Login Event',1,'2021-03-29 12:56:34.871','::1'),(1301,1,1,'Login Event',1,'2021-03-29 12:58:03.432','::1'),(1302,1,1,'Login Event',1,'2021-03-29 12:59:14.256','::1'),(1303,1,1,'Login Event',1,'2021-03-29 13:19:10.391','::1'),(1304,2,1,'Logout Event',1,'2021-03-29 13:19:10.567','::1'),(1305,1,1,'Login Event',1,'2021-03-29 15:05:07.135','::1'),(1306,1,1,'Login Event',1,'2021-03-29 15:05:10.781','::1'),(1307,1,1,'Login Event',1,'2021-03-29 15:08:40.712','::1'),(1308,1,1,'Login Event',1,'2021-03-29 15:13:32.022','::1'),(1309,1,1,'Login Event',1,'2021-03-29 15:24:06.151','::1'),(1310,1,1,'Login Event',1,'2021-03-29 15:48:12.947','::1'),(1311,1,1,'Login Event',1,'2021-03-29 15:55:40.781','::1'),(1312,1,1,'Login Event',1,'2021-03-29 16:31:51.500','::1'),(1313,2,1,'Logout Event',1,'2021-03-29 16:31:51.617','::1'),(1314,1,1,'Login Event',1,'2021-03-30 11:04:02.861','::1'),(1315,1,1,'Login Event',1,'2021-03-30 11:04:11.016','::1'),(1316,1,1,'Login Event',1,'2021-03-30 11:18:39.339','::1'),(1317,1,1,'Login Event',1,'2021-03-30 12:00:09.107','::1'),(1318,2,1,'Logout Event',1,'2021-03-30 12:01:06.387','::1'),(1319,1,5,'Login Event',2,'2021-03-30 12:01:11.129','::1'),(1320,2,5,'Logout Event',2,'2021-03-30 12:01:13.466','::1'),(1321,1,6,'Login Event',2,'2021-03-30 12:01:17.700','::1'),(1322,2,6,'Logout Event',2,'2021-03-30 12:01:20.004','::1'),(1323,1,8,'Login Event',2,'2021-03-30 12:01:24.046','::1'),(1324,2,8,'Logout Event',2,'2021-03-30 12:01:28.349','::1'),(1325,1,9,'Login Event',2,'2021-03-30 12:01:34.591','::1'),(1326,1,9,'Login Event',2,'2021-03-30 12:02:55.693','::1'),(1327,2,9,'Logout Event',2,'2021-03-30 12:21:28.513','::1'),(1328,1,9,'Login Event',2,'2021-03-30 13:04:57.804','::1'),(1329,1,9,'Login Event',2,'2021-03-30 13:05:05.020','::1'),(1330,1,9,'Login Event',2,'2021-03-30 13:06:37.146','::1'),(1331,1,9,'Login Event',2,'2021-03-30 13:11:10.032','::1'),(1332,1,9,'Login Event',2,'2021-03-30 13:12:53.705','::1'),(1333,1,9,'Login Event',2,'2021-03-30 13:14:21.354','::1'),(1334,1,9,'Login Event',2,'2021-03-30 13:15:12.948','::1'),(1335,2,9,'Logout Event',2,'2021-03-30 13:35:34.464','::1'),(1336,1,9,'Login Event',2,'2021-03-30 15:14:25.529','::1'),(1337,1,9,'Login Event',2,'2021-03-30 15:15:07.337','::1'),(1338,1,9,'Login Event',2,'2021-03-30 15:16:19.320','::1'),(1339,1,9,'Login Event',2,'2021-03-30 15:17:34.562','::1'),(1340,1,9,'Login Event',2,'2021-03-30 15:29:18.489','::1'),(1341,2,9,'Logout Event',2,'2021-03-30 15:44:55.888','::1'),(1342,1,1,'Login Event',1,'2021-03-31 13:19:54.656','::1'),(1343,2,1,'Logout Event',1,'2021-03-31 13:21:02.858','::1'),(1344,1,1,'Login Event',1,'2021-03-31 13:21:08.889','::1'),(1345,2,1,'Logout Event',1,'2021-03-31 13:22:36.836','::1'),(1346,1,2,'Login Event',1,'2021-04-02 10:31:05.901','::1'),(1347,1,1,'Login Event',1,'2021-04-02 10:33:04.945','::1'),(1348,1,1,'Login Event',1,'2021-04-02 10:35:25.997','::1'),(1349,1,1,'Login Event',1,'2021-04-02 10:38:36.738','::1'),(1350,1,1,'Login Event',1,'2021-04-02 10:39:11.950','::1'),(1351,1,1,'Login Event',1,'2021-04-02 10:46:53.965','::1'),(1352,2,2,'Logout Event',1,'2021-04-02 10:47:21.132','::1'),(1353,1,1,'Login Event',1,'2021-04-02 10:47:49.226','::1'),(1354,1,1,'Login Event',1,'2021-04-02 10:48:35.993','::1'),(1355,1,1,'Login Event',1,'2021-04-02 10:53:41.215','::1'),(1356,1,1,'Login Event',1,'2021-04-02 10:54:53.377','::1'),(1357,1,1,'Login Event',1,'2021-04-02 10:57:45.583','::1'),(1358,1,1,'Login Event',1,'2021-04-02 10:58:13.901','::1'),(1359,1,1,'Login Event',1,'2021-04-02 10:59:15.614','::1'),(1360,1,1,'Login Event',1,'2021-04-02 11:00:02.867','::1'),(1361,1,1,'Login Event',1,'2021-04-02 11:03:31.141','::1'),(1362,1,1,'Login Event',1,'2021-04-02 11:03:34.825','::1'),(1363,2,1,'Logout Event',1,'2021-04-02 11:03:56.784','::1'),(1364,1,1,'Login Event',1,'2021-04-02 11:04:00.791','::1'),(1365,1,1,'Login Event',1,'2021-04-02 11:04:19.012','::1'),(1366,1,1,'Login Event',1,'2021-04-02 11:05:47.059','::1'),(1367,1,1,'Login Event',1,'2021-04-02 12:06:36.411','::1'),(1368,1,1,'Login Event',1,'2021-04-02 12:07:45.969','::1'),(1369,1,1,'Login Event',1,'2021-04-02 12:10:06.508','::1'),(1370,1,1,'Login Event',1,'2021-04-02 12:11:12.785','::1'),(1371,1,1,'Login Event',1,'2021-04-02 12:23:08.362','::1'),(1372,1,1,'Login Event',1,'2021-04-02 12:26:11.493','::1'),(1373,2,1,'Logout Event',1,'2021-04-02 12:26:14.918','::1'),(1374,1,1,'Login Event',1,'2021-04-02 12:26:25.526','::1'),(1375,1,1,'Login Event',1,'2021-04-02 12:47:09.168','::1'),(1376,2,1,'Logout Event',1,'2021-04-02 12:47:09.330','::1'),(1377,1,1,'Login Event',1,'2021-04-02 17:24:44.177','::1'),(1378,2,1,'Logout Event',1,'2021-04-02 17:40:08.879','::1'),(1379,1,1,'Login Event',1,'2021-04-05 11:01:39.920','::1'),(1380,1,1,'Login Event',1,'2021-04-05 11:03:37.060','::1'),(1381,1,1,'Login Event',1,'2021-04-05 11:08:29.665','::1'),(1382,1,1,'Login Event',1,'2021-04-05 11:15:25.246','::1'),(1383,1,1,'Login Event',1,'2021-04-05 11:21:45.175','::1'),(1384,1,1,'Login Event',1,'2021-04-05 11:24:55.044','::1'),(1385,1,1,'Login Event',1,'2021-04-05 11:31:13.393','::1'),(1386,1,1,'Login Event',1,'2021-04-05 11:34:42.588','::1'),(1387,1,1,'Login Event',1,'2021-04-05 11:39:15.980','::1'),(1388,1,1,'Login Event',1,'2021-04-05 11:45:59.904','::1'),(1389,1,1,'Login Event',1,'2021-04-05 11:48:32.408','::1'),(1390,2,1,'Logout Event',1,'2021-04-05 12:11:13.488','::1'),(1391,1,1,'Login Event',1,'2021-04-05 15:11:05.949','::1'),(1392,1,1,'Login Event',1,'2021-04-05 15:11:29.970','::1'),(1393,2,1,'Logout Event',1,'2021-04-05 15:30:50.748','::1'),(1394,1,1,'Login Event',1,'2021-04-05 16:19:31.203','::1'),(1395,1,6,'Login Event',2,'2021-04-06 14:56:49.064','::1'),(1396,2,6,'Logout Event',2,'2021-04-06 14:56:52.733','::1'),(1397,1,5,'Login Event',2,'2021-04-06 14:56:59.571','::1'),(1398,2,5,'Logout Event',2,'2021-04-06 14:57:02.565','::1'),(1399,1,2,'Login Event',1,'2021-04-06 14:57:06.779','::1'),(1400,1,1,'Login Event',1,'2021-04-06 15:10:53.354','::1'),(1401,2,2,'Logout Event',1,'2021-04-06 15:36:16.867','::1'),(1402,1,1,'Login Event',1,'2021-04-07 09:29:00.439','::1'),(1403,4,1,'Bage Issued',1,'2021-04-07 09:29:09.637','::1'),(1404,2,1,'Logout Event',1,'2021-04-07 09:42:38.839','::1'),(1405,1,1,'Login Event',1,'2021-04-07 10:43:54.650','::1'),(1406,1,1,'Login Event',1,'2021-04-07 10:54:13.168','::1'),(1407,1,1,'Login Event',1,'2021-04-07 11:07:36.425','::1'),(1408,1,1,'Login Event',1,'2021-04-07 11:16:17.619','::1'),(1409,2,1,'Logout Event',1,'2021-04-07 11:33:16.067','::1'),(1410,1,1,'Login Event',1,'2021-04-07 12:11:18.037','::1'),(1411,1,1,'Login Event',1,'2021-04-07 12:59:52.320','::1'),(1412,2,1,'Logout Event',1,'2021-04-07 12:59:52.561','::1'),(1413,1,1,'Login Event',1,'2021-04-07 16:37:10.999','::1'),(1414,1,1,'Login Event',1,'2021-04-07 16:41:56.519','::1'),(1415,1,1,'Login Event',1,'2021-04-07 17:01:55.180','::1'),(1416,23,1,'A new Lab sample Analysis has been added',1,'2021-04-07 17:02:52.114','::1'),(1417,1,1,'Login Event',1,'2021-04-07 17:14:07.736','::1'),(1418,1,1,'Login Event',1,'2021-04-07 17:19:13.292','::ffff:127.0.0.1'),(1419,1,1,'Login Event',1,'2021-04-07 17:28:23.864','::1'),(1420,1,1,'Login Event',1,'2021-04-07 17:28:27.543','::1'),(1421,1,1,'Login Event',1,'2021-04-07 17:44:24.712','::1'),(1422,23,1,'A new Lab sample Analysis has been added',1,'2021-04-07 17:45:14.634','::1'),(1423,23,1,'A new Lab sample Analysis has been added',1,'2021-04-07 17:45:14.643','::1'),(1424,1,1,'Login Event',1,'2021-04-07 17:55:02.466','::1'),(1425,2,1,'Logout Event',1,'2021-04-07 17:55:30.245','::1'),(1426,1,1,'Login Event',1,'2021-04-07 17:55:56.775','::1'),(1427,1,1,'Login Event',1,'2021-04-07 18:12:25.187','::1'),(1428,1,1,'Login Event',1,'2021-04-07 18:18:20.389','::1'),(1429,1,1,'Login Event',1,'2021-04-08 10:53:01.358','::1'),(1430,1,1,'Login Event',1,'2021-04-08 11:41:19.326','::1'),(1431,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-08 11:41:27.890','::1'),(1432,1,1,'Login Event',1,'2021-04-09 12:18:57.364','::1'),(1433,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-09 12:19:40.042','::1'),(1434,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-09 12:19:40.049','::1'),(1435,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-09 12:19:40.035','::1'),(1436,3,1,'New Badge Created',1,'2021-04-09 12:20:44.473','::1'),(1437,3,1,'New Badge Created',1,'2021-04-09 12:21:01.308','::1'),(1438,3,1,'New Badge Created',1,'2021-04-09 12:21:02.471','::1'),(1439,2,1,'Logout Event',1,'2021-04-09 12:21:38.266','::1'),(1440,1,1,'Login Event',1,'2021-04-09 12:21:57.222','::1'),(1441,1,2,'Login Event',1,'2021-04-09 12:26:09.680','::1'),(1442,2,2,'Logout Event',1,'2021-04-09 12:26:33.447','::1'),(1443,1,1,'Login Event',1,'2021-04-09 12:26:40.579','::1'),(1444,5,1,'Badge Turned In',1,'2021-04-09 12:27:07.206','::1'),(1445,1,1,'Login Event',1,'2021-04-09 12:36:38.302','::1'),(1446,2,1,'Logout Event',1,'2021-04-09 12:43:59.482','::1'),(1447,1,1,'Login Event',1,'2021-04-09 14:50:14.656','::1'),(1448,2,1,'Logout Event',1,'2021-04-09 14:56:04.858','::1'),(1449,1,1,'Login Event',1,'2021-04-09 14:56:09.643','::1'),(1450,1,1,'Login Event',1,'2021-04-09 15:02:08.860','::1'),(1451,1,1,'Login Event',1,'2021-04-09 15:03:13.630','::1'),(1452,1,1,'Login Event',1,'2021-04-09 15:06:58.503','::1'),(1453,1,1,'Login Event',1,'2021-04-09 15:12:03.575','::1'),(1454,1,1,'Login Event',1,'2021-04-09 15:27:22.372','::1'),(1455,1,1,'Login Event',1,'2021-04-09 15:29:47.548','::1'),(1456,1,1,'Login Event',1,'2021-04-09 15:32:20.100','::1'),(1457,1,1,'Login Event',1,'2021-04-12 10:42:11.361','::1'),(1458,1,1,'Login Event',1,'2021-04-12 11:23:43.084','::1'),(1459,2,1,'Logout Event',1,'2021-04-12 11:28:02.634','::1'),(1460,1,1,'Login Event',1,'2021-04-12 11:28:06.333','::1'),(1461,1,1,'Login Event',1,'2021-04-12 11:30:57.584','::1'),(1462,2,1,'Logout Event',1,'2021-04-12 12:00:06.594','::1'),(1463,1,1,'Login Event',1,'2021-04-12 12:07:06.397','::1'),(1464,1,1,'Login Event',1,'2021-04-12 12:12:50.908','::1'),(1465,1,1,'Login Event',1,'2021-04-12 12:15:35.533','::1'),(1466,2,1,'Logout Event',1,'2021-04-12 12:16:36.627','::1'),(1467,1,1,'Login Event',1,'2021-04-12 12:16:50.867','::1'),(1468,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:26:05.787','::1'),(1469,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:26:05.801','::1'),(1470,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:26:40.018','::1'),(1471,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:26:40.029','::1'),(1472,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:27:14.217','::1'),(1473,23,1,'A new Lab sample Analysis has been added',1,'2021-04-12 12:27:14.255','::1'),(1474,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-12 12:27:17.594','::1'),(1475,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-12 12:27:17.620','::1'),(1476,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-12 12:27:17.669','::1'),(1477,1,1,'Login Event',1,'2021-04-12 12:49:59.896','::1'),(1478,1,1,'Login Event',1,'2021-04-12 12:50:03.230','::1'),(1479,1,1,'Login Event',1,'2021-04-12 12:55:44.010','::1'),(1480,1,1,'Login Event',1,'2021-04-12 12:58:29.759','::1'),(1481,1,1,'Login Event',1,'2021-04-12 12:58:33.784','::1'),(1482,1,1,'Login Event',1,'2021-04-12 12:59:02.241','::1'),(1483,1,1,'Login Event',1,'2021-04-12 12:59:34.071','::1'),(1484,2,1,'Logout Event',1,'2021-04-12 12:59:50.628','::1'),(1485,1,1,'Login Event',1,'2021-04-12 13:06:33.112','::1'),(1486,1,1,'Login Event',1,'2021-04-12 13:06:41.073','::1'),(1487,2,1,'Logout Event',1,'2021-04-12 13:17:39.353','::1'),(1488,1,1,'Login Event',1,'2021-04-12 13:17:44.252','::1'),(1489,1,1,'Login Event',1,'2021-04-12 13:24:43.708','::1'),(1490,2,1,'Logout Event',1,'2021-04-12 13:47:32.921','::1'),(1491,1,1,'Login Event',1,'2021-04-12 14:04:34.461','::1'),(1492,2,1,'Logout Event',1,'2021-04-12 14:25:59.184','::1'),(1493,1,1,'Login Event',1,'2021-04-12 14:27:57.061','::1'),(1494,1,1,'Login Event',1,'2021-04-12 14:28:04.703','::1'),(1495,1,1,'Login Event',1,'2021-04-12 14:29:51.052','::1'),(1496,2,1,'Logout Event',1,'2021-04-12 14:29:55.502','::1'),(1497,1,1,'Login Event',1,'2021-04-12 14:30:56.978','::1'),(1498,2,1,'Logout Event',1,'2021-04-12 14:41:32.473','::1'),(1499,1,3,'Login Event',2,'2021-04-12 14:41:38.213','::1'),(1500,2,3,'Logout Event',2,'2021-04-12 14:46:02.760','::1'),(1501,1,4,'Login Event',2,'2021-04-12 14:46:10.462','::1'),(1502,1,4,'Login Event',2,'2021-04-12 14:46:15.508','::1'),(1503,2,4,'Logout Event',2,'2021-04-12 14:48:29.164','::1'),(1504,1,5,'Login Event',2,'2021-04-12 14:48:34.146','::1'),(1505,2,5,'Logout Event',2,'2021-04-12 14:50:31.037','::1'),(1506,1,6,'Login Event',2,'2021-04-12 14:50:37.056','::1'),(1507,2,6,'Logout Event',2,'2021-04-12 14:52:02.942','::1'),(1508,1,7,'Login Event',2,'2021-04-12 14:52:47.824','::1'),(1509,2,7,'Logout Event',2,'2021-04-12 14:56:44.211','::1'),(1510,1,8,'Login Event',2,'2021-04-12 14:57:09.130','::1'),(1511,1,8,'Login Event',2,'2021-04-12 14:57:15.572','::1'),(1512,1,8,'Login Event',2,'2021-04-12 14:57:19.996','::1'),(1513,1,8,'Login Event',2,'2021-04-12 14:58:49.608','::1'),(1514,1,8,'Login Event',2,'2021-04-12 14:58:59.478','::1'),(1515,1,8,'Login Event',2,'2021-04-12 15:00:26.962','::1'),(1516,1,9,'Login Event',2,'2021-04-12 15:04:18.976','::1'),(1517,2,9,'Logout Event',2,'2021-04-12 15:06:28.993','::1'),(1518,1,1,'Login Event',1,'2021-04-12 15:06:32.246','::1'),(1519,2,1,'Logout Event',1,'2021-04-12 15:25:34.012','::1'),(1520,1,1,'Login Event',1,'2021-04-13 14:59:17.149','::1'),(1521,1,1,'Login Event',1,'2021-04-13 14:59:24.391','::1'),(1522,1,1,'Login Event',1,'2021-04-13 15:50:01.555','::1'),(1523,1,1,'Login Event',1,'2021-04-13 15:50:58.982','::1'),(1524,1,1,'Login Event',1,'2021-04-13 15:53:45.478','::1'),(1525,1,1,'Login Event',1,'2021-04-13 15:58:33.457','::1'),(1526,1,1,'Login Event',1,'2021-04-13 16:02:08.350','::1'),(1527,2,1,'Logout Event',1,'2021-04-13 16:05:07.389','::1'),(1528,1,6,'Login Event',2,'2021-04-13 16:05:11.302','::1'),(1529,2,6,'Logout Event',2,'2021-04-13 16:05:22.311','::1'),(1530,1,5,'Login Event',2,'2021-04-13 16:05:25.855','::1'),(1531,2,5,'Logout Event',2,'2021-04-13 16:05:57.995','::1'),(1532,1,4,'Login Event',2,'2021-04-13 16:06:04.553','::1'),(1533,2,4,'Logout Event',2,'2021-04-13 16:06:09.866','::1'),(1534,1,8,'Login Event',2,'2021-04-13 16:06:16.373','::1'),(1535,2,8,'Logout Event',2,'2021-04-13 16:06:24.888','::1'),(1536,1,3,'Login Event',2,'2021-04-13 16:06:30.073','::1'),(1537,2,3,'Logout Event',2,'2021-04-13 16:07:04.477','::1'),(1538,1,4,'Login Event',2,'2021-04-13 17:07:38.207','::1'),(1539,2,4,'Logout Event',2,'2021-04-13 17:08:17.549','::1'),(1540,1,3,'Login Event',2,'2021-04-13 17:08:26.187','::1'),(1541,2,3,'Logout Event',2,'2021-04-13 17:08:41.526','::1'),(1542,1,8,'Login Event',2,'2021-04-13 17:08:55.492','::1'),(1543,2,8,'Logout Event',2,'2021-04-13 17:09:07.026','::1'),(1544,1,1,'Login Event',1,'2021-04-14 10:49:09.645','::1'),(1545,2,1,'Logout Event',1,'2021-04-14 10:49:22.845','::1'),(1546,1,1,'Login Event',1,'2021-04-16 09:49:53.509','::1'),(1547,7,1,'User Information Updated',1,'2021-04-16 09:50:44.806','::1'),(1548,16,1,'New User has been Added',1,'2021-04-16 09:51:06.215','::1'),(1549,3,1,'New Badge Created',1,'2021-04-16 09:51:28.549','::1'),(1550,3,1,'New Badge Created',1,'2021-04-16 09:52:07.843','::1'),(1551,3,1,'New Badge Created',1,'2021-04-16 09:52:09.071','::1'),(1552,3,1,'New Badge Created',1,'2021-04-16 09:54:03.876','::1'),(1553,1,1,'Login Event',1,'2021-04-16 09:59:55.669','::1'),(1554,3,1,'New Badge Created',1,'2021-04-16 10:00:26.143','::1'),(1555,3,1,'New Badge Created',1,'2021-04-16 10:01:09.054','::1'),(1556,3,1,'New Badge Created',1,'2021-04-16 10:03:44.025','::1'),(1557,3,1,'New Badge Created',1,'2021-04-16 10:03:46.209','::1'),(1558,1,1,'Login Event',1,'2021-04-16 10:07:10.173','::1'),(1559,3,1,'New Badge Created',1,'2021-04-16 10:07:35.229','::1'),(1560,3,1,'New Badge Created',1,'2021-04-16 10:07:53.275','::1'),(1561,21,1,'New Location has been added',1,'2021-04-16 10:11:24.460','::1'),(1562,4,1,'Bage Issued',1,'2021-04-16 10:11:47.925','::1'),(1563,5,1,'Badge Turned In',1,'2021-04-16 10:12:02.358','::1'),(1564,5,1,'Badge Turned In',1,'2021-04-16 10:12:12.200','::1'),(1565,23,1,'A new Lab sample Analysis has been added',1,'2021-04-16 10:12:51.240','::1'),(1566,23,1,'A new Lab sample Analysis has been added',1,'2021-04-16 10:13:25.809','::1'),(1567,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-16 10:13:29.762','::1'),(1568,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-16 10:13:29.792','::1'),(1569,2,1,'Logout Event',1,'2021-04-16 10:13:55.484','::1'),(1570,1,5,'Login Event',2,'2021-04-16 10:14:06.006','::1'),(1571,19,5,'Sampling rating has been updated',2,'2021-04-16 10:14:16.412','::1'),(1572,18,5,'Analyte exposure ratings updated',2,'2021-04-16 10:14:16.524','::1'),(1573,19,5,'Sampling rating has been updated',2,'2021-04-16 10:14:20.740','::1'),(1574,18,5,'Analyte exposure ratings updated',2,'2021-04-16 10:14:21.324','::1'),(1575,19,5,'Sampling rating has been updated',2,'2021-04-16 10:14:27.682','::1'),(1576,18,5,'Analyte exposure ratings updated',2,'2021-04-16 10:14:27.738','::1'),(1577,7,5,'User Information Updated',2,'2021-04-16 10:14:46.133','::1'),(1578,2,5,'Logout Event',2,'2021-04-16 10:14:48.392','::1'),(1579,1,5,'Login Event',2,'2021-04-16 10:14:56.199','::1'),(1580,7,5,'User Information Updated',2,'2021-04-16 10:15:00.618','::1'),(1581,2,5,'Logout Event',2,'2021-04-16 10:15:02.556','::1'),(1582,1,8,'Login Event',2,'2021-04-16 10:15:06.633','::1'),(1583,1,8,'Login Event',2,'2021-04-16 10:15:12.009','::1'),(1584,1,8,'Login Event',2,'2021-04-16 10:19:19.608','::1'),(1585,2,8,'Logout Event',2,'2021-04-16 10:19:40.217','::1'),(1586,1,6,'Login Event',2,'2021-04-16 10:19:46.552','::1'),(1587,2,6,'Logout Event',2,'2021-04-16 10:19:49.614','::1'),(1588,1,4,'Login Event',2,'2021-04-16 10:19:55.744','::1'),(1589,3,4,'New Badge Created',2,'2021-04-16 10:20:04.717','::1'),(1590,3,4,'New Badge Created',2,'2021-04-16 10:20:04.720','::1'),(1591,3,4,'New Badge Created',2,'2021-04-16 10:20:04.723','::1'),(1592,2,4,'Logout Event',2,'2021-04-16 10:22:57.946','::1'),(1593,1,8,'Login Event',2,'2021-04-16 10:24:04.623','::1'),(1594,1,1,'Login Event',1,'2021-04-16 11:22:41.739','::1'),(1595,1,1,'Login Event',1,'2021-04-16 11:22:57.681','::1'),(1596,3,1,'New Badge Created',1,'2021-04-16 11:23:17.496','::1'),(1597,3,1,'New Badge Created',1,'2021-04-16 11:23:45.053','::1'),(1598,1,1,'Login Event',1,'2021-04-16 11:26:28.958','::1'),(1599,3,1,'New Badge Created',1,'2021-04-16 11:26:45.166','::1'),(1600,3,1,'New Badge Created',1,'2021-04-16 11:26:55.000','::1'),(1601,1,1,'Login Event',1,'2021-04-16 11:36:50.406','::1'),(1602,3,1,'New Badge Created',1,'2021-04-16 11:36:59.527','::1'),(1603,3,1,'New Badge Created',1,'2021-04-16 11:37:08.265','::1'),(1604,1,1,'Login Event',1,'2021-04-16 11:48:50.770','::1'),(1605,5,1,'Badge Turned In',1,'2021-04-16 11:48:57.875','::1'),(1606,5,1,'Badge Turned In',1,'2021-04-16 11:49:03.287','::1'),(1607,2,1,'Logout Event',1,'2021-04-16 11:49:20.200','::1'),(1608,1,8,'Login Event',2,'2021-04-16 12:48:03.237','::1'),(1609,2,8,'Logout Event',2,'2021-04-16 12:48:08.482','::1'),(1610,1,8,'Login Event',2,'2021-04-16 12:48:13.176','::1'),(1611,2,8,'Logout Event',2,'2021-04-16 12:48:16.112','::1'),(1612,1,8,'Login Event',2,'2021-04-16 12:48:20.455','::1'),(1613,2,8,'Logout Event',2,'2021-04-16 12:48:22.369','::1'),(1614,1,3,'Login Event',1,'2021-04-16 12:48:26.224','::1'),(1615,2,3,'Logout Event',1,'2021-04-16 12:48:28.437','::1'),(1616,1,8,'Login Event',2,'2021-04-16 12:48:32.208','::1'),(1617,2,8,'Logout Event',2,'2021-04-16 12:48:53.101','::1'),(1618,1,1,'Login Event',1,'2021-04-16 12:48:58.681','::1'),(1619,1,1,'Login Event',1,'2021-04-16 12:54:42.814','::1'),(1620,1,1,'Login Event',1,'2021-04-16 12:56:38.988','::1'),(1621,1,1,'Login Event',1,'2021-04-16 13:08:00.306','::1'),(1622,1,1,'Login Event',1,'2021-04-16 13:19:28.253','::1'),(1623,1,1,'Login Event',1,'2021-04-16 13:38:54.782','::1'),(1624,1,1,'Login Event',1,'2021-04-16 14:41:12.104','::1'),(1625,2,1,'Logout Event',1,'2021-04-16 14:41:12.274','::1'),(1626,1,3,'Login Event',1,'2021-04-16 14:42:07.839','::1'),(1627,2,3,'Logout Event',1,'2021-04-16 14:42:23.326','::1'),(1628,1,5,'Login Event',2,'2021-04-16 14:42:27.110','::1'),(1629,2,5,'Logout Event',2,'2021-04-16 14:43:09.355','::1'),(1630,1,6,'Login Event',2,'2021-04-16 14:43:40.738','::1'),(1631,2,6,'Logout Event',2,'2021-04-16 14:43:43.489','::1'),(1632,1,1,'Login Event',1,'2021-04-16 14:43:57.105','::1'),(1633,23,1,'A new Lab sample Analysis has been added',1,'2021-04-16 14:44:31.163','::1'),(1634,23,1,'A new Lab sample Analysis has been added',1,'2021-04-16 14:44:51.923','::1'),(1635,23,1,'A new Lab sample Analysis has been added',1,'2021-04-16 14:45:19.107','::1'),(1636,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-16 14:45:24.468','::1'),(1637,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-16 14:45:24.474','::1'),(1638,13,1,'User has Uploaded Raw Data Analysis',1,'2021-04-16 14:45:24.478','::1'),(1639,1,6,'Login Event',2,'2021-04-16 15:18:22.027','::1'),(1640,2,6,'Logout Event',2,'2021-04-16 15:18:24.745','::1'),(1641,1,5,'Login Event',2,'2021-04-16 15:18:30.316','::1'),(1642,2,5,'Logout Event',2,'2021-04-16 15:19:05.379','::1'),(1643,1,4,'Login Event',2,'2021-04-16 15:19:24.993','::1'),(1644,2,4,'Logout Event',2,'2021-04-16 15:20:34.955','::1'),(1645,1,5,'Login Event',2,'2021-04-19 10:39:06.639','::1'),(1646,2,5,'Logout Event',2,'2021-04-19 10:39:09.476','::1'),(1647,1,6,'Login Event',2,'2021-04-19 10:39:13.568','::1'),(1648,2,6,'Logout Event',2,'2021-04-19 10:39:16.053','::1'),(1649,1,9,'Login Event',2,'2021-04-19 10:39:30.965','::1'),(1650,1,9,'Login Event',2,'2021-04-19 10:43:20.374','::1'),(1651,2,9,'Logout Event',2,'2021-04-19 10:59:13.984','::1'),(1652,1,9,'Login Event',2,'2021-04-19 11:12:35.847','::1'),(1653,1,9,'Login Event',2,'2021-04-19 11:13:36.492','::1'),(1654,2,9,'Logout Event',2,'2021-04-19 11:15:26.489','::1'),(1655,1,1,'Login Event',1,'2021-04-19 11:15:31.361','::1'),(1656,2,1,'Logout Event',1,'2021-04-19 11:15:53.842','::1'),(1657,1,9,'Login Event',2,'2021-04-19 11:16:00.367','::1'),(1658,1,9,'Login Event',2,'2021-04-19 11:16:05.291','::1'),(1659,2,9,'Logout Event',2,'2021-04-19 11:19:56.966','::1'),(1660,1,1,'Login Event',1,'2021-04-19 11:20:00.755','::1'),(1661,1,1,'Login Event',1,'2021-04-19 11:52:03.031','::1'),(1662,2,1,'Logout Event',1,'2021-04-19 11:52:03.157','::1'),(1663,1,1,'Login Event',1,'2021-04-19 12:42:30.172','::1'),(1664,1,1,'Login Event',1,'2021-04-19 13:15:57.890','::1'),(1665,1,1,'Login Event',1,'2021-04-19 13:45:24.700','::1'),(1666,1,1,'Login Event',1,'2021-04-19 15:01:03.172','::1'),(1667,1,1,'Login Event',1,'2021-04-19 15:03:25.878','::1'),(1668,1,1,'Login Event',1,'2021-04-19 15:08:58.122','::1'),(1669,1,1,'Login Event',1,'2021-04-19 15:27:14.729','::1'),(1670,2,1,'Logout Event',1,'2021-04-19 15:27:14.845','::1'),(1671,1,1,'Login Event',1,'2021-04-21 09:50:41.641','::1'),(1672,2,1,'Logout Event',1,'2021-04-21 09:51:12.582','::1'),(1673,1,1,'Login Event',1,'2021-04-21 09:51:17.806','::1'),(1674,1,1,'Login Event',1,'2021-04-21 10:25:42.882','::1'),(1675,1,1,'Login Event',1,'2021-04-21 10:26:23.704','::1'),(1676,1,1,'Login Event',1,'2021-04-21 10:27:23.351','::1'),(1677,1,1,'Login Event',1,'2021-04-21 10:33:56.952','::1'),(1678,1,1,'Login Event',1,'2021-04-21 10:36:58.241','::1'),(1679,1,1,'Login Event',1,'2021-04-21 10:39:26.945','::1'),(1680,1,1,'Login Event',1,'2021-04-21 10:41:25.688','::1'),(1681,2,1,'Logout Event',1,'2021-04-21 10:56:53.007','::1'),(1682,1,1,'Login Event',1,'2021-04-21 11:03:13.393','::1'),(1683,2,1,'Logout Event',1,'2021-04-21 11:03:19.269','::1'),(1684,1,5,'Login Event',2,'2021-04-21 11:03:22.941','::1'),(1685,2,5,'Logout Event',2,'2021-04-21 11:03:25.261','::1'),(1686,1,9,'Login Event',2,'2021-04-21 11:03:29.546','::1'),(1687,1,9,'Login Event',2,'2021-04-21 11:03:33.834','::1'),(1688,1,1,'Login Event',1,'2021-04-21 11:17:23.634','::1'),(1689,1,1,'Login Event',1,'2021-04-21 11:23:02.524','::1'),(1690,1,1,'Login Event',1,'2021-04-21 11:37:58.498','::1'),(1691,1,1,'Login Event',1,'2021-04-21 11:40:00.422','::1'),(1692,2,1,'Logout Event',1,'2021-04-21 11:56:03.637','::1'),(1693,1,1,'Login Event',1,'2021-04-21 12:05:13.692','::1'),(1694,1,1,'Login Event',1,'2021-04-21 12:12:28.422','::1'),(1695,1,1,'Login Event',1,'2021-04-21 12:14:33.709','::1'),(1696,1,1,'Login Event',1,'2021-04-21 12:17:36.331','::1'),(1697,1,1,'Login Event',1,'2021-04-21 14:16:36.324','::1'),(1698,2,1,'Logout Event',1,'2021-04-21 14:16:36.474','::1'),(1699,2,4,'Logout Event',2,'2021-05-05 09:53:32.206','::1'),(1700,1,1,'Login Event',1,'2021-05-05 10:04:54.370','::1'),(1701,1,1,'Login Event',1,'2021-05-05 10:20:47.182','::1'),(1702,2,1,'Logout Event',1,'2021-05-05 10:20:47.323','::1'),(1703,1,2,'Login Event',1,'2021-05-05 10:34:54.210','::1'),(1704,2,2,'Logout Event',1,'2021-05-05 11:03:19.558','::1'),(1705,1,1,'Login Event',1,'2021-05-05 11:03:23.768','::1'),(1706,1,1,'Login Event',1,'2021-05-05 13:50:59.407','::1'),(1707,1,1,'Login Event',1,'2021-05-05 13:57:21.260','::1'),(1708,1,1,'Login Event',1,'2021-05-05 14:00:18.062','::1'),(1709,1,1,'Login Event',1,'2021-05-05 14:01:48.063','::1'),(1710,1,1,'Login Event',1,'2021-05-05 14:03:55.837','::1'),(1711,2,1,'Logout Event',1,'2021-05-05 14:21:37.666','::1'),(1712,1,2,'Login Event',1,'2021-05-06 15:46:10.719','::1'),(1713,1,1,'Login Event',1,'2021-05-07 12:14:37.338','::1'),(1714,2,1,'Logout Event',1,'2021-05-07 12:14:40.715','::1'),(1715,1,1,'Login Event',1,'2021-05-07 12:14:44.751','::1'),(1716,2,1,'Logout Event',1,'2021-05-07 12:15:24.122','::1'),(1717,1,4,'Login Event',2,'2021-05-07 12:15:28.590','::1'),(1718,1,4,'Login Event',2,'2021-05-07 12:51:42.423','::1'),(1719,2,4,'Logout Event',2,'2021-05-07 12:51:42.520','::1'),(1720,1,4,'Login Event',2,'2021-05-07 12:51:47.572','::1'),(1721,1,4,'Login Event',2,'2021-05-07 12:53:38.262','::1'),(1722,1,4,'Login Event',2,'2021-05-07 12:56:24.525','::1'),(1723,1,4,'Login Event',2,'2021-05-07 12:57:39.404','::1'),(1724,1,4,'Login Event',2,'2021-05-07 13:01:43.060','::1'),(1725,1,4,'Login Event',2,'2021-05-07 13:02:50.216','::1'),(1726,1,4,'Login Event',2,'2021-05-07 13:34:54.617','::1'),(1727,2,4,'Logout Event',2,'2021-05-07 13:34:54.757','::1'),(1728,1,4,'Login Event',2,'2021-05-07 13:34:59.954','::1'),(1729,1,4,'Login Event',2,'2021-05-07 13:36:40.235','::1'),(1730,1,4,'Login Event',2,'2021-05-07 13:40:58.459','::1'),(1731,1,4,'Login Event',2,'2021-05-07 13:41:46.734','::1'),(1732,1,4,'Login Event',2,'2021-05-07 13:43:52.995','::1'),(1733,1,4,'Login Event',2,'2021-05-07 13:46:18.090','::1'),(1734,1,1,'Login Event',1,'2021-05-07 13:48:07.377','::1'),(1735,2,1,'Logout Event',1,'2021-05-07 13:48:09.453','::1'),(1736,1,4,'Login Event',2,'2021-05-07 13:48:14.114','::1'),(1737,1,4,'Login Event',2,'2021-05-07 13:55:32.208','::1'),(1738,11,4,'User attempted to access restricted content',2,'2021-05-07 13:55:42.436','::1'),(1739,8,4,'User Account Locked',2,'2021-05-07 13:55:42.437','::1'),(1740,11,4,'User attempted to access restricted content',2,'2021-05-07 13:55:42.467','::1'),(1741,8,4,'User Account Locked',2,'2021-05-07 13:55:42.467','::1'),(1742,11,4,'User attempted to access restricted content',2,'2021-05-07 13:55:42.489','::1'),(1743,8,4,'User Account Locked',2,'2021-05-07 13:55:42.490','::1'),(1744,1,4,'Login Event',2,'2021-05-07 13:59:51.361','::1'),(1745,1,4,'Login Event',2,'2021-05-07 14:23:29.896','::1'),(1746,2,4,'Logout Event',2,'2021-05-07 14:23:30.023','::1'),(1747,1,4,'Login Event',2,'2021-05-07 14:23:35.003','::1'),(1748,1,4,'Login Event',2,'2021-05-07 14:35:03.767','::1'),(1749,1,4,'Login Event',2,'2021-05-07 14:40:49.892','::1'),(1750,1,4,'Login Event',2,'2021-05-07 14:41:50.070','::1'),(1751,2,4,'Logout Event',2,'2021-05-07 14:57:15.152','::1'),(1752,1,4,'Login Event',2,'2021-05-07 15:14:13.372','::1'),(1753,1,4,'Login Event',2,'2021-05-07 15:16:47.344','::1'),(1754,1,4,'Login Event',2,'2021-05-07 15:23:15.057','::1'),(1755,2,4,'Logout Event',2,'2021-05-07 15:48:47.074','::1'),(1756,1,1,'Login Event',1,'2021-05-10 10:30:57.607','::1'),(1757,2,1,'Logout Event',1,'2021-05-10 10:31:04.062','::1'),(1758,1,4,'Login Event',2,'2021-05-10 10:31:08.986','::1'),(1759,1,4,'Login Event',2,'2021-05-10 10:31:13.813','::1'),(1760,1,4,'Login Event',2,'2021-05-10 10:40:59.725','::1'),(1761,1,4,'Login Event',2,'2021-05-10 10:55:04.890','::1'),(1762,1,1,'Login Event',1,'2021-05-10 10:57:22.924','::1'),(1763,2,1,'Logout Event',1,'2021-05-10 10:57:24.714','::1'),(1764,1,4,'Login Event',2,'2021-05-10 10:57:29.135','::1'),(1765,1,4,'Login Event',2,'2021-05-10 10:57:33.984','::1'),(1766,1,4,'Login Event',2,'2021-05-10 10:59:19.281','::1'),(1767,1,4,'Login Event',2,'2021-05-10 11:02:14.707','::1'),(1768,1,4,'Login Event',2,'2021-05-10 11:06:22.973','::1'),(1769,1,4,'Login Event',2,'2021-05-10 11:07:49.007','::1'),(1770,1,4,'Login Event',2,'2021-05-10 11:18:03.435','::1'),(1771,1,4,'Login Event',2,'2021-05-10 11:18:40.343','::1'),(1772,2,4,'Logout Event',2,'2021-05-10 11:20:14.938','::1'),(1773,1,1,'Login Event',1,'2021-05-10 11:20:21.761','::1'),(1774,2,1,'Logout Event',1,'2021-05-10 11:24:42.405','::1'),(1775,1,4,'Login Event',2,'2021-05-10 11:24:53.207','::1'),(1776,1,4,'Login Event',2,'2021-05-10 11:24:57.879','::1'),(1777,1,4,'Login Event',2,'2021-05-10 11:41:15.718','::1'),(1778,2,4,'Logout Event',2,'2021-05-10 11:41:15.815','::1'),(1779,1,4,'Login Event',2,'2021-05-10 11:41:20.472','::1'),(1780,1,4,'Login Event',2,'2021-05-10 11:50:23.110','::1'),(1781,1,4,'Login Event',2,'2021-05-10 11:56:43.829','::1'),(1782,1,4,'Login Event',2,'2021-05-10 12:00:36.462','::1'),(1783,1,4,'Login Event',2,'2021-05-10 12:21:52.933','::1'),(1784,2,4,'Logout Event',2,'2021-05-10 12:21:53.096','::1'),(1785,1,4,'Login Event',2,'2021-05-10 12:21:58.629','::1'),(1786,2,4,'Logout Event',2,'2021-05-10 12:37:19.406','::1'),(1787,1,3,'Login Event',1,'2021-05-10 12:57:07.233','::1'),(1788,2,3,'Logout Event',1,'2021-05-10 12:59:04.587','::1'),(1789,1,4,'Login Event',2,'2021-05-10 12:59:09.892','::1'),(1790,2,4,'Logout Event',2,'2021-05-10 12:59:58.828','::1'),(1791,1,5,'Login Event',2,'2021-05-10 13:00:03.500','::1'),(1792,2,5,'Logout Event',2,'2021-05-10 13:01:24.438','::1'),(1793,1,6,'Login Event',2,'2021-05-10 13:01:28.961','::1'),(1794,2,6,'Logout Event',2,'2021-05-10 13:01:53.744','::1'),(1795,1,7,'Login Event',2,'2021-05-10 13:02:00.820','::1'),(1796,2,7,'Logout Event',2,'2021-05-10 13:04:20.697','::1'),(1797,1,8,'Login Event',2,'2021-05-10 13:04:26.132','::1'),(1798,1,8,'Login Event',2,'2021-05-10 13:04:30.511','::1'),(1799,1,8,'Login Event',2,'2021-05-10 13:05:35.848','::1'),(1800,2,8,'Logout Event',2,'2021-05-10 13:07:07.858','::1'),(1801,1,9,'Login Event',2,'2021-05-10 13:07:12.377','::1'),(1802,2,9,'Logout Event',2,'2021-05-10 13:07:36.484','::1'),(1803,1,1,'Login Event',1,'2021-05-10 13:07:40.498','::1'),(1804,2,1,'Logout Event',1,'2021-05-10 13:24:53.415','::1'),(1805,1,4,'Login Event',2,'2021-05-10 14:04:25.043','::1'),(1806,1,4,'Login Event',2,'2021-05-10 14:05:50.453','::1'),(1807,1,4,'Login Event',2,'2021-05-10 14:08:43.342','::1'),(1808,1,4,'Login Event',2,'2021-05-10 14:11:25.472','::1'),(1809,1,4,'Login Event',2,'2021-05-10 14:13:42.922','::1'),(1810,2,4,'Logout Event',2,'2021-05-10 14:30:00.425','::1'),(1811,1,4,'Login Event',2,'2021-05-10 14:45:12.071','::1'),(1812,1,4,'Login Event',2,'2021-05-10 14:47:10.012','::1'),(1813,1,4,'Login Event',2,'2021-05-10 14:50:42.638','::1'),(1814,1,4,'Login Event',2,'2021-05-10 14:51:46.987','::1'),(1815,1,4,'Login Event',2,'2021-05-10 14:53:31.993','::1'),(1816,1,4,'Login Event',2,'2021-05-10 14:54:24.695','::1'),(1817,1,4,'Login Event',2,'2021-05-10 14:56:04.714','::1'),(1818,1,4,'Login Event',2,'2021-05-10 14:56:34.237','::1'),(1819,1,4,'Login Event',2,'2021-05-10 15:06:50.221','::1'),(1820,1,4,'Login Event',2,'2021-05-10 15:08:20.887','::1'),(1821,1,4,'Login Event',2,'2021-05-10 15:13:35.587','::1'),(1822,1,4,'Login Event',2,'2021-05-10 15:14:52.665','::1'),(1823,1,4,'Login Event',2,'2021-05-10 15:15:37.311','::1'),(1824,1,4,'Login Event',2,'2021-05-10 15:17:17.313','::1'),(1825,1,4,'Login Event',2,'2021-05-10 15:20:39.684','::1'),(1826,1,4,'Login Event',2,'2021-05-10 15:32:09.181','::1'),(1827,1,4,'Login Event',2,'2021-05-10 15:33:02.118','::1'),(1828,1,4,'Login Event',2,'2021-05-12 11:28:20.925','::1'),(1829,2,4,'Logout Event',2,'2021-05-12 11:44:38.194','::1'),(1830,1,4,'Login Event',2,'2021-05-12 12:46:44.399','::1'),(1831,2,4,'Logout Event',2,'2021-05-12 12:46:44.479','::1'),(1832,1,4,'Login Event',2,'2021-05-12 12:46:53.365','::1'),(1833,1,4,'Login Event',2,'2021-05-12 12:47:11.507','::1'),(1834,1,4,'Login Event',2,'2021-05-12 12:47:55.827','::1'),(1835,1,4,'Login Event',2,'2021-05-12 12:49:24.455','::1'),(1836,1,4,'Login Event',2,'2021-05-12 12:51:09.282','::1'),(1837,1,4,'Login Event',2,'2021-05-12 12:52:47.194','::1'),(1838,3,4,'New Badge Created',2,'2021-05-12 12:53:20.011','::1'),(1839,1,4,'Login Event',2,'2021-05-12 13:06:24.579','::1'),(1840,1,4,'Login Event',2,'2021-05-12 13:06:29.729','::1'),(1841,3,4,'New Badge Created',2,'2021-05-12 13:06:54.387','::1'),(1842,1,4,'Login Event',2,'2021-05-12 15:00:51.338','::1'),(1843,1,4,'Login Event',2,'2021-05-12 15:00:55.474','::1'),(1844,1,4,'Login Event',2,'2021-05-12 15:01:12.152','::1'),(1845,1,4,'Login Event',2,'2021-05-12 15:02:24.550','::1'),(1846,2,4,'Logout Event',2,'2021-05-12 15:23:10.200','::1'),(1847,1,4,'Login Event',2,'2021-05-12 15:45:51.379','::1'),(1848,1,4,'Login Event',2,'2021-05-12 15:45:55.443','::1'),(1849,1,4,'Login Event',2,'2021-05-12 15:56:09.134','::1'),(1850,1,4,'Login Event',2,'2021-05-12 15:56:14.191','::1'),(1851,1,4,'Login Event',2,'2021-05-12 15:56:18.703','::1'),(1852,1,4,'Login Event',2,'2021-05-12 15:57:38.670','::1'),(1853,1,4,'Login Event',2,'2021-05-12 16:40:53.955','::1'),(1854,1,4,'Login Event',2,'2021-05-12 16:40:57.853','::1'),(1855,3,4,'New Badge Created',2,'2021-05-12 16:41:04.124','::1'),(1856,3,4,'New Badge Created',2,'2021-05-12 16:41:20.025','::1'),(1857,3,4,'New Badge Created',2,'2021-05-12 16:41:31.653','::1'),(1858,1,1,'Login Event',1,'2021-05-14 10:40:14.849','::1'),(1859,2,1,'Logout Event',1,'2021-05-14 10:40:18.176','::1'),(1860,1,4,'Login Event',2,'2021-05-14 10:40:27.247','::1'),(1861,1,1,'Login Event',1,'2021-05-14 10:52:20.890','::1'),(1862,1,4,'Login Event',2,'2021-05-14 11:03:18.372','::1'),(1863,1,4,'Login Event',2,'2021-05-14 11:03:22.673','::1'),(1864,2,4,'Logout Event',2,'2021-05-14 11:03:22.719','::1'),(1865,1,4,'Login Event',2,'2021-05-14 11:03:27.508','::1'),(1866,1,4,'Login Event',2,'2021-05-14 11:03:37.183','::1'),(1867,1,1,'Login Event',1,'2021-05-14 11:04:07.027','::1'),(1868,1,1,'Login Event',1,'2021-05-14 11:07:28.285','::1'),(1869,1,1,'Login Event',1,'2021-05-14 11:07:32.006','::1'),(1870,1,1,'Login Event',1,'2021-05-14 11:07:51.399','::1'),(1871,1,1,'Login Event',1,'2021-05-14 11:11:47.752','::1'),(1872,1,1,'Login Event',1,'2021-05-14 11:12:02.980','::1'),(1873,1,1,'Login Event',1,'2021-05-14 11:12:07.125','::1'),(1874,1,1,'Login Event',1,'2021-05-14 11:12:27.458','::1'),(1875,1,1,'Login Event',1,'2021-05-14 11:12:35.262','::1'),(1876,1,1,'Login Event',1,'2021-05-14 11:13:18.359','::1'),(1877,1,1,'Login Event',1,'2021-05-14 11:15:52.074','::1'),(1878,2,1,'Logout Event',1,'2021-05-14 11:35:52.673','::1'),(1881,10,1,'Failed Login Attempt',1,'2021-05-14 12:55:37.736','::1'),(1884,1,3,'Login Event',1,'2021-05-14 13:23:38.873','::1'),(1885,2,3,'Logout Event',1,'2021-05-14 13:23:55.120','::1'),(1886,1,3,'Login Event',1,'2021-05-14 13:24:09.754','::1'),(1892,10,3,'Failed Login Attempt',1,'2021-05-14 13:29:17.354','::1'),(1893,1,3,'Login Event',1,'2021-05-14 13:39:07.539','::1'),(1894,2,3,'Logout Event',1,'2021-05-14 13:39:11.316','::1'),(1896,1,3,'Login Event',1,'2021-05-14 13:39:44.365','::1'),(1897,1,3,'Login Event',1,'2021-05-14 13:39:52.689','::1'),(1898,1,3,'Login Event',1,'2021-05-14 13:41:44.806','::1'),(1899,2,3,'Logout Event',1,'2021-05-14 13:41:46.762','::1'),(1901,1,3,'Login Event',1,'2021-05-14 13:41:58.997','::1'),(1903,1,3,'Login Event',1,'2021-05-14 13:42:42.480','::1'),(1904,2,3,'Logout Event',1,'2021-05-14 13:42:44.992','::1'),(1906,1,3,'Login Event',1,'2021-05-14 13:43:06.276','::1'),(1907,2,3,'Logout Event',1,'2021-05-14 13:43:11.086','::1'),(1908,1,3,'Login Event',1,'2021-05-14 13:43:21.007','::1'),(1910,1,3,'Login Event',1,'2021-05-14 13:44:43.428','::1'),(1911,2,3,'Logout Event',1,'2021-05-14 13:44:47.242','::1'),(1913,10,1,'Failed Login Attempt',1,'2021-05-14 13:44:59.251','::1'),(1915,10,1,'Failed Login Attempt',1,'2021-05-14 13:48:09.378','::1'),(1916,10,1,'Failed Login Attempt',1,'2021-05-14 13:49:19.419','::1'),(1917,10,1,'Failed Login Attempt',1,'2021-05-14 13:52:41.899','::1'),(1918,1,3,'Login Event',1,'2021-05-14 13:56:14.573','::1'),(1919,2,3,'Logout Event',1,'2021-05-14 13:56:16.412','::1'),(1920,1,8,'Login Event',2,'2021-05-14 13:56:22.173','::1'),(1921,1,8,'Login Event',2,'2021-05-14 13:56:26.634','::1'),(1923,1,3,'Login Event',1,'2021-05-14 14:01:15.984','::1'),(1927,10,3,'Failed Login Attempt',1,'2021-05-14 14:04:32.610','::1'),(1928,1,1,'Login Event',1,'2021-05-14 14:04:41.874','::1'),(1929,1,1,'Login Event',1,'2021-05-14 14:10:39.098','::1'),(1930,2,1,'Logout Event',1,'2021-05-14 14:12:38.890','::1'),(1931,1,6,'Login Event',2,'2021-05-14 14:12:44.196','::1'),(1932,2,6,'Logout Event',2,'2021-05-14 14:12:45.865','::1'),(1933,1,1,'Login Event',1,'2021-05-14 14:12:49.500','::1'),(1934,2,1,'Logout Event',1,'2021-05-14 14:12:51.054','::1'),(1935,1,1,'Login Event',1,'2021-05-14 14:12:57.550','::1'),(1936,2,1,'Logout Event',1,'2021-05-14 14:12:59.708','::1'),(1937,1,1,'Login Event',1,'2021-05-14 14:13:22.179','::1'),(1939,10,3,'Failed Login Attempt',1,'2021-05-14 14:24:33.383','::1'),(1940,1,1,'Login Event',1,'2021-05-14 14:24:53.708','::1'),(1941,7,1,'User Information Updated',1,'2021-05-14 14:25:02.898','::1'),(1942,2,1,'Logout Event',1,'2021-05-14 14:25:17.124','::1'),(1943,1,3,'Login Event',1,'2021-05-14 14:25:21.900','::1'),(1944,1,3,'Login Event',1,'2021-05-14 14:25:27.126','::1'),(1945,1,1,'Login Event',1,'2021-05-14 14:31:17.186','::1'),(1946,7,1,'User Information Updated',1,'2021-05-14 14:31:22.004','::1'),(1947,7,1,'User Information Updated',1,'2021-05-14 14:31:30.762','::1'),(1948,7,1,'User Information Updated',1,'2021-05-14 14:31:42.384','::1'),(1949,7,1,'User Information Updated',1,'2021-05-14 14:32:07.724','::1'),(1950,2,1,'Logout Event',1,'2021-05-14 14:33:05.095','::1'),(1951,1,1,'Login Event',1,'2021-05-14 14:33:12.747','::1'),(1952,2,1,'Logout Event',1,'2021-05-14 14:33:14.635','::1'),(1953,1,3,'Login Event',1,'2021-05-14 14:35:01.834','::1'),(1954,1,3,'Login Event',1,'2021-05-14 14:35:06.925','::1'),(1955,1,3,'Login Event',1,'2021-05-14 14:35:14.804','::1'),(1956,1,1,'Login Event',1,'2021-05-14 14:43:20.411','::1'),(1957,1,1,'Login Event',1,'2021-05-14 14:45:30.742','::1'),(1958,2,1,'Logout Event',1,'2021-05-14 14:45:45.382','::1'),(1959,1,3,'Login Event',1,'2021-05-14 14:45:51.944','::1'),(1960,2,3,'Logout Event',1,'2021-05-14 14:45:53.817','::1'),(1961,1,8,'Login Event',2,'2021-05-14 14:45:59.769','::1'),(1962,1,1,'Login Event',1,'2021-05-14 15:04:16.655','::1'),(1963,2,1,'Logout Event',1,'2021-05-14 15:04:18.605','::1'),(1964,1,8,'Login Event',2,'2021-05-14 15:04:22.524','::1'),(1965,2,8,'Logout Event',2,'2021-05-14 15:04:24.449','::1'),(1966,1,3,'Login Event',1,'2021-05-14 15:04:28.172','::1'),(1967,2,3,'Logout Event',1,'2021-05-14 15:04:29.914','::1'),(1968,1,5,'Login Event',2,'2021-05-14 15:04:35.148','::1'),(1969,1,1,'Login Event',1,'2021-05-14 15:08:56.145','::1'),(1970,1,1,'Login Event',1,'2021-05-14 15:09:57.355','::1'),(1971,1,1,'Login Event',1,'2021-05-14 15:12:33.296','::1'),(1972,2,1,'Logout Event',1,'2021-05-14 15:12:42.243','::1'),(1973,1,8,'Login Event',2,'2021-05-14 15:12:52.138','::1'),(1974,2,8,'Logout Event',2,'2021-05-14 15:12:59.226','::1'),(1975,1,3,'Login Event',1,'2021-05-14 15:13:10.120','::1'),(1976,1,5,'Login Event',2,'2021-05-14 15:19:06.231','::1'),(1977,1,5,'Login Event',2,'2021-05-14 15:20:17.417','::1'),(1978,2,5,'Logout Event',2,'2021-05-14 15:20:25.725','::1'),(1979,1,3,'Login Event',1,'2021-05-14 15:20:30.175','::1'),(1980,2,3,'Logout Event',1,'2021-05-14 15:21:06.258','::1'),(1981,1,1,'Login Event',1,'2021-05-14 15:21:13.433','::1'),(1982,1,1,'Login Event',1,'2021-05-14 15:23:11.188','::1'),(1983,2,1,'Logout Event',1,'2021-05-14 15:24:15.446','::1'),(1984,1,4,'Login Event',2,'2021-05-14 15:24:22.847','::1'),(1985,2,4,'Logout Event',2,'2021-05-14 15:30:25.662','::1'),(1986,1,1,'Login Event',1,'2021-05-14 15:33:03.564','::1'),(1987,1,1,'Login Event',1,'2021-05-14 15:37:11.443','::1'),(1988,2,1,'Logout Event',1,'2021-05-14 15:37:13.525','::1'),(1989,1,1,'Login Event',1,'2021-05-14 15:37:42.287','::1'),(1990,2,1,'Logout Event',1,'2021-05-14 15:37:45.592','::1'),(1991,1,5,'Login Event',2,'2021-05-14 15:37:49.323','::1'),(1992,1,1,'Login Event',1,'2021-05-14 15:45:26.967','::1'),(1993,2,1,'Logout Event',1,'2021-05-14 15:45:28.324','::1'),(1994,1,8,'Login Event',2,'2021-05-14 15:45:31.808','::1'),(1995,2,8,'Logout Event',2,'2021-05-14 15:45:33.573','::1'),(1996,1,6,'Login Event',2,'2021-05-14 15:45:38.382','::1'),(1997,2,6,'Logout Event',2,'2021-05-14 15:45:40.145','::1'),(1998,1,5,'Login Event',2,'2021-05-14 15:45:44.087','::1'),(1999,2,5,'Logout Event',2,'2021-05-14 15:45:45.671','::1'),(2000,1,3,'Login Event',1,'2021-05-14 15:45:49.491','::1'),(2001,2,3,'Logout Event',1,'2021-05-14 15:45:51.020','::1'),(2002,1,5,'Login Event',2,'2021-05-14 15:45:59.019','::1'),(2003,2,5,'Logout Event',2,'2021-05-14 15:46:00.248','::1'),(2004,1,1,'Login Event',1,'2021-05-14 15:46:04.942','::1'),(2005,2,1,'Logout Event',1,'2021-05-14 15:46:07.110','::1'),(2006,1,8,'Login Event',2,'2021-05-14 15:46:11.895','::1'),(2007,2,8,'Logout Event',2,'2021-05-14 15:46:13.462','::1'),(2008,1,4,'Login Event',2,'2021-05-14 15:46:17.954','::1'),(2009,2,4,'Logout Event',2,'2021-05-14 15:46:19.523','::1'),(2010,1,9,'Login Event',2,'2021-05-14 15:46:24.282','::1'),(2011,2,9,'Logout Event',2,'2021-05-14 15:46:25.911','::1');
/*!40000 ALTER TABLE `event_audit_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_table`
--

DROP TABLE IF EXISTS `event_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_type` varchar(45) DEFAULT NULL,
  `event_message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_table`
--

LOCK TABLES `event_table` WRITE;
/*!40000 ALTER TABLE `event_table` DISABLE KEYS */;
INSERT INTO `event_table` VALUES (1,'Login','Login Event'),(2,'Logout','Logout Event'),(3,'Badge Created','New Badge Created'),(4,'Badge Issued','Bage Issued'),(5,'Badge Turned In','Badge Turned In'),(6,'Badge Analyzed','Badge Analysis Completed'),(7,'User Updated','User Information Updated'),(8,'User Locked Out','User Account Locked'),(9,'User Account Unlocked','User Account Unlocked'),(10,'Failed Login Attempt','Failed Login Attempt'),(11,'User Access Restriction','User attempted to access restricted content'),(12,'Data Download','User has downloaded Data File'),(13,'Badge Raw File Uploaded','User has Uploaded Raw Data Analysis'),(14,'Data Upload Failure','Data has failed to Upload'),(15,'Badge Analyzed File Uploaded','User has Uploaded Analyzed Data'),(16,'User Added','New User has been Added'),(17,'Badge Damaged','Badge been marked as damaged'),(18,'Analyte Updated','Analyte exposure ratings updated'),(19,'Sampling Rate Updated','Sampling rating has been updated'),(20,'Personal Password Updated','User has updated his own Password'),(21,'Location Added','New Location has been added'),(22,'Location Updated','Location has been Updated'),(23,'Analysis Added','A new Lab sample Analysis has been added'),(24,'Analysis Updated','A Lab sample Analysis has been updated'),(25,'Analysis Deleted','A Lab sample Analysis has been redacted');
/*!40000 ALTER TABLE `event_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_table`
--

DROP TABLE IF EXISTS `group_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_table` (
  `id` int(11) NOT NULL,
  `location` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `manager_name` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Manager ID_idx` (`manager_id`),
  KEY `Location_idx` (`location`),
  CONSTRAINT `Location Group Key` FOREIGN KEY (`location`) REFERENCES `location_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Manager Key` FOREIGN KEY (`manager_id`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_table`
--

LOCK TABLES `group_table` WRITE;
/*!40000 ALTER TABLE `group_table` DISABLE KEYS */;
INSERT INTO `group_table` VALUES (1,2,7,'Manager','2020-12-14 10:28:38','2020-12-14 10:28:38'),(8,1,1,'Matlock','2020-12-14 10:28:38','2020-12-14 10:28:38');
/*!40000 ALTER TABLE `group_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_table`
--

DROP TABLE IF EXISTS `location_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `base` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_table`
--

LOCK TABLES `location_table` WRITE;
/*!40000 ALTER TABLE `location_table` DISABLE KEYS */;
INSERT INTO `location_table` VALUES (1,'USA','OK','OKC','Tinker AFB'),(2,'USA','CA','San Diego','Pendelton'),(3,'Japan','FPO-AP','Okinawa','Camp Courtney'),(4,'Japan','FPO-AP','Okinawa','Camp Hansen'),(5,'Japan','FPO-AP','Okinawa','Camp Schwab'),(6,'Japan','FPO-AP','Okinawa','Camp Foster'),(7,'USA','CA','San Diego','Mirimar'),(8,'USA','NC','Rayleigh','Lejunne'),(9,'USA','OK','Lawton','Ft Sill'),(10,'USA','OK','Enid','Vance AFB'),(11,'USA','OK','Altus','Altus Air Force Base'),(12,'Japan','FPO-AP','Iwakuni','Camp Forester');
/*!40000 ALTER TABLE `location_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_table`
--

DROP TABLE IF EXISTS `login_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `account_locked` tinyint(4) NOT NULL DEFAULT '0',
  `login_threshold_exceeded` tinyint(4) NOT NULL DEFAULT '0',
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  `date_password_expires` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `Role_idx` (`role`),
  KEY `Location Key_idx` (`location_id`),
  KEY `Group Key_idx` (`group_id`),
  CONSTRAINT `Group Key` FOREIGN KEY (`group_id`) REFERENCES `group_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Location Key` FOREIGN KEY (`location_id`) REFERENCES `location_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Role Key` FOREIGN KEY (`role`) REFERENCES `role_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_table`
--

LOCK TABLES `login_table` WRITE;
/*!40000 ALTER TABLE `login_table` DISABLE KEYS */;
INSERT INTO `login_table` VALUES (1,'Matlock',8,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2020-08-14 10:28:38','2021-05-14 13:48:03.247','2025-04-28 11:31:51.302'),(2,'Caleb',8,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-08-14 10:28:38','2021-03-01 04:32:19.920','2025-05-11 19:27:24.581'),(3,'Wearer',1,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2020-08-14 10:28:38','2021-05-14 14:32:07.684','2025-04-28 12:23:02.046'),(4,'Manufacturer',2,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-08-14 10:28:38','2021-05-06 14:20:48.803','2025-04-29 10:25:49.244'),(5,'Scientist',3,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-08-14 10:28:38','2021-04-16 10:15:00.588','2025-04-28 11:42:31.617'),(6,'Analyst',4,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-08-14 10:28:38','2021-02-05 15:39:27.279','2025-04-29 10:26:36.536'),(7,'Manager',5,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-08-14 10:28:38','2021-01-28 14:31:19.811','2025-04-28 14:12:02.361'),(8,'Administrator',6,'V1caW2mR4SHn091EKn7JaQ==',8,2,0,0,'2020-08-14 10:28:38','2021-01-29 11:54:27.980','2025-04-29 12:54:27.977'),(9,'Auditor',7,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-08-14 10:28:38','2021-03-26 13:07:29.010','2025-05-11 14:21:45.769'),(10,'Peter',1,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2020-12-14 10:28:38','2021-02-10 13:18:17.668','2025-04-28 12:42:27.399'),(11,'Michael',1,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-12-14 10:28:38','2020-12-14 10:28:38','2020-04-20 06:00:00'),(12,'Jonah',3,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-12-14 10:28:38','2021-02-01 15:06:41.415','2021-05-02 16:06:41.414'),(13,'Josh',2,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-12-14 10:28:38','2021-01-29 09:21:50.841','2021-04-29 10:21:50.840'),(15,'Alex',2,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-12-14 10:28:38','2021-02-04 15:09:04.990','2020-04-20 06:00:00'),(21,'mike',4,'V1caW2mR4SHn091EKn7JaQ==',8,2,1,0,'2020-12-14 10:28:38','2021-02-25 11:10:57.005','2020-04-20 06:00:00'),(22,'Larry',2,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-12-15 13:22:43.822','2021-02-23 02:02:28.303','2021-05-24 03:03:21.050'),(23,'Moss',2,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-12-15 13:35:18.513','2020-12-18 09:07:51.482','2020-04-20 06:00:00'),(24,'Isabella',3,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2020-12-15 13:36:46.905','2021-02-05 09:23:38.726','2020-04-20 06:00:00'),(28,'JarJar',1,'V1caW2mR4SHn091EKn7JaQ==',8,2,0,0,'2020-12-15 15:53:03.733','2021-02-10 13:00:59.119','2021-04-28 12:59:28.614'),(29,'Opeth',1,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2020-12-15 15:55:35.077','2020-12-15 15:55:35.077','2020-04-20 06:00:00'),(30,'Alice',1,'V1caW2mR4SHn091EKn7JaQ==',1,1,0,0,'2020-12-22 14:39:31.917','2020-12-22 14:39:31.917','2020-04-20 06:00:00'),(31,'Picah',1,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2021-01-28 11:22:30.861','2021-01-28 11:22:30.861','2021-04-28 11:31:51.302'),(32,'Demo1',9,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2021-03-05 14:28:38','2021-03-05 14:28:38','2025-03-05 14:28:38'),(33,'Demo2',9,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2021-03-05 14:28:38','2021-03-05 14:28:38','2025-03-05 14:28:38'),(34,'Demo3',9,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2021-03-05 14:28:38','2021-03-05 14:28:38','2025-03-05 14:28:38'),(35,'Demo4',9,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2021-03-05 14:28:38','2021-03-05 14:28:38','2025-03-05 14:28:38'),(36,'Demo5',9,'V1caW2mR4SHn091EKn7JaQ==',1,2,0,0,'2021-03-05 14:28:38','2021-03-05 14:28:38','2025-03-05 14:28:38'),(37,'Moana',1,'V1caW2mR4SHn091EKn7JaQ==',8,1,0,0,'2021-04-16 09:51:06.148','2021-04-16 09:51:06.148','2021-04-28 11:31:51.302');
/*!40000 ALTER TABLE `login_table` ENABLE KEYS */;
UNLOCK TABLES;
ALTER DATABASE `xplosafedb` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`xplouser`@`%`*/ /*!50003 TRIGGER `login_table_AFTER_INSERT` AFTER INSERT ON `login_table` FOR EACH ROW BEGIN
declare userId int;
declare contactId int;
set userId = NEW.id;
call create_new_contact_values(userId);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `xplosafedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;

--
-- Table structure for table `maintenance_table`
--

DROP TABLE IF EXISTS `maintenance_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `maintenance_time` varchar(255) DEFAULT NULL,
  `maintenance_end_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance_table`
--

LOCK TABLES `maintenance_table` WRITE;
/*!40000 ALTER TABLE `maintenance_table` DISABLE KEYS */;
INSERT INTO `maintenance_table` VALUES (1,NULL,NULL);
/*!40000 ALTER TABLE `maintenance_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `method_table`
--

DROP TABLE IF EXISTS `method_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `method_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `method_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `method_code` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `method_table`
--

LOCK TABLES `method_table` WRITE;
/*!40000 ALTER TABLE `method_table` DISABLE KEYS */;
INSERT INTO `method_table` VALUES (1,'OSU-6',NULL),(2,'EPA-325',NULL),(3,'TENAX',NULL);
/*!40000 ALTER TABLE `method_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raw_data_table`
--

DROP TABLE IF EXISTS `raw_data_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raw_data_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raw_data` varchar(255) DEFAULT NULL,
  `raw_uploaded_by` int(11) DEFAULT NULL,
  `raw_comments` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  `original_filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Analyst Key_idx` (`raw_uploaded_by`),
  CONSTRAINT `Analyst Key` FOREIGN KEY (`raw_uploaded_by`) REFERENCES `login_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raw_data_table`
--

LOCK TABLES `raw_data_table` WRITE;
/*!40000 ALTER TABLE `raw_data_table` DISABLE KEYS */;
INSERT INTO `raw_data_table` VALUES (1,'8b9c0a4096739edf9903545a57322225',2,'Testestest Here\'s a comment!','2021-02-24 17:11:03','Tue Mar 16 2021 02:03:14 GMT-0500 (Central Daylight Time)','newBadges.csv'),(2,'7810d2e2f69481307ba56bc6a73d3fd5',2,'Testestest Here\'s a comment!','2021-02-24 17:11:03','Tue Mar 16 2021 01:55:56 GMT-0500 (Central Daylight Time)','xplosafe.mwb'),(3,'72d279f8e093f58793f81fe08fe7894c',2,'Neat compounds requested!','2021-02-24 17:11:03','Tue Mar 16 2021 03:46:02 GMT-0500 (Central Daylight Time)','CompoundsRequested.PNG'),(4,'0fc8e9dada8723283b148d0d6c3ef986',2,'Testestest Here\'s a comment!','2021-02-24 17:11:03','Tue Mar 16 2021 01:55:56 GMT-0500 (Central Daylight Time)','qr-code-test.mhtml'),(5,'467e09a8b44db0ecd8e282425c4a9f40',2,'Testestest Here\'s a comment!','2021-02-24 17:11:03','Tue Mar 16 2021 01:35:54 GMT-0500 (Central Daylight Time)','Reporting Elements - Navy badges - sample data for DRP 2-16-21.xlsx'),(6,'55db79cb097dd6e04661848dcb925073',2,'Badge: 1-9115-066\nBlah Blah Blah\nBlah Blah Blah','2021-02-24 17:11:03','Tue Mar 16 2021 04:21:06 GMT-0500 (Central Daylight Time)','xplosafedb-EER.png'),(7,NULL,NULL,'Disabling this here badge!','2021-02-24 17:11:03','2021-03-16 05:17:24.696',NULL),(8,NULL,NULL,'Disabling this here badge!','2021-02-24 17:11:03','2021-03-16 05:17:24.696',NULL),(9,NULL,NULL,'Disabling this here badge!','2021-02-24 17:11:03','2021-03-16 05:17:24.696',NULL),(10,'635703e2a17345113f1780baa3b29c39',2,'null','2021-02-24 17:11:03','Fri Mar 26 2021 09:28:27 GMT-0500 (Central Daylight Time)','Reporting Elements - Navy badges - sample data for DRP 2-16-21.xlsx'),(11,'8d8f45d47180643844aade93920a2e4f',2,'null','2021-02-24 17:11:03','Fri Mar 26 2021 10:05:59 GMT-0500 (Central Daylight Time)','Xplosafe SAD.docx'),(12,'95d4c8f0f2f2a894708e0a278dd968be',2,'null','2021-02-24 17:11:03','Fri Mar 26 2021 10:10:49 GMT-0500 (Central Daylight Time)','Xplosafe SAD.docx'),(13,'797823c8b94d6bc3e0f2eb44aaf5a1b2',2,'null','2021-02-24 17:11:03','Fri Mar 26 2021 10:13:12 GMT-0500 (Central Daylight Time)','Xplosafe SAD.docx'),(14,NULL,NULL,NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03',NULL),(15,NULL,NULL,NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03',NULL),(16,'101117555a3b0d845d6f4302f00b027b',1,'null','2021-02-24 17:11:03','Fri Apr 09 2021 12:19:39 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(17,'1d2bd169e26e7f93660584cba44882d2',1,'null','2021-02-24 17:11:03','Fri Apr 09 2021 12:19:39 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(18,'466b2301d7af680da293b46065e59c4a',1,'null','2021-02-24 17:11:03','Fri Apr 09 2021 12:19:39 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(19,'fa30ffe85e1448dcb2797996387ff2ca',1,'null','2021-02-25 09:41:46','Thu Apr 08 2021 11:50:25 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(20,'eff7e57a0c6626b42eed5888f18cdc04',1,'null','2021-02-25 09:41:46','Thu Apr 08 2021 11:50:25 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(21,'4eb45d94435fc48cf866d182f82608fa',1,'null','2021-02-25 09:41:46','Thu Apr 08 2021 11:50:25 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(22,NULL,2,'Damage exceeded. Analysis cannot be performed.','2021-02-25 09:42:14','2021-02-25 09:42:14',NULL),(23,NULL,2,'Damage exceeded. Analysis cannot be performed.','2021-02-25 09:42:14','2021-02-25 09:42:14',NULL),(24,NULL,2,'Damage exceeded. Analysis cannot be performed.','2021-02-25 09:42:14','2021-02-25 09:42:14',NULL),(25,'7c13543e2191da1cfdcecb06eec4d6d2',1,'null','2021-02-25 09:48:12','Fri Apr 09 2021 14:23:42 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(26,'ca14bedd9922c92b3e17b2f23485b243',1,'null','2021-02-25 09:48:12','Fri Apr 09 2021 14:23:42 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(27,'6eb2e335c7af8f944e24d5924742e7db',1,'null','2021-02-25 09:48:12','Fri Apr 09 2021 14:23:42 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(28,'2d0249fd543e9b388e0d4722ff3745e6',1,'null','2021-03-12 11:47:08','Fri Apr 16 2021 15:01:05 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(29,'2c2ed7b1d78fa502ca1c9f5d769f8438',1,'null','2021-03-12 11:47:08','Fri Apr 16 2021 14:45:24 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(30,'992bcfa9c76152c74dac547b946caf11',1,'null','2021-03-12 11:47:08','Fri Apr 16 2021 14:45:24 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(31,'88badc176ef637e4097ef2873ea8af33',1,'null','2021-03-12 11:47:17','Fri Apr 09 2021 14:20:06 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(32,'d8a95a387d94a7baa028a2d4314c39be',1,'null','2021-03-12 11:47:17','Fri Apr 09 2021 14:20:06 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(33,'e32bf161eb977a8c7149567fb638180e',1,'null','2021-03-12 11:47:17','Fri Apr 09 2021 14:20:06 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(34,'f249023950ef64b6837ceb96c92c8bca',1,'null','2021-03-12 11:47:19','Fri Apr 16 2021 15:01:05 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(35,'31e2402b1ea359625ce0faaada2024bc',1,'null','2021-03-12 11:47:19','Fri Apr 16 2021 15:01:05 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(36,'caa36964a6b62d1fbbbf4ac0c1351d82',1,'null','2021-03-12 11:47:19','Fri Apr 16 2021 15:01:05 GMT-0500 (Central Daylight Time)','AnalyzedData.txt'),(37,'3077eae57079017a1342ef30eae6ed68',1,'null','2021-03-12 11:47:20','Mon Apr 12 2021 12:27:17 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(38,'bbdc3e441575e9e9c5d69e137771c636',1,'null','2021-03-12 11:47:20','Mon Apr 12 2021 12:27:17 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(39,'be9d6ee6bd61f611de22ab5160738ca7',1,'null','2021-03-12 11:47:20','Mon Apr 12 2021 12:27:17 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(40,NULL,NULL,NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21',NULL),(41,NULL,NULL,NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21',NULL),(42,NULL,NULL,NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21',NULL),(43,NULL,NULL,NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24',NULL),(44,NULL,NULL,NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24',NULL),(45,NULL,NULL,NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24',NULL),(46,NULL,NULL,NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32',NULL),(47,NULL,NULL,NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32',NULL),(48,NULL,NULL,NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32',NULL),(49,NULL,NULL,NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37',NULL),(50,NULL,NULL,NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37',NULL),(51,NULL,NULL,NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37',NULL),(52,NULL,NULL,NULL,'2021-03-12 14:57:04','2021-03-12 14:57:04',NULL),(53,NULL,NULL,NULL,'2021-03-12 14:57:04','2021-03-12 14:57:04',NULL),(54,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(55,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(56,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(57,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(58,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(59,NULL,NULL,NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22',NULL),(60,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(61,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(62,'d0da6f244562e586c1202c8f4be70e1e',1,'null','2021-03-15 10:12:40','Fri Apr 09 2021 12:42:46 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(63,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(64,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(65,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(66,NULL,NULL,NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40',NULL),(67,'9979e35404e5a276452dc91fd91a3a7f',1,'null','2021-03-15 10:12:40','Fri Apr 09 2021 12:42:46 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(68,'40a26184375944d127324c17c09ab55f',1,'null','2021-03-15 10:12:40','Fri Apr 09 2021 12:42:46 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(69,'b84431bc4122131f0cbf79c1c070e1c2',1,'null','2021-03-15 10:16:27','Fri Apr 16 2021 10:13:29 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(70,'44f56913dea1d56392a2878c84ead16c',1,'null','2021-03-15 10:16:27','Fri Apr 16 2021 10:13:29 GMT-0500 (Central Daylight Time)','RAWDATA.txt'),(71,NULL,NULL,NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34',NULL),(72,NULL,NULL,NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34',NULL),(73,NULL,NULL,NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34',NULL),(74,NULL,NULL,NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09',NULL),(75,NULL,NULL,NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09',NULL),(76,NULL,NULL,NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09',NULL),(77,NULL,NULL,NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20',NULL),(78,NULL,NULL,NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20',NULL),(79,NULL,NULL,NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20',NULL),(80,NULL,NULL,NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02',NULL),(81,NULL,NULL,NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02',NULL),(82,NULL,NULL,NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02',NULL),(83,NULL,NULL,NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07',NULL),(84,NULL,NULL,NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07',NULL),(85,NULL,NULL,NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07',NULL),(86,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(87,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(88,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(89,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(90,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(91,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(92,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(93,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(94,NULL,NULL,NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25',NULL),(110,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(111,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(112,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(113,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(114,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(115,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(116,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(117,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(118,NULL,NULL,NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00',NULL),(119,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(120,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(121,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(122,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(123,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(124,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(125,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(126,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(127,NULL,NULL,NULL,'2021-05-12 13:38:27','2021-05-12 13:38:27',NULL),(128,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(129,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(130,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(131,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(132,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(133,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(134,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(135,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(136,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(137,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(138,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(139,NULL,NULL,NULL,'2021-05-12 13:47:49','2021-05-12 13:47:49',NULL),(141,NULL,NULL,NULL,'2021-05-12 14:02:22','2021-05-12 14:02:22',NULL),(142,NULL,NULL,NULL,'2021-05-12 14:02:22','2021-05-12 14:02:22',NULL),(143,NULL,NULL,NULL,'2021-05-12 14:02:22','2021-05-12 14:02:22',NULL);
/*!40000 ALTER TABLE `raw_data_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_table`
--

DROP TABLE IF EXISTS `role_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_table`
--

LOCK TABLES `role_table` WRITE;
/*!40000 ALTER TABLE `role_table` DISABLE KEYS */;
INSERT INTO `role_table` VALUES (1,'Wearer'),(2,'Manufacturer'),(3,'Scientist'),(4,'Analyst'),(5,'Manager'),(6,'Administrator'),(7,'Auditor'),(8,'Developer'),(9,'DemoUser');
/*!40000 ALTER TABLE `role_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sampling_rate_table`
--

DROP TABLE IF EXISTS `sampling_rate_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sampling_rate_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `analyte_name` varchar(255) DEFAULT NULL,
  `cas_number` varchar(255) DEFAULT NULL,
  `analyte_id` int(11) DEFAULT NULL,
  `osu_6_sampling_rate` varchar(255) DEFAULT NULL,
  `detection_limit` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Analyte ID_idx` (`analyte_id`),
  CONSTRAINT `Analyte Table ID` FOREIGN KEY (`analyte_id`) REFERENCES `analyte_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sampling_rate_table`
--

LOCK TABLES `sampling_rate_table` WRITE;
/*!40000 ALTER TABLE `sampling_rate_table` DISABLE KEYS */;
INSERT INTO `sampling_rate_table` VALUES (1,'Ethanol','64-17-5',51,NULL,NULL,NULL),(2,'monoethanolamine','141-43-5',52,NULL,NULL,NULL),(3,'4-ethyltoluene','622-96-8',67,'5.6',NULL,NULL),(4,'toluene','108-88-3',19,'5.6',NULL,NULL),(5,'2-bromodibenzofuran','86-76-0',66,NULL,NULL,NULL),(6,'1,2-dichlorobenzene','95-50-1',68,'5.6',NULL,NULL),(7,'Acetone','67-64-1',9,'5.6',NULL,NULL),(8,'formaldehyde','50-00-0',20,NULL,NULL,NULL),(9,'methyl ethyl Ketone','78-93-3',33,'5.6',NULL,NULL),(10,'methyl Isobutyl Ketone','108-10-1',32,NULL,NULL,NULL),(11,'vinyl Acetate','108-05-4',65,NULL,NULL,NULL),(12,'2-chloro-p-dioxin','39227-54-8',70,NULL,NULL,NULL),(13,'methylene chloride','75-09-2',31,NULL,NULL,NULL),(14,'1,1,2,2-tetrachloroethane','79-34-5',25,NULL,NULL,NULL),(15,'1,1,2-trichloroethane','79-00-5',26,NULL,NULL,NULL),(16,'trichloroethylene','19-01-6',27,NULL,NULL,NULL),(17,'1,2-dichlorotetrafluoroethane','76-14-2',21,'2.0',NULL,NULL),(18,'benzene','71-43-2',14,'5.6',NULL,NULL),(19,'ethylbenzene','100-41-4',24,'5.6',NULL,NULL),(20,'n-hexane','110-54-3',30,'2.9',NULL,NULL),(21,'nonane','111-84-2',53,NULL,NULL,NULL),(22,'m-xylene','108-38-3',29,'5.6',NULL,NULL),(23,'1,2,4-trimethylbenzene','95-63-6',54,NULL,NULL,NULL),(24,'cumene','98-82-8',23,NULL,NULL,NULL),(25,'tetrahydrofuran','109-99-9',28,NULL,NULL,NULL),(26,'dimethylnitramine','4146-28-7',59,NULL,NULL,NULL),(27,'2,4-dinitrotoluene','121-14-2',71,NULL,NULL,NULL),(28,'acetonitrile','75-05-8',35,NULL,NULL,NULL),(29,'acrylornitrile','107-13-1',36,NULL,NULL,NULL),(30,'chloroform','67-66-3',37,'5.6',NULL,NULL),(31,'cyclohexane','110-82-7',38,'5.6',NULL,NULL),(32,'1,2-dioxane','123-91-1',39,'5.6',NULL,NULL),(33,'2-hexanone','591-78-6',40,'5.6',NULL,NULL),(34,'PCB-3','2051-62-9',72,NULL,NULL,'2021-01-29 13:01:49.349'),(35,'benzo[a]pyrene','50-32-8',42,NULL,NULL,NULL),(36,'chrysene','218-01-9',60,NULL,NULL,NULL),(37,'naphtalene','91-20-3',43,NULL,NULL,NULL),(38,'phenanthene','85-01-8',61,NULL,NULL,NULL),(39,'1,1-dichloroethene','75-35-4',69,'5.6',NULL,NULL),(40,'styrene','100-42-5',45,'5.6',NULL,NULL),(41,'bromodichloromethane','75-27-4',62,NULL,NULL,NULL),(42,'bromoform','75-25-2',46,NULL,NULL,NULL),(43,'1,2-dibromoethane','106-93-4',47,NULL,NULL,NULL),(44,'vinyl bromide','593-60-2',55,NULL,NULL,NULL),(45,'propionaldehyde','123-38-6',56,NULL,NULL,NULL),(46,'p-tolualdehyde','104-87-0',57,NULL,NULL,NULL),(47,'1,3 butadiene','106-99-0',48,'2.4',NULL,NULL),(48,'hexacloro-1,3-butadiene','87-68-3',58,NULL,NULL,NULL),(49,'ethyl acetate','141-78-6',49,NULL,NULL,NULL),(50,'methyl methacrylate','80-62-6',50,NULL,NULL,NULL),(77,'1,2,3,6,8,9-Hexachlorodibenzo-p-dioxin','19408-74-3',64,NULL,NULL,NULL),(78,'1,2,3,4,6,7,8-Heptachlorodibenzo-p-dioxin','35822-46-9',63,NULL,NULL,NULL),(79,'1,1-Dichloroethane','75-34-3',44,NULL,NULL,NULL),(80,'Chlorodiphenyl (42% Chlorine) (PCB-4)','53469-21-9',41,NULL,NULL,NULL),(81,'Dinitrotoluene','25321-14-6',34,NULL,NULL,NULL),(82,'p-Dichlorobenzene','106-46-7',22,NULL,NULL,NULL),(83,'acrolein','107-02-8',13,NULL,NULL,NULL),(84,'acetylene tetrabromide','79-27-6',12,NULL,NULL,NULL),(85,'2-acetylaminofluorene','53-96-3',11,NULL,NULL,'2021-01-28 10:57:29.367');
/*!40000 ALTER TABLE `sampling_rate_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` int(11) NOT NULL,
  `expires` bigint(20) unsigned NOT NULL,
  `key` varchar(1024) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_id_UNIQUE` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_state_table`
--

DROP TABLE IF EXISTS `token_state_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_state_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_state_table`
--

LOCK TABLES `token_state_table` WRITE;
/*!40000 ALTER TABLE `token_state_table` DISABLE KEYS */;
INSERT INTO `token_state_table` VALUES (1,'Blank'),(2,'Active'),(3,'Damaged'),(4,'Quarantined');
/*!40000 ALTER TABLE `token_state_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_table`
--

DROP TABLE IF EXISTS `token_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_group_number` varchar(255) DEFAULT NULL,
  `tube_number` int(11) DEFAULT NULL,
  `badge_number` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `data_table_id` int(11) DEFAULT NULL,
  `raw_data_id` int(11) DEFAULT NULL,
  `badge_serial_number` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_last_updated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Batch Group Number_idx` (`batch_group_number`),
  KEY `Badge Number_idx` (`badge_number`),
  KEY `Data Table ID_idx` (`raw_data_id`,`data_table_id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_table`
--

LOCK TABLES `token_table` WRITE;
/*!40000 ALTER TABLE `token_table` DISABLE KEYS */;
INSERT INTO `token_table` VALUES (1,'1',1,1,'OSU-6',1,1,'1-9115-062',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(2,'1',2,1,'OSU-6',2,2,'1-9115-062',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(3,'1',3,1,'OSU-6',3,3,'1-9115-062',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(4,'1',1,2,'OSU-6',4,4,'1-9115-066',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(5,'1',2,2,'OSU-6',5,5,'1-9115-066',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(6,'1',3,2,'OSU-6',6,6,'1-9115-066',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(7,'1',1,3,'OSU-6',7,7,'1-9115-067',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(8,'1',2,3,'OSU-6',8,8,'1-9115-067',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(9,'1',3,3,'OSU-6',9,9,'1-9115-067',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(10,'1',1,4,'OSU-6',10,10,'1-9115-069',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(11,'1',2,4,'OSU-6',11,11,'1-9115-069',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(12,'1',3,4,'OSU-6',12,12,'1-9115-069',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(13,'1',1,5,'OSU-6',13,13,'1-9115-071',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(14,'1',2,5,'OSU-6',14,14,'1-9115-071',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(15,'1',3,5,'OSU-6',15,15,'1-9115-071',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(16,'1',1,6,'OSU-6',16,16,'1-8318-028',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(17,'1',2,6,'OSU-6',17,17,'1-8318-028',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(18,'1',3,6,'OSU-6',18,18,'1-8318-028',NULL,'2021-02-24 17:11:03','2021-02-24 17:11:03'),(19,'1',1,7,'OSU-6',19,19,'1-9115-061',NULL,'2021-02-25 09:41:46','2021-02-25 09:41:46'),(20,'1',2,7,'OSU-6',20,20,'1-9115-061',NULL,'2021-02-25 09:41:46','2021-02-25 09:41:46'),(21,'1',3,7,'OSU-6',21,21,'1-9115-061',NULL,'2021-02-25 09:41:46','2021-02-25 09:41:46'),(22,'1',1,8,'OSU-6',22,22,'1-9115-060',NULL,'2021-02-25 09:42:14','2021-02-25 09:42:14'),(23,'1',2,8,'OSU-6',23,23,'1-9115-060',NULL,'2021-02-25 09:42:14','2021-02-25 09:42:14'),(24,'1',3,8,'OSU-6',24,24,'1-9115-060',NULL,'2021-02-25 09:42:14','2021-02-25 09:42:14'),(25,'1',1,9,'OSU-6',25,25,'1-9115-059',NULL,'2021-02-25 09:48:12','2021-02-25 09:48:12'),(26,'1',2,9,'OSU-6',26,26,'1-9115-059',NULL,'2021-02-25 09:48:12','2021-02-25 09:48:12'),(27,'1',3,9,'OSU-6',27,27,'1-9115-059',NULL,'2021-02-25 09:48:12','2021-02-25 09:48:12'),(28,'2',1,10,'OSU-6',28,28,'1-9116-000',NULL,'2021-03-12 11:47:08','2021-03-12 11:47:08'),(29,'2',2,10,'OSU-6',29,29,'1-9116-000',NULL,'2021-03-12 11:47:08','2021-03-12 11:47:08'),(30,'2',3,10,'OSU-6',30,30,'1-9116-000',NULL,'2021-03-12 11:47:08','2021-03-12 11:47:08'),(31,'2',1,11,'OSU-6',31,31,'1-9116-001',NULL,'2021-03-12 11:47:17','2021-03-12 11:47:17'),(32,'2',2,11,'OSU-6',32,32,'1-9116-001',NULL,'2021-03-12 11:47:17','2021-03-12 11:47:17'),(33,'2',3,11,'OSU-6',33,33,'1-9116-001',NULL,'2021-03-12 11:47:17','2021-03-12 11:47:17'),(34,'2',1,12,'OSU-6',34,34,'1-9116-002',NULL,'2021-03-12 11:47:19','2021-03-12 11:47:19'),(35,'2',2,12,'OSU-6',35,35,'1-9116-002',NULL,'2021-03-12 11:47:19','2021-03-12 11:47:19'),(36,'2',3,12,'OSU-6',36,36,'1-9116-002',NULL,'2021-03-12 11:47:19','2021-03-12 11:47:19'),(38,'2',2,13,'OSU-6',38,38,'1-9116-003',NULL,'2021-03-12 11:47:20','2021-03-12 11:47:20'),(39,'2',3,13,'OSU-6',39,39,'1-9116-003',NULL,'2021-03-12 11:47:20','2021-03-12 11:47:20'),(40,'2',1,14,'OSU-6',40,40,'1-9116-004',NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21'),(41,'2',2,14,'OSU-6',41,41,'1-9116-004',NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21'),(42,'2',3,14,'OSU-6',42,42,'1-9116-004',NULL,'2021-03-12 11:47:21','2021-03-12 11:47:21'),(43,'3',1,15,'OSU-6',43,43,'1-9117-000',NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24'),(44,'3',2,15,'OSU-6',44,44,'1-9117-000',NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24'),(45,'3',3,15,'OSU-6',45,45,'1-9117-000',NULL,'2021-03-12 12:01:24','2021-03-12 12:01:24'),(46,'3',1,16,'OSU-6',46,46,'1-9117-001',NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32'),(47,'3',2,16,'OSU-6',47,47,'1-9117-001',NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32'),(48,'3',3,16,'OSU-6',48,48,'1-9117-001',NULL,'2021-03-12 12:01:32','2021-03-12 12:01:32'),(49,'3',1,17,'OSU-6',49,49,'1-9117-002',NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37'),(50,'3',2,17,'OSU-6',50,50,'1-9117-002',NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37'),(51,'3',3,17,'OSU-6',51,51,'1-9117-002',NULL,'2021-03-12 12:01:37','2021-03-12 12:01:37'),(52,'2',1,18,'OSU-6',52,52,'1-1-001',NULL,'2021-03-12 14:57:04','2021-03-12 14:57:04'),(53,'2',2,18,'OSU-6',53,53,'1-1-001',NULL,'2021-03-12 14:57:04','2021-03-12 14:57:04'),(54,'4',1,19,'OSU-6',54,54,'1-1064-001',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(55,'4',2,19,'OSU-6',55,55,'1-1064-001',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(56,'4',3,19,'OSU-6',56,56,'1-1064-001',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(57,'4',1,20,'OSU-6',57,57,'1-1064-002',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(58,'4',2,20,'OSU-6',58,58,'1-1064-002',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(59,'4',3,20,'OSU-6',59,59,'1-1064-002',NULL,'2021-03-12 15:58:22','2021-03-12 15:58:22'),(60,'5',1,21,'OSU-6',60,60,'1-1060-001',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(61,'5',1,22,'OSU-6',62,61,'1-1060-003',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(62,'5',1,23,'OSU-6',61,62,'1-1060-002',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(63,'5',2,21,'OSU-6',63,63,'1-1060-001',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(64,'5',2,22,'OSU-6',64,64,'1-1060-003',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(65,'5',3,21,'OSU-6',65,65,'1-1060-001',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(66,'5',3,22,'OSU-6',66,66,'1-1060-003',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(67,'5',2,23,'OSU-6',67,67,'1-1060-002',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(68,'5',3,23,'OSU-6',68,68,'1-1060-002',NULL,'2021-03-15 10:12:40','2021-03-15 10:12:40'),(69,'5',1,24,'OSU-6',69,69,'1-1060-004',NULL,'2021-03-15 10:16:27','2021-03-15 10:16:27'),(70,'5',2,24,'OSU-6',70,70,'1-1060-004',NULL,'2021-03-15 10:16:27','2021-03-15 10:16:27'),(71,'5',1,25,'OSU-6',71,71,'1-1060-005',NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34'),(72,'5',2,25,'OSU-6',72,72,'1-1060-005',NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34'),(73,'5',3,25,'OSU-6',73,73,'1-1060-005',NULL,'2021-03-15 10:18:34','2021-03-15 10:18:34'),(74,'5',1,26,'OSU-6',74,74,'1-1060-006',NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09'),(75,'5',2,26,'OSU-6',75,75,'1-1060-006',NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09'),(76,'5',3,26,'OSU-6',76,76,'1-1060-006',NULL,'2021-03-15 10:36:09','2021-03-15 10:36:09'),(77,'5',1,27,'OSU-6',77,77,'1-1060-007',NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20'),(78,'5',2,27,'OSU-6',78,78,'1-1060-007',NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20'),(79,'5',3,27,'OSU-6',79,79,'1-1060-007',NULL,'2021-03-15 10:38:20','2021-03-15 10:38:20'),(80,'5',1,28,'OSU-6',80,80,'1-1060-008',NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02'),(81,'5',2,28,'OSU-6',81,81,'1-1060-008',NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02'),(82,'5',3,28,'OSU-6',82,82,'1-1060-008',NULL,'2021-03-15 10:47:02','2021-03-15 10:47:02'),(83,'5',1,29,'OSU-6',83,83,'1-1060-009',NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07'),(84,'5',2,29,'OSU-6',84,84,'1-1060-009',NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07'),(85,'5',3,29,'OSU-6',85,85,'1-1060-009',NULL,'2021-03-15 11:18:07','2021-03-15 11:18:07'),(86,'3',1,30,'OSU-6',87,86,'1-1136-001',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(87,'3',1,31,'OSU-6',86,88,'1-1136-002',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(88,'3',1,32,'OSU-6',88,87,'1-1136-003',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(89,'3',2,30,'OSU-6',89,89,'1-1136-001',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(90,'3',2,31,'OSU-6',90,90,'1-1136-002',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(91,'3',3,30,'OSU-6',91,91,'1-1136-001',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(92,'3',3,31,'OSU-6',92,92,'1-1136-002',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(93,'3',2,32,'OSU-6',93,93,'1-1136-003',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(94,'3',3,32,'OSU-6',94,94,'1-1136-003',NULL,'2021-04-16 10:14:25','2021-04-16 10:14:25'),(110,'3',1,38,'OSU-6',110,110,'1-1163-001',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(111,'3',1,39,'OSU-6',112,112,'1-1163-002',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(112,'3',2,39,'OSU-6',113,113,'1-1163-002',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(113,'3',3,39,'OSU-6',114,114,'1-1163-002',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(114,'3',2,38,'OSU-6',111,111,'1-1163-001',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(115,'3',3,38,'OSU-6',115,115,'1-1163-001',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(116,'3',1,40,'OSU-6',116,116,'1-1163-003',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(117,'3',2,40,'OSU-6',117,117,'1-1163-003',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(118,'3',3,40,'OSU-6',118,118,'1-1163-003',NULL,'2021-05-12 13:31:00','2021-05-12 13:31:00'),(119,'3',1,43,'OSU-6',119,119,'1-1163-005','Blank','2021-05-12 13:38:27','2021-05-12 13:38:27'),(120,'3',1,41,'OSU-6',120,120,'1-1163-004','Blank','2021-05-12 13:38:27','2021-05-12 13:38:27'),(121,'3',2,43,'OSU-6',121,121,'1-1163-005','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(122,'3',2,41,'OSU-6',122,122,'1-1163-004','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(123,'3',3,43,'TENAX',123,123,'1-1163-005','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(124,'3',3,41,'TENAX',124,124,'1-1163-004','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(125,'3',1,42,'OSU-6',125,125,'1-1163-006','Blank','2021-05-12 13:38:27','2021-05-12 13:38:27'),(126,'3',2,42,'OSU-6',126,126,'1-1163-006','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(127,'3',3,42,'TENAX',127,127,'1-1163-006','Active','2021-05-12 13:38:27','2021-05-12 13:38:27'),(128,'3',1,47,'EPA-325',128,128,'1-1163-010','Blank','2021-05-12 13:47:49','2021-05-12 13:47:49'),(129,'3',1,44,'EPA-325',129,129,'1-1163-008','Blank','2021-05-12 13:47:49','2021-05-12 13:47:49'),(130,'3',2,47,'EPA-325',130,130,'1-1163-010','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(131,'3',2,44,'EPA-325',131,131,'1-1163-008','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(132,'3',3,47,'EPA-325',132,132,'1-1163-010','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(133,'3',3,44,'EPA-325',133,133,'1-1163-008','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(134,'3',1,45,'EPA-325',134,134,'1-1163-007','Blank','2021-05-12 13:47:49','2021-05-12 13:47:49'),(135,'3',1,46,'EPA-325',135,135,'1-1163-009','Blank','2021-05-12 13:47:49','2021-05-12 13:47:49'),(136,'3',2,45,'EPA-325',136,136,'1-1163-007','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(137,'3',2,46,'EPA-325',137,137,'1-1163-009','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(138,'3',3,45,'EPA-325',138,138,'1-1163-007','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(139,'3',3,46,'EPA-325',139,139,'1-1163-009','Active','2021-05-12 13:47:49','2021-05-12 13:47:49'),(140,'A123',1,56,'OSU-6',141,141,'1-1163-013','Blank','2021-05-12 14:02:22','2021-05-12 14:02:22'),(141,'A123',2,56,'OSU-6',142,142,'1-1163-013','Blank','2021-05-12 14:02:22','2021-05-12 14:02:22'),(142,'A123',3,56,'OSU-6',143,143,'1-1163-013','Blank','2021-05-12 14:02:22','2021-05-12 14:02:22');
/*!40000 ALTER TABLE `token_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_target_analytes_table`
--

DROP TABLE IF EXISTS `token_target_analytes_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_target_analytes_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `badge_serial_number` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `token_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `target_analyte_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `target_cas_number` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_target_analytes_table`
--

LOCK TABLES `token_target_analytes_table` WRITE;
/*!40000 ALTER TABLE `token_target_analytes_table` DISABLE KEYS */;
INSERT INTO `token_target_analytes_table` VALUES (8,'1-1163-005','3','toluene','108-88-3'),(9,'1-1163-005','2','toluene','108-88-3'),(10,'1-1163-005','3','tetrahydrofuran','109-99-9'),(11,'1-1163-004','2','toluene','108-88-3'),(12,'1-1163-004','3','toluene','108-88-3'),(13,'1-1163-004','3','tetrahydrofuran','109-99-9'),(14,'1-1163-006','3','toluene','108-88-3'),(15,'1-1163-006','3','tetrahydrofuran','109-99-9'),(16,'1-1163-006','2','toluene','108-88-3'),(17,'1-1163-010','2','formaldehyde','50-00-0'),(18,'1-1163-010','2','p-Dichlorobenzene','106-46-7'),(19,'1-1163-010','3','formaldehyde','50-00-0'),(20,'1-1163-010','3','acetic acid','64-19-7'),(21,'1-1163-010','3','styrene','100-42-5'),(22,'1-1163-008','2','p-Dichlorobenzene','106-46-7'),(23,'1-1163-008','2','formaldehyde','50-00-0'),(24,'1-1163-008','3','formaldehyde','50-00-0'),(25,'1-1163-008','3','acetic acid','64-19-7'),(26,'1-1163-008','3','styrene','100-42-5'),(27,'1-1163-007','2','formaldehyde','50-00-0'),(28,'1-1163-007','2','p-Dichlorobenzene','106-46-7'),(29,'1-1163-007','3','formaldehyde','50-00-0'),(30,'1-1163-007','3','acetic acid','64-19-7'),(31,'1-1163-007','3','styrene','100-42-5'),(32,'1-1163-009','2','p-Dichlorobenzene','106-46-7'),(33,'1-1163-009','2','formaldehyde','50-00-0'),(34,'1-1163-009','3','formaldehyde','50-00-0'),(35,'1-1163-009','3','acetic acid','64-19-7'),(36,'1-1163-009','3','styrene','100-42-5');
/*!40000 ALTER TABLE `token_target_analytes_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_type_table`
--

DROP TABLE IF EXISTS `token_type_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_type_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token_type_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_type_table`
--

LOCK TABLES `token_type_table` WRITE;
/*!40000 ALTER TABLE `token_type_table` DISABLE KEYS */;
INSERT INTO `token_type_table` VALUES (1,'OSU-6'),(2,'EPA-325'),(3,'TENAX');
/*!40000 ALTER TABLE `token_type_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'xplosafedb'
--

--
-- Dumping routines for database 'xplosafedb'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_default_analyzed_data` */;
ALTER DATABASE `xplosafedb` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `add_default_analyzed_data`(out analyzedDataId int)
BEGIN
declare currentTime int;
declare parsedTime VARCHAR(255);
SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
SELECT from_unixtime(currentTime) into parsedTime;

Insert into xplosafedb.analyzed_data_table (`analyzed_data`, `analyzed_uploaded_by`, `analyzed_comments`, `date_created`, `date_last_updated`) 
    values (null, null, null, parsedTime, parsedTime);
    set analyzedDataId =  last_insert_id();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `xplosafedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
/*!50003 DROP PROCEDURE IF EXISTS `add_default_data` */;
ALTER DATABASE `xplosafedb` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `add_default_data`(
in badgeId int, 
in badgeSerialNumber varchar(255), 
in rawDataId int, 
out dataId int)
BEGIN
	declare currentTime int;
	declare parsedTime VARCHAR(255);
    declare typestring varchar(255);
    
	SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
	SELECT from_unixtime(currentTime) into parsedTime;
    set typestring = 'Badge';
    Insert into xplosafedb.data_table (`data_table_type`, `raw_data_id`, `badge_id`, `badge_serial_number`, `date_created`, `date_last_updated`)
    values (typestring, rawDataId, badgeId, badgeSerialNumber, parsedTime, parsedTime);
    set dataId = last_insert_id();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `xplosafedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
/*!50003 DROP PROCEDURE IF EXISTS `add_default_raw_data` */;
ALTER DATABASE `xplosafedb` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `add_default_raw_data`(out rawDataId int)
BEGIN
declare currentTime int;
declare parsedTime VARCHAR(255);

SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
SELECT from_unixtime(currentTime) into parsedTime;
Insert into xplosafedb.raw_data_table (`raw_data`, `raw_uploaded_by`, `raw_comments`, `date_created`, `date_last_updated`) 
    values (null, null, null, parsedTime, parsedTime);
     Set rawDataId = last_insert_id();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `xplosafedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
/*!50003 DROP PROCEDURE IF EXISTS `add_default_token` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `add_default_token`(
in batchGroupNumber VARCHAR(255), 
in tubeNumber int, 
in badgeNumber int, 
in badgeSerialNumber VARCHAR(255), 
in tokenType int,
in dataId int,
in rawDataId int)
BEGIN
declare currentTime int;
declare parsedTime VARCHAR(255);

SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
SELECT from_unixtime(currentTime) into parsedTime;
	Insert into xplosafedb.token_table (`batch_group_number`, `tube_number`, `badge_number`, `type`, `data_table_id`, `raw_data_id`, `badge_serial_number`, `date_created`, `date_last_updated`) 
    values (batchGroupNumber, tubeNumber, badgeNumber, tokenType, dataId, rawDataId, badgeSerialNumber, parsedTime, parsedTime);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `badge_removed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `badge_removed`(
in numberOfTokens int, 
in id int,
in badgeSerialNumber VARCHAR(255))
BEGIN
	declare rawDataId int;
	declare dataId int;
	declare tokenId int;
	declare nt int;
	set nt = numberOfTokens;
    
    if (nt > 0) then
		loop_label: loop
			if (nt < 1) then leave loop_label;
			end if;
			select raw_data_id FROM xplosafedb.token_table WHERE (badge_serial_number = badgeSerialNumber and tube_number = nt) into rawDataId;
			select data_table_id FROM xplosafedb.token_table WHERE (badge_serial_number = badgeSerialNumber and tube_number = nt) into dataId;
			select id FROM xplosafedb.token_table WHERE (badge_serial_number = badgeSerialNumber and tube_number = nt) into tokenId;

			Delete From xplosafedb.data_table Where (xplosafedb.data_table.id = dataId);
			Delete From xplosafedb.raw_data_table Where (xplosafedb.raw_data_table.id = rawDataId);
			Delete From xplosafedb.token_target_analytes_table Where (xplosafedb.token_target_analytes_table.badge_serial_number = badgeSerialNumber and xplosafedb.token_target_analytes_table.token_id = nt);
			Delete From xplosafedb.analyzed_token_table Where (xplosafedb.analyzed_token_table.badge_serial_number = badgeSerialNumber and xplosafedb.analyzed_token_table.token_id = nt);
			Delete From xplosafedb.token_table Where (xplosafedb.token_table.badge_serial_number = badgeSerialNumber and xplosafedb.token_table.tube_number = nt);

			set nt = nt - 1;
		end loop;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_batch_group` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `create_batch_group`(in batchGroupId varchar(255))
BEGIN
declare contactId int;
declare currentTime int;
declare parsedTime VARCHAR(255);

SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
SELECT from_unixtime(currentTime) into parsedTime;
Insert into xplosafedb.batch_group_table (`id`, `type`, `date_created`, `date_last_updated`)
values (batchGroupId, 'OSU-6', parsedTime, parsedTime)
on duplicate key update `date_last_updated` = parsedTime;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_doehrs_ih` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `create_doehrs_ih`(In labSampleId varchar(20))
BEGIN
declare lab int(11);
declare analystId int(11);
declare analyst varchar(255);

Select `analyst_id` FROM `xplosafedb`.`analyzed_token_table` WHERE `badge_serial_number` = labSampleId limit 1 into analystId;
Select `username` FROM `xplosafedb`.`login_table` WHERE `id` = analystId limit 1 into analyst;
Select `LabCode` FROM `xplosafedb`.`doehrs_lab_table` WHERE `POCName` = analyst limit 1 into lab;

INSERT INTO `xplosafedb`.`doehrs_ih_lab_sample_analysis_results` (
`LabSampleId`, 
`Lab`) 
VALUES(labSampleId, lab) 
ON DUPLICATE KEY UPDATE
`Lab` = lab;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_new_badge_values` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `create_new_badge_values`(in badgeNumber int)
BEGIN
    Declare batchGroupNumber varchar(255);
	Declare numberOfTokens int;
	Declare badgeSerialNumber VARCHAR(255);
	Declare tokenType int;
    
    select batch_group from xplosafedb.badge_table where id = badgeNumber into batchGroupNumber;
    select number_of_tokens from xplosafedb.badge_table where id = badgeNumber into numberOfTokens;
    select badge_serial_number from xplosafedb.badge_table where id = badgeNumber into badgeSerialNumber;
    set tokenType = 1;
    call new_badge_added(batchGroupNumber, numberOfTokens, badgeNumber, badgeSerialNumber, tokenType);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_new_contact_values` */;
ALTER DATABASE `xplosafedb` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `create_new_contact_values`(in userId int)
BEGIN
declare contactId int;
declare currentTime int;
declare parsedTime VARCHAR(255);

SELECT UNIX_TIMESTAMP(NOW()) into currentTime;
SELECT from_unixtime(currentTime) into parsedTime;
Insert into xplosafedb.contact_table (`id`, `email`, `phone_number`, `date_created`, `date_last_updated`)
values (userId, 'default', 'N/A', parsedTime, parsedTime);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `xplosafedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin ;
/*!50003 DROP PROCEDURE IF EXISTS `doehrs_sample_added` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `doehrs_sample_added`(
	In id int,
	In sumMassMeasured float,
	In sumConcMeasured float,
	In sumConcCorrected float,
	In sampleId varchar(20),
	In selectedDate Date,
	In comments varchar(4000)
)
BEGIN
declare sampleFieldId varchar(30);
declare postSampleWeight float;
declare netWeight float;
declare existingNetWeight float;
declare existingPostSampleWeight float;

SELECT NetWeight From xplosafedb.doehrs_sample_table WHERE SampleId = sampleId limit 1 into existingNetWeight;

IF (existingNetWeight != null)
THEN
	begin
		SELECT `NetWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingNetWeight;
		SELECT`PostSampledWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingPostSampleWeight;
		set netWeight = (sumMassMeasured + sumConcMeasured + sumConcCorrected + existingNetWeight);
		set postSampleWeight = (sumMassMeasured + existingPostSampleWeight);
	End;
ELSE
	begin
		set netWeight = (sumMassMeasured + sumConcMeasured + sumConcCorrected);
		set postSampleWeight = sumMassMeasured;
	End;
END IF;
set sampleFieldId = CONCAT('1-', sampleId);

INSERT INTO xplosafedb.doehrs_sample_table (
SampleId, 
SampleFieldId, 
LabSampleId, 
SampleAnalyzedDate, 
ResultsReportedDate, 
ResultsReturnedDate, 
PostSampledWeight, 
NetWeight, 
LabSampleComments) 
VALUES(sampleId, sampleFieldId, sampleFieldId, selectedDate, selectedDate, selectedDate, postSampleWeight, netWeight, comments) 
ON DUPLICATE KEY UPDATE
SampleAnalyzedDate = selectedDate,
ResultsReturnedDate = selectedDate, 
PostSampledWeight = postSampleWeight, 
NetWeight = netWeight, 
LabSampleComments = comments;

Call create_doehrs_ih(sampleFieldId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `doehrs_sample_removed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `doehrs_sample_removed`(
	In id int,
	In sumMassMeasured float,
	In sumConcMeasured float,
	In sumConcCorrected float,
	In sampleId varchar(20),
	In selectedDate Date,
	In comments varchar(4000)
)
BEGIN
declare sampleFieldId varchar(30);
declare postSampleWeight float;
declare netWeight float;
declare existingNetWeight float;
declare existingPostSampleWeight float;

SELECT `NetWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId limit 1 into existingNetWeight;

IF (existingNetWeight != null)
THEN
	begin
		SELECT `NetWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingNetWeight;
		SELECT`PostSampledWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingPostSampleWeight;
		set netWeight = (existingNetWeight - sumMassMeasured - sumConcMeasured - sumConcCorrected);
		set postSampleWeight = (existingPostSampleWeight - sumMassMeasured);
	End;
ELSE
	begin
		set netWeight = 0;
		set postSampleWeight = 0;
	End;
END IF;
set sampleFieldId = CONCAT('1-', sampleId);

INSERT INTO `xplosafedb`.`doehrs_sample_table` (
`SampleId`, 
`SampleFieldId`, 
`LabSampleId`, 
`SampleAnalyzedDate`, 
`ResultsReportedDate`, 
`ResultsReturnedDate`, 
`PostSampledWeight`, 
`NetWeight`, 
`LabSampleComments`) 
VALUES(sampleId, sampleFieldId, sampleFieldId, selectedDate, selectedDate, selectedDate, postSampleWeight, netWeight, comments) 
ON DUPLICATE KEY UPDATE
`SampleAnalyzedDate` = selectedDate,
`ResultsReturnedDate` = selectedDate, 
`PostSampledWeight` = postSampleWeight, 
`NetWeight` = netWeight, 
`LabSampleComments` = comments;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `doehrs_sample_updated` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `doehrs_sample_updated`(
	In id int,
	In sumMassMeasured float,
	In sumConcMeasured float,
	In sumConcCorrected float,
	In sampleId varchar(20),
	In selectedDate Date,
	In comments varchar(4000)
)
BEGIN
declare sampleFieldId varchar(30);
declare postSampleWeight float;
declare netWeight float;
declare existingNetWeight float;
declare existingPostSampleWeight float;

SELECT NetWeight From xplosafedb.doehrs_sample_table WHERE SampleId = sampleId limit 1 into existingNetWeight;

IF (existingNetWeight != null)
THEN
	begin
		SELECT `NetWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingNetWeight;
		SELECT`PostSampledWeight` From `xplosafedb`.`doehrs_sample_table` WHERE `SampleId` = sampleId Limit 1 into existingPostSampleWeight;
		set netWeight = (sumMassMeasured + sumConcMeasured + sumConcCorrected + existingNetWeight);
		set postSampleWeight = (sumMassMeasured + existingPostSampleWeight);
	End;
ELSE
	begin
		set netWeight = (sumMassMeasured + sumConcMeasured + sumConcCorrected);
		set postSampleWeight = sumMassMeasured;
	End;
END IF;
set sampleFieldId = CONCAT('1-', sampleId);

INSERT INTO xplosafedb.doehrs_sample_table (
SampleId, 
SampleFieldId, 
LabSampleId, 
SampleAnalyzedDate, 
ResultsReportedDate, 
ResultsReturnedDate, 
PostSampledWeight, 
NetWeight, 
LabSampleComments) 
VALUES(sampleId, sampleFieldId, sampleFieldId, selectedDate, selectedDate, selectedDate, postSampleWeight, netWeight, comments) 
ON DUPLICATE KEY UPDATE
SampleAnalyzedDate = selectedDate,
ResultsReturnedDate = selectedDate, 
PostSampledWeight = postSampleWeight, 
NetWeight = netWeight, 
LabSampleComments = comments;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_badge_added` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`xplouser`@`%` PROCEDURE `new_badge_added`(
in batchGroupNumber VARCHAR(255), 
in numberOfTokens int, 
in badgeNumber int, 
in badgeSerialNumber VARCHAR(255), 
in tokenType int)
BEGIN
declare token int;
declare rawDataId int;
declare dataId int;
declare nt int;
set nt = 0;
set nt = numberOfTokens;

set token = 1;
if (nt > 0) then
	loop_label: loop
		if (token > nt) then leave loop_label;
		end if;
		
		call add_default_raw_data(rawDataId);
		call add_default_data(badgeNumber, badgeSerialNumber, rawDataId, dataId);
		
		call add_default_token(batchGroupNumber, token, badgeNumber, badgeSerialNumber, tokenType, dataId, rawDataId);
		set token = token + 1;
	end loop;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-14 16:45:48
