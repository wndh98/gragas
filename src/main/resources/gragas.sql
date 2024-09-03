-- create database gragasdb;

use gragasdb;

select * from board_file;
drop table if exists `ORDER_DETAIL`;
drop table if exists `ORDER_LIST`;
drop table if exists `ORDER_CART`;
drop table if exists PRE_ORDER_DETAIL;
drop table if exists PRE_ORDER_LIST;


DROP TABLE IF EXISTS `BOARD_FILE`;

DROP TABLE IF EXISTS `COMMENT_REVIEW`;
DROP TABLE IF EXISTS `BOARD_REVIEW`;

DROP TABLE IF EXISTS `COMMENT_QA`;
DROP TABLE IF EXISTS `BOARD_QA`;

DROP TABLE IF EXISTS `COMMENT_FREE`;
DROP TABLE IF EXISTS `BOARD_FREE`;

DROP TABLE IF EXISTS `COMMENT_NOTICE`;
DROP TABLE IF EXISTS `BOARD_NOTICE`;

drop table if exists SUBSCRIBE_PAYMENT;
drop table if exists SUBSCRIBE_ORDER;
drop table IF exists SUBSCRIBE_ITEM;



drop table if exists `PRODUCT_EVENT`;
drop table if exists `EVENT_ITEM`;
drop table if exists `PRODUCT_OPTION`;
drop table if exists `PRODUCT_ITEM`;
drop table if exists `PRODUCT_CATE`;






DROP TABLE IF EXISTS MEMBER_POINT;

DROP TABLE IF EXISTS MEMBER_DELIVERY;

DROP TABLE IF EXISTS USER;

DROP TABLE IF EXISTS MEMBER_COUPON;

-- 회원

-- 쿠폰&회원등급테이블

create table MEMBER_COUPON (
	USER_LEVEL VARCHAR(20) not null primary key,
	UL_IMG VARCHAR(255),
	MC_SAIL INT not null,
	MC_SUBJECT VARCHAR(255) not null
);

-- 회원테이블

create table user (
	USER_ID varchar(50) not null primary key,
	USER_LEVEL VARCHAR(20) not null,
	USER_PW VARCHAR(255) not null,
	USER_NAME VARCHAR(50) not null,
	USER_BIRTH DATE not null,
	USER_PHONE VARCHAR(50) not null,
	USER_POINT INT not null default 0,
	USER_COUPON VARCHAR(1) not null default 'Y',
	USER_DEL VARCHAR(1) not null default 'N',
	USER_REGIST DATETIME not null default NOW()
);
-- 배송지 테이블

create table MEMBER_DELIVERY (
	MD_NUM INT not null auto_increment primary key,
	USER_ID VARCHAR(50) not null,
	MD_NAME VARCHAR(255) not null,
	MD_TEL VARCHAR(255) not null,
	MD_ADDRESS VARCHAR(255) not null,
	MD_ADDRESS_DETAIL VARCHAR(255) not null,
	MD_MESSAGE VARCHAR(300) null
);

-- 회원포인트 테이블

create table MEMBER_POINT (
	MP_NUM INT not null auto_increment primary key,
	USER_ID VARCHAR(50) not null,
	MP_SUBJECT VARCHAR(255) not null,
	MP_POINT INT not null,
	MP_REGIST DATETIME not null default NOW()
);

alter table `MEMBER_DELIVERY` add constraint `FK_MD_USER_ID` foreign key (USER_ID) references USER(USER_ID);

alter table `MEMBER_POINT` add constraint `FK_MP_USER_ID` foreign key (USER_ID) references user(USER_ID) ;

alter table `USER` add constraint `FK_USER_LEVEL` foreign key (USER_LEVEL) references MEMBER_COUPON(USER_LEVEL);



-- 회원END

-- 상품

-- 카테고리



CREATE TABLE PRODUCT_CATE (
   PC_NUM INT NOT null primary key auto_increment,
   PC_NAME   VARCHAR(30)   NOT NULL,
   PC_IMG VARCHAR(255)
);

