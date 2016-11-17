DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `phone_number` varchar(14) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

LOCK TABLES `users` WRITE;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone_number`, `address`)
VALUES
  (1,'Douglas','Keller','(330) 555-6654',''),
  (2,'Zippy','Kangaroo','','The University of Akron'),
  (3,'Yingcai','Xiao','123 456-7890','Department of Computer Science');

UNLOCK TABLES;