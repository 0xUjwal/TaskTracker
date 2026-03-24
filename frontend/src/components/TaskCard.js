export default function TaskCard({ task, onEdit, onDelete, onToggleDone }) {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusClass = `status-${task.status.toLowerCase().replace(" ", "-")}`;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`task-card ${task.status === "Done" ? "task-done" : ""}`}>
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-badges">
          <span className={`badge ${statusClass}`}>{task.status}</span>
          <span className={`badge ${priorityClass}`}>{task.priority}</span>
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="task-due">Due: {formatDate(task.dueDate)}</p>
      )}
      <div className="task-card-actions">
        {task.status !== "Done" && (
          <button
            className="btn btn-small btn-success"
            onClick={() => onToggleDone(task)}
          >
            ✓ Done
          </button>
        )}
        <button className="btn btn-small btn-outline" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
