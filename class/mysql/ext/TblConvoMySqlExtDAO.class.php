<?php
/**
 * Class that operate on table 'tbl_convo'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2019-06-25 16:29
 */
class TblConvoMySqlExtDAO extends TblConvoMySqlDAO{

	public function getConvo($userId) {
		$sql = "
			select
			convo.id,
			convo.tbl_user_id user_id,
			booking.departing_at,
			booking.returning_at,
			booking.status,
			place.name destination_name


			from tbl_convo as convo
			inner join tbl_booking as booking
			on convo.tbl_booking_id = booking.id
			
			inner join tbl_tour_package_meta as tourMeta
			on booking.tbl_tour_package_meta_id = tourMeta.id

			inner join tbl_tour_package as tour
			on tourMeta.tbl_tour_package_id = tour.id

			inner join tbl_place as place
			on tour.place_id = place.id

			where convo.tbl_user_id = ".$userId."

			order by convo.updated_at desc
		";
		$sqlQuery = new SqlQuery($sql);
		return QueryExecutor::execute($sqlQuery);
	}
}
?>