-- 이벤트
CREATE TABLE EVENT_ITEM (
   EI_NUM INT NOT NULL primary key AUTO_INCREMENT,
   EI_NAME   VARCHAR(30)   NOT NULL,
   EI_CONTENT VARCHAR(255)   NOT NULL

);

-- 상품
CREATE TABLE PRODUCT_ITEM (
   PI_NUM INT not null primary key AUTO_INCREMENT,
   PC_NUM   INT   NOT NULL,
   PI_NAME   VARCHAR(20)   NOT NULL,
   PI_DELI   INT   NOT NULL,
   PI_ALCOHOL INT,
   PI_SWEET INT,
   PI_SOUR   INT,
   PI_CARBONATED INT,
   PI_IMG   VARCHAR(255),
   PI_CONTENT   VARCHAR(255) NOT null,
   PI_PRICE INT NOT NULL,
   PI_DEL VARCHAR(1) NOT NULL default 'N',
   FOREIGN KEY(PC_NUM) references PRODUCT_CATE(PC_NUM)
);

-- 진행중인 이벤트
CREATE TABLE PRODUCT_EVENT (
   PI_NUM INT NOT NULL,
   EI_NUM INT NOT null,
   FOREIGN key(PI_NUM) references PRODUCT_ITEM(PI_NUM)
   on delete cascade,
   FOREIGN key(EI_NUM) references EVENT_ITEM(EI_NUM)
   on delete cascade
);

-- 상품옵션
CREATE TABLE PRODUCT_OPTION (
   PO_NUM   INT   NOT null primary key AUTO_INCREMENT,
   PI_NUM   INT   NOT NULL,
   PO_PRICE INT NOT NULL,
   PO_SALE   INT   NOT NULL,
   PO_NAME   VARCHAR(30)   NOT NULL,
   PO_CNT INT   NOT null,
   FOREIGN KEY(PI_NUM) references PRODUCT_ITEM(PI_NUM)
   on delete cascade
);






-- 상품END

