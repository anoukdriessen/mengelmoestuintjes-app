function DashboardTopic({image, imageAlt, title, handleOnClick, children}) {
    return <div className='dashboard-topic'>
        <img width={320} height={320} src={image} alt={imageAlt} onClick={handleOnClick}/>
        <h4>{title}</h4>
        { children }
    </div>
}

export default DashboardTopic;