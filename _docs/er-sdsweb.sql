/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 14.1 		*/
/*  Created On : 07-Jan-2020 11:34:16 PM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0
; 
/* Drop Tables */

DROP TABLE IF EXISTS `accouting_adjust` CASCADE
;

DROP TABLE IF EXISTS `donor` CASCADE
;

DROP TABLE IF EXISTS `lov` CASCADE
;

DROP TABLE IF EXISTS `order` CASCADE
;

DROP TABLE IF EXISTS `order_item` CASCADE
;

DROP TABLE IF EXISTS `order_transfer` CASCADE
;

DROP TABLE IF EXISTS `order_upload` CASCADE
;

DROP TABLE IF EXISTS `product` CASCADE
;

DROP TABLE IF EXISTS `product_group` CASCADE
;

DROP TABLE IF EXISTS `role_base` CASCADE
;

DROP TABLE IF EXISTS `role_base_privilege` CASCADE
;

DROP TABLE IF EXISTS `role_privilege` CASCADE
;

DROP TABLE IF EXISTS `sms` CASCADE
;

DROP TABLE IF EXISTS `stock` CASCADE
;

DROP TABLE IF EXISTS `stock_fulfill` CASCADE
;

DROP TABLE IF EXISTS `user` CASCADE
;

DROP TABLE IF EXISTS `user_rolebase` CASCADE
;

/* Create Tables */