-- 구독
create table `SUBSCRIBE_ITEM` (
	`SI_NUM` INT not null auto_increment,
	`SI_SUBJECT` VARCHAR(255) not null,
	`SI_CONTENT` VARCHAR(255) not null,
	`SI_DESCRIPTION` TEXT not null,
	`SI_PRICE` INT not null,
	`SI_PAY_DATE` DATETIME not null,
	`SI_MAIN_IMG` VARCHAR(255) not null,
	`SI_DES_IMG` VARCHAR(255) not null,
	`SI_TITLE` VARCHAR(255) not null,
	`SI_ARRIVE` DATETIME not null,
	primary key (`SI_NUM`)
);
create table `SUBSCRIBE_ORDER` (
	`SO_NUM` INT not null auto_increment,
	`SI_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`SO_NAME` VARCHAR(255) not null,
	`SO_TEL` INT not null,
	`SO_ADDR` VARCHAR(255) not null,
	`SO_ADDR_DE` VARCHAR(255) not null,
	`SO_MEMO` VARCHAR(255) not null,
	`SO_STATUS` VARCHAR(50) not null default '신청',
	primary key (`SO_NUM`)
);

create table `SUBSCRIBE_PAYMENT` (
	`SP_KEY` VARCHAR(255) not null,
	`SO_NUM` INT not null,
	`SP_METHOD` VARCHAR(50) not null,
	`SP_STATUS` VARCHAR(50) not null,
	`SP_TYPE` VARCHAR(50) null,
	`SP_REQUEST` DATETIME null,
	`SP_APPROVE` DATETIME null,
	primary key (`SP_KEY`)
);

alter table `SUBSCRIBE_ORDER` add constraint `FK_USER_TO_SUBSCRIBE_ORDER` foreign key (`USER_ID`)
references `USER` (`USER_ID`);

alter table `SUBSCRIBE_PAYMENT` add constraint `FK_SUBSCRIBE_ORDER_TO_SUBSCRIBE_PAYMENT` foreign key (`SO_NUM`)
references `SUBSCRIBE_ORDER` (`SO_NUM`);

alter table `SUBSCRIBE_ORDER` add constraint `FK_SUBSCRIBE_ITEM_TO_SUBSCRIBE_ORDER` foreign key (`SI_NUM`)
references `SUBSCRIBE_ITEM` (`SI_NUM`);


-- 구독END
-- 게시판

-- 리뷰게시판
create table `BOARD_REVIEW` (
	`B_NUM` INT not null auto_increment primary key,
	`SI_NUM` INT null,											#구독상품 번호
	`PI_NUM` INT null,										#상품번호
	`USER_ID` VARCHAR(50) not null,
	`B_REF` INT not null,
	`B_SUBJECT` VARCHAR(255) not null,
	`B_WRITER` VARCHAR(255) not null,
	`B_CONTENT` TEXT null,
	`B_STAR` tinyint null,
	`B_REGIST` DATETIME not null default NOW()
);
-- 리뷰댓글
create table `COMMENT_REVIEW` (
	`C_NUM` INT not null auto_increment primary key,
	`B_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`C_CONTENT` VARCHAR(300) not null,
	`C_REGIST` DATETIME not null default NOW()
);
-- 문의게시판
create table `BOARD_QA` (
	`B_NUM` INT not null auto_increment primary key,
	`SI_NUM` INT null,											#구독상품 번호
	`PI_NUM` INT null,										#상품번호
	`USER_ID` VARCHAR(50) not null,
	`B_REF` INT null,
	`B_SUBJECT` VARCHAR(255) not null,
	`B_WRITER` VARCHAR(255) not null,
	`B_CONTENT` TEXT null,
	`B_STAR` tinyint null,
	`B_REGIST` DATETIME not null default NOW()
);
-- 문의댓글
create table `COMMENT_QA` (
	`C_NUM` INT not null auto_increment primary key,
	`B_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`C_CONTENT` VARCHAR(300) not null,
	`C_REGIST` DATETIME not null default NOW()
);
-- 자유게시판
create table `BOARD_FREE` (
	`B_NUM` INT not null auto_increment primary key,
	`SI_NUM` INT null,											#구독상품 번호
	`PI_NUM` INT null,										#상품번호
	`USER_ID` VARCHAR(50) not null,
	`B_REF` INT null,
	`B_SUBJECT` VARCHAR(255) not null,
	`B_WRITER` VARCHAR(255) not null,
	`B_CONTENT` TEXT null,
	`B_STAR` tinyint null,
	`B_REGIST` DATETIME not null default NOW()
);
-- 자유댓글
create table `COMMENT_FREE` (
	`C_NUM` INT not null auto_increment primary key,
	`B_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`C_CONTENT` VARCHAR(300) not null,
	`C_REGIST` DATETIME not null default NOW()
);
-- 공지게시판
create table `BOARD_NOTICE` (
	`B_NUM` INT not null auto_increment primary key,
	`SI_NUM` INT null,											#구독상품 번호
	`PI_NUM` INT null,										#상품번호
	`USER_ID` VARCHAR(50) not null,
	`B_REF` INT null,
	`B_SUBJECT` VARCHAR(255) not null,
	`B_WRITER` VARCHAR(255) not null,
	`B_CONTENT` TEXT null,
	`B_STAR` tinyint null,
	`B_REGIST` DATETIME not null default NOW()
);
-- 공지댓글
create table `COMMENT_NOTICE` (
	`C_NUM` INT not null auto_increment primary key,
	`B_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`C_CONTENT` VARCHAR(300) not null,
	`C_REGIST` DATETIME not null default NOW()
);
-- 게시판 파일
create table `BOARD_FILE` (
	`BF_NUM` INT not null auto_increment primary key,
	`B_NUM` INT not null,
	`BF_R_NAME` VARCHAR(255) not null,
	`BF_O_NAME` VARCHAR(255) not null,
	`BF_ROOT` VARCHAR(255) not null,
	`BF_BOARD` VARCHAR(50) not null,
	`BF_ORDER` int null,
	`BF_REGIST` DATETIME not null default NOW()
);

ALTER TABLE `BOARD_REVIEW` ADD CONSTRAINT `FK_BR_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_REVIEW` ADD CONSTRAINT `FK_BR_SI_NUM` foreign key(SI_NUM) references SUBSCRIBE_ITEM(SI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_REVIEW` ADD CONSTRAINT `FK_BR_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `BOARD_QA` ADD CONSTRAINT `FK_BQ_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_QA` ADD CONSTRAINT `FK_BQ_SI_NUM` foreign key(SI_NUM) references SUBSCRIBE_ITEM(SI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_QA` ADD CONSTRAINT `FK_BQ_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `BOARD_FREE` ADD CONSTRAINT `FK_BF_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_FREE` ADD CONSTRAINT `FK_BF_SI_NUM` foreign key(SI_NUM) references SUBSCRIBE_ITEM(SI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_FREE` ADD CONSTRAINT `FK_BF_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `BOARD_NOTICE` ADD CONSTRAINT `FK_BN_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_NOTICE` ADD CONSTRAINT `FK_BN_SI_NUM` foreign key(SI_NUM) references SUBSCRIBE_ITEM(SI_NUM) ON DELETE CASCADE;
ALTER TABLE `BOARD_NOTICE` ADD CONSTRAINT `FK_BN_USER_ID` foreign key(USER_ID) references USER(USER_ID);

ALTER TABLE `COMMENT_REVIEW` ADD CONSTRAINT `FK_CR_B_NUM` foreign key(B_NUM) references BOARD_REVIEW(B_NUM) ON DELETE CASCADE;
ALTER TABLE `COMMENT_REVIEW` ADD CONSTRAINT `FK_CR_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `COMMENT_QA` ADD CONSTRAINT `FK_CQ_B_NUM` foreign key(B_NUM) references BOARD_QA(B_NUM) ON DELETE CASCADE;
ALTER TABLE `COMMENT_QA` ADD CONSTRAINT `FK_CQ_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `COMMENT_FREE` ADD CONSTRAINT `FK_CF_B_NUM` foreign key(B_NUM) references BOARD_FREE(B_NUM) ON DELETE CASCADE;
ALTER TABLE `COMMENT_FREE` ADD CONSTRAINT `FK_CF_USER_ID` foreign key(USER_ID) references USER(USER_ID);
ALTER TABLE `COMMENT_NOTICE` ADD CONSTRAINT `FK_CN_B_NUM` foreign key(B_NUM) references BOARD_NOTICE(B_NUM) ON DELETE CASCADE;
ALTER TABLE `COMMENT_NOTICE` ADD CONSTRAINT `FK_CN_USER_ID` foreign key(USER_ID) references USER(USER_ID);

-- 게시판END

-- 주문

-- 주문리스트
create table `ORDER_LIST` (
	`OL_ID` VARCHAR(255) not null primary key,
	`USER_ID` VARCHAR(50) not null,
	`OL_PRICE` INT not null,
	`OL_DELI` INT not null,
	`OL_CNT` INT not null,
	`OL_PAYMENT` VARCHAR(50) not null,
	`OL_PAY` INT not null,
	`OL_REGIST` DATETIME not null,
	`OL_PAY_REGIST` DATETIME null,
	`OL_POINT` int not null default 0,
	`OL_NAME` VARCHAR(255) not null,
	`OL_TEL` VARCHAR(255) not null,
	`OL_ADDRESS` VARCHAR(255) not null,
	`OL_ADDRESS_DETAIL` VARCHAR(255) not null,
	`OL_MEMO` VARCHAR(255) null,
	`OL_USE_COUPON` VARCHAR(1) NOT NULL default 'N'
);
-- 주문상세
create table `ORDER_DETAIL` (
	`OD_NUM` INT not null auto_increment primary key,
	`OL_ID` VARCHAR(255) not null,
	`PI_NUM` INT not null,
	`PI_NAME` VARCHAR(255) not null,
	`PO_NUM` INT not null,
	`PO_NAME` varchar(255) not null,
	`PO_PRICE` int not null,
	`PO_SALE` int not null,
	`OD_CNT` INT not null,
	`OD_PRICE` INT not null,
	`OD_POINT` INT not null default 0,
	`OD_STATUS` VARCHAR(10) not null default 'READY'
);





-- 장바구니
create table `ORDER_CART` (
    `OC_NUM` int primary key not null auto_increment,
	`OC_ID` VARCHAR(255) not null,
	`PI_NUM` INT not null,
	`PO_NUM` INT not null,
	`USER_ID` VARCHAR(50) not null,
	`OC_CNT` INT not null
);


-- 주문전 주문리스트
create table `PRE_ORDER_LIST` (
	`OL_ID` VARCHAR(255) not null primary key,
	`USER_ID` VARCHAR(50) not null,
	`OL_PRICE` INT not null,
	`OL_DELI` INT not null,
	`OL_CNT` INT not null,
	`OL_PAYMENT` VARCHAR(50) not null,
	`OL_PAY` INT not null,
	`OL_REGIST` DATETIME not null,
	`OL_PAY_REGIST` DATETIME null,
	`OL_POINT` int not null default 0,
	`OL_NAME` VARCHAR(255) not null,
	`OL_TEL` VARCHAR(255) not null,
	`OL_ADDRESS` VARCHAR(255) not null,
	`OL_ADDRESS_DETAIL` VARCHAR(255) not null,
	`OL_MEMO` VARCHAR(255) null,
	`OL_USE_COUPON` VARCHAR(1) NOT NULL default 'N'
);
-- 주문전 주문상세
create table `PRE_ORDER_DETAIL` (
	`OD_NUM` INT not null auto_increment primary key,
	`OL_ID` VARCHAR(255) not null,
	`PI_NUM` INT not null,
	`PI_NAME` VARCHAR(255) not null,
	`PO_NUM` INT not null,
	`PO_NAME` varchar(255) not null,
	`PO_PRICE` int not null,
	`PO_SALE` int not null,
	`OD_CNT` INT not null,
	`OD_PRICE` INT not null,
	`OD_POINT` INT not null default 0,
	`OD_STATUS` VARCHAR(10) not null default 'READY'
);
ALTER TABLE `PRE_ORDER_DETAIL` ADD CONSTRAINT `PRE_FK_OL_ID` foreign key(OL_ID) references PRE_ORDER_LIST(OL_ID) on delete cascade;




ALTER TABLE `ORDER_LIST` ADD CONSTRAINT `FK_OL_USER_ID` foreign key(USER_ID) references USER(USER_ID);

alter table `ORDER_DETAIL` add constraint `FK_OD_OL_ID` foreign key(OL_ID) references ORDER_LIST(OL_ID);
-- alter table `ORDER_DETAIL` add constraint `FK_OD_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM);
-- alter table `ORDER_DETAIL` add constraint `FK_OD_PO_NUM` foreign key(PO_NUM) references PRODUCT_OPTION(PO_NUM);

alter table `ORDER_CART` add constraint `FK_OC_USER_ID` foreign key(USER_ID) references user(USER_ID);
alter table `ORDER_CART` add constraint `FK_OC_PI_NUM` foreign key(PI_NUM) references PRODUCT_ITEM(PI_NUM) ON DELETE CASCADE;
alter table `ORDER_CART` add constraint `FK_OC_PO_NUM` foreign key(PO_NUM) references PRODUCT_OPTION(PO_NUM)ON DELETE CASCADE;



-- 주문 END






insert into MEMBER_COUPON values('Yellow','',100,'테스트1');