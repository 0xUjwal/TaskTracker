import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { taskAPI } from "../api";

export default function Analytics() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const data = await taskAPI.analytics(token);
      setStats(data);
    } catch (err) {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) return <p className="loading-text">Loading analytics...</p>;
  if (!stats) return null;

  return (
    <div className="analytics">
      <h3>Dashboard</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card stat-progress">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-todo">
          <span className="stat-number">{stats.todo}</span>
          <span className="stat-label">Todo</span>
        </div>
      </div>
      <div className="completion-bar-container">
        <div className="completion-header">
          <span>Completion</span>
          <span>{stats.completionPercentage}%</span>
        </div>
        <div className="completion-bar">
          <div
            className="completion-fill"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
