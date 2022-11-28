create table im_users(
name varchar(64), 
user_id varchar(64) primary key,
gmt_created timestamp default now(),
gmt_modified timestamp default now()
) DEFAULT CHARSET=utf8mb4;

create table im_messages (message longtext, user_id varchar(64), name varchar(64)) 
DEFAULT CHARSET=utf8mb4;