const ActivityItem = ( { activity, time } ) => {
    return ( 
        <div className="activity-item">
            <div className="activity">{activity}</div>
            <div className="activity-time">{time}</div>
        </div>
     );
}
 
export default ActivityItem;