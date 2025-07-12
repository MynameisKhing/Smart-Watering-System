// pages/Schedule.tsx
export default function Schedule() {
  return (
    <div>
      <h1>Schedule</h1>
      <form>
        <input type="time" />
        <button>Add Schedule</button>
      </form>
      <ul>
        <li>06:00 <button>Delete</button></li>
        <li>18:00 <button>Delete</button></li>
      </ul>
    </div>
  );
}
