function ListStats({item}) {
    // console.log('stats', item);

    const total = (
        <h4 className='num'>{item.length} items in lijst</h4>
    );

    // let average = item.reduce((acc, cur) => {
    //     return acc + cur.rating
    // }, 0) / item.length
    // avarage = avarage.toFixed(1) // decimalen
    // const avg = (
    //     <h4 className='num'>{isNaN(average) ? 0 : avarage}</h4>
    // );

    return<div className='stats'>
        { total }
    </div>
}

ListStats.defaultProps = {
    item: {
        length: 0
    }
}

export default ListStats;