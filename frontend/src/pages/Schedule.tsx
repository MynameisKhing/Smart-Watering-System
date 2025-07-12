export default function Schedule() {
  return (
    <div>
      <h1>Schedule</h1>
      <form>
        <div className="input-group mb-3">
          <input type="time" className="form-control" />
          <button className="btn btn-success">Add Schedule</button>
        </div>
      </form>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          06:00 <button className="btn btn-sm btn-danger">Delete</button>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          18:00 <button className="btn btn-sm btn-danger">Delete</button>
        </li>
      </ul>
    </div>
  );
}
