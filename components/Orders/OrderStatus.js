const statusSteps = [
  { id: 'received', name: 'Order Received' },
  { id: 'preparing', name: 'Preparing' },
  { id: 'ontheway', name: 'On the Way' },
  { id: 'delivered', name: 'Delivered' },
];

export default function OrderStatus({ currentStatus }) {
  const currentStepIndex = statusSteps.findIndex(step => step.id === currentStatus);

  return (
    <div className="relative">
      <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
      {statusSteps.map((step, index) => (
        <div key={step.id} className="relative flex items-start pb-8">
          <div className="absolute top-0 left-4 -ml-1.5">
            <div className={`h-3 w-3 rounded-full ${
              index < currentStepIndex 
                ? 'bg-green-500' 
                : index === currentStepIndex 
                  ? 'bg-orange-500' 
                  : 'bg-gray-300'
            }`}></div>
          </div>
          <div className="ml-8">
            <p className={`font-medium ${
              index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}