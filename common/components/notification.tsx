import * as React from 'react';
type variant = 'success' | 'error' | 'warning' | 'info';

interface ErrorProps {
  message?: string;
  variant?: variant;
}

type MessageStyle = {
  [K in variant]: string;
};

const messageStyle: MessageStyle = {
  error: 'text-red-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export default function Notification({
  message = '* Please fill out this field.',
  variant = 'error',
}: ErrorProps) {
  return <p className={`${messageStyle[variant]} text-xs italic`}>{message}</p>;
}
