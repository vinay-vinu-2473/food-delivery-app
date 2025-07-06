import Modal from '../UI/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { XIcon } from '@heroicons/react/outline';

export default function AuthModal({ type, onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {type === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          {type === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </Modal>
  );
}