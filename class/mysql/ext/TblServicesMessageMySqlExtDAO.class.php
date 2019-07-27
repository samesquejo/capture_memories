<?php
/**
 * Class that operate on table 'tbl_services_message'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2019-07-26 19:52
 */
class TblServicesMessageMySqlExtDAO extends TblServicesMessageMySqlDAO{

	public function getMessageByService($option) {
		$sql = "select * from tbl_services_message where tbl_services_id = ".$option['serviceId'];
		if(isset($option['orderBy'])) {
			$sql .=" order by ".$option['column']." ".$option['orderBy'];
		}
		if(isset($option['limit'])) {
			$sql .=" limit ".$option['limit'];
		}
		$sqlQuery = new SqlQuery($sql);
		return QueryExecutor::execute($sqlQuery);
	}
	
	public function getMessageByServiceMeta($option) {
		$sql = "
			select 
			message.description,
			message.created_at,
			user.type,
			user.first_name,
			user.last_name

			from tbl_services_message message
			inner join tbl_services as service
			on message.tbl_services_id = service.id

			inner join tbl_user as user
			on message.tbl_sender_id = user.id
			
			where service.id = ".$option['serviceId']
		;
		if(isset($option['orderBy'])) {
			$sql .=" order by ".$option['column']." ".$option['orderBy'];
		}
		if(isset($option['limit'])) {
			$sql .=" limit ".$option['limit'];
		}
		$sqlQuery = new SqlQuery($sql);
		return QueryExecutor::execute($sqlQuery);
	}
}
?>