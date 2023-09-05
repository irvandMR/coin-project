export const CoinList = (props) => {
   //create a new array by filtering the original array
   const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
        return el;
          }
          //return the item which contains the user input
          else {
              return el.text.toLowerCase().includes(props.input)
          }
      })
  return
  (
    <>
      {Array.isArray(filteredData) ? (
              <table className="table tb-coins" style={{ tableLayout: "fixed"}}>
                <thead>
                  <tr>
                    <th scope="col" ></th>
                    <th scope="col" >ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Symbol</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Type</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0,5).map((data, i) => (
                    <tr key={i}>
                      <td >{i + 1}</td>
                      <td scope="row">{data.id}</td>
                      <td >{data.name}</td>
                      <td >{data.symbol}</td>
                      <td >{data.rank}</td>
                      <td >{data.type}</td>
                      <td >{data.is_active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : "No data"}
    </>
  )
}