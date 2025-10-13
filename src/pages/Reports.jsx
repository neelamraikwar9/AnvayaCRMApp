import { Link } from 'react-router-dom';

const Report = () => {
    return (
        <main className="leadContainer">
        <h1 className="text">Anvaya CRM Reports </h1>
         <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
          <h2>Report Overview</h2>
          <section>
          <p>Total Leads closed and in Pipeline: [Pie Chart]|</p>
          </section>

          <section>
        <p>Leads Closed by Sales Agent:</p>
        <p>[Bar Chart]</p>
        </section>
          <br />

          <section>
            <p> Lead Status Distribution: </p>
            <p> [Pie Chart or Bar Chart]</p>
          </section>
          
        </div>
      </div>


        </main>
    )
}

export default Report;