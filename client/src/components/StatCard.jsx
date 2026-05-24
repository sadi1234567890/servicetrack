function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
        </div>

        {Icon && (
          <div className="stat-icon">
            <Icon size={24} />
          </div>
        )}
      </div>

      <p className="stat-description">{description}</p>
    </div>
  );
}

export default StatCard;