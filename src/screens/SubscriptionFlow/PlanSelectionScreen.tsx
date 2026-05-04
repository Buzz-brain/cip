import React, { useEffect, useState } from 'react';

interface Plan {
  id: number;
  name: string;
  price: number;
  features: Record<string, any>;
}

interface PlanSelectionScreenProps {
  onSelectPlan: (plan: Plan) => void;
}

const PlanSelectionScreen: React.FC<PlanSelectionScreenProps> = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://xcip.name.ng/auth/plans')
      .then(res => res.json())
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch plans.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Choose a Subscription Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-lg mb-2">{plan.price === 0 ? 'Free' : `$${plan.price}`}</div>
            <ul className="mb-4 text-sm">
              {Object.entries(plan.features || {}).map(([k, v]) => (
                <li key={k}><b>{k}:</b> {String(v)}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onSelectPlan(plan)}>
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelectionScreen;
