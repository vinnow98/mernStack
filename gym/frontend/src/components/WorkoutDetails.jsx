import React from "react";

const WorkoutDetails = ({ workout }) => {
  if (!workout || workout.length === 0) {
    return <div>No workout data available</div>;
  }
  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return "";
    const [date, time] = createdAt.split("T");
    return `${date}, ${time.slice(0, 5)} hrs`;
  };
  return (
    <div>
      <div
        className="d-flex flex-column align-items-center col-12"
        style={{ marginTop: "6em" }}
      >
        {workout.map((workout) => (
          <div
            key={workout._id}
            className="d-flex flex-column mb-3 shadow rounded p-3 col-8"
          >
            <div className="d-flex">
              <img
                src="/avatar.png"
                alt="profilepic"
                className="img-fluid col-1 border"
              />
              <div className="d-flex flex-column ms-3">
                <div className="fs-4 text-primary">{workout.title}</div>
                <div className="fs-6 fw-lighter fst-italic">
                  Updated at: {formatCreatedAt(workout.createdAt)}
                </div>
              </div>
            </div>
            <div>
              <strong>Reps: </strong> {workout.reps}
            </div>
            <div>
              <strong>Load: </strong>
              {workout.load}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetails;
