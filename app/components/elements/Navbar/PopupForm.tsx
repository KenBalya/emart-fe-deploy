import React from 'react';
import { Button } from '../Button';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  isOpen,
  onClose,
  onTopUp,
  onWithdraw,
}) => {
  const [amount, setAmount] = React.useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleTopUp = () => {
    onTopUp(amount);
  };

  const handleWithdraw = () => {
    onWithdraw(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96 text-black">
        <h2 className="text-xl font-bold mb-4 text-[#21BF73]">Top-up / Withdraw</h2>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />
        <div className="flex justify-between">
          <Button callToAction={true} btnType={'primary'} onClick={handleTopUp}>
            Top-up
          </Button>
          <Button callToAction={true} btnType={'secondary'} onClick={handleWithdraw}>
            Withdraw
          </Button>
        </div>
        <Button callToAction={true} btnType={'secondary'} onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

export default PopupForm;