CREATE TABLE `accouting_adjust`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` DATE NULL,
	`lov_servicepoint_id` INT NULL,
	`qty` INT NULL,
	`cash` DECIMAL(12,4) NULL,
	`wait_transfer` DECIMAL(12,4) NULL,
	`adjust` DECIMAL(12,4) NULL,
	`update_by` INT NULL,
	`update_date` DATETIME NULL,
	CONSTRAINT `PK_accouting_adjust` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `donor`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`lov_prefix_id` INT NULL,
	`firstname` VARCHAR(30) NULL,
	`lastname` VARCHAR(30) NULL,
	`address` VARCHAR(200) NULL,
	`state` VARCHAR(30) NULL,
	`lov_country_id` INT NULL,
	`zipcode` VARCHAR(10) NULL,
	`phone` VARCHAR(30) NULL,
	`occupation` VARCHAR(50) NULL,
	`date_of_birth` DATE NULL,
	`lov_gender_id` INT NULL,
	`line` VARCHAR(60) NULL,
	`email` VARCHAR(60) NULL,
	`lov_donor_group_id` INT NULL,
	`comment` TEXT NULL,
	`create_by` INT NULL,
	`create_date` DATETIME NULL,
	CONSTRAINT `PK_donor` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `lov`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	`code` VARCHAR(50) NULL,
	`text` VARCHAR(50) NULL,
	`group` VARCHAR(50) NULL,
	`delete_flag` SMALLINT NULL,
	CONSTRAINT `PK_lov` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `order`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`donor_id` INT NULL,
	`lov_service_point_id` INT NULL,
	`order_name` VARCHAR(60) NULL,
	`total` INT NULL,
	`product_group_id` INT NULL,
	`receipt_file` VARCHAR(250) NULL,
	`payment_period` SMALLINT NULL,
	`lov_payment_status` INT NULL,
	`comment` TEXT NULL,
	`create_by` INT NULL,
	`create_date` DATETIME NULL,
	`update_by` INT NULL,
	`update_date` DATETIME NULL,
	CONSTRAINT `PK_order` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `order_item`
(
	`order_id` INT NULL,
	`product_id` INT NULL,
	`qty` SMALLINT NULL
)

;

CREATE TABLE `order_transfer`
(
	`order_id` INT NULL,
	`lov_payment_status_id` INT NULL,
	`seq` SMALLINT NULL,
	`total` DECIMAL(12,4) NULL,
	`notification_date` VARCHAR(10) NULL,
	`payment_date` VARCHAR(10) NULL,
	`need_receipt` VARCHAR(6) NULL,
	`receipt_file` VARCHAR(200) NULL
)

;

CREATE TABLE `order_upload`
(
	`order_id` INT NOT NULL AUTO_INCREMENT,
	`lov_service_point_id` INT NULL,
	`lov_order_status_id` INT NULL,
	`lov_donor_verify_status_id` INT NULL,
	`lov_order_verify_status_id` INT NULL,
	`fileurl` VARCHAR(200) NULL,
	`lov_lock_status_id` INT NULL,
	`create_by` INT NULL,
	`create_date` DATETIME NULL,
	`update_by` INT NULL,
	`update_date` DATETIME NULL,
	CONSTRAINT `PK_order_upload` PRIMARY KEY (`order_id` ASC)
)

;

CREATE TABLE `product`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(60) NULL,
	`product_group_id` INT NULL,
	CONSTRAINT `PK_product` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `product_group`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(60) NULL,
	CONSTRAINT `PK_product_group` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `role_base`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(60) NULL,
	`delete_flag` SMALLINT NULL,
	CONSTRAINT `PK_role_base` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `role_base_privilege`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`role_base_id` INT NULL,
	`role_privilege_id` INT NULL,
	CONSTRAINT `PK_role_base_privilege` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `role_privilege`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(60) NULL,
	`delete_flag` SMALLINT NULL,
	CONSTRAINT `PK_role_privilege` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `sms`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`sender` INT NULL,
	`send_date` DATETIME NULL,
	`lov_sends_sms_status_id` INT NULL,
	`message` TEXT NULL,
	`lov_sms_response_id` INT NULL,
	CONSTRAINT `PK_sms` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `stock`
(
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`qty` INT NULL,
	CONSTRAINT `PK_stock` PRIMARY KEY (`product_id` ASC)
)

;

CREATE TABLE `stock_fulfill`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`product_id` INT NULL,
	`name` VARCHAR(60) NULL,
	`qty_instock` INT NULL,
	`qty_receive` INT NULL,
	`purchase_date` DATE NULL,
	`receive_plan_date` DATE NULL,
	`receive_actual_date` DATE NULL,
	CONSTRAINT `PK_stock_fulfill` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `user`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(30) NULL,
	`email` VARCHAR(50) NULL,
	`password` VARCHAR(50) NULL,
	`phone` VARCHAR(30) NULL,
	CONSTRAINT `PK_user` PRIMARY KEY (`id` ASC)
)

;

CREATE TABLE `user_rolebase`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NULL,
	`role_base_id` INT NULL,
	CONSTRAINT `PK_user_rolebase` PRIMARY KEY (`id` ASC)
)

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `accouting_adjust` 
 ADD INDEX `IXFK_accouting_adjust_lov` (`lov_servicepoint_id` ASC)
;

ALTER TABLE `accouting_adjust` 
 ADD INDEX `IXFK_accouting_adjust_user` (`update_by` ASC)
;

ALTER TABLE `donor` 
 ADD INDEX `IXFK_donor_lov` (`lov_prefix_id` ASC)
;

ALTER TABLE `donor` 
 ADD INDEX `IXFK_donor_lov_02` (`lov_country_id` ASC)
;

ALTER TABLE `donor` 
 ADD INDEX `IXFK_donor_lov_03` (`lov_gender_id` ASC)
;

ALTER TABLE `donor` 
 ADD INDEX `IXFK_donor_lov_04` (`lov_donor_group_id` ASC)
;

ALTER TABLE `donor` 
 ADD INDEX `IXFK_donor_user` (`create_by` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_donor` (`donor_id` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_donor_02` (`donor_id` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_lov` (`lov_service_point_id` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_lov_02` (`lov_payment_status` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_product_group` (`product_group_id` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_user` (`create_by` ASC)
;

ALTER TABLE `order` 
 ADD INDEX `IXFK_order_user_02` (`update_by` ASC)
;

ALTER TABLE `order_item` 
 ADD INDEX `IXFK_order_item_order` (`order_id` ASC)
;

ALTER TABLE `order_item` 
 ADD INDEX `IXFK_order_item_product` (`product_id` ASC)
;

ALTER TABLE `order_transfer` 
 ADD INDEX `IXFK_order_transfer_lov` (`lov_payment_status_id` ASC)
;

ALTER TABLE `order_transfer` 
 ADD INDEX `IXFK_order_transfer_order` (`order_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_lov` (`lov_service_point_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_lov_02` (`lov_order_status_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_lov_03` (`lov_donor_verify_status_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_lov_04` (`lov_order_verify_status_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_lov_05` (`lov_lock_status_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_order` (`order_id` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_user` (`create_by` ASC)
;

ALTER TABLE `order_upload` 
 ADD INDEX `IXFK_order_upload_user_02` (`update_by` ASC)
;

ALTER TABLE `product` 
 ADD INDEX `IXFK_product_product_group` (`product_group_id` ASC)
;

ALTER TABLE `role_base` 
 ADD INDEX `IXFK_role_base_lov` (`delete_flag` ASC)
;

ALTER TABLE `role_base_privilege` 
 ADD INDEX `IXFK_role_base_privilege_role_base` (`role_base_id` ASC)
;

ALTER TABLE `role_base_privilege` 
 ADD INDEX `IXFK_role_base_privilege_role_privilege` (`role_privilege_id` ASC)
;

ALTER TABLE `sms` 
 ADD INDEX `IXFK_sms_lov` (`lov_sends_sms_status_id` ASC)
;

ALTER TABLE `sms` 
 ADD INDEX `IXFK_sms_lov_02` (`lov_sms_response_id` ASC)
;

ALTER TABLE `sms` 
 ADD INDEX `IXFK_sms_user` (`sender` ASC)
;

ALTER TABLE `stock` 
 ADD INDEX `IXFK_stock_product` (`product_id` ASC)
;

ALTER TABLE `stock_fulfill` 
 ADD INDEX `IXFK_stock_fulfill_product` (`product_id` ASC)
;

ALTER TABLE `user_rolebase` 
 ADD INDEX `IXFK_user_rolebase_role_base_privilege` (`role_base_id` ASC)
;

ALTER TABLE `user_rolebase` 
 ADD INDEX `IXFK_user_rolebase_user` (`user_id` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `accouting_adjust` 
 ADD CONSTRAINT `FK_accouting_adjust_lov`
	FOREIGN KEY (`lov_servicepoint_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `accouting_adjust` 
 ADD CONSTRAINT `FK_accouting_adjust_user`
	FOREIGN KEY (`update_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `donor` 
 ADD CONSTRAINT `FK_donor_lov`
	FOREIGN KEY (`lov_prefix_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `donor` 
 ADD CONSTRAINT `FK_donor_lov_02`
	FOREIGN KEY (`lov_country_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `donor` 
 ADD CONSTRAINT `FK_donor_lov_03`
	FOREIGN KEY (`lov_gender_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `donor` 
 ADD CONSTRAINT `FK_donor_lov_04`
	FOREIGN KEY (`lov_donor_group_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `donor` 
 ADD CONSTRAINT `FK_donor_user`
	FOREIGN KEY (`create_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_donor`
	FOREIGN KEY (`donor_id`) REFERENCES `donor` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_lov`
	FOREIGN KEY (`lov_service_point_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_lov_02`
	FOREIGN KEY (`lov_payment_status`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_product_group`
	FOREIGN KEY (`product_group_id`) REFERENCES `product_group` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_user`
	FOREIGN KEY (`create_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order` 
 ADD CONSTRAINT `FK_order_user_02`
	FOREIGN KEY (`update_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_item` 
 ADD CONSTRAINT `FK_order_item_order`
	FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_item` 
 ADD CONSTRAINT `FK_order_item_product`
	FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_transfer` 
 ADD CONSTRAINT `FK_order_transfer_lov`
	FOREIGN KEY (`lov_payment_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_transfer` 
 ADD CONSTRAINT `FK_order_transfer_order`
	FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_lov`
	FOREIGN KEY (`lov_service_point_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_lov_02`
	FOREIGN KEY (`lov_order_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_lov_03`
	FOREIGN KEY (`lov_donor_verify_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_lov_04`
	FOREIGN KEY (`lov_order_verify_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_lov_05`
	FOREIGN KEY (`lov_lock_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_order`
	FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_user`
	FOREIGN KEY (`create_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `order_upload` 
 ADD CONSTRAINT `FK_order_upload_user_02`
	FOREIGN KEY (`update_by`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `product` 
 ADD CONSTRAINT `FK_product_product_group`
	FOREIGN KEY (`product_group_id`) REFERENCES `product_group` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `role_base_privilege` 
 ADD CONSTRAINT `FK_role_base_privilege_role_base`
	FOREIGN KEY (`role_base_id`) REFERENCES `role_base` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `role_base_privilege` 
 ADD CONSTRAINT `FK_role_base_privilege_role_privilege`
	FOREIGN KEY (`role_privilege_id`) REFERENCES `role_privilege` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `sms` 
 ADD CONSTRAINT `FK_sms_lov`
	FOREIGN KEY (`lov_sends_sms_status_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `sms` 
 ADD CONSTRAINT `FK_sms_lov_02`
	FOREIGN KEY (`lov_sms_response_id`) REFERENCES `lov` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `sms` 
 ADD CONSTRAINT `FK_sms_user`
	FOREIGN KEY (`sender`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `stock` 
 ADD CONSTRAINT `FK_stock_product`
	FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `stock_fulfill` 
 ADD CONSTRAINT `FK_stock_fulfill_product`
	FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_rolebase` 
 ADD CONSTRAINT `FK_user_rolebase_role_base_privilege`
	FOREIGN KEY (`role_base_id`) REFERENCES `role_base_privilege` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `user_rolebase` 
 ADD CONSTRAINT `FK_user_rolebase_user`
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE Restrict ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1
; 
