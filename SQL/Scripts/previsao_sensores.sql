-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: previsao
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `sensores`
--

DROP TABLE IF EXISTS `sensores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensores` (
  `Data` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Precipitacao_horario_total_mm` float DEFAULT NULL,
  `PA_horaria_nivel_estacao` float DEFAULT NULL,
  `PA_max_hora_anterior` float DEFAULT NULL,
  `PA_min_hora_anterior` float DEFAULT NULL,
  `Radiacao_global` float DEFAULT NULL,
  `Temp_ar` float DEFAULT NULL,
  `Temp_ponto_orvalho` float DEFAULT NULL,
  `Temp_max_hora_anterior` float DEFAULT NULL,
  `Temp_min_hora_anterior` float DEFAULT NULL,
  `Temp_ponto_orvalho_max_hora_anterior` float DEFAULT NULL,
  `Temp_ponto_orvalho_min_hora_anterior` float DEFAULT NULL,
  `Umidade_relativa_ar_max_hora_anterior` float DEFAULT NULL,
  `Umidade_relativa_ar_min_hora_anterior` float DEFAULT NULL,
  `Umidade_relativa_do_ar` float DEFAULT NULL,
  `Direcao_horaria_vento_partir_norte` varchar(255) DEFAULT NULL,
  `Velocidade_rajada_vento` float DEFAULT NULL,
  `Velocidade_horaria_vento` float DEFAULT NULL,
  `Estacao` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensores`
--

LOCK TABLES `sensores` WRITE;
/*!40000 ALTER TABLE `sensores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-17 16:30:15
